// Select Elements
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQuestions() {
       let myRequest = new XMLHttpRequest();
       /*quiz ajax call*/
       myRequest.onreadystatechange =function(){
              if(this.readyState===4 &&this.status===200){
                     let questionsObject= JSON.parse(this.responseText);
                     let questionsCount = questionsObject.length;
                     createBullets(questionsCount);
                     //Click on submit
                     addQuestionData(questionsObject[currentIndex],questionsCount);
                     submitButton.onclick = () => {
                            
                            //Get Right Answer
                            let theRightAnswer = questionsObject[currentIndex].right_answer;
                            currentIndex++;
                            checkAnswer(theRightAnswer , questionsCount)
                            console.log(theRightAnswer)
                     }
              }
       }
       /*Ajex call */
       myRequest.open("GET","html_questions.json",true);
       myRequest.send();
}
getQuestions();

function createBullets(num) {
       countSpan.innerHTML = num;
       //create bullets
       for(let i=0; i<num; i++){
              let theBullet = document.createElement("span")
              
              if(i===0){
                     theBullet.className="on";
              }
              bulletsSpanContainer.appendChild(theBullet)
       }
}
function addQuestionData(obj,count){
       if (currentIndex < count) {
       //create h2 question title
       let questionTitle = document.createElement("h2");

       //create Question Text
       let questionText=document.createTextNode(obj["title"]);

       //apend text to h2
       questionTitle.appendChild(questionText)
       //apend the h2 to the QuizArea
       quizArea.appendChild(questionTitle)

       //create the answers
       for (let i = 1;i<=4;i++){
              let mainDiv = document.createElement("div");

              //add class to main div
              mainDiv.className="answer";

              let radioInput = document.createElement("input")

              radioInput.name="question";
              radioInput.type="radio";
              radioInput.id=`answer_${i}`;
              radioInput.dataset.answer=obj[`name_${i}`];
              // Make First Option Selected
              if (i === 1) {
                     radioInput.checked = true;
              }

              // Create Label
              let theLabel = document.createElement("label");

              // Add For Attribute
              theLabel.htmlFor = `answer_${i}`;

              // Create Label Text
              let theLabelText = document.createTextNode(obj[`answer_${i}`]);

              // Add The Text To Label
              theLabel.appendChild(theLabelText);

              // Add Input + Label To Main Div
              mainDiv.appendChild(radioInput);
              mainDiv.appendChild(theLabel);

              // Append All Divs To Answers Area
              answersArea.appendChild(mainDiv);
              }
       }
}

function checkAnswer(rAnswer, count) {
       let answers = document.getElementsByName("question");
       let theChoosenAnswer ="";// = radioInput.checked;
       for (let i = 0; i < answers.length; i++) {
              if (answers[i].checked) {
                     theChoosenAnswer = answers[i].dataset.answer;
                     break;
              }
       }
       console.log(`right aswer is : ${rAnswer}`)
       console.log(`Choosen Answer is :${theChoosenAnswer}`)
       if (theChoosenAnswer === "") {
              // handle case where no radio button was selected
              theChoosenAnswer="yousef";
       } else if (rAnswer === theChoosenAnswer) {
              rightAnswers++;
       }
}

