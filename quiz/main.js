// Dados das perguntas
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

const quizContent = document.getElementById("quiz-content");
const feedback = document.getElementById("feedback");

function exibirMensagem(texto, cor) {
  feedback.innerHTML = `<p style="color: ${cor}">${texto}</p>`;
}

function exibirPergunta() {
  // Se não houver mais perguntas, finaliza o quiz
  if (rodadaAtual.length === 0) {
    if (proximaRodada.length === 0) {
      exibirMensagem(
        "Parabéns! Você respondeu todas as perguntas corretamente!",
        "green"
      );
      return;
    }

    exibirMensagem(
      `Nova rodada! Você ainda precisa acertar ${proximaRodada.length} pergunta(s).`,
      "blue"
    );
    rodadaAtual = [...proximaRodada];
    proximaRodada = [];
  }

  const questao = rodadaAtual.shift();

  // Exibe a pergunta e as alternativas
  quizContent.innerHTML = `
        <form id="question-form">
            <div class="question">${questao.pergunta}</div>
            <div class="alternatives">
                ${questao.alternativas
                  .map((alt, index) => {
                    return `
                            <label>
                                <input type="radio" name="alternativa" value="${
                                  index + 1
                                }">
                                ${alt}
                            </label><br>
                        `;
                  })
                  .join("")}
            </div>
            <button type="submit" id="responder-btn">Responder</button>
            <div id="user-answer"></div> <!-- Aqui está o elemento para mostrar a resposta -->
        </form>
    `;

  const form = document.getElementById("question-form");

  form.onsubmit = function (e) {
    e.preventDefault();

    const respostaEscolhida = parseInt(
      document.querySelector('input[name="alternativa"]:checked')?.value
    );

    if (!respostaEscolhida) {
      alert("Por favor, selecione uma resposta.");
      return;
    }

    const alternativaEscolhida = document
      .querySelector(`input[name="alternativa"][value="${respostaEscolhida}"]`)
      .parentElement.textContent.trim();

    const respostaCorreta = questao.resposta;
    const respostaUsuarioCorreta = respostaEscolhida === respostaCorreta;

    // Desabilitar as alternativas e mostrar a resposta do usuário
    document.querySelectorAll('input[name="alternativa"]').forEach((input) => {
      input.disabled = true;
    });

    // Mostrar a resposta do usuário no elemento #user-answer
    document.getElementById(
      "user-answer"
    ).innerHTML = `Sua resposta: ${alternativaEscolhida}`;

    // Lógica para resposta correta ou errada
    if (respostaUsuarioCorreta) {
      exibirMensagem("Resposta correta!", "green");
    } else {
      exibirMensagem(`Resposta errada! ${questao.explicacao}`, "red");
      proximaRodada.push(questao); // Armazena a pergunta para ser respondida novamente
    }

    // Remover o botão "Responder"
    const botaoResponder = form.querySelector("#responder-btn");
    botaoResponder.remove();

    // Mostrar o botão "Continuar"
    quizContent.innerHTML += `<button id="continue-btn">Continuar</button>`;

    // Adicionar o evento do botão "Continuar"
    const continueButton = document.getElementById("continue-btn");
    continueButton.addEventListener("click", function () {
      // Limpa a mensagem de feedback e carrega a próxima pergunta
      feedback.innerHTML = "";
      exibirPergunta();
    });
  };
}

// Inicializa o quiz com a primeira pergunta
exibirPergunta();
