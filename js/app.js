const sceneEl = document.querySelector('a-scene');
const targetEl = document.querySelector('#target-sensor');
const anchorEl = document.querySelector('#world-anchor');
const video = document.querySelector('#hologramVideo');
const statusIndicator = document.querySelector('#status-indicator');

let isFixed = false;

window.startExperience = () => {
    const overlay = document.querySelector('#overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        statusIndicator.style.display = 'block';
    }, 500);
    
    sceneEl.systems['mindar-image-system'].start();
};

targetEl.addEventListener("targetFound", () => {
    if (!isFixed) {
        const worldPos = new THREE.Vector3();
        targetEl.object3D.getWorldPosition(worldPos);
        
        anchorEl.object3D.position.copy(worldPos);
        anchorEl.setAttribute('visible', 'true');
        
        video.play();
        isFixed = true;
        statusIndicator.innerText = "Голограма зафіксована";
        setTimeout(() => { statusIndicator.style.display = 'none'; }, 3000);
    }
});

window.resetHologram = () => {
    isFixed = false;
    anchorEl.setAttribute('visible', 'false');
    statusIndicator.style.display = 'block';
    statusIndicator.innerText = "Знову знайдіть маркер";
    video.pause();
    video.currentTime = 0;
};
