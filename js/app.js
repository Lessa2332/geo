const sceneEl = document.querySelector('a-scene');
const targetEl = document.querySelector('#target-sensor');
const anchorEl = document.querySelector('#world-anchor');
const video = document.querySelector('#hologramVideo');
const statusIndicator = document.querySelector('#status-indicator');

window.startExperience = () => {
    // Ховаємо заставку
    document.querySelector('#overlay').style.display = 'none';
    statusIndicator.style.display = 'block';
    
    // Запускаємо систему MindAR
    const mindarSystem = sceneEl.systems['mindar-image-system'];
    
    // Примусовий запуск через API (це іноді краще працює для задньої камери)
    mindarSystem.start(); 
};

// Коли маркер знайдено
targetEl.addEventListener("targetFound", () => {
    anchorEl.setAttribute('visible', 'true');
    statusIndicator.innerText = "Лисиця на стіні!";
    
    // Примусове відтворення відео
    video.play().catch(e => {
        console.log("Браузер потребує натискання кнопки ЗВУК");
    });

    // Ховаємо напис через 3 секунди
    setTimeout(() => {
        if (anchorEl.getAttribute('visible') === 'true') {
            statusIndicator.style.display = 'none';
        }
    }, 3000);
});

// Коли маркер втрачено
targetEl.addEventListener("targetLost", () => {
    statusIndicator.style.display = 'block';
    statusIndicator.innerText = "Маркер втрачено. Шукаю...";
    // Ми НЕ ховаємо Лисицю відразу (нехай "висить" у повітрі, поки не скинемо)
});

window.resetHologram = () => {
    anchorEl.setAttribute('visible', 'false');
    video.pause();
    video.currentTime = 0;
    statusIndicator.innerText = "Шукаю маркер...";
    statusIndicator.style.display = 'block';
};
