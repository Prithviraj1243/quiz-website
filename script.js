//questions array
let questions = [
  {
    q: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Marking Language",
      "Home Tool Markup Language"
    ],
    ans: 0
  },
  { q: "Which tag runs JavaScript?", options: ["<js>", "<script>", "<code>", "<run>"], ans: 1 },
  { q: "CSS text size property?", options: ["text-size", "font-size", "size", "text-style"], ans: 1 },
  { q: "What is the integration of cosx?", options: ["-sinx+c", "cosx+c", "secx+c", "cotx+c"], ans: 0 },
  { q: "What does === mean?", options: ["Assignment", "Strict equality", "Loose equality", "Not equal"], ans: 1 },
  { q: "AOI stands for in mathematics?", options: ["application of integrals", "application integration", "area under curves", "area of impact"], ans: 0 }
];

//  VARIABLES
let index = 0;
let score = 0;
let selected = null;

let perTime = 90;
let timeLeft = 90;
let timer;

// 3) ELEMENTS
let startScreen = document.getElementById("startScreen");
let quizScreen = document.getElementById("quizScreen");
let resultScreen = document.getElementById("resultScreen");

let qNo = document.getElementById("qNo");
let qTotal = document.getElementById("qTotal");

let scoreEl = document.getElementById("score");
let scoreTotal = document.getElementById("scoreTotal");

let questionEl = document.getElementById("question");
let optionsEl = document.getElementById("options");

let bar = document.getElementById("bar");
let ring = document.getElementById("ring");
let timeText = document.getElementById("timeText");

let startBtn = document.getElementById("startBtn");
let nextBtn = document.getElementById("nextBtn");
let againBtn = document.getElementById("againBtn");

let resultTitle = document.getElementById("resultTitle");
let resultText = document.getElementById("resultText");

let confetti = document.getElementById("confetti");

// 4) START
startBtn.onclick = function () {
  startScreen.classList.add("hide");
  resultScreen.classList.add("hide");
  quizScreen.classList.remove("hide");

  index = 0;
  score = 0;

  qTotal.innerText = questions.length;
  scoreTotal.innerText = questions.length;

  loadQuestion();
};

// play again
againBtn.onclick = function () {
  startScreen.classList.remove("hide");
  resultScreen.classList.add("hide");
  quizScreen.classList.add("hide");
  confetti.innerHTML = "";
};

// 5) LOAD QUESTION
function loadQuestion() {
  selected = null;
  optionsEl.innerHTML = "";

  qNo.innerText = index + 1;
  scoreEl.innerText = score;

  questionEl.innerText = questions[index].q;

  for (let i = 0; i < 4; i++) {
    let div = document.createElement("div");
    div.className = "option";
    div.innerText = (String.fromCharCode(65 + i) + ") " + questions[index].options[i]);

    div.onclick = function () {
      selectOption(i, div);
    };

    optionsEl.appendChild(div);
  }

  startTimer();
}

// 6) SELECT OPTION
function selectOption(i, element) {
  selected = i;

  let all = document.getElementsByClassName("option");
  for (let x = 0; x < all.length; x++) {
    all[x].classList.remove("selected");
  }
  element.classList.add("selected");
}

// 7) TIMER
function startTimer() {
  clearInterval(timer);

  timeLeft = perTime;
  updateTimerUI();

  timer = setInterval(function () {
    timeLeft--;
    updateTimerUI();

    if (timeLeft <= 0) {
      clearInterval(timer);
      submitAnswer(true); // timeout
    }
  }, 1000);
}

function updateTimerUI() {
  timeText.innerText = "00:" + String(timeLeft).padStart(2, "0");

  let percent = (timeLeft / perTime) * 100;
  bar.style.width = percent + "%";

  let deg = (timeLeft / perTime) * 360;
  ring.style.background = "conic-gradient(#7c5cff " + deg + "deg, rgba(255,255,255,0.15) 0deg)";
}


nextBtn.onclick = function () {
  submitAnswer(false);
};

function submitAnswer(timeout) {
  // score
  if (selected !== null && selected === questions[index].ans) {
    score++;
  }

  index++;

  if (index >= questions.length) {
    showResult();
  } else {
    loadQuestion();
  }
}


function showResult() {
  clearInterval(timer);

  quizScreen.classList.add("hide");
  resultScreen.classList.remove("hide");

  let total = questions.length;
  let percent = Math.round((score / total) * 100);

  resultText.innerText = score +"/" + total + " correct (" + percent + "%)";

 
  if (percent === 100) {
    resultTitle.innerText = "Perfect ";
    makeConfetti();
  } else if (percent >= 80) {
    resultTitle.innerText = "Excellent ";
  } else {
    resultTitle.innerText = "Good Try 🙂";
  }
}


function makeConfetti() {
  confetti.innerHTML = "";
  for (let i = 0; i < 120; i++) {
    let c = document.createElement("div");
    c.className = "conf";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = ["#ffcc66", "#38d39f", "#7c5cff", "#ff5c7a"][Math.floor(Math.random() * 4)];
    c.style.animationDuration = (2 + Math.random() * 2) + "s";
    confetti.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}
