// questions.js

const questions = [
    {
      _id: "q11",
      quizId: 1, // 关联的 Quiz ID
      type: "multiple-choice",
      title: "What does HTML stand for?",
      points: 10,
      content: "Choose the correct full form of HTML.",
      choices: [
        { text: "Hyper Text Markup Language", isCorrect: true },
        { text: "Home Tool Markup Language", isCorrect: false },
        { text: "Hyperlinks and Text Markup Language", isCorrect: false },
        { text: "High Text Machine Language", isCorrect: false },
      ],
      shuffleChoices: true,
    },
    {
      _id: "q12",
      quizId: 1,
      type: "true-false",
      title: "HTML is a programming language.",
      points: 5,
      content: "State whether the following statement is true or false.",
      correctAnswer: false,
    },
    {
      _id: "q21",
      quizId: 2,
      type: "fill-in-the-blank",
      title: "CSS Property for Text Color",
      points: 8,
      content: "Fill in the blank with the correct CSS property name for setting text color.",
      correctAnswers: ["color"],
    },
    {
      _id: "q31",
      quizId: 3,
      type: "multiple-choice",
      title: "Which keyword is used to define a function in JavaScript?",
      points: 15,
      content: "Select the correct keyword.",
      choices: [
        { text: "func", isCorrect: false },
        { text: "function", isCorrect: true },
        { text: "def", isCorrect: false },
        { text: "lambda", isCorrect: false },
      ],
      shuffleChoices: false,
    },
    {
      _id: "q32",
      quizId: 3,
      type: "true-false",
      title: "JavaScript is a case-sensitive language.",
      points: 10,
      content: "State whether the following statement is true or false.",
      correctAnswer: true,
    },
    {
      _id: "q41",
      quizId: 4,
      type: "fill-in-the-blank",
      title: "Responsive Design Unit",
      points: 5,
      content: "Fill in the blank with the unit commonly used in responsive design.",
      correctAnswers: ["em", "rem", "percent", "%"],
    },
    {
      _id: "q51",
      quizId: 5,
      type: "multiple-choice",
      title: "What is the output of `console.log(typeof null)`?",
      points: 20,
      content: "Select the correct output of the given JavaScript code.",
      choices: [
        { text: "object", isCorrect: true },
        { text: "null", isCorrect: false },
        { text: "undefined", isCorrect: false },
        { text: "string", isCorrect: false },
      ],
      shuffleChoices: true,
    },
  ];
  
  export default questions;
  