const questions = [
    {
        question : "What is the Capital of France?",
        answer : [
            {  text: "Berlin", correct : false   },
            {  text: "Madrid ", correct : false   },
            {  text: "Paris", correct :  true  },
            {  text: "London", correct :  false  }            
        ]
    },
     {
        question : "Which language runs in the browser?",
        answer : [
            {  text: "Python", correct : false    },
            {  text: "Java", correct :  false },
            {  text: "C++", correct : false   },
            {  text: "JavaScript ", correct :  true  }            
        ]
    },
     {
        question : "What does CSS stands for?",
        answer : [
            {  text: "Central Style Sheet", correct : false },
            {  text: "Cascading Style Sheet", correct :true},
            {  text: "Colorful Style System", correct :false},
            {  text: "Computer Style Sheet", correct :false }            
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answer.forEach( answer => {
        const button =  document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState(){
    nextButton.style.display = "none";
    answerButtons.innerHTML = "";
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}! `;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length ){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();