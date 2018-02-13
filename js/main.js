document.addEventListener('DOMContentLoaded', function() {
  var boardEle = document.querySelector('div.board');
  var turn = 1;
  var statusEle = document.querySelector('p.status');
  var gameOver = false;
  var filledLocations = 0;
  var winningCombinations = [
    // Horizontal wins
    [0,1,2],
    [3,4,5],
    [6,7,8],
    // Veritcal wins
    [0,3,6],
    [1,4,7],
    [2,5,8],
    // Diagonal wins
    [0,4,8],
    [2,4,6]
  ]

  statusEle.innerHTML = "May the best player win!"

  for (var i = 0; i < 9; i++) {
    var locationEle = document.createElement('div');
    locationEle.setAttribute('class', 'location');
    boardEle.append(locationEle);
  }

  var locationNodes = document.querySelectorAll('div.location');

  boardEle.addEventListener('click', function(e) {
    var targetEle = e.target;
    turn++;
    if (!targetEle.innerHTML && !gameOver) {
      if (turn % 2 === 0) {
        targetEle.innerHTML = 'X';
        filledLocations++;
      } else {
        targetEle.innerHTML = 'O';
        filledLocations++;
      }
    }
    function checkWin(combination) {
      first = locationNodes[combination[0]];
      second = locationNodes[combination[1]];
      third = locationNodes[combination[2]];
      if (first.innerHTML && second.innerHTML && third.innerHTML) {
        if (first.innerHTML === second.innerHTML && second.innerHTML === third.innerHTML) {
          statusEle.innerHTML = 'Player ' + locationNodes[combination[0]].innerHTML + " Wins!";
          gameOver = true;
          first.style.backgroundColor = 'green';
          second.style.backgroundColor = 'green';
          third.style.backgroundColor = 'green';
        }
      }
    }
    if (!gameOver) {
      for (var i = 0; i < winningCombinations.length; i++) {
        checkWin(winningCombinations[i]);
      }
      if (filledLocations >= 9) {
        gameOver = true;
        statusEle.innerHTML = "It\'s a Draw!";
      }
    } 

  });
});
