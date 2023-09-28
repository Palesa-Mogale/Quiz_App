//This line adds an event listener to the "DOMContentLoaded" event of the document, ensuring that the code inside the function will run when the DOM (Document Object Model) is fully loaded and ready for manipulation.

document.addEventListener("DOMContentLoaded", function () {
  // This line defines a class called QuizApp. The class will encapsulate the functionality for a quiz application.
  class QuizApp {
    // The constructor method is called when an instance of the QuizApp class is created. It initializes the properties and sets up event listeners for the quiz application.
    constructor() {
      this.initializeElements();
      this.initializeEventListeners();
      this.quizArray = [
        {
          id: "0",
          question: "What does 'JS' stand for?",
          options: ["JavaScript", "Just Script", "Java Source", "JScript"],
          correct: "JavaScript",
        },
        {
          id: "1",
          question: "Which of the following is not a data type in JavaScript?",
          options: ["Number", "Boolean", "String", "Float", "Array"],
          correct: "Float",
        },
        {
          id: "2",
          question: "What is the result of 5 + '5' in JavaScript?",
          options: ["10", "55", "Error", "25"],
          correct: "55",
        },
        {
          id: "3",
          question:
            "Which keyword is used to declare a variable in JavaScript?",
          options: ["var", "int", "string", "declare"],
          correct: "var",
        },
        {
          id: "4",
          question: "What is the purpose of the 'if' statement in JavaScript?",
          options: [
            "To declare a function",
            "To perform a loop",
            "To conditionally execute code",
          ],
          correct: "To conditionally execute code",
        },
        {
          id: "5",
          question:
            "Which method is used to add an element to the end of an array?",
          options: ["push()", "append()", "addToEnd()", "insert()"],
          correct: "push()",
        },
        {
          id: "6",
          question: "What is a closure in JavaScript?",
          options: [
            "A way to hide sensitive information",
            "A type of loop",
            "A function that has access to its outer function's scope",
          ],
          correct: "A function that has access to its outer function's scope",
        },
        {
          id: "7",
          question: "What is the purpose of the 'addEventListener' method?",
          options: [
            "To perform mathematical operations",
            "To attach an event handler to an HTML element",
            "To create a new element",
          ],
          correct: "To attach an event handler to an HTML element",
        },
        {
          id: "8",
          question:
            "Which symbol is used to comment a single line in JavaScript?",
          options: ["//", "/*", "--", "##"],
          correct: "//",
        },
        {
          id: "9",
          question: "What is the result of '3' + 2 in JavaScript?",
          options: ["32", "5", "Error", "7"],
          correct: "32",
        },
      ];

      this.restart.addEventListener("click", () => this.resetQuiz());
    }

    //Calls the initializeElements method, which sets up references to various HTML elements that the quiz application will interact with.

    initializeElements() {
      this.timeleft = document.querySelector(".time-left");
      this.quizContainer = document.getElementById("container");
      this.nextBtn = document.getElementById("next-button");
      this.countOfQuestion = document.querySelector(".number-of-count");
      this.displayContainer = document.getElementById("display-container");
      this.scoreContainer = document.querySelector(".score-container");
      this.restart = document.getElementById("restart");
      this.userScore = document.getElementById("user-score");
      this.startScreen = document.querySelector(".start-screen");
      this.startButton = document.getElementById("start-button");

      this.questionCount = 0;
      this.scoreCount = 0;
      this.count = 11;
      this.countdown = null;
    }

    //Calls the initializeEventListeners method, which sets up event listeners for buttons and elements that trigger actions in the quiz application.
    initializeEventListeners() {
      this.nextBtn.addEventListener("click", () => this.nextQuestion());

      this.startButton.addEventListener("click", () => {
        this.startScreen.classList.add("hide");
        this.displayContainer.classList.remove("hide");
        this.startQuiz();
      });

      window.onload = () => {
        this.startScreen.classList.remove("hide");
        this.displayContainer.classList.add("hide");
      };
    }
    //which initiates the quiz by calling the initial method and starting a timer display.
    startQuiz() {
      this.initial();
      this.timerDisplay();
    }
    // displays a countdown timer on the screen.
    timerDisplay() {
      this.countdown = setInterval(() => {
        this.count--;
        this.timeleft.innerHTML = `${this.count}s`;
        if (this.count === 0) {
          clearInterval(this.countdown);
          this.nextQuestion();
        }
      }, 1000);
    }

    //method, which resets the quiz to its initial state, including clearing the quiz container and resetting counts and timers.
    // Inside the initial() method:
    initial() {
      this.quizContainer.innerHTML = "";
      this.questionCount = 0; // Reset the question count to 0
      this.scoreCount = 0;
      this.count = 11;
      clearInterval(this.countdown);
      this.quizCreater();
      this.quizDisplay();
    }

    //which hides the quiz and displays the start screen.
    resetQuiz() {
      this.startScreen.classList.remove("hide");
      this.scoreContainer.classList.add("hide");
      this.questionCount = 0;
    }
    // handles moving to the next question in the quiz, updating the question count, and checking if the quiz is complete.
    nextQuestion() {
      if (this.questionCount >= this.quizArray.length - 1) {
        this.displayContainer.classList.add("hide");
        this.scoreContainer.classList.remove("hide");
        this.userScore.innerHTML = `Your score is ${this.scoreCount} out of ${this.quizArray.length}`;
      } else {
        this.questionCount++;
        this.countOfQuestion.innerHTML = `${this.questionCount + 1} of ${
          this.quizArray.length
        } questions`;
        this.quizDisplay();
        this.count = 11;
        clearInterval(this.countdown);
        this.timerDisplay();
        this.highlightSelectedOption();
      }
    }
    // method, which creates and shuffles the quiz questions and options, and appends them to the quiz container
    quizCreater() {
      this.shuffleQuizArray();
      for (let i = 0; i < this.quizArray.length; i++) {
        const div = this.createQuestionElement(this.quizArray[i]);
        this.quizContainer.appendChild(div);
      }
    }
    //method, which shuffles the order of questions and options randomly.
    shuffleQuizArray() {
      this.quizArray.sort(() => Math.random() - 0.5);
      for (const question of this.quizArray) {
        question.options.sort(() => Math.random() - 0.5);
      }
    }
    //creates HTML elements for displaying a quiz question and its options. It also attaches click event listeners to the options to check the user's answers.
    createQuestionElement(questionData) {
      const div = document.createElement("div");
      div.classList.add("container-mid", "hide");

      const questionDiv = document.createElement("p");
      questionDiv.classList.add("question");
      questionDiv.innerHTML = questionData.question;
      div.appendChild(questionDiv);

      for (const option of questionData.options) {
        const optionButton = document.createElement("button");
        optionButton.classList.add("option-div");
        optionButton.innerText = option;
        optionButton.addEventListener("click", () =>
          this.checkAnswer(option, questionData.correct)
        );
        div.appendChild(optionButton);
      }

      return div;
    }
    //it checks if the selected answer is correct and updates the score accordingly. It also highlights the selected option as correct or incorrect.
    checkAnswer(selectedOption, correctAnswer) {
      if (selectedOption === correctAnswer) {
        this.scoreCount++;
        selectedOption.classList.add("correct");
      } else {
        selectedOption.classList.add("incorrect");
      }
      this.nextQuestion();
    }

    // it hides all quiz question cards and displays the current question card.
    quizDisplay() {
      const quizCards = document.querySelectorAll(".container-mid");
      quizCards.forEach((card) => {
        card.classList.add("hide");
      });
      quizCards[this.questionCount].classList.remove("hide");
    }
  }
  // instance of the QuizApp class is created, which initializes the quiz application when the DOM is fully loaded.
  const quizApp = new QuizApp();
});
