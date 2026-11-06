/* =========================================================
   ROTA DA APROVAÇÃO — LÓGICA DO SITE
   O conteúdo roda no navegador e usa Firebase para contas,
   sincronização de progresso e administração do banco.
   ========================================================= */

/* ---------- 1. DADOS DE AGENDA E AVISOS ---------- */
const EVENTOS_2026 = [
  {id:"unesp",nome:"Vestibular Unesp 2027",instituicao:"Universidade Estadual Paulista",categoria:"vestibular",inicio:"2026-09-04",fim:"2026-10-20",horaFim:"Consulte o portal",provas:["2026-11-22"],detalhe:"5.850 vagas; primeira fase em 22 de novembro de 2026.",url:"https://www.vunesp.com.br/VNSP2514",fonte:"Fundação Vunesp / Unesp"},
  {id:"etec",nome:"Vestibulinho Etec · 1º semestre 2027",instituicao:"Centro Paula Souza",categoria:"vestibular",inicio:"2026-09-02",fim:"2026-11-03",horaFim:"20h",provas:["2026-12-06"],detalhe:"Processo seletivo para cursos técnicos e ensino médio. Prova em 6 de dezembro.",url:"https://vestibulinho.etec.sp.gov.br/calendario/",fonte:"Vestibulinho Etec"},
  {id:"fatec",nome:"Vestibular Fatec · 1º semestre 2027",instituicao:"Faculdades de Tecnologia do Estado de SP",categoria:"vestibular",inicio:"2026-09-14",fim:"2026-11-06",horaFim:"20h",provas:["2026-12-13"],detalhe:"Inscrições em 2026 para ingresso em 2027. Prova em 13 de dezembro.",url:"https://vestibular.fatec.sp.gov.br/calendario/",fonte:"Vestibular Fatec"},
  {id:"cgu",nome:"Concurso CGU 2026 · Auditor Federal",instituicao:"Controladoria-Geral da União",categoria:"concurso",inicio:"2026-10-09",fim:"2026-11-04",horaFim:"Confira o edital",provas:["2026-12-13"],detalhe:"60 vagas em Auditoria e Tecnologia da Informação; exige nível superior.",url:"https://www.cebraspe.org.br/concursos/cgu_26_affc",fonte:"Cebraspe / CGU"},
  {id:"camara",nome:"Câmara dos Deputados 2026 · Analista",instituicao:"Câmara dos Deputados",categoria:"concurso",inicio:"2026-10-15",fim:"2026-11-17",horaFim:"18h · Brasília",provas:["2027-01-17"],detalhe:"Carreiras de nível superior. Provas previstas para janeiro de 2027.",url:"https://www.cebraspe.org.br/concursos/cd_26_analista",fonte:"Cebraspe / Câmara"},
  {id:"unicamp",nome:"Vestibular Unicamp 2027",instituicao:"Universidade Estadual de Campinas",categoria:"vestibular",inicio:"2026-08-03",fim:"2026-09-08",provas:["2026-10-18","2026-11-29","2026-11-30"],detalhe:"Inscrições encerradas. 1ª fase em 18 de outubro; 2ª fase em 29 e 30 de novembro.",url:"https://www.unicamp.br/noticias/2026/08/31/unicamp-prorroga-inscricoes-para-o-vestibular-2027-ate-8-de-setembro/",fonte:"Unicamp / Comvest"},
  {id:"fuvest",nome:"Fuvest · Vestibular USP 2027",instituicao:"Universidade de São Paulo",categoria:"vestibular",inicio:"2026-08-17",fim:"2026-10-09",provas:["2026-11-01","2026-12-06","2026-12-07"],detalhe:"Inscrições encerradas. 1ª fase em 1º de novembro; 2ª fase em 6 e 7 de dezembro.",url:"https://www.fuvest.br/fuvest-2027-fuvest-divulga-cronograma-completo-do-vestibular-2027/",fonte:"Fuvest"},
  {id:"enem",nome:"Enem 2026",instituicao:"Inep / Ministério da Educação",categoria:"vestibular",inicio:"2026-05-25",fim:"2026-06-12",provas:["2026-11-08","2026-11-15"],detalhe:"Inscrições encerradas. Aplicação regular prevista para 8 e 15 de novembro.",url:"https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/orientacoes/cronograma",fonte:"Inep"}
];
const avisos = [
  {dia:"20",mes:"OUT",selo:"PRAZO PRÓXIMO",cor:"coral",titulo:"Unesp 2027: inscrições até 20 de outubro",texto:"Inscrições abertas em 15/10/2026. Confirme os requisitos no portal da Vunesp.",link:"https://www.vunesp.com.br/VNSP2514",urgente:true},
  {dia:"03",mes:"NOV",selo:"INSCRIÇÕES ABERTAS",cor:"lilas",titulo:"Etec 2027: prazo até 3 de novembro, às 20h",texto:"Confira os cursos disponíveis, a inscrição e o calendário oficial.",link:"https://vestibulinho.etec.sp.gov.br/calendario/"},
  {dia:"06",mes:"NOV",selo:"ENSINO SUPERIOR",cor:"azul",titulo:"Fatec 2027: inscrições até 6 de novembro, às 20h",texto:"Há cursos superiores de tecnologia. Verifique taxa, documentação e cursos ofertados.",link:"https://vestibular.fatec.sp.gov.br/calendario/"},
  {dia:"17",mes:"NOV",selo:"CONCURSOS",cor:"verde",titulo:"Concurso da Câmara 2026: inscrições até 17 de novembro",texto:"Vagas para diferentes especialidades de nível superior, conforme edital da banca.",link:"https://www.cebraspe.org.br/concursos/cd_26_analista"}
];

/* ---------- 2. GUIAS DE ESTUDO ----------
   Cada guia tem conteúdo suficiente para orientar a revisão
   e uma ligação com as questões do mesmo tema ou matéria. */
const guias = [
  {
    id:"porcentagem",materia:"Matemática",icone:"%",cor:"azul",titulo:"Porcentagem, razão e proporcionalidade",tempo:"25 min",nivel:"Base",
    resumo:"Transforme porcentagens em frações ou números decimais e identifique sempre qual é o valor de referência.",
    pontos:["p% significa p/100","Aumento: valor × (1 + taxa)","Desconto: valor × (1 − taxa)","Grandezas proporcionais mantêm uma razão constante"],
    formula:"parte = total × taxa decimal",
    passos:["Sublinhe o total de referência.","Converta a porcentagem para decimal.","Escolha entre calcular a parte, o novo total ou a taxa.","Verifique se o resultado faz sentido em relação ao valor inicial."],
    exemplo:"25% de 80 = 0,25 × 80 = 20. Com desconto, o novo valor é 80 − 20 = 60.",
    temas:["Porcentagem","Proporcionalidade"]
  },
  {
    id:"algebra",materia:"Matemática",icone:"x",cor:"lilas",titulo:"Equações, módulos, PA e funções",tempo:"35 min",nivel:"Intermediário",
    resumo:"Traduza as condições para linguagem algébrica antes de calcular. Intervalos e padrões ficam mais simples quando representados.",
    pontos:["|x−a|≤r representa um intervalo","Em PA: aₙ=a₁+(n−1)r","Sₙ−Sₙ₋₁=aₙ","Produto negativo: fatores com sinais opostos"],
    formula:"aₙ = a₁ + (n − 1)r",
    passos:["Identifique a incógnita e as restrições.","Reescreva módulos ou somas em formas conhecidas.","Resolva a condição algébrica.","Teste limites e valores inteiros, se solicitado."],
    exemplo:"(x−2)(x−6)<0 é verdadeiro entre as raízes: 2<x<6. Os inteiros são 3, 4 e 5.",
    temas:["Álgebra","Progressão aritmética","Funções"]
  },
  {
    id:"fisica",materia:"Física",icone:"F",cor:"coral",titulo:"Energia, potência e segurança",tempo:"30 min",nivel:"Intermediário",
    resumo:"Antes de aplicar fórmula, defina o sistema e descubra qual grandeza é conservada ou transformada.",
    pontos:["Energia pode mudar de forma","Potência elétrica: P=U·i","Deformação aumenta o tempo da colisão","Impulso é variação da quantidade de movimento"],
    formula:"P = U · i  ⇒  i = P/U",
    passos:["Liste as grandezas fornecidas.","Defina sistema, unidade e fenômeno.","Aplique conservação ou relação física adequada.","Interprete o número no contexto de segurança."],
    exemplo:"Em 110 V, uma régua de 20 A suporta no máximo P=110×20=2200 W.",
    temas:["Energia","Eletricidade"]
  },
  {
    id:"quimica",materia:"Química",icone:"Q",cor:"amarelo",titulo:"Mol, radioatividade e química orgânica",tempo:"35 min",nivel:"Intermediário",
    resumo:"Questões de Química costumam exigir uma ponte entre o fenômeno descrito e uma representação: massa, mol, estrutura ou equação.",
    pontos:["n=m/M","Meia-vida reduz a amostra à metade","Compostos orgânicos têm carbono como elemento central","Balanceamento conserva átomos e carga"],
    formula:"massa restante = massa inicial · (1/2)ⁿ",
    passos:["Identifique o conceito central.","Converta unidades antes de operar.","Monte a proporção ou expressão.","Confira conservação de massa, átomos e carga."],
    exemplo:"Em cinco meias-vidas, uma amostra de 2 mg passa a 2/2⁵ = 0,0625 mg.",
    temas:["Estequiometria","Radioatividade","Química orgânica"]
  },
  {
    id:"biologia",materia:"Biologia",icone:"B",cor:"verde",titulo:"Genética, evolução e fisiologia",tempo:"35 min",nivel:"Intermediário",
    resumo:"Relacione estrutura e função. Em genética, pergunte qual molécula está sendo observada; em evolução, qual mecanismo altera populações.",
    pontos:["RT-PCR parte de RNA e revela genes expressos","Seleção natural atua sobre variação herdável","Vitamina A participa da visão","Isolamento geográfico não é obrigatório para especiação"],
    formula:"DNA → RNA → proteína (fluxo geral da informação)",
    passos:["Localize o nível biológico: molécula, célula, organismo ou população.","Separe causa de consequência.","Elimine alternativas absolutas ou incompatíveis.","Relacione o mecanismo ao resultado observado."],
    exemplo:"Se há RNA mensageiro de um gene, ele foi transcrito; por isso, a RT-PCR permite detectar expressão gênica.",
    temas:["Genética","Evolução","Fisiologia"]
  },
  {
    id:"interpretacao",materia:"Português",icone:"A",cor:"coral",titulo:"Interpretação e figuras de linguagem",tempo:"25 min",nivel:"Base",
    resumo:"A resposta correta deve ser sustentada pelo texto. Não escolha apenas uma alternativa verdadeira fora do contexto.",
    pontos:["Metáfora cria relação por semelhança","Concessão quebra uma expectativa","Tema não é o mesmo que objetivo","Palavras-chave ajudam, mas o sentido nasce do conjunto"],
    formula:"evidência textual + comando = alternativa correta",
    passos:["Leia primeiro o comando.","Marque palavras que revelam posição ou contraste.","Resuma a ideia central em uma frase.","Compare cada alternativa com uma evidência do texto."],
    exemplo:"“Formar novos quilombos” não é literal: representa união coletiva e resistência, portanto funciona como metáfora.",
    temas:["Interpretação","Figuras de linguagem"]
  },
  {
    id:"historia",materia:"História",icone:"H",cor:"lilas",titulo:"Colonização, identidade e resistência",tempo:"30 min",nivel:"Intermediário",
    resumo:"Evite tratar grupos históricos como blocos únicos. Pergunte quem age, em qual contexto e com quais interesses.",
    pontos:["Povos indígenas tiveram projetos políticos próprios","Identidades mudam no tempo e no espaço","Colonização produziu hierarquias duradouras","Fontes expressam perspectivas específicas"],
    formula:"sujeito histórico + contexto + interesse",
    passos:["Localize tempo e espaço.","Identifique o autor e o grupo mencionado.","Procure relações de poder e permanências.","Desconfie de generalizações como “todos”, “sempre” e “apenas”."],
    exemplo:"A participação indígena na Independência não foi homogênea: diferentes povos defenderam projetos e territórios próprios.",
    temas:["Colonização","Identidade","Independência"]
  },
  {
    id:"filosofia",materia:"Filosofia",icone:"Φ",cor:"azul",titulo:"Ética, felicidade e leitura conceitual",tempo:"25 min",nivel:"Intermediário",
    resumo:"Compare autores sem reduzir suas ideias a uma palavra. Defina o que cada filósofo entende pelos conceitos centrais.",
    pontos:["Aristóteles liga felicidade à atividade virtuosa","Epicuro valoriza prudência e tranquilidade","Prazer não significa necessariamente excesso","O contexto evita falsas equivalências"],
    formula:"conceito + definição do autor + consequência",
    passos:["Identifique os filósofos comparados.","Defina o conceito na teoria de cada um.","Procure aproximações e diferenças reais.","Rejeite caricaturas e afirmações absolutas."],
    exemplo:"Epicuro não recomenda prazeres ilimitados: a escolha prudente busca tranquilidade e evita sofrimentos futuros.",
    temas:["Filosofia antiga","Ética"]
  },
  {
    id:"geografia",materia:"Geografia",icone:"G",cor:"verde",titulo:"Cartografia, território e geologia",tempo:"30 min",nivel:"Intermediário",
    resumo:"Em cartografia, escala maior mostra área menor com mais detalhe. Em geologia, associe estrutura, recurso e uso econômico.",
    pontos:["Escala grande = mais detalhe e menos generalização","Fronteira estatal nem sempre coincide com território cultural","Escudos cristalinos concentram minerais metálicos","Território envolve poder e pertencimento"],
    formula:"escala = medida no mapa / medida real",
    passos:["Defina se o problema pede detalhe ou visão geral.","Separe limite político de território vivido.","Associe a estrutura geológica ao tipo de recurso.","Elimine relações causais que o texto não sustenta."],
    exemplo:"Um estudo de impacto local precisa de mapa em escala maior que um plano nacional, pois deve representar detalhes do terreno.",
    temas:["Cartografia","Território","Geologia"]
  }
];

/* ---------- 3. BANCO DE 21 QUESTÕES ----------
   Os enunciados abaixo são versões selecionadas/adaptadas dos
   cadernos enviados. O campo resolucao guarda o raciocínio em
   etapas e o índice resposta começa em zero (A=0, B=1...). */
const questoesIniciais = [
  {id:1,vestibular:"ENEM",ano:2024,numero:91,materia:"Física",tema:"Energia e colisões",nivel:"Médio",
    pergunta:"Carros modernos têm zonas deformáveis que amassam durante uma colisão. Considerando carro, ocupantes e obstáculo como um sistema isolado, por que essa deformação aumenta a segurança?",
    opcoes:["Aciona necessariamente os airbags.","Converte parte da energia cinética em deformação e energia interna.","Elimina a quantidade de movimento total.","Cria uma barreira rígida ao redor dos ocupantes.","Reduz sozinha a velocidade do centro de massa do sistema."],resposta:1,
    dica:"Pense no destino da energia associada ao movimento durante o amassamento.",
    resolucao:["A energia total do sistema isolado se conserva.","A colisão é inelástica: parte da energia cinética vira deformação, calor e som.","A zona deformável também aumenta o tempo da colisão, reduzindo a força média sobre os ocupantes."],
    explicacao:"A alternativa B descreve a transformação de energia que torna a colisão menos brusca para os passageiros.",fonte:"ENEM 2024 · 2º dia · Caderno 7 Azul · questão 91 (adaptada)"},
  {id:2,vestibular:"ENEM",ano:2024,numero:95,materia:"Biologia",tema:"Expressão gênica",nivel:"Médio",
    pergunta:"A RT-PCR usa transcriptase reversa para produzir DNA complementar a partir de RNA. Nesse contexto, a técnica é especialmente útil para detectar genes:",
    opcoes:["expressos.","plasmidiais.","bacterianos.","dominantes.","autossômicos."],resposta:0,
    dica:"A presença de RNA mensageiro revela que uma etapa do fluxo da informação genética já aconteceu.",
    resolucao:["Um gene expresso é transcrito em RNA.","A transcriptase reversa converte esse RNA em DNA complementar.","Detectar o DNA complementar indica que o RNA do gene estava presente na amostra."],
    explicacao:"A RT-PCR detecta transcritos e, portanto, permite investigar quais genes estão sendo expressos.",fonte:"ENEM 2024 · 2º dia · Caderno 7 Azul · questão 95"},
  {id:3,vestibular:"ENEM",ano:2024,numero:97,materia:"Química",tema:"Concentração e massa molar",nivel:"Difícil",
    pergunta:"Um soro de 2 L tem concentração de Na⁺ igual a 1,4 mg/mL e foi preparado com duas colheres pequenas de NaCl. Dados: M(NaCl)=58,5 g/mol e M(Na)=23 g/mol. Qual massa aproximada de NaCl havia em cada colher?",
    opcoes:["0,7 g","1,8 g","2,8 g","3,6 g","7,0 g"],resposta:3,
    dica:"Calcule primeiro a massa total de sódio e use a razão 58,5/23 para convertê-la em NaCl.",
    resolucao:["2 L = 2 000 mL; logo, há 1,4×2 000=2 800 mg=2,8 g de Na⁺.","A massa total de NaCl é 2,8×(58,5/23)≈7,12 g.","Como foram usadas duas colheres: 7,12/2≈3,56 g por colher."],
    explicacao:"Arredondando 3,56 g, obtém-se 3,6 g: alternativa D.",fonte:"ENEM 2024 · 2º dia · Caderno 7 Azul · questão 97"},

  {id:4,vestibular:"ENEM",ano:2025,numero:92,materia:"Química",tema:"Meia-vida",nivel:"Fácil",
    pergunta:"Uma amostra contém 2,00 mg de cobalto-60, cuja meia-vida é 5,3 anos. Após 26,5 anos, qual massa estará mais próxima da quantidade restante?",
    opcoes:["2,00 mg","1,00 mg","0,40 mg","0,13 mg","0,06 mg"],resposta:4,
    dica:"Descubra quantas meias-vidas cabem em 26,5 anos.",
    resolucao:["26,5/5,3=5 meias-vidas.","A massa é dividida por 2 cinco vezes: 2/2⁵.","2/32=0,0625 mg, aproximadamente 0,06 mg."],
    explicacao:"Depois de cinco meias-vidas resta 1/32 da massa inicial: alternativa E.",fonte:"ENEM 2025 · 2º dia · Caderno 8 Verde · questão 92"},
  {id:5,vestibular:"ENEM",ano:2025,numero:94,materia:"Biologia",tema:"Vitaminas",nivel:"Fácil",
    pergunta:"O arroz dourado é enriquecido com betacaroteno, precursor da vitamina A. Seu consumo ajuda a prevenir principalmente qual problema associado à falta dessa vitamina?",
    opcoes:["Hemofilia.","Escorbuto.","Raquitismo.","Cegueira noturna.","Anemia perniciosa."],resposta:3,
    dica:"A vitamina A participa da formação de pigmentos presentes na retina.",
    resolucao:["O betacaroteno pode ser convertido em vitamina A.","A vitamina A é necessária à formação de pigmentos visuais, como a rodopsina.","Sua deficiência prejudica especialmente a visão em baixa luminosidade."],
    explicacao:"A deficiência de vitamina A está relacionada à cegueira noturna: alternativa D.",fonte:"ENEM 2025 · 2º dia · Caderno 8 Verde · questão 94"},
  {id:6,vestibular:"ENEM",ano:2025,numero:100,materia:"Física",tema:"Potência elétrica",nivel:"Médio",
    pergunta:"Uma régua de 110 V suporta 20 A. Computador (250 W) e ar-condicionado (1 100 W) ficam ligados. Na ordem, tenta-se usar: impressora (660 W), cafeteira (900 W), luminária (5 W) e secador (750 W). Quantas atividades são realizadas antes de o fusível queimar?",
    opcoes:["4","3","2","1","0"],resposta:3,
    dica:"A potência máxima é U·i. Quando o fusível queima, as tentativas seguintes não podem acontecer.",
    resolucao:["Potência máxima: 110×20=2 200 W.","Carga fixa: 250+1 100=1 350 W.","Com a impressora: 2 010 W, funciona. Com a cafeteira: 2 250 W, ultrapassa o limite e o fusível queima.","Apenas a primeira atividade foi concluída."],
    explicacao:"Só a impressão ocorre sem queimar o fusível: alternativa D.",fonte:"ENEM 2025 · 2º dia · Caderno 8 Verde · questão 100 (adaptada)"},

  {id:7,vestibular:"Fuvest",ano:2024,numero:1,materia:"Português",tema:"Metáfora",nivel:"Fácil",
    pergunta:"No poema “Tempo de nos aquilombar”, de Conceição Evaristo, o verso “É tempo de formar novos quilombos” exemplifica:",
    opcoes:["Paradoxo, por simplesmente retomar o passado.","Metonímia, sem relação com o passado.","Metáfora, representando união coletiva como resistência social.","Antítese entre passado e futuro.","Hipérbole indicada apenas pelo plural."],resposta:2,
    dica:"Pergunte se “quilombos” deve ser entendido literalmente ou como imagem de organização e resistência.",
    resolucao:["O contexto convoca união, vigilância e luta por liberdade.","“Novos quilombos” amplia o sentido histórico de quilombo.","O termo passa a representar formas coletivas de resistência no presente."],
    explicacao:"Há uma transferência de sentido por semelhança: metáfora, alternativa C.",fonte:"Fuvest 2024 · Prova V · questão 01 (trecho selecionado)"},
  {id:8,vestibular:"Fuvest",ano:2024,numero:2,materia:"Português",tema:"Denúncia social",nivel:"Médio",
    pergunta:"Considerando o enfoque de denúncia social do poema “Tempo de nos aquilombar”, o eu lírico revela predominantemente:",
    opcoes:["Crítica apenas a problemas encerrados no passado.","Justificativas para a segregação atual.","Tensões sociais antigas examinadas à luz dos embates atuais.","A necessidade de contornar problemas do passado.","Peculiaridades de classes sem relacioná-las historicamente."],resposta:2,
    dica:"Observe a ligação entre a memória quilombola e o chamado para agir no presente.",
    resolucao:["O poema recupera a luta histórica por liberdade.","Verbos e expressões situam a convocação no presente.","Passado e atualidade se conectam pela permanência das tensões sociais."],
    explicacao:"O texto atualiza conflitos de longa duração: alternativa C.",fonte:"Fuvest 2024 · Prova V · questão 02 (adaptada)"},
  {id:9,vestibular:"Fuvest",ano:2024,numero:6,materia:"História",tema:"Brasil colonial",nivel:"Médio",
    pergunta:"Segundo texto de Evaldo Cabral de Mello, o açúcar estruturou latifúndio, escravidão e privilégios no Nordeste dos séculos XVI e XVII. A conclusão adequada é:",
    opcoes:["O trabalho escravizado distribuía-se de modo igual por todas as atividades.","A Coroa concedia principalmente pequenos lotes a donatários.","Os privilégios concentravam-se nos senhores de engenho, em prejuízo dos escravizados e livres pobres.","Relações horizontais recebiam estímulo oficial.","O feudalismo europeu foi reproduzido integralmente."],resposta:2,
    dica:"Concentre-se na expressão “reservando seus privilégios a uns poucos”.",
    resolucao:["A grande propriedade e a escravidão concentravam riqueza e poder.","Os poucos privilegiados eram, sobretudo, os proprietários de engenho.","A maioria — escravizados e livres pobres — permanecia subordinada."],
    explicacao:"O texto destaca a concentração de privilégios: alternativa C.",fonte:"Fuvest 2024 · Prova V · questão 06 (adaptada)"},

  {id:10,vestibular:"Fuvest",ano:2025,numero:4,materia:"História",tema:"Caminhos indígenas",nivel:"Médio",
    pergunta:"Ao discutir a ocupação do território colonial, Sérgio Buarque de Holanda destaca que trilhas e caminhos usados pelos colonizadores:",
    opcoes:["Foram criados apenas após a chegada portuguesa.","Ignoraram completamente o conhecimento local.","Aproveitaram rotas e técnicas indígenas já existentes.","Tinham como única finalidade separar aldeias.","Reproduziam estradas europeias pavimentadas."],resposta:2,
    dica:"A ocupação colonial não começou sobre um espaço vazio de conhecimento.",
    resolucao:["Povos indígenas conheciam rios, passagens e condições do território.","Colonizadores incorporaram esse saber prático em seus deslocamentos.","A expansão portuguesa, portanto, apropriou-se de caminhos anteriores."],
    explicacao:"A alternativa C reconhece o conhecimento territorial indígena apropriado pelos colonizadores.",fonte:"Fuvest 2025 · Prova V1 · questão 04 (adaptada)"},
  {id:11,vestibular:"Fuvest",ano:2025,numero:12,materia:"História",tema:"Capitalismo e colonialismo",nivel:"Difícil",
    pergunta:"Os conceitos de “extrativismo de dados” e “colonialismo de dados” podem ser entendidos como:",
    opcoes:["Mecanismos sem qualquer antecedente histórico.","Ideias incompatíveis: uma trata só da mente e outra só da vida material.","Lógicas opostas à extração de recursos naturais.","Formas análogas de compreender o capitalismo atual, remetendo a práticas históricas de apropriação.","Estratégias que eliminam desigualdades entre países."],resposta:3,
    dica:"Os dois conceitos usam experiências históricas de apropriação para interpretar a economia digital.",
    resolucao:["Dados são tratados como recursos capturados e transformados em valor.","“Extrativismo” e “colonialismo” remetem a práticas históricas de apropriação.","A analogia ilumina continuidades de poder e exploração no capitalismo contemporâneo."],
    explicacao:"Os conceitos compartilham a ideia de apropriação e objetivos econômicos: alternativa D.",fonte:"Fuvest 2025 · Prova V1 · questão 12 (adaptada)"},
  {id:12,vestibular:"Fuvest",ano:2025,numero:20,materia:"Química",tema:"Modelos atômicos",nivel:"Médio",
    pergunta:"Qual fenômeno não podia ser explicado pelo modelo atômico de Dalton, que considerava o átomo indivisível?",
    opcoes:["Conservação da massa.","Proporções definidas.","Formação de compostos.","Reorganização de átomos em reações comuns.","Radioatividade e transformação de elementos."],resposta:4,
    dica:"Procure o fenômeno que revela estrutura interna ou transformação do próprio átomo.",
    resolucao:["Dalton descrevia átomos como esferas indivisíveis e imutáveis.","Reações químicas comuns podiam ser vistas como rearranjos dessas esferas.","A radioatividade envolve alterações no núcleo e até transformação de um elemento em outro."],
    explicacao:"A radioatividade exige um modelo com estrutura subatômica: alternativa E.",fonte:"Fuvest 2025 · Prova V1 · questão 20 (adaptada)"},

  {id:13,vestibular:"Unesp",ano:2024,numero:38,materia:"Geografia",tema:"Território e fronteiras",nivel:"Médio",
    pergunta:"Um texto afirma que a América pré-colombiana permanece viva em povos separados por fronteiras nacionais modernas. Isso ocorre apesar de:",
    opcoes:["A independência ter incorporado integralmente valores nativos.","A miscigenação ter eliminado diferenças territoriais.","A conquista e os Estados nacionais terem imposto outra configuração territorial.","Interesses britânicos terem preservado os territórios originários.","Os povos indígenas terem sido completamente substituídos."],resposta:2,
    dica:"Diferencie território cultural de fronteira político-administrativa.",
    resolucao:["Povos e culturas existiam antes dos Estados atuais.","Conquista e formação nacional desenharam novas fronteiras.","Esses limites fragmentaram povos, mas não apagaram totalmente vínculos e identidades."],
    explicacao:"A permanência cultural existe apesar da configuração territorial imposta posteriormente: alternativa C.",fonte:"Unesp 2024 · 1ª fase · questão 38 (adaptada)"},
  {id:14,vestibular:"Unesp",ano:2024,numero:40,materia:"História",tema:"Identidade e diáspora",nivel:"Médio",
    pergunta:"V. S. Naipaul relata que a ideia de “Índia” construída por descendentes de indianos em Trinidad diferia da realidade encontrada no país. O caso mostra que identidades:",
    opcoes:["São cópias permanentes do lugar de origem.","Dependem apenas de características biológicas.","Desaparecem completamente em comunidades migrantes.","São reconstruídas na diáspora e mudam conforme o contexto social.","São definidas unicamente pelas fronteiras do Estado."],resposta:3,
    dica:"A memória de um lugar e a experiência concreta nesse lugar não são idênticas.",
    resolucao:["Comunidades migrantes preservam referências do lugar de origem.","Essas referências são reinterpretadas no novo contexto.","Por isso, a identidade diaspórica pode divergir da realidade social do país ancestral."],
    explicacao:"Identidades são históricas e contextuais: alternativa D.",fonte:"Unesp 2024 · 1ª fase · questão 40 (adaptada)"},
  {id:15,vestibular:"Unesp",ano:2024,numero:41,materia:"História",tema:"Totalitarismo",nivel:"Médio",
    pergunta:"Na análise de Hannah Arendt, os campos de concentração e extermínio nazistas produziram uma ação peculiar sobre as pessoas ao:",
    opcoes:["Priorizar medidas de higiene pública.","Transformá-las em coisas descartáveis, retirando singularidade e condição humana.","Garantir direitos civis mínimos.","Fortalecer nacionalismos plurais.","Substituir o extermínio pela escravização econômica."],resposta:1,
    dica:"Pense no significado de retirar nome, direitos, relações e individualidade.",
    resolucao:["O sistema totalitário destrói a condição jurídica e social da vítima.","Nos campos, pessoas são reduzidas a números e corpos administráveis.","Essa coisificação prepara a possibilidade de eliminação sem reconhecimento de humanidade."],
    explicacao:"A desumanização opera pela coisificação: alternativa B.",fonte:"Unesp 2024 · 1ª fase · questão 41 (adaptada)"},

  {id:16,vestibular:"Unicamp",ano:2024,numero:15,materia:"História",tema:"Independência do Brasil",nivel:"Médio",
    pergunta:"A participação indígena no processo de Independência do Brasil permite concluir que:",
    opcoes:["Os povos indígenas atuaram apenas para manter a ordem colonial.","Populações indígenas participaram com projetos políticos específicos.","A Independência teve significado idêntico para todos os povos.","A diversidade indígena impediu qualquer ação política."],resposta:1,
    dica:"Evite tratar diferentes povos como um bloco passivo e homogêneo.",
    resolucao:["A Independência envolveu disputas locais por território, autonomia e alianças.","Diferentes povos avaliaram riscos e oportunidades de modos distintos.","A participação indígena, portanto, expressou projetos próprios."],
    explicacao:"A alternativa B reconhece agência e diversidade política indígenas.",fonte:"Unicamp 2024 · 1ª fase · questão 15 (adaptada)"},
  {id:17,vestibular:"Unicamp",ano:2024,numero:52,materia:"Filosofia",tema:"Filosofia antiga",nivel:"Médio",
    pergunta:"Comparando Aristóteles e Epicuro sobre felicidade e prazer, é correto afirmar que:",
    opcoes:["Ambos identificam felicidade com prazer imediato.","Aristóteles rejeita toda forma de prazer e Epicuro defende excessos.","Eles apresentam visões distintas, mas nenhum reduz a felicidade ao prazer imediato.","Ambos defendem que riqueza é a condição suficiente da felicidade."],resposta:2,
    dica:"Para Epicuro, prazer significa sobretudo ausência de perturbação; para Aristóteles, felicidade envolve vida virtuosa.",
    resolucao:["Aristóteles associa felicidade à atividade racional conforme a virtude.","Epicuro valoriza prazeres estáveis, prudência e ausência de sofrimento.","Nenhum dos dois propõe busca impulsiva de prazer imediato."],
    explicacao:"As doutrinas diferem, mas ambas são mais complexas que o hedonismo imediato: alternativa C.",fonte:"Unicamp 2024 · 1ª fase · questão 52 (adaptada)"},
  {id:18,vestibular:"Unicamp",ano:2024,numero:54,materia:"Matemática",tema:"Áreas e proporcionalidade",nivel:"Fácil",
    pergunta:"Quatro pizzas individuais de diâmetro d custam o mesmo que uma pizza de 20 cm de diâmetro. Se o preço é proporcional à área, qual é d?",
    opcoes:["5 cm","8 cm","10 cm","12 cm"],resposta:2,
    dica:"Iguale quatro áreas pequenas à área da pizza maior. Use o raio, que é metade do diâmetro.",
    resolucao:["Área grande: π·10²=100π.","Cada pizza pequena tem raio d/2 e área πd²/4.","Quatro pequenas: 4·πd²/4=πd².","πd²=100π, então d=10 cm."],
    explicacao:"O diâmetro de cada pizza individual é 10 cm: alternativa C.",fonte:"Unicamp 2024 · 1ª fase · questão 54 (adaptada)"},

  {id:19,vestibular:"Unicamp",ano:2025,numero:1,materia:"Geografia",tema:"Escala cartográfica",nivel:"Fácil",
    pergunta:"Em comparação com um zoneamento ecológico-econômico nacional, mapas de um estudo de impacto ambiental local devem apresentar:",
    opcoes:["Escala menor e maior generalização.","Escala maior e menor generalização.","A mesma escala, apenas com novas cores.","Menos detalhes para facilitar a leitura."],resposta:1,
    dica:"Quanto menor a área representada com detalhe, maior é a escala cartográfica.",
    resolucao:["Um estudo local precisa mostrar elementos detalhados do terreno.","Escalas maiores representam áreas menores com mais detalhe.","Mais detalhe implica menor generalização das informações."],
    explicacao:"A combinação correta é escala maior e menor generalização: alternativa B.",fonte:"Unicamp 2025 · 1ª fase · questão 01 (adaptada)"},
  {id:20,vestibular:"Unicamp",ano:2025,numero:52,materia:"Matemática",tema:"Módulo e intervalos",nivel:"Fácil",
    pergunta:"Se |x−2|≤2 e |y−3|≤1, qual afirmação é necessariamente verdadeira?",
    opcoes:["x+y≤4","x+y≥8","x+y≤8","x+y=6"],resposta:2,
    dica:"Transforme cada desigualdade modular em um intervalo fechado.",
    resolucao:["|x−2|≤2 implica 0≤x≤4.","|y−3|≤1 implica 2≤y≤4.","A maior soma possível é 4+4=8.","Logo, x+y≤8."],
    explicacao:"A limitação superior da soma é 8: alternativa C.",fonte:"Unicamp 2025 · 1ª fase · questão 52 (adaptada)"},
  {id:21,vestibular:"Unicamp",ano:2025,numero:54,materia:"Matemática",tema:"Funções e inequações",nivel:"Médio",
    pergunta:"Considere f(x)=x−2 e g(x)=x²−4x. Quantos valores inteiros de x satisfazem g(f(x))<0?",
    opcoes:["2","3","4","5"],resposta:1,
    dica:"Faça a composição e fatore o polinômio. Um produto é negativo entre duas raízes distintas.",
    resolucao:["g(f(x))=(x−2)²−4(x−2).","Simplificando: x²−8x+12=(x−2)(x−6).","O produto é negativo quando 2<x<6.","Os inteiros são 3, 4 e 5: três valores."],
    explicacao:"Há três soluções inteiras: alternativa B.",fonte:"Unicamp 2025 · 1ª fase · questão 54 (adaptada)"}
];

/* A lista começa com o conteúdo demonstrativo e é substituída
   automaticamente pelos documentos publicados no Firestore. */
let questoes = questoesIniciais.map(q => window.RotaClassificador.classificarQuestao({
  ...q,
  complexidade: q.nivel === "Fácil" ? 2 : q.nivel === "Difícil" ? 5 : 3,
  recomendacao: q.recomendacao || `Revise o guia de ${q.materia} e resolva outra questão sobre ${q.tema}.`,
  ativo: true
}));

/* ---------- 4. PROGRESSO LOCAL E SINCRONIZADO ----------
   localStorage mantém o uso sem conta e o Firestore sincroniza
   o mesmo estado quando um estudante está autenticado. */
const CHAVE_STORAGE = "rotaAprovacaoProgressoV2";
const estadoPadrao = {respostas:{},favoritos:[],sequencia:0,melhorSequencia:0};

function carregarEstado() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_STORAGE));
    return salvo && salvo.respostas ? {...estadoPadrao,...salvo} : {...estadoPadrao};
  } catch (erro) {
    return {...estadoPadrao};
  }
}

let estado = carregarEstado();
let materiaAtual = "Todas";
let indiceQuestao = 0;
let dicasAbertas = new Set();
let ordemAleatoria = [];
let usuarioAtual = null;
let nicknameAtual = "";
let nomeRealAtual = "";
let nicknamePendenteCadastro = "";
let nomePendenteCadastro = "";
let temporizadorSincronizacao = null;
let carregandoProgressoNuvem = false;

function salvarEstado() {
  try { localStorage.setItem(CHAVE_STORAGE,JSON.stringify(estado)); } catch (erro) { /* Navegação privada pode bloquear o armazenamento. */ }
  if(usuarioAtual&&!carregandoProgressoNuvem)agendarSincronizacaoEstado();
}

/* ---------- 5. NAVEGAÇÃO ENTRE PÁGINAS ---------- */
function abrirPagina(id) {
  document.querySelectorAll(".pagina").forEach(pagina=>pagina.classList.toggle("active",pagina.id===id));
  document.querySelectorAll("nav [data-page]").forEach(botao=>botao.classList.toggle("active",botao.dataset.page===id));
  document.getElementById("menu-principal").classList.remove("aberto");
  document.getElementById("menu-mobile").setAttribute("aria-expanded","false");
  document.getElementById("menu-mobile").textContent="☰";
  if(id==="desempenho") renderizarDesempenho();
  if(id==="conta") renderizarConta();
  window.scrollTo({top:0,behavior:"smooth"});
}

document.querySelectorAll("[data-page]").forEach(botao=>botao.addEventListener("click",()=>abrirPagina(botao.dataset.page)));
document.getElementById("menu-mobile").addEventListener("click",function(){
  const aberto=document.getElementById("menu-principal").classList.toggle("aberto");
  this.setAttribute("aria-expanded",String(aberto));
  this.textContent=aberto?"×":"☰";
});

/* ---------- 6. RENDERIZAÇÃO DE AGENDA, AVISOS E RESUMOS ---------- */
const calendarioBR=new Intl.DateTimeFormat("pt-BR",{timeZone:"America/Sao_Paulo",day:"2-digit",month:"short",year:"numeric"});
function diaLocalISO(){return new Intl.DateTimeFormat("en-CA",{timeZone:"America/Sao_Paulo",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());}
function dataBR(data){return calendarioBR.format(new Date(`${data}T12:00:00-03:00`)).replaceAll(" de "," ");}
function diasAte(data,hoje=diaLocalISO()){return Math.round((Date.parse(`${data}T12:00:00Z`)-Date.parse(`${hoje}T12:00:00Z`))/86400000);}
function proximaProva(item,hoje=diaLocalISO()){return item.provas.find(data=>data>=hoje)||null;}
function situacaoEvento(item,hoje=diaLocalISO()){
  if(hoje>=item.inicio&&hoje<=item.fim)return "aberta";
  return proximaProva(item,hoje)?"prova":"encerrada";
}
function badgeEvento(item){
  const status=situacaoEvento(item);
  return `<span class="evento-status status-${status}">${status==="aberta"?"● Inscrições abertas":status==="prova"?"◷ Prova agendada":"✓ Edição realizada"}</span>`;
}
function htmlData(item,compacto=false){
  const status=situacaoEvento(item),dataDestaque=status==="aberta"?item.fim:(proximaProva(item)||item.provas.at(-1));
  const dataPartes=dataDestaque.split("-");
  const rotuloData=status==="aberta"?"Inscrições até":status==="prova"?"Próxima prova":"Última prova";
  const prazo=status==="aberta"?diasAte(item.fim):null;
  return `<article class="data-card evento-card ${compacto?"evento-compacto":""}">
    <div class="bloco-data lilas evento-cal"><strong>${dataPartes[2]}</strong><small>${["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"][Number(dataPartes[1])-1]}</small></div>
    <div class="evento-conteudo"><div class="evento-tags"><span class="evento-tipo ${item.categoria}">${item.categoria==="concurso"?"Concurso público":"Vestibular"}</span>${badgeEvento(item)}</div><h3>${item.nome}</h3>
    <p>${compacto?item.instituicao:item.detalhe}</p><div class="evento-meta"><span><b>${rotuloData}:</b> ${dataBR(dataDestaque)}${status==="aberta"&&item.horaFim?` · ${item.horaFim}`:""}</span>${!compacto&&item.provas.length?`<span><b>Prova(s):</b> ${item.provas.map(dataBR).join(" · ")}</span>`:""}${prazo!==null?`<span class="evento-contagem">${prazo===0?"Último dia de inscrição":prazo===1?"1 dia restante":`${prazo} dias restantes`}</span>`:""}</div></div>
    <a class="evento-link" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="Abrir edital oficial de ${item.nome}">${compacto?"Ver edital ↗":"Portal oficial ↗"}</a></article>`;
}
function htmlAviso(item) {
  return `<article class="aviso-largo ${item.urgente?"urgente":""}"><span class="data-larga">${item.dia}<small>${item.mes}</small></span><div><span class="selo ${item.cor}">${item.selo}</span><h3>${item.titulo}</h3><p>${item.texto}</p></div><a href="${item.link}" target="_blank" rel="noopener noreferrer">Portal oficial ↗</a></article>`;
}
function renderizarAgenda(){
 const busca=document.getElementById("busca-evento").value.trim().toLocaleLowerCase("pt-BR");
 const categoria=document.getElementById("filtro-evento-tipo").value;
 const situacao=document.getElementById("filtro-evento-status").value;
 const ordem={aberta:0,prova:1,encerrada:2};
 const resultados=EVENTOS_2026.filter(item=>(categoria==="todos"||item.categoria===categoria)&&(situacao==="todos"||situacaoEvento(item)===situacao)&&(!busca||`${item.nome} ${item.instituicao} ${item.detalhe}`.toLocaleLowerCase("pt-BR").includes(busca)))
 .sort((a,b)=>ordem[situacaoEvento(a)]-ordem[situacaoEvento(b)]||(situacaoEvento(a)==="aberta"?a.fim.localeCompare(b.fim):(proximaProva(a)||"9999").localeCompare(proximaProva(b)||"9999")));
 document.getElementById("lista-datas").innerHTML=resultados.length?resultados.map(item=>htmlData(item)).join(""):'<div class="agenda-vazia">Nenhuma oportunidade encontrada. Altere os filtros para ver outras datas.</div>';
 document.getElementById("resultado-agenda").textContent=`${resultados.length} oportunidade${resultados.length===1?"":"s"} encontrada${resultados.length===1?"":"s"}`;
 const abertas=EVENTOS_2026.filter(item=>situacaoEvento(item)==="aberta").length;
 document.getElementById("agenda-total").textContent=EVENTOS_2026.length;
 document.getElementById("agenda-abertas").textContent=abertas;
}
function renderizarOportunidadesHome(){
 const ordem={aberta:0,prova:1,encerrada:2};
 const selecao=[...EVENTOS_2026].sort((a,b)=>ordem[situacaoEvento(a)]-ordem[situacaoEvento(b)]||(situacaoEvento(a)==="aberta"?a.fim.localeCompare(b.fim):(proximaProva(a)||"9999").localeCompare(proximaProva(b)||"9999")));
 document.getElementById("datas-inicio").innerHTML=selecao.slice(0,3).map(item=>htmlData(item,true)).join("");
 document.getElementById("oportunidades-home-cards").innerHTML=selecao.slice(0,3).map(item=>htmlData(item,true)).join("");
 document.getElementById("oportunidades-abertas").textContent=EVENTOS_2026.filter(item=>situacaoEvento(item)==="aberta").length;
 document.getElementById("oportunidades-provas").textContent=EVENTOS_2026.filter(item=>Boolean(proximaProva(item))).length;
}
document.querySelectorAll("#busca-evento,#filtro-evento-tipo,#filtro-evento-status").forEach(campo=>campo.addEventListener(campo.tagName==="SELECT"?"change":"input",renderizarAgenda));

function htmlGuiaMini(guia) {
  return `<article class="guia-mini"><span class="guia-icone ${guia.cor}">${guia.icone}</span><div><span class="tipo">${guia.materia}</span><h3>${guia.titulo}</h3><p>${guia.tempo} · ${guia.nivel}</p></div><button class="botao-texto" data-abrir-guia="${guia.id}">Abrir →</button></article>`;
}

renderizarOportunidadesHome();
renderizarAgenda();
document.getElementById("lista-avisos").innerHTML=avisos.map(htmlAviso).join("");
document.getElementById("guias-inicio").innerHTML=guias.slice(0,3).map(htmlGuiaMini).join("");
document.getElementById("total-questoes-hero").textContent=questoes.length;
document.getElementById("total-guias-hero").textContent=guias.length;

/* ---------- 7. GUIAS DE ESTUDO ---------- */
const materiasGuias=["Todas",...new Set(guias.map(guia=>guia.materia))];
document.getElementById("filtro-guia-materia").innerHTML=materiasGuias.map(m=>`<option value="${m}">${m==="Todas"?"Todas as matérias":m}</option>`).join("");

function renderizarGuias() {
  const busca=document.getElementById("busca-guia").value.trim().toLowerCase();
  const materia=document.getElementById("filtro-guia-materia").value;
  const filtrados=guias.filter(g=>(materia==="Todas"||g.materia===materia)&&(!busca||`${g.materia} ${g.titulo} ${g.temas.join(" ")}`.toLowerCase().includes(busca)));
  document.getElementById("lista-guias").innerHTML=filtrados.length?filtrados.map(g=>{
    const quantidade=questoes.filter(q=>q.materia===g.materia||g.temas.some(t=>q.tema.includes(t))).length;
    return `<article class="guia-card"><div class="guia-card-topo"><span class="guia-icone ${g.cor}">${g.icone}</span><span class="tag">${g.nivel}</span></div><h3>${g.titulo}</h3><p>${g.resumo}</p><div class="guia-meta"><span>◷ ${g.tempo}</span><span>◎ ${quantidade} questões</span></div><button class="botao-primario" data-abrir-guia="${g.id}">Estudar agora</button></article>`;
  }).join(""):'<div class="vazio"><div>⌕</div><h2>Nenhum guia encontrado</h2><p>Tente outra matéria ou palavra.</p></div>';
}

function abrirGuia(id) {
  const g=guias.find(item=>item.id===id);
  if(!g)return;
  document.getElementById("conteudo-guia").innerHTML=`<article class="guia-conteudo"><span class="tag">${g.materia} · ${g.tempo}</span><h1>${g.titulo}</h1><p class="resumo-destaque">${g.resumo}</p><h2>O que você precisa saber</h2><ul>${g.pontos.map(p=>`<li>${p}</li>`).join("")}</ul><div class="formula">${g.formula}</div><h2>Estratégia de resolução</h2><ol class="passos-guia">${g.passos.map(p=>`<li>${p}</li>`).join("")}</ol><h2>Exemplo resolvido</h2><p>${g.exemplo}</p><button class="botao-primario" data-praticar-materia="${g.materia}">Praticar ${g.materia}</button></article>`;
  document.getElementById("modal-guia").showModal();
}

document.addEventListener("click",evento=>{
  const abrir=evento.target.closest("[data-abrir-guia]");
  if(abrir)abrirGuia(abrir.dataset.abrirGuia);
  const praticar=evento.target.closest("[data-praticar-materia]");
  if(praticar){
    materiaAtual=praticar.dataset.praticarMateria; indiceQuestao=0;
    document.getElementById("modal-guia").close();
    renderizarFiltros(); renderizarQuestao(); abrirPagina("questoes");
  }
});
document.getElementById("busca-guia").addEventListener("input",renderizarGuias);
document.getElementById("filtro-guia-materia").addEventListener("change",renderizarGuias);
document.getElementById("fechar-guia").addEventListener("click",()=>document.getElementById("modal-guia").close());
document.getElementById("modal-guia").addEventListener("click",evento=>{ if(evento.target===evento.currentTarget)evento.currentTarget.close(); });
document.getElementById("fechar-imagem").addEventListener("click",()=>document.getElementById("modal-imagem").close());
document.getElementById("modal-imagem").addEventListener("click",evento=>{ if(evento.target===evento.currentTarget)evento.currentTarget.close(); });

/* ---------- 8. FILTROS DA ÁREA DE QUESTÕES ---------- */
let materias=[];

/* Recria matérias e vestibulares sempre que o Firestore muda.
   Dessa forma, um novo cadastro aparece nos filtros sem editar HTML. */
function atualizarCatalogos() {
  materias=["Todas",...new Set(questoes.map(q=>q.materia).filter(Boolean))];
  const vestibulares=[...new Set(questoes.map(q=>q.vestibular).filter(Boolean))];
  const areas=[...new Set(questoes.map(q=>q.area).filter(Boolean))];
  document.getElementById("filtro-vestibular").innerHTML='<option value="Todos">Todos os vestibulares</option>'+vestibulares.map(v=>`<option>${v}</option>`).join("");
  document.getElementById("filtro-area").innerHTML='<option value="Todas">Todas as áreas</option>'+areas.map(v=>`<option>${v}</option>`).join("");
  atualizarFiltroConteudos();
  document.getElementById("total-questoes-hero").textContent=questoes.length;
}

/* Mantém a lista de conteúdos coerente com a matéria selecionada. */
function atualizarFiltroConteudos() {
  const campo=document.getElementById("filtro-conteudo");
  const valorAnterior=campo.value;
  const base=materiaAtual==="Todas"?questoes:questoes.filter(q=>q.materia===materiaAtual);
  const conteudos=[...new Set(base.map(q=>q.conteudo||q.tema).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  campo.innerHTML='<option value="Todos">Todos os conteúdos</option>'+conteudos.map(v=>`<option>${escaparHTML(v)}</option>`).join("");
  campo.value=conteudos.includes(valorAnterior)?valorAnterior:"Todos";
}

function renderizarFiltros() {
  document.getElementById("filtros-materias").innerHTML=materias.map(m=>`<button class="${m===materiaAtual?"active":""}" data-materia="${m}">${m}</button>`).join("");
  document.querySelectorAll("[data-materia]").forEach(botao=>botao.addEventListener("click",()=>{
    materiaAtual=botao.dataset.materia; indiceQuestao=0; atualizarFiltroConteudos(); renderizarFiltros(); renderizarQuestao();
  }));
}

function questoesFiltradas() {
  const busca=document.getElementById("busca-questao").value.trim().toLowerCase();
  const vestibular=document.getElementById("filtro-vestibular").value;
  const area=document.getElementById("filtro-area").value;
  const conteudo=document.getElementById("filtro-conteudo").value;
  const nivel=document.getElementById("filtro-nivel").value;
  const complexidade=document.getElementById("filtro-complexidade").value;
  const visual=document.getElementById("filtro-visual").value;
  const modo=document.getElementById("filtro-modo").value;
  let lista=questoes.filter(q=>{
    const resposta=estado.respostas[q.id];
    const atendeModo=modo==="todas"||(modo==="erros"&&resposta&&!resposta.correta)||(modo==="favoritas"&&estado.favoritos.includes(q.id))||(modo==="naoRespondidas"&&!resposta);
    const temVisual=Boolean(q.requerImagem||q.imagemPagina||q.imagem);
    const atendeVisual=visual==="todas"||(visual==="visuais"&&temVisual)||(visual==="texto"&&!temVisual);
    const texto=`${q.vestibular} ${q.ano} ${q.area||""} ${q.materia} ${q.tema} ${q.pergunta}`.toLowerCase();
    return (materiaAtual==="Todas"||q.materia===materiaAtual)&&(vestibular==="Todos"||q.vestibular===vestibular)&&(area==="Todas"||q.area===area)&&(conteudo==="Todos"||(q.conteudo||q.tema)===conteudo)&&(nivel==="Todos"||q.nivel===nivel)&&(complexidade==="Todos"||Number(q.complexidade)===Number(complexidade))&&atendeVisual&&atendeModo&&(!busca||texto.includes(busca));
  });
  if(ordemAleatoria.length)lista.sort((a,b)=>ordemAleatoria.indexOf(a.id)-ordemAleatoria.indexOf(b.id));
  return lista;
}

/* ---------- 9. CARTÃO INTERATIVO DA QUESTÃO ---------- */
function htmlImagemQuestao(q) {
  const caminho=q.imagemPagina||q.imagem;
  if(!caminho)return "";
  const src=escaparHTML(caminho);
  if(q.requerImagem||q.alternativasEmImagem){
    return `<figure class="questao-imagem"><div class="questao-imagem-topo"><span><b>Imagem necessária</b><small>Consulte a página original para resolver</small></span><button class="botao-texto" type="button" data-ampliar-imagem="${src}">Ampliar ↗</button></div><img src="${src}" alt="Página original da questão ${escaparHTML(q.numero)}" loading="lazy"><figcaption>Se o recorte incluir mais de uma questão, use o número indicado no topo do cartão.</figcaption><p class="imagem-erro" hidden>Não foi possível carregar esta imagem. Verifique se a pasta <code>imagens</code> foi publicada junto com o site.</p></figure>`;
  }
  return `<button class="consultar-original" type="button" data-ampliar-imagem="${src}"><span>▧</span><span><strong>Consultar página original</strong><small>Abra a figura ou o texto completo da prova</small></span><b>↗</b></button>`;
}

function abrirImagemQuestao(caminho,titulo) {
  const modal=document.getElementById("modal-imagem");
  document.getElementById("imagem-ampliada").src=caminho;
  document.getElementById("titulo-imagem").textContent=titulo||"Figura da questão";
  modal.showModal();
}

function renderizarQuestao() {
  const lista=questoesFiltradas();
  const card=document.getElementById("card-questao");
  if(!lista.length){
    document.getElementById("contador-questoes").textContent="0 de 0";
    document.getElementById("barra-questoes").style.width="0";
    card.innerHTML='<div class="vazio"><div>⌕</div><h2>Nenhuma questão neste filtro</h2><p>Troque os filtros ou responda novas questões primeiro.</p></div>';
    return;
  }
  if(indiceQuestao>=lista.length)indiceQuestao=0;
  if(indiceQuestao<0)indiceQuestao=lista.length-1;
  const q=lista[indiceQuestao];
  const registro=estado.respostas[q.id];
  const selecionada=registro?registro.selecionada:null;
  const revelada=Boolean(registro);
  const favorita=estado.favoritos.includes(q.id);
  const dicaAberta=dicasAbertas.has(q.id);

  const opcoes=q.opcoes.map((texto,i)=>{
    let classe="opcao";
    if(!revelada&&i===selecionada)classe+=" selecionada";
    if(revelada&&i===q.resposta)classe+=" correta";
    if(revelada&&i===selecionada&&i!==q.resposta)classe+=" errada";
    const simbolo=revelada&&i===q.resposta?'<span class="resultado">✓</span>':revelada&&i===selecionada?'<span class="resultado">×</span>':"";
    return `<button class="${classe}" data-alternativa="${i}" ${revelada?"disabled":""}><b>${String.fromCharCode(65+i)}</b><span>${escaparHTML(texto)}</span>${simbolo}</button>`;
  }).join("");

  card.innerHTML=`
    <div class="questao-topo"><span class="tag">${escaparHTML(q.vestibular)} ${q.ano} · Q${String(q.numero).padStart(2,"0")}</span><span class="tag area-tag">${escaparHTML(q.area||"Área geral")}</span><span class="tag materia-tag">${escaparHTML(q.materia)}</span><span class="tag">${escaparHTML(q.conteudo||q.tema)}</span><span class="tag nivel">${escaparHTML(q.nivel)}</span><span class="tag">Complexidade ${q.complexidade||3}/5</span><button class="favoritar ${favorita?"ativo":""}" id="favoritar" title="Favoritar questão" aria-label="Favoritar questão">${favorita?"★":"☆"}</button></div>
    <h2>${escaparHTML(q.pergunta)}</h2>
    ${htmlImagemQuestao(q)}
    ${q.alternativasEmImagem?'<div class="alerta-alternativas"><b>As alternativas estão na imagem.</b> Use as letras abaixo para marcar sua resposta.</div>':""}
    <div class="opcoes">${opcoes}</div>
    ${dicaAberta?`<div class="caixa-dica"><h3>💡 Dica facilitadora</h3><p>${escaparHTML(q.dica)}</p></div>`:""}
    ${revelada?`<div class="resolucao"><h3>${registro.correta?"✓ Muito bem!":"↗ Vamos aprender com essa questão"}</h3><ol>${q.resolucao.map(p=>`<li>${escaparHTML(p)}</li>`).join("")}</ol><div class="resposta-final">${escaparHTML(q.explicacao)}</div><div class="recomendacao-questao"><strong>Próximo estudo recomendado</strong><p>${escaparHTML(q.recomendacao||`Revise ${q.tema} e tente uma questão semelhante.`)}</p></div></div>`:""}
    <div class="acoes-questao"><button class="botao-secundario" id="mostrar-dica">${dicaAberta?"Ocultar dica":"💡 Ver dica"}</button>${!revelada?'<button class="botao-primario" id="conferir" disabled>Conferir resposta</button>':""}<div class="navegacao"><button class="botao-secundario" id="anterior">← Anterior</button><button class="botao-secundario" id="proxima">Próxima →</button></div></div>
    <small class="fonte-questao">Fonte: ${escaparHTML(q.fonte)}. O texto pode ter sido condensado para estudo; consulte a página original quando disponível.</small>`;

  document.getElementById("contador-questoes").textContent=`${indiceQuestao+1} de ${lista.length}`;
  document.getElementById("barra-questoes").style.width=`${((indiceQuestao+1)/lista.length)*100}%`;

  // Antes de revelar, um clique apenas seleciona a opção.
  card.querySelectorAll("[data-alternativa]").forEach(botao=>botao.addEventListener("click",()=>{
    card.querySelectorAll(".opcao").forEach(o=>{o.classList.remove("selecionada");delete o.dataset.escolhida;});
    botao.classList.add("selecionada");
    botao.dataset.escolhida="true";
    document.getElementById("conferir").disabled=false;
  }));

  const conferir=document.getElementById("conferir");
  if(conferir)conferir.addEventListener("click",()=>{
    const escolha=card.querySelector("[data-escolhida='true']");
    if(!escolha)return;
    const indice=Number(escolha.dataset.alternativa);
    const correta=indice===q.resposta;
    estado.respostas[q.id]={selecionada:indice,correta,respondidaEm:new Date().toISOString()};
    if(correta){estado.sequencia+=1;estado.melhorSequencia=Math.max(estado.melhorSequencia,estado.sequencia);}
    else estado.sequencia=0;
    salvarEstado(); renderizarQuestao(); atualizarResumo();
  });

  document.getElementById("mostrar-dica").addEventListener("click",()=>{
    dicasAbertas.has(q.id)?dicasAbertas.delete(q.id):dicasAbertas.add(q.id);
    renderizarQuestao();
  });
  document.getElementById("favoritar").addEventListener("click",()=>{
    estado.favoritos=estado.favoritos.includes(q.id)?estado.favoritos.filter(id=>id!==q.id):[...estado.favoritos,q.id];
    salvarEstado(); renderizarQuestao(); atualizarResumo();
  });
  document.getElementById("anterior").addEventListener("click",()=>{indiceQuestao-=1;renderizarQuestao();});
  document.getElementById("proxima").addEventListener("click",()=>{indiceQuestao+=1;renderizarQuestao();});
  card.querySelectorAll("[data-ampliar-imagem]").forEach(botao=>botao.addEventListener("click",()=>abrirImagemQuestao(botao.dataset.ampliarImagem,`${q.vestibular} ${q.ano} · questão ${q.numero}`)));
  card.querySelectorAll(".questao-imagem img").forEach(imagem=>imagem.addEventListener("error",()=>{imagem.hidden=true;const aviso=imagem.parentElement.querySelector(".imagem-erro");if(aviso)aviso.hidden=false;}));
}

["busca-questao","filtro-vestibular","filtro-area","filtro-conteudo","filtro-nivel","filtro-complexidade","filtro-visual","filtro-modo"].forEach(id=>{
  const evento=id==="busca-questao"?"input":"change";
  document.getElementById(id).addEventListener(evento,()=>{indiceQuestao=0;ordemAleatoria=[];renderizarQuestao();});
});

document.getElementById("embaralhar").addEventListener("click",()=>{
  ordemAleatoria=questoes.map(q=>q.id).sort(()=>Math.random()-.5);
  indiceQuestao=0; renderizarQuestao();
});

/* ---------- 10. RESUMO E DESEMPENHO ---------- */
function obterEstatisticas() {
  const registros=Object.values(estado.respostas);
  const respondidas=registros.length;
  const acertos=registros.filter(r=>r.correta).length;
  const percentual=respondidas?Math.round(acertos/respondidas*100):0;
  return {respondidas,acertos,percentual,erros:respondidas-acertos};
}

function atualizarResumo() {
  const s=obterEstatisticas();
  const conclusao=Math.round(s.respondidas/questoes.length*100);
  document.getElementById("percentual-hero").textContent=`${conclusao}%`;
  document.getElementById("anel-progresso").style.setProperty("--progresso",`${conclusao*3.6}deg`);
  document.getElementById("acertos-hero").textContent=s.acertos;
  document.getElementById("sequencia-hero").textContent=estado.sequencia;
  document.getElementById("favoritos-hero").textContent=estado.favoritos.length;
}

function renderizarDesempenho() {
  const s=obterEstatisticas();
  document.getElementById("cards-desempenho").innerHTML=[
    ["Questões respondidas",s.respondidas,`de ${questoes.length} disponíveis`],
    ["Taxa de acertos",`${s.percentual}%`,`${s.acertos} acertos e ${s.erros} erros`],
    ["Melhor sequência",estado.melhorSequencia,"acertos consecutivos"],
    ["Favoritas",estado.favoritos.length,"salvas para revisar"]
  ].map(([titulo,valor,detalhe])=>`<article class="metrica"><small>${titulo}</small><strong>${valor}</strong><small>${detalhe}</small></article>`).join("");

  const dados=materias.map(materia=>{
    if(materia==="Todas")return null;
    const qs=questoes.filter(q=>q.materia===materia&&estado.respostas[q.id]);
    const acertos=qs.filter(q=>estado.respostas[q.id].correta).length;
    const taxa=qs.length?Math.round(acertos/qs.length*100):0;
    return {materia,respondidas:qs.length,taxa};
  }).filter(Boolean);
  document.getElementById("desempenho-materias").innerHTML=dados.map(d=>`<div class="linha-materia"><strong>${d.materia}</strong><div class="barra-materia"><span style="width:${d.taxa}%"></span></div><small>${d.respondidas?`${d.taxa}%`:"—"}</small></div>`).join("");

  const praticadas=dados.filter(d=>d.respondidas);
  const pontoFraco=praticadas.sort((a,b)=>a.taxa-b.taxa)[0];
  document.getElementById("recomendacao-estudo").innerHTML=pontoFraco
    ?`<h2>Revise ${pontoFraco.materia}</h2><p>Sua taxa atual nessa matéria é ${pontoFraco.taxa}%. Abra “Revisar erros” na área de questões e compare seus raciocínios com as resoluções.</p>`
    :'<h2>Faça sua primeira questão</h2><p>Depois de responder, esta área identifica a matéria que merece mais atenção.</p>';
}

document.getElementById("limpar-progresso").addEventListener("click",()=>{
  if(confirm("Deseja apagar respostas, sequência e favoritas deste navegador?")){
    estado={...estadoPadrao,respostas:{},favoritos:[]}; salvarEstado();
    indiceQuestao=0; renderizarQuestao(); renderizarDesempenho(); atualizarResumo();
  }
});

/* ---------- 11. INTEGRAÇÃO COM FIREBASE ----------
   A versão Compat do SDK foi escolhida porque roda por tags <script>.
   Não exige npm, compilação ou Node.js no computador da escola. */
const bancoFirebase = window.ROTA_FIREBASE_ATIVO ? firebase.firestore() : null;
const autenticacaoFirebase = window.ROTA_FIREBASE_ATIVO ? firebase.auth() : null;
// Cloud Functions da região de São Paulo. Elas preservam e-mail/senha no Firebase Auth.
const funcoesFirebase = window.ROTA_FIREBASE_ATIVO && firebase.functions
  ? firebase.app().functions("southamerica-east1") : null;
async function chamarFuncaoConta(nome, dados) {
  if(!funcoesFirebase)throw new Error("O serviço de login por nickname não está disponível. Publique as Cloud Functions descritas no guia CONFIGURAR_LOGIN_NICKNAME.txt.");
  try { return (await funcoesFirebase.httpsCallable(nome)(dados)).data; }
  catch(erro) {
    if(erro.code === "functions/not-found" || erro.code === "functions/unavailable")
      throw new Error("Login por nickname ainda não ativado no Firebase. Publique as Cloud Functions incluídas no ZIP.");
    throw erro;
  }
}
let loginLegadoEmail = false;
let questoesAdmin = [];

/* ---------- 11.1. CONTA E HISTÓRICO DO ESTUDANTE ---------- */
function validarNickname(valor) {
  const nickname=String(valor||"").trim();
  if(!/^[A-Za-z0-9_.]{3,20}$/.test(nickname)) {
    throw new Error("O nickname deve ter de 3 a 20 caracteres: letras, números, ponto ou underline, sem espaços.");
  }
  return nickname;
}
function nomeExibicaoUsuario() {
  return nicknameAtual || usuarioAtual?.displayName || usuarioAtual?.email?.split("@")[0] || "Estudante";
}

function textoErroAutenticacao(erro) {
  const codigo=erro?.code||"";
  const mensagens={
    "auth/invalid-credential":"Credenciais incorretas. Confira o nickname e a senha, ou utilize a recuperação de senha.",
    "auth/user-not-found":"Conta não encontrada. Confira seus dados ou crie sua conta.",
    "auth/wrong-password":"Senha incorreta. Tente novamente ou use “Esqueci minha senha”.",
    "auth/email-already-in-use":"Este e-mail já possui uma conta. Use a aba Entrar ou recupere sua senha.",
    "auth/weak-password":"Escolha uma senha com pelo menos 6 caracteres.",
    "auth/invalid-email":"Digite um endereço de e-mail válido.",
    "auth/operation-not-allowed":"Este tipo de login ainda não foi habilitado no Firebase Authentication.",
    "auth/unauthorized-domain":"Este endereço do site precisa ser adicionado aos domínios autorizados do Firebase Authentication.",
    "auth/popup-blocked":"O navegador bloqueou a janela do Google. Libere pop-ups e tente novamente.",
    "auth/popup-closed-by-user":"A janela de login foi fechada antes da conclusão.",
    "auth/too-many-requests":"Muitas tentativas em pouco tempo. Aguarde alguns minutos ou redefina sua senha.",
    "auth/network-request-failed":"Falha de conexão. Confira a internet e tente novamente.",
    "functions/unauthenticated":"Nickname ou senha incorretos.",
    "functions/permission-denied":"Essa conta não pode entrar pela área de estudantes. Use o acesso administrativo.",
    "functions/already-exists":"Este nickname já está em uso. Escolha outro.",
    "functions/invalid-argument":"Nickname inválido. Use de 3 a 20 caracteres, sem espaços.",
    "functions/resource-exhausted":"Muitas tentativas. Aguarde e tente novamente.",
    "functions/deadline-exceeded":"O login demorou demais. Tente novamente."
  };
  return mensagens[codigo]||erro?.message||"Não foi possível concluir o acesso. Tente novamente.";
}

function mensagemConta(texto,tipo="") {
  const area=document.getElementById("conta-mensagem");
  area.textContent=texto;
  area.className=`mensagem-conta ${tipo}`.trim();
}

function agendarSincronizacaoEstado() {
  if(!usuarioAtual||!bancoFirebase)return;
  clearTimeout(temporizadorSincronizacao);
  const status=document.getElementById("status-sincronizacao");
  if(status)status.textContent="Salvando progresso…";
  temporizadorSincronizacao=setTimeout(sincronizarEstadoAgora,650);
}

async function sincronizarEstadoAgora() {
  if(!usuarioAtual||!bancoFirebase)return;
  try {
    await bancoFirebase.collection("usuarios").doc(usuarioAtual.uid).set({
      nome:nomeRealAtual||usuarioAtual.displayName||usuarioAtual.email?.split("@")[0]||"Estudante",
      email:usuarioAtual.email||"",
      avatar:avatarSelecionado,
      progresso:{
        respostas:estado.respostas,
        favoritos:estado.favoritos,
        sequencia:estado.sequencia,
        melhorSequencia:estado.melhorSequencia
      },
      atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true});
    const status=document.getElementById("status-sincronizacao");
    if(status)status.textContent="✓ Progresso sincronizado";
  } catch(erro) {
    console.warn("Falha ao sincronizar progresso",erro);
    const status=document.getElementById("status-sincronizacao");
    if(status)status.textContent="Progresso salvo neste aparelho; sincronização pendente";
  }
}

function mesclarRespostas(local,remotas) {
  const resultado={...(remotas||{})};
  Object.entries(local||{}).forEach(([id,respostaLocal])=>{
    const respostaRemota=resultado[id];
    const dataLocal=Date.parse(respostaLocal?.respondidaEm||0)||0;
    const dataRemota=Date.parse(respostaRemota?.respondidaEm||0)||0;
    if(!respostaRemota||dataLocal>=dataRemota)resultado[id]=respostaLocal;
  });
  return resultado;
}

async function carregarEstadoNuvem(usuario) {
  if(!bancoFirebase)return;
  carregandoProgressoNuvem=true;
  try {
    const documento=await bancoFirebase.collection("usuarios").doc(usuario.uid).get();
    if(documento.exists){
      const dadosPerfil=documento.data();
      // Conserva apelidos já salvos e mantém compatibilidade com contas antigas.
      if(!nicknamePendenteCadastro)nicknameAtual=dadosPerfil.nickname||usuario.displayName||usuario.email?.split("@")[0]||"Estudante";
      if(!nomePendenteCadastro)nomeRealAtual=dadosPerfil.nome||usuario.displayName||"";
      if(avatarValido(dadosPerfil.avatar)){
        avatarSelecionado=dadosPerfil.avatar;
        salvarAvatarLocal(usuario.uid,avatarSelecionado);
        desenharAvatares();
      }
      const remoto=dadosPerfil.progresso||{};
      estado={
        respostas:mesclarRespostas(estado.respostas,remoto.respostas),
        favoritos:[...new Set([...(remoto.favoritos||[]),...estado.favoritos])],
        sequencia:Math.max(Number(estado.sequencia)||0,Number(remoto.sequencia)||0),
        melhorSequencia:Math.max(Number(estado.melhorSequencia)||0,Number(remoto.melhorSequencia)||0)
      };
      try { localStorage.setItem(CHAVE_STORAGE,JSON.stringify(estado)); } catch(erro) { /* O site continua em memória. */ }
    }
  } catch(erro) {
    console.warn("Não foi possível carregar o histórico da conta",erro);
  } finally {
    carregandoProgressoNuvem=false;
  }
  atualizarResumo();
  renderizarQuestao();
  renderizarDesempenho();
  renderizarConta();
  await sincronizarEstadoAgora();
}

function questaoPorId(id) {
  return questoes.find(q=>String(q.id)===String(id));
}

function abrirQuestaoPorId(id) {
  const q=questaoPorId(id);
  if(!q)return;
  materiaAtual=q.materia;
  document.getElementById("busca-questao").value="";
  ["filtro-vestibular","filtro-area","filtro-conteudo","filtro-nivel","filtro-complexidade"].forEach(campo=>document.getElementById(campo).value=campo==="filtro-area"?"Todas":"Todos");
  document.getElementById("filtro-visual").value="todas";
  document.getElementById("filtro-modo").value="todas";
  atualizarFiltroConteudos();
  renderizarFiltros();
  indiceQuestao=Math.max(0,questoesFiltradas().findIndex(item=>String(item.id)===String(id)));
  renderizarQuestao();
  abrirPagina("questoes");
}

function abrirModoRevisao(modo) {
  materiaAtual="Todas";
  document.getElementById("filtro-modo").value=modo;
  document.getElementById("busca-questao").value="";
  atualizarFiltroConteudos(); renderizarFiltros();
  indiceQuestao=0; renderizarQuestao(); abrirPagina("questoes");
}

/* ---------- AVATARES EM SILHUETA DE BUSTO ----------
   SVG vetorial local: sem uploads, sem fotos pessoais.
   Escolha salva por usuário no Firestore, além do armazenamento local.
*/
const AVATARES=[
  {id:"aurora",nome:"Aurora",fundo:"#c4b5fd",roupa:"#6632bb",silhueta:"#332056",cabelo:0},
  {id:"safira",nome:"Safira",fundo:"#a5b4fc",roupa:"#3d398f",silhueta:"#21184b",cabelo:1},
  {id:"luna",nome:"Luna",fundo:"#fbcfe8",roupa:"#af4383",silhueta:"#512148",cabelo:2},
  {id:"sol",nome:"Sol",fundo:"#f9d8ac",roupa:"#945e3b",silhueta:"#49304f",cabelo:3},
  {id:"iris",nome:"Íris",fundo:"#c7d2fe",roupa:"#5c54bc",silhueta:"#32235f",cabelo:4},
  {id:"astro",nome:"Astro",fundo:"#bde9e2",roupa:"#287e82",silhueta:"#1e4459",cabelo:5},
  {id:"violeta",nome:"Violeta",fundo:"#ddd6fe",roupa:"#9157cc",silhueta:"#3a2359",cabelo:6},
  {id:"horizonte",nome:"Horizonte",fundo:"#fecdd3",roupa:"#ab516d",silhueta:"#4a2546",cabelo:7}
];
const CHAVE_AVATAR="rotaAprovacaoAvatarV6";
const DEFAULT_AVATAR="aurora";
function avatarValido(id){return AVATARES.some(a=>a.id===id);}
function lerAvatarLocal(chave="visitante"){
  try{const id=localStorage.getItem(`${CHAVE_AVATAR}-${chave}`);return avatarValido(id)?id:null;}catch(erro){return null;}
}
function salvarAvatarLocal(chave,id){try{localStorage.setItem(`${CHAVE_AVATAR}-${chave}`,id);}catch(erro){/* armazenamento opcional */}}
let avatarSelecionado=lerAvatarLocal()||DEFAULT_AVATAR;
let avatarEmEdicao=avatarSelecionado;
function avatarSVG(id){
  const av=AVATARES.find(a=>a.id===id)||AVATARES[0];
  const hairstyles=[
    '<path d="M49 77C39 33 71 22 92 30c37-10 52 19 38 54-5-14-12-28-21-32-18 9-35 12-60 25Z"/>',
    '<path d="M46 76c-3-41 24-57 48-54 31 0 48 24 39 56-15-12-21-26-31-24-19 8-39 12-56 22Z"/>',
    '<path d="M50 71C39 45 59 24 91 25c35 1 47 23 38 51-3-8-9-15-16-20-22 9-38 9-63 15Z"/><path d="M51 70c-10 30-11 45-1 54l13-7c-7-13-5-27-5-38ZM127 65c10 28 12 44 1 58l-13-8c8-14 5-28 5-36Z"/>',
    '<path d="M47 75c-6-30 13-50 42-49 24-1 45 14 44 48-7-7-12-8-17-10-10 3-21-10-26-16-11 17-28 18-43 27Z"/>',
    '<path d="M48 75c-2-38 15-52 44-52 35 0 49 27 39 55-17-13-30-21-43-21-12 3-28 11-40 18Z"/><path d="M50 54c-10-18-7-31 5-38l15 12ZM118 23c12-13 28-6 26 15l-12 17Z"/>',
    '<path d="M47 72c-2-20 4-47 43-47 37 0 46 24 42 47-14-9-27-20-44-18-14 6-22 13-41 18Z"/><path d="M45 54c-10-2-14-13-8-22l13 5ZM134 58c12-4 16-16 7-24l-11 7Z"/>',
    '<path d="M53 65c-13-16-8-31 7-35 1-17 24-19 33-11 17-9 33 4 32 16 14 5 13 20 8 32-13-9-22-19-36-20-21 1-29 11-44 18Z"/>',
    '<path d="M46 73c-1-34 18-51 44-52 24-1 48 16 44 52-16-5-25-20-44-19-18 0-29 13-44 19Z"/><path d="M50 73c-6 25-3 40 4 50l12-7c-8-17-6-30-4-44ZM128 72c4 19 5 32-3 51l-12-7c10-18 8-30 7-44Z"/>'
  ];
  return `<svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Silhueta ${av.nome}" focusable="false"><defs><clipPath id="clip-avatar-${av.id}"><circle cx="90" cy="90" r="89"/></clipPath></defs><g clip-path="url(#clip-avatar-${av.id})"><rect width="180" height="180" fill="${av.fundo}"/><circle cx="141" cy="38" r="47" fill="#fff" opacity=".24"/><circle cx="29" cy="146" r="55" fill="#fff" opacity=".12"/><path d="M17 182c1-30 19-53 48-60 12-3 13-8 13-16h24c0 8 2 13 15 16 31 8 45 33 48 60Z" fill="${av.roupa}"/><path d="M71 124c7 7 29 10 38 0l-17 19Z" fill="#fff" opacity=".15"/><rect x="77" y="96" width="26" height="29" rx="12" fill="${av.silhueta}"/><ellipse cx="90" cy="73" rx="37" ry="46" fill="${av.silhueta}"/><g fill="${av.silhueta}">${hairstyles[av.cabelo]}</g><path d="M66 151c19 11 32 11 49 0" fill="none" stroke="#fff" stroke-width="3" opacity=".12" stroke-linecap="round"/></g></svg>`;
}
function desenharAvatares(){
  ["avatar-hero-preview","aluno-avatar","avatar-cadastro-preview","avatar-nav"].forEach(id=>{const el=document.getElementById(id);if(el)el.innerHTML=avatarSVG(avatarSelecionado);});
  const selecionado=AVATARES.find(av=>av.id===avatarSelecionado);
  const noPerfil=document.getElementById("aluno-avatar");if(noPerfil)noPerfil.setAttribute("aria-label",`Avatar ${selecionado.nome}`);
}
function desenharGradeAvatar(){
  const area=document.getElementById("grade-avatares");
  area.innerHTML=AVATARES.map(av=>`<button type="button" class="avatar-opcao ${av.id===avatarEmEdicao?"selecionado":""}" role="radio" aria-checked="${av.id===avatarEmEdicao}" data-avatar="${av.id}" aria-label="Selecionar busto ${av.nome}"><span class="avatar-miniatura">${avatarSVG(av.id)}</span><strong>${av.nome}</strong><span class="avatar-check" aria-hidden="true">✓</span></button>`).join("");
  area.querySelectorAll("[data-avatar]").forEach(botao=>botao.addEventListener("click",()=>{avatarEmEdicao=botao.dataset.avatar;desenharGradeAvatar();}));
}
function abrirSeletorAvatar(){
  avatarEmEdicao=avatarSelecionado;
  desenharGradeAvatar();
  document.getElementById("avatar-feedback").textContent=usuarioAtual?"Sua escolha será sincronizada com sua conta.":"Você pode escolher agora e conectar uma conta depois.";
  const modal=document.getElementById("modal-avatar");
  if(typeof modal.showModal==="function")modal.showModal();else modal.setAttribute("open","");
}
["escolher-avatar-hero","escolher-avatar-conta","escolher-avatar-cadastro"].forEach(id=>document.getElementById(id).addEventListener("click",abrirSeletorAvatar));
function fecharSeletorAvatar(){const m=document.getElementById("modal-avatar");if(m.open&&typeof m.close==="function")m.close();else m.removeAttribute("open");}
document.getElementById("fechar-avatar").addEventListener("click",fecharSeletorAvatar);
document.getElementById("modal-avatar").addEventListener("click",evento=>{if(evento.target===evento.currentTarget)fecharSeletorAvatar();});
document.getElementById("salvar-avatar").addEventListener("click",()=>{
 avatarSelecionado=avatarEmEdicao;
 salvarAvatarLocal(usuarioAtual?.uid||"visitante",avatarSelecionado);
 if(!usuarioAtual)salvarAvatarLocal("visitante",avatarSelecionado);
 desenharAvatares();
 if(usuarioAtual)agendarSincronizacaoEstado();
 fecharSeletorAvatar();
});
desenharAvatares();

function renderizarConta() {
  const desconectada=document.getElementById("conta-desconectada");
  const conectada=document.getElementById("conta-conectada");
  const navTexto=document.getElementById("nav-conta-texto");
  const aviso=document.getElementById("aviso-sincronizacao");
  if(!usuarioAtual){
    desconectada.hidden=false; conectada.hidden=true; navTexto.textContent="Entrar";
    aviso.classList.remove("sincronizado");
    aviso.innerHTML='<span>☁</span><p><strong>Seu progresso está neste aparelho.</strong> <button class="link-inline" data-page="conta">Entre ou crie uma conta</button> para continuar de qualquer dispositivo.</p>';
    aviso.querySelector("[data-page]").addEventListener("click",()=>abrirPagina("conta"));
    return;
  }
  desconectada.hidden=true; conectada.hidden=false;
  const nickname=nomeExibicaoUsuario();
  navTexto.textContent=`@${nickname.split(" ")[0]}`;
  document.getElementById("aluno-nome").textContent=`@${nickname}`;
  document.getElementById("aluno-nome-real").textContent=nomeRealAtual||"";
  const emailImportado=String(usuarioAtual.email||"").toLowerCase().endsWith("@contas-rota.invalid");
  document.getElementById("aluno-email").textContent=emailImportado?"E-mail de recuperação pendente":(usuarioAtual.email||"Conta conectada");
  document.getElementById("email-provisorio-aviso").hidden=!emailImportado;
  desenharAvatares();
  aviso.classList.add("sincronizado");
  aviso.innerHTML='<span>✓</span><p><strong>Progresso sincronizado.</strong> Suas respostas e favoritas acompanham sua conta.</p>';
  const s=obterEstatisticas();
  document.getElementById("cards-conta").innerHTML=[
    ["Respondidas",s.respondidas,`${s.acertos} acertos`],
    ["Aproveitamento",`${s.percentual}%`,`${s.erros} para revisar`],
    ["Melhor sequência",estado.melhorSequencia,"acertos seguidos"],
    ["Favoritas",estado.favoritos.length,"salvas na conta"]
  ].map(([titulo,valor,detalhe])=>`<article class="metrica"><small>${titulo}</small><strong>${valor}</strong><small>${detalhe}</small></article>`).join("");
  const historico=Object.entries(estado.respostas).map(([id,resposta])=>({q:questaoPorId(id),resposta,id})).filter(item=>item.q)
    .sort((a,b)=>(Date.parse(b.resposta.respondidaEm||0)||0)-(Date.parse(a.resposta.respondidaEm||0)||0)).slice(0,12);
  document.getElementById("historico-conta").innerHTML=historico.length?historico.map(({q,resposta,id})=>{
    const data=resposta.respondidaEm?new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}).format(new Date(resposta.respondidaEm)):"Anteriormente";
    return `<button class="historico-item" type="button" data-historico-id="${escaparHTML(id)}"><span class="historico-status ${resposta.correta?"acerto":"erro"}">${resposta.correta?"✓":"×"}</span><span><strong>${escaparHTML(q.materia)} · ${escaparHTML(q.tema)}</strong><small>${escaparHTML(q.vestibular)} ${q.ano} · questão ${q.numero} · ${data}</small></span><b>›</b></button>`;
  }).join(""):'<div class="vazio compacto"><div>◎</div><h3>Seu histórico começa aqui</h3><p>Resolva uma questão e volte para acompanhar sua evolução.</p></div>';
  document.querySelectorAll("[data-historico-id]").forEach(botao=>botao.addEventListener("click",()=>abrirQuestaoPorId(botao.dataset.historicoId)));
}

document.querySelectorAll("[data-auth-tab]").forEach(botao=>botao.addEventListener("click",()=>{
  document.querySelectorAll("[data-auth-tab]").forEach(item=>item.classList.toggle("active",item===botao));
  const cadastro=botao.dataset.authTab==="cadastro";
  document.getElementById("form-login-aluno").hidden=cadastro;
  document.getElementById("form-cadastro-aluno").hidden=!cadastro;
  mensagemConta("");
}));

// O aluno entra com nickname; e-mail só para migração de contas antigas e recuperação.
document.getElementById("alternar-login-antigo").addEventListener("click",()=>{
  loginLegadoEmail=!loginLegadoEmail;
  const rotulo=document.getElementById("aluno-login-rotulo");
  const campo=document.getElementById("aluno-login-nickname");
  rotulo.firstChild.textContent=loginLegadoEmail?"E-mail":"Nickname";
  campo.type=loginLegadoEmail?"email":"text";
  campo.placeholder=loginLegadoEmail?"seu@email.com":"Seu nickname";
  campo.value="";
  document.getElementById("alternar-login-antigo").textContent=loginLegadoEmail
    ?"Voltar ao login por nickname":"Tenho conta antiga: entrar com e-mail";
  mensagemConta(loginLegadoEmail?"Use seu e-mail uma vez. Depois, confirme o nickname no perfil para acessar com ele.":"Digite seu nickname e sua senha.","info");
  campo.focus();
});

document.getElementById("form-login-aluno").addEventListener("submit",async evento=>{
  evento.preventDefault(); mensagemConta("Entrando…","info");
  const login=document.getElementById("aluno-login-nickname").value.trim();
  const senha=document.getElementById("aluno-login-senha").value;
  try {
    if(!autenticacaoFirebase)throw {code:"auth/operation-not-allowed"};
    if(loginLegadoEmail){
      await autenticacaoFirebase.signInWithEmailAndPassword(login,senha);
    } else {
      const nickname=validarNickname(login.replace(/^@/,""));
      const resposta=await chamarFuncaoConta("loginComNickname",{nickname,senha});
      if(!resposta?.token)throw new Error("A autenticação não retornou um token válido.");
      await autenticacaoFirebase.signInWithCustomToken(resposta.token);
    }
    mensagemConta("Conta conectada. Seu histórico está sendo sincronizado.","sucesso");
  } catch(erro) { mensagemConta(textoErroAutenticacao(erro),"erro"); }
});

document.getElementById("form-cadastro-aluno").addEventListener("submit",async evento=>{
  evento.preventDefault();
  const nome=document.getElementById("aluno-cadastro-nome").value.trim();
  let nickname;
  try { nickname=validarNickname(document.getElementById("aluno-cadastro-nickname").value); }
  catch(erro) { return mensagemConta(erro.message,"erro"); }
  const email=document.getElementById("aluno-cadastro-email").value.trim();
  const senha=document.getElementById("aluno-cadastro-senha").value;
  const confirmacao=document.getElementById("aluno-cadastro-confirmar").value;
  if(senha!==confirmacao)return mensagemConta("As duas senhas precisam ser iguais.","erro");
  mensagemConta("Criando sua conta…","info");
  try {
    if(!autenticacaoFirebase)throw {code:"auth/operation-not-allowed"};
    const disponibilidade=await chamarFuncaoConta("verificarNickname",{nickname});
    if(!disponibilidade?.disponivel)throw {code:"functions/already-exists"};
    const avatarCadastro=avatarSelecionado;
    // onAuthStateChanged pode disparar antes de o cadastro terminar.
    nicknamePendenteCadastro=nickname;
    nomePendenteCadastro=nome;
    const credencial=await autenticacaoFirebase.createUserWithEmailAndPassword(email,senha);
    // Reserva no servidor de forma atômica: dois alunos não podem ter o mesmo nickname.
    try { await chamarFuncaoConta("reservarNickname",{nickname}); }
    catch(erro) {
      // A conta do Firebase já existe. Não a excluímos e não apagamos seu histórico.
      mensagemConta("Sua conta foi criada, mas o nickname não pôde ser reservado: "+textoErroAutenticacao(erro)+". Escolha outro em Editar nickname no perfil.","erro");
      nicknamePendenteCadastro=""; nomePendenteCadastro="";
      return;
    }
    await credencial.user.updateProfile({displayName:nickname});
    usuarioAtual=credencial.user;
    nicknameAtual=nickname;
    nomeRealAtual=nome;
    avatarSelecionado=avatarCadastro;
    salvarAvatarLocal(credencial.user.uid,avatarCadastro);
    desenharAvatares();
    await sincronizarEstadoAgora(); renderizarConta();
    mensagemConta("Conta criada! Na próxima vez, entre com seu nickname e sua senha.","sucesso");
    nicknamePendenteCadastro="";
    nomePendenteCadastro="";
  } catch(erro) {
    nicknamePendenteCadastro="";
    nomePendenteCadastro="";
    mensagemConta(textoErroAutenticacao(erro),"erro");
  }
});

// Contas importadas sem e-mail real podem adicionar um endereço verificável
// preservando UID, nickname, senha e histórico. Não é obrigatório para login,
// mas é necessário para recuperação futura da senha.
document.getElementById("form-email-recuperacao").addEventListener("submit",async evento=>{
  evento.preventDefault();
  const aviso=document.getElementById("email-recuperacao-feedback");
  const email=document.getElementById("email-recuperacao-novo").value.trim();
  try {
    if(!usuarioAtual||!String(usuarioAtual.email||"").toLowerCase().endsWith("@contas-rota.invalid"))
      throw new Error("Sua conta já possui um e-mail de recuperação.");
    if(!email||!email.includes("@"))throw new Error("Informe um e-mail válido.");
    if(typeof usuarioAtual.verifyBeforeUpdateEmail!=="function")
      throw new Error("Atualize a página e tente novamente. Seu navegador não possui a função de verificação de e-mail.");
    await usuarioAtual.verifyBeforeUpdateEmail(email);
    aviso.textContent="Enviamos uma confirmação ao novo e-mail. Abra a mensagem e confirme o endereço. Depois, atualize a página.";
  }catch(erro){
    if(erro?.code==="auth/requires-recent-login")aviso.textContent="Por segurança, saia e entre novamente antes de trocar o e-mail.";
    else if(erro?.code==="auth/email-already-in-use")aviso.textContent="Esse e-mail já pertence a outra conta. Use outro endereço.";
    else aviso.textContent=erro?.message||"Não foi possível enviar o e-mail de confirmação.";
  }
});

document.getElementById("editar-nickname").addEventListener("click",()=>{
  const formulario=document.getElementById("form-editar-nickname");
  formulario.hidden=!formulario.hidden;
  document.getElementById("nickname-novo").value=nicknameAtual||"";
  document.getElementById("nickname-mensagem").textContent="";
  if(!formulario.hidden)document.getElementById("nickname-novo").focus();
});
document.getElementById("cancelar-nickname").addEventListener("click",()=>{
  document.getElementById("form-editar-nickname").hidden=true;
});
document.getElementById("form-editar-nickname").addEventListener("submit",async evento=>{
  evento.preventDefault();
  const retorno=document.getElementById("nickname-mensagem");
  try {
    if(!usuarioAtual||!bancoFirebase)throw new Error("Entre em sua conta para alterar o nickname.");
    const novo=validarNickname(document.getElementById("nickname-novo").value);
    retorno.textContent="Salvando...";
    await chamarFuncaoConta("reservarNickname",{nickname:novo});
    await usuarioAtual.updateProfile({displayName:novo});
    nicknameAtual=novo;
    renderizarConta();
    await sincronizarEstadoAgora();
    retorno.textContent="Nickname atualizado!";
    setTimeout(()=>{document.getElementById("form-editar-nickname").hidden=true;},950);
  } catch(erro) { retorno.textContent=textoErroAutenticacao(erro); }
});

document.getElementById("recuperar-senha").addEventListener("click",()=>{
  const area=document.getElementById("recuperar-senha-area");
  area.hidden=!area.hidden;
  if(!area.hidden)document.getElementById("aluno-recuperacao-email").focus();
});
document.getElementById("enviar-recuperacao").addEventListener("click",async()=>{
  const email=document.getElementById("aluno-recuperacao-email").value.trim();
  if(!email)return mensagemConta("Informe o e-mail cadastrado para recuperar a senha.","erro");
  try {
    if(!autenticacaoFirebase)throw {code:"auth/operation-not-allowed"};
    await autenticacaoFirebase.sendPasswordResetEmail(email);
    mensagemConta("Se a conta existir, você receberá um link no e-mail. Confira também o spam.","sucesso");
  } catch(erro) { mensagemConta(textoErroAutenticacao(erro),"erro"); }
});

document.getElementById("login-aluno-google").addEventListener("click",async()=>{
  mensagemConta("Abrindo o Google…","info");
  try {
    if(!autenticacaoFirebase)throw {code:"auth/operation-not-allowed"};
    await autenticacaoFirebase.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  } catch(erro) { mensagemConta(textoErroAutenticacao(erro),"erro"); }
});
document.getElementById("sair-conta").addEventListener("click",()=>autenticacaoFirebase?.signOut());
document.getElementById("abrir-erros-conta").addEventListener("click",()=>abrirModoRevisao("erros"));
document.getElementById("abrir-favoritas-conta").addEventListener("click",()=>abrirModoRevisao("favoritas"));

/* Garante valores válidos mesmo em documentos antigos ou incompletos. */
function normalizarQuestao(dados,id) {
  return {
    ...dados,
    id,
    vestibular:dados.vestibular||"Geral",
    ano:Number(dados.ano)||new Date().getFullYear(),
    numero:Number(dados.numero)||1,
    area:dados.area||window.RotaClassificador.AREAS[dados.materia]||"Conhecimentos Gerais",
    materia:dados.materia||"Geral",
    tema:dados.tema||"Conteúdo geral",
    conteudo:dados.conteudo||dados.tema||"Conteúdo geral",
    nivel:dados.nivel||"Médio",
    dificuldade:dados.dificuldade||dados.nivel||"Médio",
    complexidade:Number(dados.complexidade)||3,
    pergunta:dados.pergunta||"",
    opcoes:Array.isArray(dados.opcoes)?dados.opcoes:[],
    resposta:Number(dados.resposta)||0,
    dica:dados.dica||"Releia o comando e elimine as alternativas incompatíveis.",
    resolucao:Array.isArray(dados.resolucao)?dados.resolucao:["Compare as alternativas com o enunciado."],
    explicacao:dados.explicacao||"",
    recomendacao:dados.recomendacao||`Revise ${dados.tema||"o conteúdo"} antes de avançar.`,
    fonte:dados.fonte||"Banco próprio",
    imagemPagina:dados.imagemPagina||dados.imagem||"",
    requerImagem:dados.requerImagem===true,
    alternativasEmImagem:dados.alternativasEmImagem===true,
    confiancaClassificacao:dados.confiancaClassificacao||"não informada",
    ativo:dados.ativo!==false
  };
}

/* Carrega somente documentos publicados. A cláusula ativo==true
   também é exigida pelas regras de segurança para visitantes. */
async function carregarQuestoesPublicadas() {
  if(!bancoFirebase)return;
  try {
    const consulta=await bancoFirebase.collection("questoes").where("ativo","==",true).get();
    if(!consulta.empty) {
      questoes=consulta.docs.map(doc=>normalizarQuestao(doc.data(),doc.id))
        .sort((a,b)=>a.materia.localeCompare(b.materia)||b.ano-a.ano||a.numero-b.numero);
      materiaAtual="Todas"; indiceQuestao=0; ordemAleatoria=[];
      atualizarCatalogos(); renderizarFiltros(); renderizarQuestao(); atualizarResumo(); renderizarGuias(); renderizarConta();
    }
  } catch(erro) {
    console.warn("Não foi possível ler o Firestore. O conteúdo demonstrativo continuará disponível.",erro);
  }
}

/* ---------- 12. PAINEL ADMINISTRATIVO ---------- */
const avisoFirebase=document.getElementById("firebase-aviso");
const painelAdmin=document.getElementById("admin-painel");
const loginAdmin=document.getElementById("admin-login");
const formQuestao=document.getElementById("form-questao");

/* Monta cinco campos; os quatro primeiros são obrigatórios
   para aceitar provas com quatro ou cinco alternativas. */
document.getElementById("campos-alternativas").innerHTML=["A","B","C","D","E"].map((letra,i)=>
  `<label class="alternativa-admin"><b>${letra}</b><input id="campo-opcao-${i}" ${i<4?"required":""} placeholder="Texto da alternativa ${letra}"></label>`
).join("");

function limparFormularioQuestao() {
  formQuestao.reset();
  document.getElementById("questao-id").value="";
  document.getElementById("titulo-form-questao").textContent="Nova questão";
  document.getElementById("campo-ano").value=new Date().getFullYear();
  document.getElementById("campo-ativo").checked=true;
  document.getElementById("campo-requerImagem").checked=false;
  document.getElementById("form-mensagem").textContent="";
}

/* Lê todos os controles e transforma o formulário em documento Firestore. */
function dadosDoFormulario() {
  const opcoes=[0,1,2,3,4].map(i=>document.getElementById(`campo-opcao-${i}`).value.trim()).filter(Boolean);
  const resposta=Number(document.getElementById("campo-resposta").value);
  if(resposta>=opcoes.length)throw new Error("Preencha a alternativa marcada como correta.");
  return window.RotaClassificador.classificarQuestao({
    vestibular:document.getElementById("campo-vestibular").value.trim(),
    ano:Number(document.getElementById("campo-ano").value),
    numero:Number(document.getElementById("campo-numero").value),
    materia:document.getElementById("campo-materia").value.trim(),
    tema:document.getElementById("campo-tema").value.trim(),
    nivel:document.getElementById("campo-nivel").value,
    complexidade:Number(document.getElementById("campo-complexidade").value),
    pergunta:document.getElementById("campo-pergunta").value.trim(),
    opcoes,
    resposta,
    dica:document.getElementById("campo-dica").value.trim(),
    resolucao:document.getElementById("campo-resolucao").value.split("\n").map(l=>l.trim()).filter(Boolean),
    explicacao:document.getElementById("campo-explicacao").value.trim(),
    recomendacao:document.getElementById("campo-recomendacao").value.trim(),
    fonte:document.getElementById("campo-fonte").value.trim(),
    imagemPagina:document.getElementById("campo-imagemPagina").value.trim(),
    requerImagem:document.getElementById("campo-requerImagem").checked,
    ativo:document.getElementById("campo-ativo").checked,
    atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()
  });
}

function slugMateria(nome) {
  return nome.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

/* Lista também rascunhos, pois esta função só é chamada depois
   que as regras confirmam que o usuário é administrador. */
async function listarQuestoesAdmin() {
  const area=document.getElementById("lista-questoes-admin");
  area.innerHTML='<p class="carregando">Carregando banco...</p>';
  try {
    const consulta=await bancoFirebase.collection("questoes").get();
    questoesAdmin=consulta.docs.map(doc=>normalizarQuestao(doc.data(),doc.id))
      .sort((a,b)=>b.ano-a.ano||a.materia.localeCompare(b.materia)||a.numero-b.numero);
    renderizarListaAdmin();
  } catch(erro) {
    area.innerHTML='<p class="mensagem-erro">Não foi possível carregar. Confira as regras do Firestore.</p>';
  }
}

function escaparHTML(valor) {
  return String(valor).replace(/[&<>"']/g,caractere=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[caractere]));
}

function renderizarListaAdmin() {
  const busca=document.getElementById("busca-admin").value.trim().toLowerCase();
  const filtradas=questoesAdmin.filter(q=>!busca||`${q.materia} ${q.tema} ${q.vestibular} ${q.pergunta}`.toLowerCase().includes(busca));
  document.getElementById("total-admin").textContent=questoesAdmin.length;
  document.getElementById("lista-questoes-admin").innerHTML=filtradas.length?filtradas.map(q=>`
    <article class="item-admin ${q.ativo?"":"rascunho"}">
      <div><span class="tag">${escaparHTML(q.materia)}</span><span class="tag nivel">${escaparHTML(q.nivel)}</span>${q.requerImagem?'<span class="tag visual">▧ imagem</span>':""}${q.confiancaClassificacao==="baixa"?'<span class="tag revisar">revisar</span>':""}<small>${escaparHTML(q.vestibular)} ${q.ano} · Q${q.numero}</small></div>
      <h3>${escaparHTML(q.tema)}</h3><p>${escaparHTML(q.pergunta)}</p>
      <div class="acoes-admin"><button class="botao-texto" data-editar="${q.id}">Editar</button><button class="botao-texto perigo" data-excluir="${q.id}">Excluir</button></div>
    </article>`).join(""):'<p class="carregando">Nenhuma questão encontrada.</p>';
}

function preencherFormulario(q) {
  document.getElementById("questao-id").value=q.id;
  document.getElementById("titulo-form-questao").textContent="Editar questão";
  ["vestibular","ano","numero","materia","tema","nivel","complexidade","pergunta","dica","explicacao","recomendacao","fonte","imagemPagina"].forEach(campo=>{
    const elemento=document.getElementById(`campo-${campo}`);
    if(elemento)elemento.value=q[campo]??"";
  });
  [0,1,2,3,4].forEach(i=>document.getElementById(`campo-opcao-${i}`).value=q.opcoes[i]||"");
  document.getElementById("campo-resposta").value=String(q.resposta);
  document.getElementById("campo-resolucao").value=q.resolucao.join("\n");
  document.getElementById("campo-requerImagem").checked=q.requerImagem===true;
  document.getElementById("campo-ativo").checked=q.ativo;
  formQuestao.scrollIntoView({behavior:"smooth",block:"start"});
}

formQuestao.addEventListener("submit",async evento=>{
  evento.preventDefault();
  const mensagem=document.getElementById("form-mensagem");
  const botao=formQuestao.querySelector("[type='submit']");
  botao.disabled=true; mensagem.textContent="Salvando...";
  try {
    const dados=dadosDoFormulario();
    const id=document.getElementById("questao-id").value;
    if(id)await bancoFirebase.collection("questoes").doc(id).set(dados,{merge:true});
    else await bancoFirebase.collection("questoes").add({...dados,criadoEm:firebase.firestore.FieldValue.serverTimestamp()});
    await bancoFirebase.collection("materias").doc(slugMateria(dados.materia)).set({nome:dados.materia,area:dados.area,temas:[dados.tema],ativo:true,atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
    mensagem.textContent="Questão salva com sucesso.";
    limparFormularioQuestao(); await listarQuestoesAdmin(); await carregarQuestoesPublicadas();
  } catch(erro) {
    mensagem.textContent=erro.message||"Não foi possível salvar a questão.";
  } finally { botao.disabled=false; }
});

document.getElementById("lista-questoes-admin").addEventListener("click",async evento=>{
  const editar=evento.target.closest("[data-editar]");
  if(editar)preencherFormulario(questoesAdmin.find(q=>q.id===editar.dataset.editar));
  const excluir=evento.target.closest("[data-excluir]");
  if(excluir&&confirm("Excluir esta questão definitivamente do banco?")) {
    await bancoFirebase.collection("questoes").doc(excluir.dataset.excluir).delete();
    await listarQuestoesAdmin(); await carregarQuestoesPublicadas();
  }
});

document.getElementById("nova-questao").addEventListener("click",limparFormularioQuestao);
document.getElementById("busca-admin").addEventListener("input",renderizarListaAdmin);

/* Importação inicial usa IDs fixos, portanto clicar novamente atualiza
   os mesmos documentos em vez de criar cópias duplicadas. */
document.getElementById("importar-iniciais").addEventListener("click",async()=>{
  if(!confirm("Importar ou atualizar as 21 questões demonstrativas no Firestore?"))return;
  const botao=document.getElementById("importar-iniciais"); botao.disabled=true; botao.textContent="Importando...";
  try {
    const lote=bancoFirebase.batch();
    questoesIniciais.forEach(q=>{
      const completo=window.RotaClassificador.classificarQuestao({...q,complexidade:q.nivel==="Fácil"?2:q.nivel==="Difícil"?5:3,recomendacao:`Revise ${q.tema} no guia de ${q.materia} e resolva uma questão semelhante.`,ativo:true,atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()});
      lote.set(bancoFirebase.collection("questoes").doc(`inicial-${q.id}`),completo,{merge:true});
      lote.set(bancoFirebase.collection("materias").doc(slugMateria(q.materia)),{nome:q.materia,ativo:true,atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});
    });
    await lote.commit(); await listarQuestoesAdmin(); await carregarQuestoesPublicadas();
  } catch(erro) { alert("Não foi possível importar: "+erro.message); }
  finally { botao.disabled=false; botao.textContent="Importar 21 questões iniciais"; }
});


/* ---------- IMPORTADOR JSON EM MASSA ----------
   Aceita os JSONs gerados para ENEM/Fuvest/Unicamp/Unesp.
   Também converte o campo "enunciado" para "pergunta", que é o
   formato consumido pelo site, e processa no máximo 400 documentos
   por lote para evitar ultrapassar o limite do Firestore. */
let listaJsonImportacao=[];
let listaJsonOriginal=[];
let nomeJsonAtual="";
const arquivoJson=document.getElementById("arquivo-json");
const btnCarregarCompleto=document.getElementById("carregar-json-completo");
const btnValidarJson=document.getElementById("validar-json");
const btnImportarJson=document.getElementById("importar-json");
const statusJson=document.getElementById("json-status");
const progressoJson=document.getElementById("json-progresso");
const logJson=document.getElementById("json-log");
const aplicarClassificacao=document.getElementById("aplicar-classificacao");
const sobrescreverClassificacao=document.getElementById("sobrescrever-classificacao");
const resumoCategorias=document.getElementById("json-categorias");

function registrarJson(mensagem){
  logJson.textContent += mensagem+"\n";
  logJson.scrollTop=logJson.scrollHeight;
}
function alternativasEsperadas(q){ return String(q.vestibular||"").toUpperCase()==="UNICAMP"?4:5; }
function normalizarQuestaoImportada(q){
  const esperado=alternativasEsperadas(q);
  let opcoes=Array.isArray(q.opcoes)?q.opcoes.map(v=>String(v).trim()).filter(Boolean):[];
  // Na extração de alguns PDFs o comando da questão entrou antes das alternativas.
  // Quando há itens extras, as alternativas oficiais estão no final da lista.
  if(opcoes.length>esperado) opcoes=opcoes.slice(-esperado);
  let resposta=q.resposta;
  const letra=String(q.respostaLetra||"").toUpperCase();
  if("ABCDE".includes(letra)) resposta="ABCDE".indexOf(letra);
  if(q.anulada===true) resposta=null;
  const pergunta=String(q.pergunta||q.enunciado||"").trim();
  let normalizada={
    ...q,
    id:String(q.id||"").trim(),
    vestibular:String(q.vestibular||"").trim(),
    ano:Number(q.ano), numero:Number(q.numero),
    materia:String(q.materia||"Interdisciplinar").trim(),
    tema:String(q.tema||"A classificar").trim()||"A classificar",
    nivel:String(q.nivel||"Médio").trim()||"Médio",
    complexidade:Number(q.complexidade)||3,
    pergunta, opcoes, resposta,
    dica:String(q.dica||"Releia o comando e elimine as alternativas incompatíveis.").trim(),
    resolucao:Array.isArray(q.resolucao)?q.resolucao:[],
    explicacao:String(q.explicacao||"").trim(),
    recomendacao:String(q.recomendacao||"").trim(),
    ativo:q.ativo!==false
  };
  /* O classificador preserva campos específicos por padrão. Marque a opção
     de sobrescrita no painel apenas quando quiser recalcular tudo. */
  if(aplicarClassificacao.checked&&window.RotaClassificador){
    normalizada=window.RotaClassificador.classificarQuestao(normalizada,{sobrescrever:sobrescreverClassificacao.checked});
  }
  if(!normalizada.recomendacao)normalizada.recomendacao=`Revise ${normalizada.tema||normalizada.materia||"o conteúdo"} e resolva uma questão semelhante.`;
  return normalizada;
}
function errosQuestaoImportada(q){
  const erros=[]; const esperado=alternativasEsperadas(q);
  if(!q.id)erros.push("id");
  if(!q.vestibular)erros.push("vestibular");
  if(!Number.isInteger(q.ano))erros.push("ano");
  if(!Number.isInteger(q.numero))erros.push("numero");
  if(!q.pergunta)erros.push("pergunta/enunciado");
  if(!Array.isArray(q.opcoes)||q.opcoes.length!==esperado)erros.push(`opcoes (${q.opcoes?.length||0}/${esperado})`);
  if(q.anulada!==true && (!Number.isInteger(q.resposta)||q.resposta<0||q.resposta>=esperado))erros.push("resposta");
  return erros;
}
function mostrarResumoCategorias(){
  if(!listaJsonImportacao.length||!window.RotaClassificador){resumoCategorias.hidden=true;return;}
  const resumo=window.RotaClassificador.resumir(listaJsonImportacao);
  const linhas=Object.entries(resumo.materias).sort((a,b)=>b[1]-a[1]);
  resumoCategorias.innerHTML=`<strong>Prévia por categoria</strong><div class="grade-categorias">${linhas.map(([materia,total])=>`<span><b>${materia}</b><small>${total} questão${total===1?"":"ões"}</small></span>`).join("")}</div><small>Classificação: revisada por prova ${resumo.confiancas.revisada||0}, alta ${resumo.confiancas.alta||0}, média ${resumo.confiancas.média||0}, baixa ${resumo.confiancas.baixa||0}; preservadas ${resumo.confiancas.original||0}.</small>`;
  resumoCategorias.hidden=false;
}
function prepararListaJson(dados,nome){
  const bruta=Array.isArray(dados)?dados:(Array.isArray(dados.questoes)?dados.questoes:[]);
  listaJsonOriginal=bruta;
  nomeJsonAtual=nome;
  listaJsonImportacao=listaJsonOriginal.map(normalizarQuestaoImportada);
  statusJson.textContent=`${nome}: ${listaJsonImportacao.length} registros carregados.`;
  btnValidarJson.disabled=!listaJsonImportacao.length;
  btnImportarJson.disabled=!listaJsonImportacao.length;
  registrarJson(`Arquivo carregado: ${nome} (${listaJsonImportacao.length} registros).`);
  mostrarResumoCategorias();
}
/* Alterar uma opção recalcula a prévia sem precisar escolher o arquivo de novo. */
[aplicarClassificacao,sobrescreverClassificacao].forEach(controle=>controle.addEventListener("change",()=>{
  if(listaJsonOriginal.length)prepararListaJson(listaJsonOriginal,nomeJsonAtual);
}));
arquivoJson.addEventListener("change",async evento=>{
  const arquivo=evento.target.files[0]; if(!arquivo)return;
  try{ prepararListaJson(JSON.parse(await arquivo.text()),arquivo.name); }
  catch(erro){ listaJsonImportacao=[]; btnValidarJson.disabled=true; btnImportarJson.disabled=true; statusJson.textContent="JSON inválido."; registrarJson("ERRO: "+erro.message); }
});
btnCarregarCompleto.addEventListener("click",async()=>{
  btnCarregarCompleto.disabled=true; statusJson.textContent="Carregando banco completo...";
  try{
    const resposta=await fetch("banco-questoes/banco-questoes-completo.json",{cache:"no-store"});
    if(!resposta.ok)throw new Error(`HTTP ${resposta.status}`);
    prepararListaJson(await resposta.json(),"banco-questoes-completo.json");
  }catch(erro){ registrarJson("ERRO ao carregar banco completo: "+erro.message); statusJson.textContent="Não foi possível carregar o JSON. Publique a pasta banco-questoes junto com o site."; }
  finally{btnCarregarCompleto.disabled=false;}
});
btnValidarJson.addEventListener("click",()=>{
  let validas=0,invalidas=0; const exemplos=[];
  listaJsonImportacao.forEach(q=>{const erros=errosQuestaoImportada(q); if(erros.length){invalidas++;if(exemplos.length<15)exemplos.push(`${q.id||"(sem id)"}: ${erros.join(", ")}`);}else validas++;});
  statusJson.textContent=`Válidas: ${validas} | Inválidas: ${invalidas} | Total: ${listaJsonImportacao.length}`;
  registrarJson(`Validação: ${validas} válidas; ${invalidas} inválidas.`);
  if(exemplos.length)registrarJson("Exemplos que serão ignorados:\n"+exemplos.join("\n"));
});
btnImportarJson.addEventListener("click",async()=>{
  if(!bancoFirebase)return registrarJson("Firebase não está conectado.");
  const usuario=autenticacaoFirebase.currentUser; if(!usuario)return registrarJson("Entre como administrador antes de importar.");
  const permissao=await bancoFirebase.collection("admins").doc(usuario.uid).get();
  if(!permissao.exists||permissao.data().ativo!==true)return registrarJson("Usuário sem permissão em admins/{UID} com ativo=true.");
  const validas=listaJsonImportacao.filter(q=>errosQuestaoImportada(q).length===0);
  if(!validas.length)return registrarJson("Nenhuma questão válida para importar.");
  if(!confirm(`Importar/atualizar ${validas.length} questões no Firestore?`))return;
  btnImportarJson.disabled=true; progressoJson.value=0;
  let feitas=0;
  try{
    for(let i=0;i<validas.length;i+=400){
      const grupo=validas.slice(i,i+400); const lote=bancoFirebase.batch();
      grupo.forEach(q=>lote.set(bancoFirebase.collection("questoes").doc(q.id),{...q,atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()},{merge:true}));
      await lote.commit(); feitas+=grupo.length; progressoJson.value=Math.round(feitas/validas.length*100); registrarJson(`Lote concluído: ${feitas}/${validas.length}`);
    }
    /* Cria também o catálogo de matérias. Assim, toda categoria nova passa
       a existir no Firestore sem cadastro manual separado. */
    const catalogo=new Map();
    validas.forEach(q=>{
      if(!catalogo.has(q.materia))catalogo.set(q.materia,{area:q.area,temas:new Set()});
      if(q.tema)catalogo.get(q.materia).temas.add(q.tema);
    });
    const loteMaterias=bancoFirebase.batch();
    catalogo.forEach((dados,materia)=>loteMaterias.set(
      bancoFirebase.collection("materias").doc(slugMateria(materia)),
      {nome:materia,area:dados.area,temas:[...dados.temas].sort(),ativo:true,atualizadoEm:firebase.firestore.FieldValue.serverTimestamp()},
      {merge:true}
    ));
    await loteMaterias.commit();
    registrarJson(`Catálogo atualizado: ${catalogo.size} matérias.`);
    statusJson.textContent=`Importação concluída: ${feitas} questões.`; registrarJson("IMPORTAÇÃO CONCLUÍDA.");
    await listarQuestoesAdmin(); await carregarQuestoesPublicadas();
  }catch(erro){registrarJson("ERRO na importação: "+(erro.message||erro)); statusJson.textContent="Falha na importação. Veja o log.";}
  finally{btnImportarJson.disabled=false;}
});

/* Login Google opcional, compatível com o mesmo admins/{UID}. */
document.getElementById("login-google").addEventListener("click",async()=>{
  document.getElementById("login-erro").textContent="";
  try{if(!autenticacaoFirebase)throw {code:"auth/operation-not-allowed"};await autenticacaoFirebase.signInWithPopup(new firebase.auth.GoogleAuthProvider());}
  catch(falha){document.getElementById("login-erro").textContent=textoErroAutenticacao(falha);}
});

/* Login e verificação adicional do documento admins/{UID}. */
document.getElementById("form-login").addEventListener("submit",async evento=>{
  evento.preventDefault();
  const erro=document.getElementById("login-erro"); erro.textContent="";
  try {
    if(!autenticacaoFirebase)throw {code:"auth/operation-not-allowed"};
    await autenticacaoFirebase.signInWithEmailAndPassword(document.getElementById("login-email").value,document.getElementById("login-senha").value);
  } catch(falha) { erro.textContent=textoErroAutenticacao(falha); }
});
document.getElementById("sair-admin").addEventListener("click",()=>autenticacaoFirebase?.signOut());

async function configurarAutenticacao() {
  if(!window.ROTA_FIREBASE_ATIVO) {
    avisoFirebase.innerHTML='<strong>Firebase ainda não configurado.</strong><p>O site está usando as questões demonstrativas. Siga o <a href="configuracao-firebase.html">passo a passo de configuração</a> para ativar o banco e o painel.</p>';
    loginAdmin.querySelectorAll("input,button").forEach(campo=>campo.disabled=true);
    document.querySelectorAll("#conta-desconectada input,#conta-desconectada button").forEach(campo=>campo.disabled=true);
    mensagemConta("Configure o Firebase para habilitar criação de contas e sincronização.","erro");
    renderizarConta();
    return;
  }
  avisoFirebase.innerHTML='<strong>Firebase conectado.</strong><p>Os estudantes veem as questões publicadas; somente administradores autorizados podem alterar o banco.</p>';
  autenticacaoFirebase.onAuthStateChanged(async usuario=>{
    usuarioAtual=usuario||null;
    nicknameAtual=usuario?(nicknamePendenteCadastro||usuario.displayName||usuario.email?.split("@")[0]||"Estudante"):"";
    nomeRealAtual=usuario?(nomePendenteCadastro||usuario.displayName||""):"";
    avatarSelecionado=lerAvatarLocal(usuario?.uid||"visitante")||lerAvatarLocal("visitante")||DEFAULT_AVATAR;
    desenharAvatares();
    renderizarConta();
    if(!usuario) {
      loginAdmin.hidden=false; painelAdmin.hidden=true;
      document.getElementById("login-erro").textContent="";
      return;
    }
    await carregarEstadoNuvem(usuario);
    try {
      const permissao=await bancoFirebase.collection("admins").doc(usuario.uid).get();
      if(!permissao.exists||permissao.data().ativo!==true) {
        // Migra o nickname da V7 sem alterar UID, senha ou histórico.
        if(!nicknamePendenteCadastro){
          try {
            const perfil=await bancoFirebase.collection("usuarios").doc(usuario.uid).get();
            if(!perfil.data()?.nicknameChave){
              const anterior=validarNickname(perfil.data()?.nickname || usuario.displayName || "");
              const resultado=await chamarFuncaoConta("reservarNickname",{nickname:anterior});
              nicknameAtual=resultado.nickname;
              await usuario.updateProfile({displayName:resultado.nickname});
              renderizarConta();
            }
          } catch(erro) {
            console.warn("Nickname antigo exige confirmação no perfil:",erro.code||erro.message);
            const status=document.getElementById("status-sincronizacao");
            if(status)status.textContent="Para entrar por nickname, escolha um nome disponível em Editar nickname.";
          }
        }
        loginAdmin.hidden=false; painelAdmin.hidden=true;
        document.getElementById("login-erro").textContent="Esta conta está conectada como estudante, mas não possui permissão administrativa. Para abrir o painel, entre com uma conta cadastrada em admins/{UID}.";
        return;
      }
      loginAdmin.hidden=true; painelAdmin.hidden=false;
      document.getElementById("admin-usuario").textContent=usuario.email;
      await listarQuestoesAdmin();
    } catch(erro) {
      loginAdmin.hidden=false; painelAdmin.hidden=true;
      document.getElementById("login-erro").textContent="Não foi possível verificar a permissão administrativa.";
    }
  });
  await carregarQuestoesPublicadas();
}

/* ---------- 13. INICIALIZAÇÃO ----------
   Estas chamadas desenham as áreas dinâmicas quando a página abre. */
renderizarGuias();
atualizarCatalogos();
renderizarFiltros();
renderizarQuestao();
atualizarResumo();
limparFormularioQuestao();
renderizarConta();
configurarAutenticacao();
