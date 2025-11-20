// Sample questions for illustration
const questions = [
  {
    text: "I prefer to learn by seeing diagrams and charts.",
    options: [
      { text: "Agree", type: "visual" },
      { text: "Disagree", type: "auditory" },
      { text: "Neutral", type: "kinesthetic" }
    ]
  },
  {
    text: "I remember information better when I hear it.",
    options: [
      { text: "Agree", type: "auditory" },
      { text: "Disagree", type: "visual" },
      { text: "Neutral", type: "kinesthetic" }
    ]
  },
  {
    text: "I learn best when I can move and do activities.",
    options: [
      { text: "Agree", type: "kinesthetic" },
      { text: "Disagree", type: "visual" },
      { text: "Neutral", type: "auditory" }
    ]
  }
];

const questionsSection = document.getElementById('questionsSection');
const submitBtn = document.getElementById('submitBtn');
const resultDiv = document.getElementById('result');

// Render questions
questions.forEach((q, index) => {
  const div = document.createElement('div');
  div.className = 'question';
  div.innerHTML = `<p>${index + 1}. ${q.text}</p>` + 
    q.options.map(opt => `
      <label>
        <input type="radio" name="q${index}" value="${opt.type}" required>
        ${opt.text}
      </label><br>
    `).join('');
  questionsSection.appendChild(div);
});

// Handle submit
submitBtn.addEventListener('click', () => {
  const answers = [];
  const selected = questionsSection.querySelectorAll('input[type="radio"]:checked');

  if (selected.length !== questions.length) {
    resultDiv.textContent = "Please answer all questions.";
    return;
  }

  selected.forEach(input => answers.push(input.value));

  // Count types
  const counts = { visual: 0, auditory: 0, kinesthetic: 0 };
  answers.forEach(ans => counts[ans]++);

  const learningStyle = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);

  resultDiv.textContent = `Your learning style is: ${learningStyle}`;
});