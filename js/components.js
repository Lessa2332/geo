AFRAME.registerComponent('hologram-flicker', {
  tick: function (time, deltaTime) {
    // Кожні кілька секунд створюємо ефект "глюку"
    if (Math.random() > 0.96) {
      this.el.setAttribute('opacity', Math.random() * 0.4 + 0.4);
    } else {
      this.el.setAttribute('opacity', 0.95);
    }
  }
});
