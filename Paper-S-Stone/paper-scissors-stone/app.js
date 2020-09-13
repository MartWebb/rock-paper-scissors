// Global game variables
const RPS = ["rock", "paper", "scissors"];
let randomBotChoice = '';
let playerScore = 0;
let botScore = 0;

// Global DOM variables to access the DOM
const gameBoard = document.querySelector('.game-board');
const roundInformation = document.querySelector('.round-information');
const playerScoreDisplay = document.querySelector('.player-score');
const botScoreDisplay = document.querySelector('.bot-score');
const playerChoiceDisplay = document.querySelector('.player-choice-display');
const botChoiceDisplay = document.querySelector('.bot-choice-display');
const message = document.querySelector('.message');
const startButton = document.querySelector('.start');
const playAgain = document.querySelector('.play-again');
const finalScore = document.querySelector('.final-score');
const imageButton = document.querySelectorAll('img');

// Listens for start button click, then hides the button and calls setUpGame()
startButton.addEventListener('click', () => {
    startButton.style.display = "none";
    setUpGame();
})

// This function is called by the image buttons so the listeners can be removed
// and also calls the botTurn and rountOutcomeHandler functions
const myClickHandler = (event) => {
    playerChoiceDisplay.textContent = `Player chooses ${event.target.className}`;
    botTurn();
    rountOutcomeHandler(event, randomBotChoice);
}

// Sets up the round information and creates an event listener for each imageButton
const setUpGame = () => {
    roundInformation.style.display = "block";
    playerScoreDisplay.textContent = `Your Score: ${playerScore}`;
    botScoreDisplay.textContent = `Bot Score: ${botScore}`;
    message.textContent = `CHOOSE YOUR MOVE ABOVE`;
    imageButton.forEach( button => button.addEventListener('click', myClickHandler));
}

// Picks a random image button from the RPS array then displays the choice
const botTurn = () => {
    const randomNumber = Math.floor(Math.random() * RPS.length);
    randomBotChoice = RPS[randomNumber];
    botChoiceDisplay.textContent = `Bot chooses ${randomBotChoice}`;
    return randomBotChoice;
}

// Decides which player has won the round, and removes listeners if the end of the game
const rountOutcomeHandler = (event, randomBotChoice) => {
    const playerChoice = event.target.className;
    const botChoice = randomBotChoice;
    if(
        (playerChoice.includes("scissors") && botChoice.includes("paper")) ||
        (playerChoice.includes("rock") && botChoice.includes("scissors")) ||
        (playerChoice.includes("paper") && botChoice.includes("rock"))
    )
    { message.textContent = `You Won this round! ${playerChoice} beats ${botChoice}`;
      playerScore++;
      playerScoreDisplay.textContent = `Your Score: ${playerScore}`;}
    
    else if(
        (playerChoice.includes("scissors") && botChoice.includes("rock")) ||
        (playerChoice.includes("rock") && botChoice.includes("paper")) ||
        (playerChoice.includes("paper") && botChoice.includes("scissors")))
    { message.textContent = `You Lost this round! ${botChoice} beats ${playerChoice}`;
      botScore++;
      botScoreDisplay.textContent = `Bot Score: ${botScore}`;}
    else
    {message.textContent = `It's a draw!`;}

    if (playerScore === 5 || botScore === 5) {
        setTimeout(() => {
        //Reveals the end of the game aftter 3 seconds
        decideWinner(botScore, playerScore);
        },2000); 
        removeListeners();
    }
}

// Decides which player has won the game, and hides and displays certain elements.
const decideWinner = (botScore, playerScore) => {
    
    if (playerScore === 5) {
        message.textContent = `You Win the Game!`;
        gameBoard.style.display = "none";
        playAgain.style.display = "block";
        finalScore.style.display = "block";
        finalScore.textContent = `YOU WIN THE GAME BY ${playerScore} - ${botScore}`;
        // removeListeners();
    } else if (botScore === 5) {
        message.textContent = `The Bot Wins the Game!`;
        gameBoard.style.display = "none";
        playAgain.style.display = "block";
        finalScore.style.display = "block";
        finalScore.textContent = `YOU LOSE THE GAME BY ${botScore} - ${playerScore}`;
        // removeListeners();
    }
}

// Removes the imageButton listeners, so they are not duplicated or cannot still be pressed
const removeListeners  = () => {
    imageButton.forEach( button => button.removeEventListener('click', myClickHandler));
}

// Resests all the game information
const resetGame = () => {
    playAgain.style.display = "none";
    finalScore.style.display = "none";
    playerScore = 0;
    botScore = 0;
    gameBoard.style.display = "initial";
    setUpGame();
}

// Listens for playAgain click, then restarts the game
playAgain.addEventListener('click', resetGame);