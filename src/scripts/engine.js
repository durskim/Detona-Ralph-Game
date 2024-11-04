const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector ("#time-left"),
        score: document.querySelector ("#score"),
        liveDisplay: document.querySelector ("#lives-count"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,

    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function updateLivesDisplay() {
    state.view.liveDisplay.textContent = `x${state.values.lives}`;
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime; 

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        
        if (state.values.result === 0) {
            state.values.lives--; 
            updateLivesDisplay(); 

            if (state.values.lives <= 0) {
                alert("Game Over! Você perdeu todas as vidas.");
                resetGame(); 
            } else {
                alert("Game Over! O seu resultado foi: " + state.values.result);
                resetRound(); 
            }
        } else {
            alert("Game Over! O seu resultado foi: " + state.values.result);
            resetRound();
        }
    }
}


function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`)
    audio.volume = 0.1;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    });
}

function resetRound() {
    state.values.result = 0; 
    state.values.currentTime = 60; 
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function resetGame() {
    state.values.lives = 3; 
    updateLivesDisplay(); 
    resetRound(); 
}

function initialize() {
    addListenerHitBox();
    addListenerDisplay();
}

initialize(); 