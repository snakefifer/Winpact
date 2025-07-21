import Experience from "./Experience";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
  constructor() {
    this.experience = new Experience();

    this.debug = this.experience.debug;

    this.canvas = this.experience.canvas;
    this.scene = this.experience.scene;
    this.size = this.experience.size;
    this.fov = {
      x: this.size.width > 678 ? 45 : 75,
    };

    this.setInstance();
  }

  setInstance() {
    this.instanceGroup = new THREE.Group();
    this.scene.add(this.instanceGroup);
    this.instance = new THREE.PerspectiveCamera(
      this.fov.x,
      this.size.width / this.size.height,
      0.01,
      100
    );
    this.instanceGroup.add(this.instance);

    this.instance.position.set(0, 0, 8);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    //? controls limitations
  }

  resize() {
    this.instance.aspect = this.size.width / this.size.height;

    this.instance.updateProjectionMatrix();
  }

  update() {
    // this.controls.update();
  }

  debugActive() {
    this.cameraDebug = this.debug.gui.addFolder("camera");
  }
}
