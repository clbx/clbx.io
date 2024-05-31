<template>
  <div class="container">
    <div class="text-pane" :style="{fontFamily: currentFont }">
      <p>This is the text pane. Add your text here.</p>
    </div>
    <div class="canvas-pane">
      <!-- Placeholder for Three.js canvas -->
      <p>This is the canvas pane for Three.js</p>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
export default {
  name: 'SplitPane',
  data() {
    return {
      fonts: ['LeagueSpartan', 'Vercetti', 'Patriot', 'Major Mono Display','Work Sans'], // Add your fonts here
      currentFont: 'Vercetti'
    }
  },
  methods: {
    changeFont() {
      let lastIndex = this.fonts.indexOf(this.currentFont); // Get the last index of the current font
      let randomIndex = Math.floor(Math.random() * this.fonts.length);

      // Ensure the new index is not the same as the last index
      while (randomIndex === lastIndex) {
        randomIndex = Math.floor(Math.random() * this.fonts.length);
      }

      this.currentFont = this.fonts[randomIndex];
    }
  },
  mounted() {
    // Initialize Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    // Get the dimensions of the canvas container
    const canvasPane = this.$el.querySelector('.canvas-pane');
    renderer.setSize(canvasPane.clientWidth, canvasPane.clientHeight);
    canvasPane.appendChild(renderer.domElement);

    // Example Three.js object
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Rendering function
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Render the scene
      renderer.render(scene, camera);
    };

    // Start animation
    animate();

    // Font change interval
    const interval = setInterval(this.changeFont, 1000); // Change font every 1 second
    setTimeout(() => {
      clearInterval(interval); // Stop changing after 5 seconds
      this.currentFont = "LeagueSpartan"; // Settle on a final font
    }, 5000);
  }
}
</script>

<style scoped>

@import "@/assets/fonts.css";
@import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');


.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.text-pane {
  flex: 1;
  background-color: #f8f9fa;
  padding: 20px;
  box-sizing: border-box;
}

.canvas-pane {
  flex: 2;
  background-color: #dee2e6;
  padding: 20px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
</style>
