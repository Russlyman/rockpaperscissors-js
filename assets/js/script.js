const winnerArray = [
  [0, -1, 1],
  [1, 0, -1],
  [-1, 1, 0],
];

const choiceStrings = ['rock', 'paper', 'scissors'];

// Scores
let currentStreakScore = 0;
let highestStreakScore = 0;

document.addEventListener('DOMContentLoaded', function () {
  // Add choice handler function to Rock, Paper and Scissors buttons.
  const userSelectionButtonList = document.querySelectorAll('.user-selection');
  for (let userSelectionButton of userSelectionButtonList) {
    userSelectionButton.addEventListener('click', choiceButtonClickHandler);
  }

  // Find all the HTML elements we want to manipulate.
  const userChoiceParagraph = document.getElementById('user-choice');
  const computerChoiceParagraph = document.getElementById('computer-choice');
  const gameOutcomeParagraph = document.getElementById('game-outcome');
  const currentStreakScoreParagraph = document.getElementById(
    'current-streak-score'
  );
  const highestStreakScoreParagraph = document.getElementById(
    'highest-streak-score'
  );

  // Get current streak score from local storage.
  const currentStreakScoreLocal = localStorage.getItem('current-streak-score');
  if (currentStreakScoreLocal) {
    currentStreakScore = parseInt(currentStreakScoreLocal);
  }
  currentStreakScoreParagraph.innerText = `Current Streak: ${currentStreakScore}`;

  // Get highest streak score from local storage.
  const highestStreakScoreLocal = localStorage.getItem('highest-streak-score');
  if (highestStreakScoreLocal) {
    highestStreakScore = parseInt(highestStreakScoreLocal);
  }
  highestStreakScoreParagraph.innerText = `Highest Streak: ${highestStreakScore}`;

  function computerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    computerChoiceParagraph.innerText = `Computer chose: ${choiceStrings[randomNumber]}`;
    return randomNumber;
  }

  function userChoice(choice) {
    const userChoiceNumber = parseInt(choice);
    userChoiceParagraph.innerText = `You chose: ${choiceStrings[userChoiceNumber]}`;
    return userChoiceNumber;
  }

  function checkWin(player1, player2) {
    const outcome = winnerArray[player1][player2];
    let outcomeText;

    switch (outcome) {
      case 1:
        outcomeText = 'You won!';

        currentStreakScore++;
        localStorage.setItem('current-streak-score', currentStreakScore);
        currentStreakScoreParagraph.innerText = `Current Streak: ${currentStreakScore}`;

        if (currentStreakScore > highestStreakScore) {
          highestStreakScore = currentStreakScore;
          localStorage.setItem('highest-streak-score', highestStreakScore);
          highestStreakScoreParagraph.innerText = `Highest Streak: ${highestStreakScore}`;
        }

        break;

      case 0:
        outcomeText = 'You drew!';
        break;

      case -1:
        outcomeText = 'You lost!';

        currentStreakScore = 0;
        localStorage.setItem('current-streak-score', '0');
        currentStreakScoreParagraph.innerText = `Current Streak: ${currentStreakScore}`;

        break;

      default:
        break;
    }

    gameOutcomeParagraph.innerText = outcomeText;
  }

  function choiceButtonClickHandler() {
    const userPlay = userChoice(this.getAttribute('data-selection'));
    const computerPlay = computerChoice();
    checkWin(userPlay, computerPlay);
  }
});
