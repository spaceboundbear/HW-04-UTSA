var highScoresList = document.getElementById('highScoresList');
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
var clear = document.getElementById('clear');

highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class='high-score'>${score.name} - ${score.score}</li>`;
  })
  .join('');

var clearScores = document.getElementById('clear');

clearScores.addEventListener('click', function () {
  localStorage.clear();
  highScoresList.style.display = 'none';
});
