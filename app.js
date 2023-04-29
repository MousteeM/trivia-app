const questions = [
  {
    category: "Entertainment: Film",
    type: "multiple",
    difficulty: "easy",
    question:
      "Who played Deputy Marshal Samuel Gerard in the 1993 film &quot;The Fugitive&quot;?",
    correct_answer: "Tommy Lee Jones",
    incorrect_answers: ["Harrison Ford", "Harvey Keitel", "Martin Landau"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does the &quot;MP&quot; stand for in MP3?",
    correct_answer: "Moving Picture",
    incorrect_answers: ["Music Player", "Multi Pass", "Micro Point"],
  },
  //   {
  //     category: "Art",
  //     type: "multiple",
  //     difficulty: "easy",
  //     question: "Who painted the Sistine Chapel?",
  //     correct_answer: "Michelangelo",
  //     incorrect_answers: ["Leonardo da Vinci", "Pablo Picasso", "Raphael"],
  //   },
  //   {
  //     category: "Geography",
  //     type: "multiple",
  //     difficulty: "easy",
  //     question:
  //       "What is the only state in the United States that does not have a flag in a shape with 4 edges?",
  //     correct_answer: "Ohio",
  //     incorrect_answers: ["Florida", "Idaho", "New Mexico"],
  //   },
  //   {
  //     category: "Science & Nature",
  //     type: "multiple",
  //     difficulty: "easy",
  //     question:
  //       "Alzheimer&#039;s disease primarily affects which part of the human body?",
  //     correct_answer: "Brain",
  //     incorrect_answers: ["Lungs", "Skin", "Heart"],
  //   },
  //   {
  //     category: "Vehicles",
  //     type: "multiple",
  //     difficulty: "easy",
  //     question:
  //       "Which of the following collision avoidance systems helps airplanes avoid colliding with each other?",
  //     correct_answer: "TCAS",
  //     incorrect_answers: ["GPWS", "OCAS", "TAWS"],
  //   },
  //   {
  //     category: "Entertainment: Video Games",
  //     type: "multiple",
  //     difficulty: "easy",
  //     question:
  //       "Who is the founder of Team Fortress 2&#039;s fictional company &quot;Mann Co&quot;?",
  //     correct_answer: "Zepheniah Mann",
  //     incorrect_answers: ["Cave Johnson", "Wallace Breem", "Saxton Hale"],
  //   },
  //   {
  //     category: "Entertainment: Japanese Anime & Manga",
  //     type: "multiple",
  //     difficulty: "easy",
  //     question: "What was Ash Ketchum&#039;s second Pokemon?",
  //     correct_answer: "Caterpie",
  //     incorrect_answers: ["Charmander", "Pikachu", "Pidgey"],
  //   },
  //   {
  //     category: "Entertainment: Music",
  //     type: "multiple",
  //     difficulty: "easy",
  //     question: "What album did The Lumineers release in 2016?",
  //     correct_answer: "Cleopatra",
  //     incorrect_answers: ["Winter", "The Lumineers", "Tracks From The Attic"],
  //   },
  //   {
  //     category: "Science: Computers",
  //     type: "multiple",
  //     difficulty: "easy",
  //     question:
  //       "The numbering system with a radix of 16 is more commonly referred to as ",
  //     correct_answer: "Hexidecimal",
  //     incorrect_answers: ["Binary", "Duodecimal", "Octal"],
  //   },
  //   {
  //     category: "Geography",
  //     type: "multiple",
  //     difficulty: "easy",
  //     question: "What is the capital of Spain?",
  //     correct_answer: "Madrid",
  //     incorrect_answers: ["Barcelona", "Sevilla", "Toledo"],
  //   },
  //   {
  //     category: "Entertainment: Video Games",
  //     type: "multiple",
  //     difficulty: "easy",
  //     question:
  //       "Which Pok&eacute;mon can learn the move &quot;Secret Power&quot; by leveling up?",
  //     correct_answer: "Audino",
  //     incorrect_answers: ["Type:Null", "Arceus", "Silvally"],
  //   },
  //   {
  //     category: "Entertainment: Video Games",
  //     type: "multiple",
  //     difficulty: "easy",
  //     question:
  //       "In &quot;PUBATTLEGROUNDS&quot; which ammo type does the M24 use?",
  //     correct_answer: "7.62mm",
  //     incorrect_answers: ["5.56mm", "9mm", ".300 Magnum"],
  //   },
  //   {
  //     category: "Sports",
  //     type: "multiple",
  //     difficulty: "easy",
  //     question:
  //       "In the 2014 FIFA World Cup, what was the final score in the match Brazil - Germany?",
  //     correct_answer: "1-7",
  //     incorrect_answers: ["1-5", "1-6", "2-6"],
  //   },
  //   {
  //     category: "Entertainment: Cartoon & Animations",
  //     type: "multiple",
  //     difficulty: "easy",
  //     question:
  //       "Wendy O. Koopa appeared in the Super Mario DIC Cartoons, but what was she known as?",
  //     correct_answer: "Kootie Pie",
  //     incorrect_answers: ["Sweetie Pie", "Wendy Pie", "Honey Pie"],
  //   },
];

const question = document.querySelector(".question");
const answer = document.querySelector(".answer-buttons");
const nextButton = document.querySelector(".next-btn");
const previousButton = document.querySelector(".previous-btn");
const answerButtons = document.querySelectorAll(".answer-buttons button");

let currentQuestionId = 0;
let score = 0;

function startQuiz() {
  currentQuestionId = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  nextButton.classList.add("hidden");
  nextButton.innerHTML = "Next";

  let currentQuestion = questions[currentQuestionId];
  let questionNo = currentQuestionId + 1;
  question.innerHTML = questionNo + ". " + currentQuestion.question;
  console.log(`Question No: ${questionNo} Question:`, currentQuestion);

  const allAnswers = questions[currentQuestionId].incorrect_answers.concat(
    currentQuestion.correct_answer
  );
  const shuffledAnswers = shuffleArray(allAnswers);

  // remove event listeners for previous question
  removeListeners();
  answerButtons.forEach((button, index) => {
    button.textContent = shuffledAnswers[index];

    // add new event listener
    button.addEventListener("click", clickHandler);
  });
}

function clickHandler() {
  const currentQuestion = questions[currentQuestionId];
  const selectedAnswer = this.textContent;

  if (selectedAnswer === currentQuestion.correct_answer) {
    this.classList.add("correct");
    score += 1;
    console.log(score);
    console.log("Correct");
  } else {
    this.classList.add("wrong");
    console.log("wrong");
  }

  // Disable other buttons
  Array.from(answerButtons).forEach((otherButton) => {
    if (otherButton.textContent === currentQuestion.correct_answer) {
      otherButton.classList.add("correct");
    }
    otherButton.disabled = true;
  });

  //   previousButton.classList.remove("hidden");
  nextButton.classList.remove("hidden");
}

// remove event listeners
function removeListeners() {
  answerButtons.forEach((button) => {
    button.removeEventListener("click", clickHandler);
  });
}

// shuffle answers
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  console.log(shuffled);
  return shuffled;
}

function showScore() {
  resetButtons();
  question.innerHTML = `You scored ${score} / ${questions.length}`;
  nextButton.innerHTML = "Play Again";
}

function resetButtons() {
  //   while (answerButtons.firstChild) {
  //     answerButtons.removeChild(answerButtons.firstChild);
  //   }
  Array.from(answerButtons).forEach((button) => {
    button.classList.remove("correct");
    button.classList.remove("wrong");
    button.disabled = false;
  });
}

function nextQuestion() {
  currentQuestionId += 1;
  if (currentQuestionId < questions.length) {
    showQuestion();
    resetButtons();
  } else {
    showScore();
  }
  console.log(currentQuestionId);
}

nextButton.addEventListener("click", () => {
  if (currentQuestionId < questions.length) {
    nextQuestion();
    // resetButtons();
  } else {
    startQuiz();
  }
});

startQuiz();
