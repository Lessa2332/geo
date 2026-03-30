document.addEventListener('DOMContentLoaded', () => {
    const audioBtn = document.querySelector('#audioBtn');
    const resetBtn = document.querySelector('#resetBtn');
    const video = document.querySelector('#hologramVideo');

    audioBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        audioBtn.innerText = video.muted ? "🔊 ЗВУК" : "🔇 ВИМКНУТИ";
        video.play(); // Важливо для iOS/Android
    });

    resetBtn.addEventListener('click', () => {
        window.resetHologram();
    });
});
