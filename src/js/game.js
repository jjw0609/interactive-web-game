import {Hero, Monster} from "./class.js";
import {greenMon, greenMonBoss, pinkMon, pinkMonBoss, yellowMon, yellowMonBoss} from "./monster.js";

export const key = {
    keyDown: {},
    keyValue: {
        37: 'left',
        39: 'right',
        88: 'attack'
    }
}

export const allMonsterComProp = {
    arr: []
};

export const bulletComProp = {
    launch: false,
    arr: []
};

const gameBackground = {
    gameBox: document.querySelector('.game')
}

export const gameProp = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    gameOver: false
};

const renderGame = () => {
    hero.keyMotion();
    setGameBackground();

    bulletComProp.arr.forEach((arr, i) => {
        arr.moveBullet();
    })

    allMonsterComProp.arr.forEach((arr, i) => {
        arr.moveMonster();
    })

    window.requestAnimationFrame(renderGame);
}

export const endGame = () => {
    gameProp.gameOver = true;
    key.keyDown.left = false;
    key.keyDown.right = false;
    document.querySelector('.game_over').classList.add('active');
}

const setGameBackground = () => {
    let parallaxValue = Math.min(0, (hero.movex - gameProp.screenWidth / 3) * -1);

    gameBackground.gameBox.style.transform = `translateX(${parallaxValue}px)`;
}

const windowEvent = () => {
    window.addEventListener('keydown', e => {
        if(!gameProp.gameOver) key.keyDown[key.keyValue[e.which]] = true;
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
    // allMonsterComProp.arr[0] = new Monster(greenMonBoss, gameProp.screenWidth + 700);
    // allMonsterComProp.arr[1] = new Monster(yellowMonBoss, gameProp.screenWidth + 1400);
    // allMonsterComProp.arr[2] = new Monster(pinkMonBoss, gameProp.screenWidth + 2100);

    for(let i=0 ; i<=10 ; i++) {
        if(i === 10) {
            allMonsterComProp.arr[i] = new Monster(greenMonBoss, gameProp.screenWidth + 600 * i);
        } else {
            allMonsterComProp.arr[i] = new Monster(greenMon, gameProp.screenWidth + 700 * i);
        }
    }

    loadImg();
    windowEvent();
    renderGame();
}

window.onload = () => {
    init();
}