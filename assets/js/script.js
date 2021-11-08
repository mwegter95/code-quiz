var startButton = document.querySelector(".start-btn");
var quizWrapper = document.querySelector(".quiz-wrapper");
var answerList = document.querySelector(".answer-options");
questionCounter = 0;
var min = 2;
var sec = 0;
var stopTime = false;
var scoreKeeper = 0;
var scoreSave = [];
var scoreSaveOrdered = [];
var finalPlayerAndScore = [];
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

var timeIsOut = function () {
    alert("Your time ran out!");
    showScores();
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
            questionAnswered("Incorrect, darn. +0 pts, -20 seconds")
            sec = sec - 20;
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

    // show the score
    var showTheScore = document.createElement("span");
    showTheScore.id = "player-score"
    var totalScore = scoreKeeper + parseInt(min*60) + parseInt(sec);
    showTheScore.textContent = "Your score: " + totalScore;
    var pageContentEl = document.querySelector(".page-content");
    pageContentEl.appendChild(showTheScore);

    // create initials form
    var initialsForm = document.createElement("form");
    initialsForm.className = "initials-form"
    initialsForm.innerHTML = "<input id='initials' type='text' name='initials' placeholder='Enter your initials'></input>"
    var formButton = document.createElement("button");
    formButton.className = "btn";
    formButton.id = "save-initials";
    formButton.type = "submit"
    formButton.textContent = "Save";
    initialsForm.appendChild(formButton);
    quizWrapper.appendChild(initialsForm);


    // add scores ol
    var scoresOl = document.createElement("ol");
    scoresOl.className = "score-display"
    quizWrapper.appendChild(scoresOl);

    // load scores from localStorage
    loadHiScores();

    // // show scores that are saved
    // for (i = 0; i < scoreSave.length; i++) {
    //     score = scoreSave[i];
    //     createHiScore(score);
    // }

}

// logic to add score and initials to scoreSave, then call saveHiScores
var initialsSubmitHandler = function(event) {
    event.preventDefault();
    console.log("submitted");
    console.log(event);
    finalPlayerAndScore[0] = document.querySelector("input[id='initials']").value;
    finalPlayerAndScore[1] = scoreKeeper + parseInt(min*60) + parseInt(sec);
    console.log(finalPlayerAndScore);
    scoreSave.push(finalPlayerAndScore);
    console.log(scoreSave);
    scoreSaveOrdered = scoreSave.sort(function(a, b) {
        return b[1] - a[1];
    });

    console.log(scoreSaveOrdered);
    // add call saveHiScores
    saveHiScores();

    loadHiScores();

}

var saveHiScores = function() {
    localStorage.setItem("scoreSave", JSON.stringify(scoreSave));
    console.log("hi-scores saved");
}

var loadHiScores = function () {
    var savedScores = (localStorage.getItem("scoreSave"));
    // if there are no saved scores, return out of function
    if (!savedScores) {
        return false;
    }
    // else, load up saved scores
    console.log("Saved scores found!");
    // parse into array of objects
    scoreSave = JSON.parse(savedScores);
    scoreSaveOrdered = scoreSave.sort(function(a, b) {
        return b[1] - a[1];
    });
    var scoresOl = document.querySelector(".score-display")
    scoresOl.innerHTML = "";
    // loop through savedScores array and pass to createHiScore 
    // function to show on page
    for (var i = 0; i < scoreSaveOrdered.length; i++) {
        createHiScore(scoreSaveOrdered[i]);
    }


}

var createHiScore = function(score) {
    var hiScoreEl = document.createElement("li");
    hiScoreEl.className = "hi-score-li";
    hiScoreEl.textContent = score[0] + " " + score[1];
    var scoresOl = document.querySelector(".score-display");
    scoresOl.appendChild(hiScoreEl);



}


startButton.addEventListener("click", startButtonHandler);
quizWrapper.addEventListener("click", answerButtonHandler);
quizWrapper.addEventListener("submit", initialsSubmitHandler);

