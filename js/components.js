AFRAME.registerShader('transparent-video', {
  schema: {
    src: {type: 'map'}
  },
  init: function (data) {
    const videoEl = document.querySelector('#hologramVideo');
    
    // Створюємо текстуру напряму з елемента
    this.texture = new THREE.VideoTexture(videoEl);
    this.texture.format = THREE.RGBAFormat;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        texture: { value: this.texture }
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
          // Ліва половина - RGB, права - Alpha
          vec4 color = texture2D(texture, vec2(uv.x * 0.5, uv.y));
          float alpha = texture2D(texture, vec2(0.5 + uv.x * 0.5, uv.y)).r;
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  },
  // Додаємо tick, щоб примусово оновлювати текстуру кожного кадру
  tick: function () {
    if (this.texture) {
      this.texture.needsUpdate = true;
    }
  }
});

AFRAME.registerComponent('hologram-flicker', {
  tick: function () {
    if (Math.random() > 0.96) {
      this.el.setAttribute('opacity', Math.random() * 0.5 + 0.3);
    } else {
      this.el.setAttribute('opacity', 0.9);
    }
  }
});
