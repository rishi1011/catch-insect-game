const startBtn = document.querySelector('.play-game');
const screens = document.querySelectorAll('.screen');
const chooseInsectBtns = document.querySelectorAll('.choose-insect-btn');
const gameContainer = document.getElementById('game-container');
const timeEl = document.querySelector('.time');
const scoreEl = document.querySelector('.score');
const messageEl = document.querySelector('.message');

let selectedInsectImg;
let seconds;
let score;

startBtn.addEventListener('click', () => screens[0].classList.add('up'));

chooseInsectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const img = btn.querySelector('img');
        const src = img.src;
        selectedInsectImg = src;
        screens[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    });
});

function startGame() {
    seconds = 1;
    score = 0;
    setInterval(increaseTime, 1000);
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;

    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;

    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

function createInsect() {
    const div = document.createElement('div');
    div.classList.add('insect');
    const img = document.createElement('img');
    img.src = selectedInsectImg;
    const { x, y } = getPositionOfImage();
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    img.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    div.appendChild(img);

    div.addEventListener('click', catchInsect);

    gameContainer.appendChild(div);
}

function getPositionOfImage() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;

    return { x, y };
}

function catchInsect() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => {
        this.remove();
    }, 1000);
    addInsects();
}

function increaseScore() {
    score++;
    if (score > 19) messageEl.classList.add('visible');
    scoreEl.innerHTML = `Score: ${score}`;
}

function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

