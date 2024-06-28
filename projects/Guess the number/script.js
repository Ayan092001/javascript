const randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guesses = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

let p = document.createElement('button');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if(playGame){
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess){
  if(isNaN(guess)){
    alert('Please enter a valid number');
  }else if (guess < 1){
    alert('PLease enter a number more than 1');
  }else if (guess > 100){
    alert('PLease enter a  number less than 100');
  }else {
    prevGuess.push(guess);
    if (numGuess === 11){
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`);
      endGame();
    }else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}
 
function checkGuess(guess){
  if (guess === randomNumber){
    displayMessage('You guessed it right');
    endGame();
  }else if (guess < randomNumber){
    displayMessage('Number is TOOO low');
  }else if (guess > randomNumber){
    displayMessage('Number is TOOO High');
  }
}

function displayGuess(guess){
   userInput.value = '';
   guesses.innerHTML += `${guess}, `;
   numGuess++;
   remaining.innerHTML = `${11 - numGuess}`;
   if(numGuess === 11){
     endGame();
   }
}

function displayMessage(message){
   lowHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame(){
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.setAttribute('id', 'newGame')
  p.innerHTML = `Start new game`;
  startOver.appendChild(p);
  playGame = false;
  startGame();
}

function startGame(){
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guesses.innerHTML = '';
    remaining.innerHTML = `${11 - numGuess} `;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);

    playGame = true;
  });
}