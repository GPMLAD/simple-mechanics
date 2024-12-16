const data = [
  { english: "Dog", portuguese: "Cachorro" },
  { english: "Cat", portuguese: "Gato" },
  { english: "Bird", portuguese: "Pássaro" },
  { english: "Fish", portuguese: "Peixe" },
];

let selected = { column1: null, column2: null };

document.addEventListener("DOMContentLoaded", () => {
  const englishBank = document.getElementById("english-bank");
  const portugueseBank = document.getElementById("portuguese-bank");
  const status = document.getElementById("status");

  // Shuffle the arrays
  const englishWords = [...data].sort(() => Math.random() - 0.5);
  const portugueseWords = [...data].sort(() => Math.random() - 0.5);

  // Populate columns
  englishWords.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item.english;
    div.dataset.word = item.english;
    div.classList.add("english");
    englishBank.appendChild(div);
  });

  portugueseWords.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item.portuguese;
    div.dataset.word = item.portuguese;
    div.classList.add("portuguese");
    portugueseBank.appendChild(div);
  });

  // Add event listeners
  document.querySelectorAll(".column div").forEach((div) => {
    div.addEventListener("click", handleSelection);
  });

  function handleSelection(e) {
    const parentColumn = e.target.parentElement.id;
    const column = parentColumn === "english-bank" ? "column1" : "column2";
    const value =
      column === "column1" ? e.target.dataset.word : e.target.dataset.word;

    // Deselect if clicked again
    if (selected[column] === value) {
      e.target.classList.remove("selected");
      selected[column] = null;
    } else {
      // Select item
      document.querySelectorAll(`#${parentColumn} .selected`).forEach((el) => {
        el.classList.remove("selected");
      });
      e.target.classList.add("selected");
      selected[column] = value;
    }

    // Check match
    if (selected.column1 !== null && selected.column2 !== null) {
      const english = data.find((item) => item.english === selected.column1);
      const portuguese = data.find(
        (item) => item.portuguese === selected.column2
      );

      if (
        english &&
        portuguese &&
        english.portuguese === portuguese.portuguese
      ) {
        status.textContent = "Par correto!";
        disableMatched(english, portuguese);
      } else {
        status.textContent = "Tente novamente!";
        clearSelections();
      }
    }
  }

  function disableMatched(english, portuguese) {
    // Disable matched elements
    const englishElement = document.querySelector(
      `.english[data-word="${english.english}"]`
    );
    const portugueseElement = document.querySelector(
      `.portuguese[data-word="${portuguese.portuguese}"]`
    );
    englishElement.classList.add("disabled");
    portugueseElement.classList.add("disabled");
    englishElement.removeEventListener("click", handleSelection);
    portugueseElement.removeEventListener("click", handleSelection);

    clearSelections();
    status.textContent = "";
  }

  function clearSelections() {
    selected = { column1: null, column2: null };
    document.querySelectorAll(".selected").forEach((el) => {
      el.classList.remove("selected");
    });
  }
});
