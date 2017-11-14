var curPage = 0,correct = 0;
var myAnswers = [];
var lengthofobject = Object(data.quizcontent).length;

var myHeader = document.getElementById("quizeQuestion");
var classname = document.getElementsByClassName("answer");
var option = document.getElementById("options");
var progressBar = document.getElementById("progressBar");
var nextBtn = document.getElementById("nextBtn");
var priviousBtn = document.getElementById("priviousBtn");
checkPage();

nextBtn.addEventListener("click", moveNext);

priviousBtn.addEventListener("click", moveBack);

function capitalise(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function endQuiz() {
    if ((lengthofobject-1)) {
        var output = "<div class='output'>Quiz Results<BR>";
        var questionResult = "NA";
        //console.log('Quiz Over');
        for (var i = 0; i < myAnswers.length; i++) {
            if (data.quizcontent[i].correct  == myAnswers[i]) {
                questionResult = '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
                correct++;
            } else {
                questionResult = '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>';
            }
            output = output + '<p>Question ' + (i + 1) + ' ' + questionResult + '</p> ';
        }
        output = output + '<p>You scored ' + correct + ' out of ' + lengthofobject + '</p></div> ';
        document.getElementById("quizContent").innerHTML = output;
    } else {
        //console.log('not answered');
    }
}

function checkPage(i) {
    myHeader.innerHTML = data.quizcontent[curPage].question;
    for (var i = 0; i < option.children.length; i++) {
        var curNode = option.children[i];
        curNode.childNodes[0].innerHTML = capitalise(data.quizcontent[curPage]["a"+(i+1)]);
        //check if answered already
        if (myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selAnswer");
        } else {
            curNode.classList.remove("selAnswer");
        }
    }
    ///update progress bar
    var increment = Math.ceil((curPage) / (lengthofobject) * 100);
    progressBar.style.width = (increment) + '%';
    progressBar.innerHTML = (increment) + '%';
    /// add remove disabled buttons if there are no more questions in que
    if (curPage == 0) {
        priviousBtn.classList.add("hide");
    } else {
        priviousBtn.classList.remove("hide");
    }
    if ((curPage + 1) > (lengthofobject)) {
      nextBtn.innerHTML = "Submit Answer";
      nextBtn.addEventListener("click", endQuiz);
    }
}

function moveNext() {
    ///check if an answer has been made
    if (myAnswers[curPage]) {
        //console.log('okay to proceed');
        if (curPage < (lengthofobject - 1)) {
            curPage++;
            checkPage(curPage);

        } else {
            ///check if quiz is completed
            //console.log(curPage + ' ' + myQuiz.length);
            if (lengthofobject >= curPage) {
                endQuiz();
            } else {
                //console.log('end of quiz Page ' + curPage);
            }
        }
    } else {
        //console.log('not answered');
    }
}

function moveBack() {
    if (curPage > 0) {
        curPage--;
        checkPage(curPage);
    }
}

function addBox() {
    for (var i = 0; i < option.children.length; i++) {
        var curNode = option.children[i];
        if (myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selAnswer");
        } else {
            curNode.classList.remove("selAnswer");
        }
    }
}

function myAnswer() {
    var idAnswer = this.getAttribute("data-id");
    /// check for correct answer
    myAnswers[curPage] = idAnswer;
    if (data.quizcontent[curPage].correct == idAnswer) {
        //console.log('Correct Answer');
    } else {
        //console.log('Wrong Answer');
    }
    addBox();
}

for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', myAnswer, false);
}
