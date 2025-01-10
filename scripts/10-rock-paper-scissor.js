let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoPLaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPLaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playgame(playerMove);
    }, 1000);
    isAutoPLaying = true;
    document.querySelector(".js-auto-play-button").innerHTML = "Stop Playing";
  } else {
    clearInterval(intervalId);
    isAutoPLaying = false;
    document.querySelector(".js-auto-play-button").innerHTML = "Auto Play";
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playgame("rock");
});
document.querySelector(".js-paper-button").addEventListener("click", () => {
  playgame("paper");
});
document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playgame("scissors");
});

document
  .querySelector(".js-reset-score-button")
  .addEventListener("click", () => {
    showResetConfirmation();
  });

document.querySelector(".js-auto-play-button").addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playgame("rock");
  } else if (event.key === "p") {
    playgame("paper");
  } else if (event.key === "s") {
    playgame("scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    showResetConfirmation();
  }
});

function showResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = `
      Are you sure you want to reset the score?
      <button class="js-reset-confirm-yes reset-confirm-button">
        Yes
      </button>
      <button class="js-reset-confirm-no reset-confirm-button">
        No
      </button>
    `;
  document
    .querySelector(".js-reset-confirm-yes")
    .addEventListener("click", () => {
      resetScore();
      hideResetConfirmation();
    });

  document
    .querySelector(".js-reset-confirm-no")
    .addEventListener("click", () => {
      hideResetConfirmation();
    });
}

function hideResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = "";
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

function playgame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove == "rock") {
      result = "You lose.";
    } else if (computerMove == "paper") {
      result = "You win.";
    } else if (computerMove == "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "rock") {
    if (computerMove == "rock") {
      result = "Tie";
    } else if (computerMove == "paper") {
      result = "You lose.";
    } else if (computerMove == "scissors") {
      result = "You win.";
    }
  } else if (playerMove === "paper") {
    if (computerMove == "rock") {
      result = "You win.";
    } else if (computerMove == "paper") {
      result = "Tie.";
    } else if (computerMove == "scissors") {
      result = "You lose.";
    }
  }

  if (result == "You win.") {
    score.wins += 1;
  } else if (result == "You lose.") {
    score.losses += 1;
  } else if (result == "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `You 
        <img src="images/${playerMove}-emoji.png" class="move-icon">  
        <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}
