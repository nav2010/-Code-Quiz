let clearBtn =document.querySelector("#clear")
function printHighScores() {
    // either get scores from localstorage or set to empty array
    var scores = JSON.parse(window.localStorage.getItem('highscores')) || [];
  
    // sort highscores by score property in descending order
    scores.sort(function (a, b) {
      return b.score - a.score;
    })
  
    scores.forEach(function(newScore){
        
    
      // create li tag for each high score
      let liEl = document.createElement('li');
      liEl.textContent = newScore.initials + " -- " + newScore.score
  
      // display on page
      var olEl = document.getElementById('highscores');
      olEl.appendChild(liEl);
      
    });
  
}
printHighScores(); 
  function clearHighscores() {
    localStorage.removeItem('highscores');
    location.reload();
  }
  
clearBtn.addEventListener("click",clearHighscores)  
 