var startButton = document.querySelector(".start-btn");
var quizWrapper = document.querySelector(".quiz-wrapper");
var answerList = document.querySelector(".answer-options");
questionCounter = 0;
var min = 2;
var sec = 0;
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
    timerEl = document.querySelector(".timer-element");
    min = parseInt(min);
    sec = parseInt(sec);
    console.log(min);
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
}

var nextQuestion = function() {
    if (questionCounter < (questions.length -1)) {

        // clear old answers from list and clear previous result
        answerList.innerHTML = "";
        document.querySelector(".resultWrapper").innerHTML = ""

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
        return;
    }

}

var answerButtonHandler = function(event) {
    if (event.target.matches(".answer-option-btn")) {
        var answerId = event.target.getAttribute("id");
        console.log(answerId);
        if (answerId == answerKey[questionCounter]) {
            console.log("correct");
            questionAnswered("Correct, nice!");
        } else {
            console.log("incorrect");
            questionAnswered("Incorrect, darn.")
        }
        
    }
}

var questionAnswered = function(msg) {
    var result = document.createElement("div")
    result.innerHTML = "<h3>" + msg + "</h3>";
    result.className = "resultWrapper";
    quizWrapper.appendChild(result);
    setTimeout(nextQuestion, 1000);

}


startButton.addEventListener("click", startButtonHandler);
quizWrapper.addEventListener("click", answerButtonHandler);

