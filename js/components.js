// Приклад компонента для легкого "тремтіння" голограми (ефект перешкод)
AFRAME.registerComponent('hologram-flicker', {
  tick: function (time, deltaTime) {
    if (Math.random() > 0.95) {
      this.el.setAttribute('opacity', Math.random() * 0.5 + 0.5);
    } else {
      this.el.setAttribute('opacity', 0.9);
    }
  }
});
