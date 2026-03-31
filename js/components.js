AFRAME.registerShader('transparent-video', {
  schema: {
    src: { type: 'map' }
  },
  init: function(data) {
    const videoEl = data.src;
    
    // Створюємо відео-текстуру
    this.texture = new THREE.VideoTexture(videoEl);
    
    // Новий стандарт колірного простору для r164
    this.texture.colorSpace = THREE.SRGBColorSpace; 
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
        precision highp float; // КРИТИЧНО: вказуємо точність для мобільних GPU
        
        uniform sampler2D texture;
        varying vec2 vUv;
        
        void main() {
          vec2 uv = vUv;
          // Ліва половина (0.0 - 0.5) — RGB
          vec4 color = texture2D(texture, vec2(uv.x * 0.5, uv.y));
          // Права половина (0.5 - 1.0) — Маска (Alpha)
          float alpha = texture2D(texture, vec2(0.5 + uv.x * 0.5, uv.y)).r;
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  },
  
  // Примусове оновлення кожного кадру (важливо для відео)
  tick: function() {
    if (this.texture) {
      this.texture.needsUpdate = true;
    }
  }
});
