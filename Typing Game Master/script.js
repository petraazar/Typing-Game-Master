const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of Words for game
const words = [
    "sigh",
    "tense",
    "airplane",
    "ball",
    "pies",
    "pizza",
    "donkey",
    "north",
    "jam",
    "jamaica",
    "feeble",
    "testimony",
    "ordinary",
    "mandatory",
    "elementary",
];

// Init word
let randomWord;

// Init word
let score = 0;

// Init time;
let time = 10;


// Set difficulty to value in ls or medium
let difficulty = localStorage.getItem("difficulty") != null ? localStorage.getItem("difficulty") : "medium"

// Set difficulty select value
difficultySelect.value = localStorage.getItem("difficulty") != null ? localStorage.getItem("difficulty") : "medium"
// Focus on Text on start
text.focus();

//Start Counting Down
const timeInterval = setInterval(updateTime, 1000);


// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

 //Add word to Dom
 function addWordToDOM() {
     randomWord = getRandomWord();
     word.innerHTML = randomWord;
 }

 // Update Score
 function updateScore() {
     score++;
     scoreEl.innerHTML = score;
 }
 
 //Update Time 
 function updateTime() {
     time--;
     timeEl.innerHTML = time +'s';

     if(time === 0) {
         clearInterval(timeInterval);
         // end game
         gameOver();
     }
 }

 // Game over , show end screen
function gameOver() {
    endgameEl.innerHTML = `<h1>Time ran Out</h1>
                           <p>Your final score is ${score}</p>
                           <button onclick="location.reload()">Reload</button>`;

                           endgameEl.style.display = "flex"
}

 addWordToDOM();

 // Event Listeners

 //Typing
 text.addEventListener("input", e => {
     const insertedText = e.target.value;

     if(insertedText === randomWord) {
         addWordToDOM();
         updateScore();

         // Clear
         e.target.value = "";

         if(difficulty === "hard"){
             time += 2;
         } else if(difficulty === "medium"){
             time += 3;
         } else {
             time +=5;
         }
         
          updateTime();
     }

 });

 //Settings btn click
 settingsBtn.addEventListener("click", () => 
 settings.classList.toggle("hide"));

 // Settings select 
 settingsForm.addEventListener("change", e => {
     difficulty = e.target.value;
     localStorage.setItem("difficulty", difficulty);
 });
