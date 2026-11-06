"use strict";
// Login de estudante por nickname e senha sem expor o e-mail no cliente.
// Firebase Auth continua responsável por verificar a senha e manter o UID.
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();
const db=admin.firestore();
const regiao="southamerica-east1";
const opcoes={region:regiao,memory:"256MiB",timeoutSeconds:25,maxInstances:10};

function normalizarNickname(valor){
  const nome=String(valor||"").trim().replace(/^@/,"");
  if(!/^[A-Za-z0-9_.]{3,20}$/.test(nome))
    throw new HttpsError("invalid-argument","O nickname precisa ter de 3 a 20 caracteres (letras, números, ponto ou underline).");
  return {nome,chave:nome.toLowerCase()};
}
function autenticarConta(request){
  if(!request.auth?.uid)throw new HttpsError("unauthenticated","Entre na conta para definir seu nickname.");
  return request.auth.uid;
}

// Consulta usada no formulário ANTES do cadastro. A reserva real é atômica.
exports.verificarNickname=onCall(opcoes,async request=>{
  const {chave}=normalizarNickname(request.data?.nickname);
  const salvo=await db.collection("nicknames").doc(chave).get();
  return {disponivel:!salvo.exists || (request.auth?.uid && salvo.data()?.uid===request.auth.uid)};
});

// Unicidade case-insensitive, sem email público e sem alterar usuários de outro UID.
exports.reservarNickname=onCall(opcoes,async request=>{
  const uid=autenticarConta(request);
  const {nome,chave}=normalizarNickname(request.data?.nickname);
  const contaAdmin=await db.collection("admins").doc(uid).get();
  if(contaAdmin.exists && contaAdmin.data()?.ativo===true)
    throw new HttpsError("permission-denied","O painel administrativo utiliza e-mail e senha.");
  const usuarioRef=db.collection("usuarios").doc(uid);
  const destinoRef=db.collection("nicknames").doc(chave);
  await db.runTransaction(async tx=>{
    const [destino,perfil]=await Promise.all([tx.get(destinoRef),tx.get(usuarioRef)]);
    if(destino.exists && destino.data()?.uid!==uid)
      throw new HttpsError("already-exists","Este nickname já está em uso. Escolha outro.");
    const chaveAntiga=perfil.data()?.nicknameChave;
    let antigoRef=null,antigo=null;
    if(chaveAntiga && chaveAntiga!==chave){
      antigoRef=db.collection("nicknames").doc(chaveAntiga);
      antigo=await tx.get(antigoRef);
    }
    // Toda leitura está concluída antes de qualquer escrita (regra da transação).
    tx.set(destinoRef,{uid,nickname:nome,atualizadoEm:admin.firestore.FieldValue.serverTimestamp()},{merge:true});
    tx.set(usuarioRef,{nickname:nome,nicknameChave:chave,atualizadoEm:admin.firestore.FieldValue.serverTimestamp()},{merge:true});
    if(antigoRef && antigo?.data()?.uid===uid)tx.delete(antigoRef);
  });
  return {nickname:nome};
});

// Em vez de consultar e-mail no navegador, a função busca UID de um índice privado,
// resolve o e-mail com Admin SDK e VERIFICA a senha no Firebase Authentication.
exports.loginComNickname=onCall(opcoes,async request=>{
  const erroGenerico=()=>new HttpsError("unauthenticated","Nickname ou senha incorretos.");
  let chave;
  try {({chave}=normalizarNickname(request.data?.nickname));}
  catch(_erro){throw erroGenerico();}
  const senha=request.data?.senha;
  if(typeof senha!=="string" || senha.length<1 || senha.length>256)throw erroGenerico();
  const indice=await db.collection("nicknames").doc(chave).get();
  const uid=indice.data()?.uid;
  if(!uid)throw erroGenerico();
  const contaAdmin=await db.collection("admins").doc(uid).get();
  if(contaAdmin.exists && contaAdmin.data()?.ativo===true)
    throw new HttpsError("permission-denied","Administradores devem entrar pelo painel administrativo.");
  let conta;
  try { conta=await admin.auth().getUser(uid); }
  catch(_erro){throw erroGenerico();}
  if(conta.disabled || !conta.email)throw erroGenerico();
  const key=process.env.FIREBASE_WEB_API_KEY;
  if(!key)throw new HttpsError("failed-precondition","Configure FIREBASE_WEB_API_KEY em functions/.env.");
  let verificacao;
  try {
    const resposta=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${encodeURIComponent(key)}`,{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email:conta.email,password:senha,returnSecureToken:true}),
      signal:AbortSignal.timeout(12000)
    });
    if(!resposta.ok)throw erroGenerico();
    verificacao=await resposta.json();
  } catch(erro) {
    if(erro instanceof HttpsError)throw erro;
    throw new HttpsError("unavailable","Não foi possível consultar a autenticação. Tente novamente.");
  }
  if(verificacao.localId!==uid)throw erroGenerico();
  const token=await admin.auth().createCustomToken(uid);
  return {token};
});
