import {Hero, Monster} from "./class.js";

export const key = {
    keyDown: {},
    keyValue: {
        37: 'left',
        39: 'right',
        88: 'attack'
    }
}

export const bulletComProp = {
    launch: false,
    arr: []
};

const gameBackground = {
    gameBox: document.querySelector('.game')
}

export const gameProp = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
};

const renderGame = () => {
    hero.keyMotion();
    setGameBackground();

    bulletComProp.arr.forEach((arr, i) => {
        arr.moveBullet();
    })
    window.requestAnimationFrame(renderGame);
}

const setGameBackground = () => {
    let parallaxValue = Math.min(0, (hero.movex - gameProp.screenWidth / 3) * -1);

    gameBackground.gameBox.style.transform = `translateX(${parallaxValue}px)`;
}

const windowEvent = () => {
    window.addEventListener('keydown', e => {
        key.keyDown[key.keyValue[e.which]] = true;
    });

    window.addEventListener('keyup', e => {
        key.keyDown[key.keyValue[e.which]] = false;
    });

    window.addEventListener('resize', e => {
        gameProp.screenWidth = window.innerWidth;
        gameProp.screenHeight = window.innerHeight;
    })
}

const loadImg = () => {
    const preLoadImgSrc = [
        './images/ninja_attack.png',
        './images/ninja_run.png'
    ];

    preLoadImgSrc.forEach(arr => {
        const img = new Image();
        img.src = arr;
    })
}

export let hero;
export let monster;

const init = () => {
    hero = new Hero('.hero');
    monster = new Monster(500, 9000);
    loadImg();
    windowEvent();
    renderGame();
}

window.onload = () => {
    init();
}