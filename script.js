'use strict';
//TODO: CHANGE: DEBUG: NOTE:
let scores, currentScore, activePlayer, playing, isComputerGame;

const player00 = document.querySelector('.player--0');
const player01 = document.querySelector('.player--1');
const score00 = document.querySelector('#score--0');
const score01 = document.getElementById('score--1');
const current00 = document.getElementById('current--0');
const current01 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice-container');
const btnNew = document.querySelector('.btn--new'); // start new game with your friend
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewPC = document.querySelector('.btn--new--computer'); //start new game with computer
const playerOrComputer = document.querySelector('#name--1');

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  isComputerGame = false;

  score00.textContent = 0;
  score01.textContent = 0;
  current00.textContent = 0;
  current01.textContent = 0;

  diceEl.innerHTML = '';

  player00.classList.remove('player--winner');
  player01.classList.remove('player--winner');
  player00.classList.add('player--active');
  player01.classList.remove('player--active');

  btnRoll.style.opacity = '1';
  btnHold.style.opacity = '1';
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player00.classList.toggle('player--active');
  player01.classList.toggle('player--active');
  if (isComputerGame && activePlayer === 1) {
    btnRoll.style.opacity = '0.5';
    btnHold.style.opacity = '0.5';
    setTimeout(computerTurn, 500); // Small delay to simulate thinking time
  } else {
    btnRoll.style.opacity = '1';
    btnHold.style.opacity = '1';
  }
};

const rollDice = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

const computerTurn = async function () {
  if (!playing) return;

  const rolls = Math.trunc(Math.random() * 10) + 1;
  for (let i = 0; i < rolls; i++) {
    if (!playing || activePlayer !== 1) return;
    const dice = rollDice();
    diceEl.innerHTML = `<img src='dice-${dice}.png' class='dice'/>`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      return;
    }
    await new Promise(r => setTimeout(r, 700));
  }
  if (playing && activePlayer === 1) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.innerHTML = ``;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
};

btnRoll.addEventListener('click', function () {
  if (playing && (!isComputerGame || activePlayer === 0)) {
    const dice = rollDice();
    diceEl.innerHTML = `<img src='dice-${dice}.png' class='dice'/>`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing && (!isComputerGame || activePlayer === 0)) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.innerHTML = ``;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
  isComputerGame = false;
  playerOrComputer.textContent = 'Player 2';
});

btnNewPC.addEventListener('click', function () {
  init();
  isComputerGame = true;
  playerOrComputer.textContent = 'Robot 🤖';
});

init();

// btnNew.addEventListener('click', function () {
//   init();
//   isComputerGame = false;
//   playerOrComputer.textContent = 'Player 2';
// });

// btnNewPC.addEventListener('click', function () {
//   init();
//   isComputerGame = true;
//   playerOrComputer.textContent = 'Robot 🤖';
// });
// const playerOrComputer = document.querySelector('#name--1');
