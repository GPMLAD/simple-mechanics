const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const perguntas = [
  {
    id: 1,
    pergunta: "Qual é a capital da França?",
    alternativas: ["Berlim", "Madri", "Paris", "Roma"],
    resposta: 3,
    explicacao: "Paris é a capital da França, conhecida como a Cidade Luz.",
  },
  {
    id: 2,
    pergunta: "Qual é o maior planeta do sistema solar?",
    alternativas: ["Terra", "Marte", "Júpiter", "Saturno"],
    resposta: 3,
    explicacao:
      "Júpiter é o maior planeta do sistema solar, com diâmetro 11 vezes maior que o da Terra.",
  },
  {
    id: 3,
    pergunta: "Quem escreveu 'Dom Quixote'?",
    alternativas: ["Cervantes", "Shakespeare", "Camões", "Goethe"],
    resposta: 1,
    explicacao:
      "Miguel de Cervantes escreveu 'Dom Quixote', uma das obras mais importantes da literatura mundial.",
  },
  {
    id: 4,
    pergunta: "Qual é o elemento químico representado pelo símbolo 'O'?",
    alternativas: ["Ouro", "Oxigênio", "Osso", "Ósmio"],
    resposta: 2,
    explicacao:
      "O símbolo 'O' representa o Oxigênio, essencial para a respiração e combustão.",
  },
];

let rodadaAtual = [...perguntas];
let proximaRodada = [];

function exibirMensagem(texto, cor) {
  const cores = {
    vermelho: "\x1b[31m",
    verde: "\x1b[32m",
    azulClaro: "\x1b[36m",
    amarelo: "\x1b[33m",
    reset: "\x1b[0m",
  };
  console.log(`${cores[cor] || ""}${texto}${cores.reset}`);
}

function quiz() {
  if (rodadaAtual.length === 0) {
    if (proximaRodada.length === 0) {
      exibirMensagem(
        "Parabéns! Você respondeu todas as perguntas corretamente!",
        "amarelo"
      );
      rl.close();
      return;
    }

    exibirMensagem(
      `Nova rodada! Você ainda precisa acertar ${proximaRodada.length} pergunta(s).`,
      "azulClaro"
    );
    rodadaAtual = [...proximaRodada];
    proximaRodada = [];
  }

  const questao = rodadaAtual.shift();

  console.log(`\n${questao.pergunta}`);
  questao.alternativas.forEach((alt, index) => {
    console.log(`${index + 1}) ${alt}`);
  });

  rl.question("Escolha uma opção (1-4): ", (resposta) => {
    if (parseInt(resposta) === questao.resposta) {
      exibirMensagem("Resposta correta!", "verde");
    } else {
      exibirMensagem(`Resposta errada! ${questao.explicacao}`, "vermelho");
      proximaRodada.push(questao);
    }

    quiz();
  });
}

rl.question("Olá, qual seu nome? ", (nome) => {
  console.log(`Olá ${nome}! Vamos começar o quiz?`);
  quiz();
});
