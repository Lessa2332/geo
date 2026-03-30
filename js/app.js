const sceneEl = document.querySelector('a-scene');
const targetEl = document.querySelector('#target-sensor');
const anchorEl = document.querySelector('#world-anchor');
const video = document.querySelector('#hologramVideo');
const statusIndicator = document.querySelector('#status-indicator');

let isFixed = false;

window.startExperience = () => {
    document.querySelector('#overlay').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('#overlay').style.display = 'none';
        statusIndicator.style.display = 'block';
    }, 500);
    sceneEl.systems['mindar-image-system'].start();
};

targetEl.addEventListener("targetFound", () => {
    if (!isFixed) {
        anchorEl.setAttribute('visible', 'true');
        video.play();
        isFixed = true;
        statusIndicator.innerText = "Лисиця на стіні!";
        setTimeout(() => { statusIndicator.style.display = 'none'; }, 2000);
    }
});

window.resetHologram = () => {
    isFixed = false;
    anchorEl.setAttribute('visible', 'false');
    video.pause();
    video.currentTime = 0;
    statusIndicator.style.display = 'block';
    statusIndicator.innerText = "Шукаю маркер...";
};
