AFRAME.registerShader('transparent-video', {
  schema: {
    src: { type: 'map' }
  },
  init: function(data) {
    const videoEl = data.src;
    
    // Створюємо текстуру з відео
    this.texture = new THREE.VideoTexture(videoEl);
    this.texture.colorSpace = THREE.SRGBColorSpace; // Стандарт r164
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.format = THREE.RGBAFormat;

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
        precision highp float; // Обов'язково для WebGL2 у нових версіях
        varying vec2 vUv;
        uniform sampler2D texture;
        void main() {
          vec2 uv = vUv;
          // Ліва частина кадру (0.0 - 0.5) - це колір (RGB)
          vec4 color = texture2D(texture, vec2(uv.x * 0.5, uv.y));
          // Права частина кадру (0.5 - 1.0) - це маска (Alpha)
          float alpha = texture2D(texture, vec2(0.5 + uv.x * 0.5, uv.y)).r;
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  },
  tick: function() {
    if (this.texture) {
      this.texture.needsUpdate = true;
    }
  }
});
