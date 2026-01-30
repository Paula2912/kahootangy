const questions = [
  {
    q: "¿Qué quería ser Angela de pequeña?",
    options: ["Astronauta", "Mosquetera", "Doctora", "Cantante"],
    correct: 1
  },
  {
    q: "Di tres personajes de la novela",
    options: [
      "Claudia, Carmen y Fina",
      "Marta, Begoña y Laura",
      "Ana, Julia y Sofía",
      "Lucía, Sara y Elena"
    ],
    correct: 0
  },
  {
    q: "¿En qué año se estrenó La Sirenita?",
    options: ["1985", "1987", "1989", "1992"],
    correct: 2
  },
  {
    q: "Si ellas son las Pink Ladies, ellos son...",
    options: ["Sharks", "Jets", "T-Birds", "Riders"],
    correct: 2
  },
  {
    q: "¿En qué ley se basa su TFG?",
    options: [
      "Ley de peligrosidad y rehabilitación social",
      "Ley penal juvenil",
      "Ley de igualdad",
      "Ley constitucional"
    ],
    correct: 0
  },
  {
    q: "¿Qué día sale su hermandad?",
    options: ["Viernes Santo", "Domingo de Ramos", "Lunes Santo", "Jueves Santo"],
    correct: 2
  },
  {
    q: "¿Cuál es la moto de sus sueños?",
    options: ["Yamaha R1", "Harley Davidson", "Ducati Monster", "Kawasaki Ninja"],
    correct: 1
  },
  {
    q: "¿Cuál es su helado favorito?",
    options: [
      "Chocolate",
      "Vainilla",
      "Menta con chocolate",
      "Fresa"
    ],
    correct: 2
  }
];

let score = 0;
let current = 0;

function loadQuestion() {
  const q = questions[current];

  document.querySelector("h2").textContent = q.q;

  const answers = document.getElementById("answers");
  answers.innerHTML = "";

  document.getElementById("feedback").textContent = "";
  document.getElementById("continueBtn").style.display = "none";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => answer(i);
    answers.appendChild(btn);
  });
}

function answer(choice) {
  const q = questions[current];
  const feedback = document.getElementById("feedback");

  if (choice === q.correct) {
    score += 100;
    feedback.textContent = "CORRECTO";
    feedback.style.color = "green";
    document.getElementById("continueBtn").style.display = "block";
  } else {
    feedback.textContent = "INCORRECTO";
    feedback.style.color = "red";
  }

  document.getElementById("score").textContent = score;
}

function next() {
  current++;

  if (current >= questions.length) {
    document.querySelector(".arcade-screen").innerHTML =
      `<h2>🎉 FIN DEL KAHOOT 🎉</h2><p>Puntos: ${score}</p>`;
    return;
  }

  loadQuestion();
}

loadQuestion();
