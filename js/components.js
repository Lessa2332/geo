// Реєстрація кастомного шейдера для Side-by-Side відео (Alpha Mask)
AFRAME.registerShader('transparent-video', {
  schema: {
    src: {type: 'map'}
  },

  init: function (data) {
    // Важливо: беремо саме елемент відео з DOM
    const videoEl = document.querySelector('#hologramVideo');
    
    if (!videoEl) {
      console.error("Помилка: Відео з ID #hologramVideo не знайдено!");
      return;
    }

    this.texture = new THREE.VideoTexture(videoEl);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.format = THREE.RGBAFormat;
    
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        texture: {value: this.texture}
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D texture;
        void main() {
          vec2 uv = vUv;
          // Ліва половина (0.0 - 0.5) — це колір (RGB)
          vec4 color = texture2D(texture, vec2(uv.x * 0.5, uv.y));
          // Права половина (0.5 - 1.0) — це маска прозорості (Alpha)
          float alpha = texture2D(texture, vec2(0.5 + uv.x * 0.5, uv.y)).r;
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  },

  update: function (data) {
    // Оновлюємо текстуру, якщо джерело змінилося
    if (this.texture) {
      this.texture.image = data.src;
    }
  }
});

// Ефект тремтіння голограми
AFRAME.registerComponent('hologram-flicker', {
  tick: function (time, deltaTime) {
    // Випадкові зміни прозорості для ефекту "цифрового глюку"
    if (Math.random() > 0.96) {
      this.el.setAttribute('opacity', Math.random() * 0.4 + 0.4);
    } else {
      this.el.setAttribute('opacity', 0.95);
    }
  }
});
