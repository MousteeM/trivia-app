fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
  // fetch("https://opentdb.com/api.php?amount=10&category=22")
  .then((response) => response.json())
  .then((data) => {
    const questions = data["results"];

    const question = document.querySelector(".question");
    const answer = document.querySelector(".answer-buttons");
    const nextButton = document.querySelector(".next-btn");
    // const previousButton = document.querySelector(".previous-btn");
    const answerButtons = document.querySelectorAll(".answer-buttons button");

    let currentQuestionId = 0;
    let score = 0;

    function startQuiz() {
      currentQuestionId = 0;
      score = 0;
      showQuestion();
    }

    function showQuestion() {
      //   nextButton.classList.add("hidden");
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
      nextButton.addEventListener("click", () => {
        location.reload();
      });
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
    console.log(questions);
  })
  .catch((error) => console.error(error));
