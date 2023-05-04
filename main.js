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
                     countdown(5,questionsCount);


                     submitButton.onclick = () => {
                            clearInterval(countdownInterval)
                            countdown(5,questionsCount);
                            //Get Right Answer
                            let theRightAnswer = questionsObject[currentIndex].right_answer;
                            currentIndex++;
                            checkAnswer(theRightAnswer , questionsCount)
                            console.log(theRightAnswer)
                            // remove old question and answer area
                            quizArea.innerHTML = "";
                            answersArea.innerHTML = "";
                            addQuestionData(questionsObject[currentIndex],questionsCount);
                            //handle bullets class
                            handleBullets();
                            //show Results
                            showResults(questionsCount);
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
              radioInput.dataset.answer=obj[`answer_${i}`];
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
       if (rAnswer === theChoosenAnswer) {
              rightAnswers++;
              console.log("good")
       }
}
function handleBullets(){
       let bulletsSpan = document.querySelectorAll(".bullets .spans span");
       let arrayOfSpans = Array.from(bulletsSpan);
       arrayOfSpans.forEach((span ,index)=>{
              if(currentIndex===index){
                     span.className='on'
              } else{
                     span.classList.remove("on");
              }
       }
       )
       // for(let i=0;i<currentIndex;i++){
       //        arrayOfSpans.span.className.remove()
       // }
       
       
}


function showResults(count){
       let theResults;
       if(currentIndex === count){
              console.log("oooooo")
              quizArea.remove();
              answersArea.remove();
              submitButton.remove();
              bullets.remove();
              if (rightAnswers > count / 2 && rightAnswers < count) {
                     theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
              } else if (rightAnswers === count) {
                     theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
              } else {
                     theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
              }
              
              resultsContainer.innerHTML = theResults;
              resultsContainer.style.padding = "10px";
              resultsContainer.style.backgroundColor = "white";
              resultsContainer.style.marginTop = "10px";
              
       }
}
function countdown(duration ,count){
       if(currentIndex<count){
              let minutes ,seconds;
              countdownInterval=setInterval(function(){
                     minutes = parseInt(duration / 60);
                     seconds = parseInt(duration % 60);

                     
                     minutes = minutes < 10 ? `0${minutes}` : minutes;
                     seconds = seconds < 10 ? `0${seconds}` : seconds;

                     countdownElement.innerHTML=`${minutes} : ${seconds}`;

                     if (--duration < 0) {
                            clearInterval(countdownInterval);
                            submitButton.click();
                     }
              },1000);
       }
}