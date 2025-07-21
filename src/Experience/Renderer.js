import * as THREE from "three";
import Experience from "./Experience";

export default class Renderer {
  constructor() {
    this.experience = new Experience();

    this.sizes = this.experience.size;
    this.canvas = this.experience.canvas;
    this.scene = this.experience.scene;
    this.mobileSize = this.experience.size.mobileSize;
    this.camera = this.experience.camera.instance;
    this.controls = this.experience.camera.controls;

    this.world = this.experience.world;

    this.setUpRenderer();
  }

  setUpRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      logarithmicDepthBuffer: true,
    });

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }
}
