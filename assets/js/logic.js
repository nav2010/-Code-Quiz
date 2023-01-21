

const startscreen = document.querySelector("#start-screen");
const questions = document.querySelector("#questions");
const startBtn=document.querySelector('#start');
const time =document.querySelector("#time");
let timerCount=60;
let timer;


// hide all 

function hide(){
    startscreen.setAttribute("hidden",true);
    questions.setAttribute("hidden",true);
    startBtn.setAttribute("hidden",true);
}
function quizstart(){
  hide();
  questions.removeAttribute("class");
  timer=setInterval(()=>{
    time.textContent=timerCount;
    timerCount--;
  
  },1000);
}
startBtn.addEventListener("click",quizstart);

function retrievequation (){

}


