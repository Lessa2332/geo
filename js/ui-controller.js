document.addEventListener('DOMContentLoaded', () => {
    const audioBtn = document.querySelector('#audioBtn');
    const resetBtn = document.querySelector('#resetBtn');
    const video = document.querySelector('#hologramVideo');

    audioBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        audioBtn.innerText = video.muted ? "🔊 Звук" : "🔇 Вимкнути";
        video.play();
    });

    resetBtn.addEventListener('click', () => {
        if (window.resetHologram) window.resetHologram();
    });
});
