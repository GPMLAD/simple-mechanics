const sentenceElement = document.getElementById("sentence");
const wordBankElement = document.getElementById("word-bank");
const checkButton = document.getElementById("check-btn");
const resetButton = document.getElementById("reset-btn");
const resultElement = document.getElementById("result");

// Frase com espaços representados por "?" e as palavras para preencher
const originalSentence = "Quem compra CALL tem ? de ?";
const wordBank = ["direito", "compra"];

// Armazenar as palavras do banco de palavras
let availableWords = [...wordBank];
let usedWords = [];

// Função para gerar a frase com placeholders
function generateSentence(sentence) {
  const sentenceParts = sentence.split(" ");
  sentenceElement.innerHTML = ""; // Limpa a frase atual

  sentenceParts.forEach((part) => {
    if (part === "?") {
      // Adiciona um placeholder para cada "?"
      const placeholder = document.createElement("span");
      placeholder.classList.add("placeholder");
      placeholder.textContent = "?";
      sentenceElement.appendChild(placeholder);
    } else {
      // Adiciona as palavras normais à frase
      const textNode = document.createTextNode(part + " ");
      sentenceElement.appendChild(textNode);
    }
  });
}

// Criar o banco de palavras
function generateWordBank(words) {
  wordBankElement.innerHTML = ""; // Limpa o banco de palavras atual

  words.forEach((word) => {
    const wordElement = document.createElement("span");
    wordElement.classList.add("word");
    wordElement.textContent = word;

    // Evento de clique para preencher o primeiro espaço vazio
    wordElement.addEventListener("click", () => {
      const emptyPlaceholder = Array.from(
        document.querySelectorAll(".placeholder")
      ).find((placeholder) => placeholder.textContent === "?");

      if (emptyPlaceholder && !usedWords.includes(word)) {
        emptyPlaceholder.textContent = word;
        usedWords.push(word); // Adiciona a palavra à lista de palavras usadas
        wordElement.style.display = "none"; // Esconde a palavra depois de usada
      }
    });

    wordBankElement.appendChild(wordElement);
  });
}

// Resetar todas as palavras e retornar ao banco
function resetWords() {
  // Limpa os espaços preenchidos e as palavras usadas
  usedWords = [];
  document.querySelectorAll(".placeholder").forEach((placeholder) => {
    placeholder.textContent = "?";
  });

  // Regenera o banco de palavras
  availableWords = [...wordBank];
  generateWordBank(availableWords);
}

// Verificar a frase
checkButton.addEventListener("click", () => {
  const userSentence = Array.from(
    document.querySelectorAll(".placeholder")
  ).map((placeholder) => placeholder.textContent.trim());

  const expectedWords = originalSentence
    .split(" ")
    .filter((word) => word === "?")
    .map(() => availableWords.shift());
  // Verifica se as palavras e a ordem estão corretas
  if (JSON.stringify(userSentence) === JSON.stringify(expectedWords)) {
    resultElement.textContent =
      "Parabéns! Você completou a frase corretamente!";
    resultElement.style.color = "green";
  } else {
    resultElement.textContent = "Ops! Tente novamente.";
    resultElement.style.color = "red";
  }
});

// Evento de resetar as palavras
resetButton.addEventListener("click", resetWords);

// Inicialização
generateSentence(originalSentence);
generateWordBank(availableWords);
