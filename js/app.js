// Логіка керування голограмою
const sceneEl = document.querySelector('a-scene');
const targetEl = document.querySelector('#target-sensor');
const anchorEl = document.querySelector('#world-anchor');
const video = document.querySelector('#hologramVideo');
const statusBar = document.querySelector('#status-bar');

let isFixed = false;

// Ініціалізація досвіду
window.startExperience = () => {
    const overlay = document.querySelector('#overlay');
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 500);
    sceneEl.systems['mindar-image-system'].start();
    statusBar.style.display = 'block';
};

// Фіксація при знаходженні
targetEl.addEventListener("targetFound", () => {
    if (!isFixed) {
        const worldPos = new THREE.Vector3();
        targetEl.object3D.getWorldPosition(worldPos);
        
        anchorEl.object3D.position.copy(worldPos);
        anchorEl.setAttribute('visible', 'true');
        
        video.play();
        isFixed = true;
        statusBar.innerText = "Голограма зафіксована";
    }
});

// Скидання позиції
window.resetHologram = () => {
    isFixed = false;
    anchorEl.setAttribute('visible', 'false');
    statusBar.innerText = "Знову знайдіть маркер";
    video.pause();
};
