AFRAME.registerShader('transparent-video', {
  schema: {
    src: { type: 'map' }
  },
  init: function(data) {
    const videoEl = data.src;
    this.texture = new THREE.VideoTexture(videoEl);
    
    // Налаштування для версії r164
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.format = THREE.RGBAFormat;

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: this.texture }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform sampler2D uTexture;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          // Колір (ліва частина)
          vec4 color = texture(uTexture, vec2(uv.x * 0.5, uv.y));
          // Маска (права частина)
          float alpha = texture(uTexture, vec2(0.5 + uv.x * 0.5, uv.y)).r;
          
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
