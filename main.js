function getQuestions(){
       let myRequest = new XMLHttpRequest();
       /*quiz ajax call*/
       myRequest.onreadystatechange =function(){
              if(this.readyState===4 &&this.status===200){
                     let questionsObject= JSON.parse(this.responseText)
                     console.log(this.responseText)
              }
       }
       /*Ajex call */
       myRequest.open("GET","html_questions.json",true);
       myRequest.send();
}
getQuestions();