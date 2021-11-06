var startButton = document.querySelector(".start-btn");
var quizWrapper = document.querySelector(".quiz-wrapper");
var answerList = document.querySelector(".answer-options");
questionCounter = 0;
var min = 2;
var sec = 0;
var stopTime = false;
var scoreKeeper = 0;
var scoreSave = [];
var question = document.querySelector(".question-title");
var questions = [
    "0", 
    "What coding language would you use to make a quiz game on the internet?",
    "What is an example of a conditional?",]
var answers = [
    ["0"], 
    ["EspressoScript", "CappucinoScript", "MochaScript", "JavaScript"], 
    ["2a", "If (result > 0)", "2c", "2d"]];
var answerKey = [0, 3, 1 ]


// go from page with start button to first question
var startButtonHandler = function() {
    // remove startButton and prompt telling you to hit start
    startButton.remove();
    document.querySelector("#start-prompt").remove();
    // show and start timer
    quizTimer();
    questionCounter +=1;
    // display first question
    question.textContent = questions[questionCounter];

    for (i = 0; i < answers[questionCounter].length; i++) {
        var answerOption = document.createElement("li");
        var answerOptionBtn = document.createElement("button");
        answerOption.className = "answer-option";
        answerOptionBtn.className = "answer-option-btn";
        answerOptionBtn.id = i;
        answerOptionBtn.textContent = answers[questionCounter][i];
        answerOption.appendChild(answerOptionBtn);
        answerList.appendChild(answerOption);
    }  
}

var quizTimer = function () {
    var timerEl = document.createElement("div");
    timerEl.className = "timer-element"
    timerEl.innerHTML = "<p>" +"0" + min + ":" + "0" + sec + "</p>"
    quizWrapper.appendChild(timerEl);
    timerCycle();
}

var timerCycle = function() {

    if (stopTime == false) {
        timerEl = document.querySelector(".timer-element");
        min = parseInt(min);
        sec = parseInt(sec);
        if (sec == 0 && min != 0) {
            min = min - 1;
            sec = sec + 59;
        } else if (sec == 0 && min == 0) {
            timeIsOut();
        } else {
            sec = sec - 1;
        }
        if (sec < 10 || sec == 0) {
            sec = '0' + sec;
            }
        if (min < 10 || min == 0) {
            min = '0' + min;
        } 
        timerEl.innerHTML = min + ":" + sec;
        
        setTimeout("timerCycle()", 1000);
        } else {
            return;
        }
}

var nextQuestion = function() {
    if (questionCounter < (questions.length -1)) {

        // clear old answers from list and clear previous result
        answerList.innerHTML = "";
        document.querySelector(".result-wrapper").innerHTML = ""

        questionCounter += 1;
        question.textContent = questions[questionCounter];

        for (i = 0; i < answers[questionCounter].length; i++) {
            var answerOption = document.createElement("li");
            var answerOptionBtn = document.createElement("button");
            answerOption.className = "answer-option";
            answerOptionBtn.className = "answer-option-btn";
            answerOptionBtn.id = i;
            answerOptionBtn.textContent = answers[questionCounter][i];
            answerOption.appendChild(answerOptionBtn);
            answerList.appendChild(answerOption);
        }
    } else {
        showScores();
    }

}

var answerButtonHandler = function(event) {
    if (event.target.matches(".answer-option-btn")) {
        var answerId = event.target.getAttribute("id");

        if (answerId == answerKey[questionCounter]) {
            scoreKeeper += 100;
            questionAnswered("Correct, nice! +100 pts");
        } else {
            questionAnswered("Incorrect, darn. +0 pts")
        }
        
    }
}

var questionAnswered = function(msg) {
    result = document.querySelector(".result-wrapper");
    if (!result) {
        var result = document.createElement("div")
    }
    result.innerHTML = "<h3>" + msg + "</h3>";
    result.className = "result-wrapper";
    quizWrapper.appendChild(result);
    setTimeout(nextQuestion, 1000);

}

var showScores = function() {
    stopTime = true;
    console.log(scoreKeeper);
    // clear old answers from list and clear previous result and clear question
    answerList.innerHTML = "";
    var result = document.querySelector(".result-wrapper");
    result.innerHTML = "";
    question.innerHTML="";

    // create initials form
    var initialsForm = document.createElement("form");
    initialsForm.className = "initials-form"
    initialsForm.innerHTML = "<input type='text' name='initials' placeholder='Enter your initials'></input>"
    var formButton = document.createElement("button");
    formButton.className = "btn";
    formButton.id = "save-initials";
    formButton.type = "submit"
    formButton.textContent = "Save";
    initialsForm.appendChild(formButton);
    quizWrapper.appendChild(initialsForm);
    initialsForm.addEventListener("submit", initialsSubmitHandler);

}
var initialsSubmitHandler = function(event) {
    event.preventDefault();
    console.log("submitted");
}


startButton.addEventListener("click", startButtonHandler);
quizWrapper.addEventListener("click", answerButtonHandler);
quizWrapper.addEventListener("submit", initialsSubmitHandler);

