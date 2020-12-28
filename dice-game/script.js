'use strict';

let msg =
  '1. Keep rolling the dice to increase your current score.\n2. If you roll 1 then you lose all your current score and the other player gets chance.\n3. Click HOLD to transfer your current score to your total score and give chance to other player.\n4. Score 100 points to WIN.';
alert(msg);

//storing the elements in variables
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const diceRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let currentPlayer, currentScore, score, playing;

//function to initialize the game state
function initial() {
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  document.querySelector('#name--0').textContent = 'PLAYER 1';
  document.querySelector('#name--1').textContent = 'PLAYER 2';
  currentPlayer = 0; // 0 for player 1 and 1 for player 2
  currentScore = 0;
  score = [0, 0];
  playing = true;
}

initial(); //initialize the state on page load

//dice roll logic function
function logic() {
  let dice = Math.trunc(Math.random() * 6 + 1);
  //display the dice rolled
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  //adding score if 1 is not rolled
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(
      `current--${currentPlayer}`
    ).textContent = currentScore;
  } else {
    playerSwitch();
  }
}

//hold the score
function hold() {
  //add current score to total score of current score
  score[currentPlayer] += currentScore;
  document.getElementById(`score--${currentPlayer}`).textContent =
    score[currentPlayer];
  if (score[currentPlayer] >= 100) {
    playing = false;
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');
    diceEl.classList.add('hidden');
    document.querySelector(`#name--${currentPlayer}`).textContent =
      '🥳 WINNER !';
  } else {
    playerSwitch();
  }
}

//switch the players
function playerSwitch() {
  //if 1 is rolled then give chance to other player and make the current score 0
  currentScore = 0;
  document.getElementById(
    `current--${currentPlayer}`
  ).textContent = currentScore;
  //change the current player
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

diceRoll.addEventListener('click', function () {
  if (playing) {
    logic();
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    hold();
  }
});
btnNew.addEventListener('click', initial);
