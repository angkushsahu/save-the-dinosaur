let score = 0;
let cross = true;

const audio = new Audio("./assets/images/music.mp3");
const  audioGameOver = new Audio("./assets/images/gameover.mp3");

setTimeout(() => {
    audio.play();
}, 100);

document.onkeydown = function(e) {
    if (e.keyCode == 38) {
        const dino = document.getElementById("dino");
        dino.classList.add("animateDino");
        setTimeout(() => {
            dino.classList.remove("animateDino");
        }, 800);
    }
    
    if (e.keyCode == 39) {
        const dino = document.getElementById("dino");
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = (dinoX + 112) + "px";
    }
    
    if (e.keyCode == 37) {
        const dino = document.getElementById("dino");
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    const dino = document.getElementById("dino");
    const gameOver = document.getElementById("gameOver");
    const obstacle = document.getElementById("obstacle");

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("top"));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.style.visibility = "visible";
        obstacle.classList.remove("obstacleAny");
        audioGameOver.play();
        setTimeout(() => {
            audio.pause();
            audioGameOver.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score = score + 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
            let newDur = aniDur - 0.01;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 100);

function updateScore(score) {
    document.getElementById("scoreContainer").innerText = "Your score: " + score;
}