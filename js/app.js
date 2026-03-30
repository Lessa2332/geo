const sceneEl = document.querySelector('a-scene');
const targetEl = document.querySelector('#target-sensor');
const anchorEl = document.querySelector('#world-anchor');
const video = document.querySelector('#hologramVideo');

window.startExperience = () => {
    document.querySelector('#overlay').style.display = 'none';
    
    // Запуск системи MindAR з налаштуванням задньої камери
    const mindarSystem = sceneEl.systems['mindar-image-system'];
    
    // Явно вказуємо використовувати задню камеру через обмеження медіа
    const constraints = {
        video: { facingMode: "environment" }
    };

    mindarSystem.start(); 
};

targetEl.addEventListener("targetFound", () => {
    anchorEl.setAttribute('visible', 'true');
    // Примусовий запуск відео при виявленні
    video.play().catch(e => console.log("Чекаємо на клік користувача для звуку"));
});

window.resetHologram = () => {
    anchorEl.setAttribute('visible', 'false');
    video.pause();
    video.currentTime = 0;
};
