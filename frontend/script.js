const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit-btn");
const resultDiv = document.getElementById("result");

let userAnswers = {};

// Fetch questions from backend
fetch("http://localhost:3000/api/questions")
  .then(res => res.json())
  .then(data => {
    if(data.success) {
      data.questions.forEach(q => renderQuestion(q));
    }
  });

// Render each question
function renderQuestion(q) {
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `<p>${q.id}. ${q.question}</p>`;

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "options";

  Object.keys(q.options).forEach(type => {
    const btn = document.createElement("button");
    btn.innerText = q.options[type];
    btn.onclick = () => {
      userAnswers[q.id] = type;
      Array.from(optionsDiv.children).forEach(b => b.style.background = "");
      btn.style.background = "#4caf50";
      btn.style.color = "#fff";
    };
    optionsDiv.appendChild(btn);
  });

  div.appendChild(optionsDiv);
  questionsDiv.appendChild(div);
}

// Submit answers
submitBtn.onclick = () => {
  const answersArray = Object.values(userAnswers);

  if(answersArray.length !== questionsDiv.children.length) {
    alert("Please answer all questions!");
    return;
  }

  fetch("http://localhost:3000/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers: answersArray })
  })
  .then(res => res.json())
  .then(data => {
    if(data.success) {
      resultDiv.innerText = `Your Learning Style: ${data.result.toUpperCase()}`;
    }
  });
};

btn.onclick = () => {
  userAnswers[q.id] = type;
  Array.from(optionsDiv.children).forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
};