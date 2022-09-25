const word_el = document.getElementById("word");
const popupContainer = document.getElementById("popup-container");
const popup = document.getElementsByClassName("popup");
const spinner_el = document.getElementById("spinner-container");
const message_el = document.getElementById("success-message");
const playAgainBtn = document.getElementById("play-again");
const wrongLetters_el = document.getElementById("wrong-letters");
const items = document.querySelectorAll(".item");
const message = document.getElementById("message");

const wrongLetters = [];
const correctLetters = [];
const words = [];
var selectedWord;

async function getRandomWord() {
  const response = await fetch("https://random-word-api.herokuapp.com/all");
  const data = await response.json();
  data.forEach((element) => {
    words.push(element);
  });
}

window.addEventListener("load", async function (e) {
  await getRandomWord();
  selectedWord = words[Math.floor(Math.random() * words.length)];
  console.log(selectedWord); // for test(!)
  displayWord();
});

async function displayWord() {
  spinner_el.style.display = "none";

  word_el.innerHTML = selectedWord
    .split("")
    .map(
      (letter) =>
        `<div class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</div>`
    )
    .join("");

  const typeWord = word_el.innerText.replace(/\n/g, "");
  if (typeWord === selectedWord) {
    popup[0].style.backgroundColor = "green";
    popupContainer.style.display = "flex";
    message_el.innerText = "Congratulations You Won!";
  }
}

playAgainBtn.addEventListener("click", function (e) {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  // yeni kelime lazım
  selectedWord = words[Math.floor(Math.random() * words.length)];
  console.log(selectedWord); // for test(!)

  displayWord();
  updateWrongLetters();

  popupContainer.style.display = "none";
});

addEventListener("keydown", function (e) {
  if ((e.keyCode >= 65 && e.keyCode <= 100) || e.keyCode == 222) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        displayMessage();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters();
      } else {
        displayMessage();
      }
    }
  }
});

function updateWrongLetters() {
  wrongLetters_el.innerHTML = `
    ${wrongLetters.length > 0 ? `<h3>Wrong Letters</h3>` : ``}
    ${wrongLetters.map((letter) =>
      wrongLetters.length > 0 ? `<span>${letter}</span>` : ``
    )}`;

  items.forEach((item, index) => {
    const errorCount = wrongLetters.length;

    if (index < errorCount) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  if (wrongLetters.length == items.length) {
    popupContainer.style.display = "flex";
    popup[0].style.backgroundColor = "red";
    message_el.innerText = "You Lost!";
  }
}

function displayMessage() {
  message.classList.add("show");
  setTimeout(() => {
    message.classList.remove("show");
  }, 2000);
}
