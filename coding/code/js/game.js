const key = {
    keyDown: {},
    keyValue: {
        37: 'left',
        39: 'right',
        38: 'up'
    }
}

const windowEvent = () => {
    window.addEventListener('keydown', e => {
        key.keyDown[key.keyValue[e.which]] = true;
        console.log(key.keyDown);
    });

    window.addEventListener('keyup', e => {
        key.keyDown[key.keyValue[e.which]] = false;
    });
}

const init = () => {
    windowEvent();
}

window.onload = () => {
    init();
}