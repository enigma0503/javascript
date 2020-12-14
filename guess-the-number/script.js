'use strict';
let number = Math.trunc(Math.random() * 20) + 1;
//console.log(number);

document.querySelector('.again').addEventListener('click', tryAgain);

function tryAgain() {
  number = Math.trunc(Math.random() * 20) + 1;
  //console.log(number);
  document.querySelector('.score').textContent = 20;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
}

document.querySelector('.check').addEventListener('click', logic);

document.querySelector('.guess').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    logic();
  }
});

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

function logic() {
  const guessed = Number(document.querySelector('.guess').value);
  //console.log(guessed, typeof guessed);

  //if the number of attempts are left
  if (Number(document.querySelector('.score').textContent) > 0) {
    // if the player clicks the 'Check!' button without entering a number
    if (!guessed) {
      displayMessage('🛑 Enter a number greater than zero');
    }
    if (guessed) {
      //when the player wins
      if (guessed == number) {
        document.querySelector('.number').textContent = number;
        displayMessage('🥳 Correct Number!');
        //change the background color
        document.querySelector('body').style.backgroundColor = '#60b347';

        document.querySelector('.number').style.width = '30rem';
        if (
          Number(document.querySelector('.highscore').textContent) <
          document.querySelector('.score').textContent
        ) {
          document.querySelector(
            '.highscore'
          ).textContent = document.querySelector('.score').textContent;
          displayMessage('🥳 Correct Number!');
        }
      }
      //'\xa0'
      //when the guessed number is not equal to the original number
      else if (guessed !== number) {
        document.querySelector('.message').textContent =
          guessed > number ? '⬆️ Too high!' : '⬇️ Too low!';
        document.querySelector('.score').textContent =
          Number(document.querySelector('.score').textContent) - 1;
      }
      //when the page reloads
      else {
        displayMessage('Start guessing...');
      }
    }
  }
  //if the player can't guess in 20 attempts
  else {
    displayMessage('😞 You lost the game!');
  }
}
