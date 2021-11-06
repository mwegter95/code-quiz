var startButton = document.querySelector(".start-btn");
var answerList = document.querySelector(".answer-options");
questionCounter = 0;
var questions = [];
var answers = [["0"], ["1a", "1b", "1c", "1d"], ["2a", "2b", "2c", "2d"]];



var startButtonHandler = function(event) {
    questionCounter +=1;

    for (i = 0; i < answers[questionCounter].length; i++) {
        var answerOption = document.createElement("li");
        var answerOptionBtn = document.createElement("button");
        answerOption.className = "answer-option";
        answerOptionBtn.textContent = answers[questionCounter][i];
        answerOption.appendChild(answerOptionBtn);
        answerList.appendChild(answerOption);


    }
    
}


startButton.addEventListener("click", startButtonHandler);

