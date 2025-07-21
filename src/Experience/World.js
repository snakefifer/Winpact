import * as THREE from "three";
import Experience from "./Experience";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import gsap from "gsap";
export default class World {
  constructor() {
    this.experience = new Experience();

    this.debug = this.experience.debug;
    this.size = this.experience.size;
    this.time = this.experience.time;

    this.scene = this.experience.scene;
    this.sizes = this.experience.size;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera.instance;
    this.controls = this.experience.camera.controls;

    this.mobileSize = this.size.mobileSize;

    this.formActive = false;

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    this.ringActive = false;

    this.debugSettings = {
      objectActive: true,
      myProperty: () => {
        if (this.scene.background) {
          this.scene.background = false;
        } else {
          this.scene.background = this.environmentTexture;
        }
      },

      stopObjectRotation: () => {
        if (this.debugSettings.objectActive) {
          this.debugSettings.objectActive = false;
        } else {
          this.debugSettings.objectActive = true;
        }
      },
    };

    //? RAYCASTER
    this.rayCaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.intersectObjects = [];
    this.currentIntersects = null;
    this.clicked = false;

    document.addEventListener("click", (e) => {
      this.clicked = true;
    });

    window.addEventListener("mousemove", (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    this.setUpScene();
  }

  setUpScene() {
    this.resources.on("resourcesReady", () => {
      window.scrollTo(0, 0);
      this.environmentTexture = this.resources.items.environmentTexture;
      this.scene.environmentIntensity = 2;
      this.environmentTexture.SRGBColorSpace = THREE.SRGBColorSpace;
      this.scene.environment = this.environmentTexture;

      this.lockerTexture = this.resources.items.lockerTexture;
      this.lockerTexture.flipY = false;
      this.lockerTexture.colorSpace = THREE.SRGBColorSpace;

      this.jerseyLockerTexture = this.resources.items.jerseyLockerTexture;
      this.jerseyLockerTexture.flipY = false;
      this.jerseyLockerTexture.colorSpace = THREE.SRGBColorSpace;

      this.wallTexture = this.resources.items.wallTexture;
      this.wallTexture.flipY = false;
      this.wallTexture.colorSpace = THREE.SRGBColorSpace;

      this.wordTextureLarge = this.resources.items.wordTextureLarge;
      this.wordTextureLarge.flipY = false;
      this.wordTextureLarge.colorSpace = THREE.SRGBColorSpace;

      this.wordTextureSmall = this.resources.items.wordTextureSmall;
      this.wordTextureSmall.flipY = false;
      this.wordTextureSmall.colorSpace = THREE.SRGBColorSpace;

      this.nameTexture = this.resources.items.nameTexture;
      this.nameTexture.flipY = false;
      this.nameTexture.colorSpace = THREE.SRGBColorSpace;

      this.buttonTexture = this.resources.items.buttonTexture;
      this.buttonTexture.flipY = false;
      this.buttonTexture.colorSpace = THREE.SRGBColorSpace;

      this.eagleTexture = this.resources.items.eagleTexture;
      this.eagleTexture.flipY = false;
      this.eagleTexture.colorSpace = THREE.SRGBColorSpace;

      //! fog
      // this.scene.fog = new THREE.Fog(0xffffff, 5, 15);
      this.wallMaterial = new THREE.MeshBasicMaterial({
        map: this.wallTexture,
      });

      this.normalLockerMaterial = new THREE.MeshBasicMaterial({
        map: this.lockerTexture,
      });

      this.jerseyLockerMaterial = new THREE.MeshBasicMaterial({
        map: this.jerseyLockerTexture,
      });

      this.glassMaterial = new THREE.MeshPhysicalMaterial({
        transmission: 1,
        opacity: 1,
        roughness: 0,
        metalness: 0,
        ior: 5,
        thickness: 10,
        envMapIntensity: 1,
      });

      this.wordMaterial = new THREE.MeshBasicMaterial({
        map: this.wordTextureLarge,
        transparent: true,
      });

      if (this.size.mobileSize) {
        this.wordMaterial.map = this.wordTextureSmall;
      }

      this.cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshStandardMaterial({ metalness: 1, roughness: 0.2 })
      );
      this.cube.rotation.y = Math.PI * 1.25;
      // this.scene.add(this.cube);

      //? RING MODEL

      this.ringModel = this.resources.items.ringModel;
      this.ringModel.scene.traverse((e) => {
        if (e.type === "Mesh") {
          if (e.name.startsWith("glass")) {
            this.glass = e;
            e.material = this.glassMaterial;
          }
        }
      });
      if (this.mobileSize) {
        this.ringModel.scene.position.y = 0.5;
      }
      this.ringModel.scene.scale.set(-0.5, -0.5, -0.5);
      this.ringModel.scene.rotation.y = Math.PI * 2;
      this.scene.add(this.ringModel.scene);

      //? RING MODEL ANIMATION
      this.loadInAnimation = gsap.timeline();
      this.loadInAnimation
        .to(this.ringModel.scene.scale, {
          x: 1.2,
          y: 1.2,
          z: 1.2,
          duration: 2,
          ease: "power1.out",
          // ease: "back.inOut(1.2)",

          // delay: 2,
        })
        .to(
          this.ringModel.scene.rotation,
          {
            y: 0,
            duration: 2,
            ease: "back.inOut(1.2)",
          },
          "<"
        );

      //? LOCKER MODEL
      this.lockerModel = this.resources.items.lockerModel;
      this.lockerModel.scene.traverse((e) => {
        if (e.type === "Mesh") {
          if (e.name.startsWith("locker")) {
            e.material = this.normalLockerMaterial;
          }

          if (e.name.startsWith("jersey")) {
            e.material = this.jerseyLockerMaterial;
          }

          if (e.name.startsWith("wall")) {
            e.material = this.wallMaterial;
          }

          if (e.name.startsWith("word")) {
            e.material = this.wordMaterial;
          }

          if (e.name.startsWith("name")) {
            e.material = new THREE.MeshBasicMaterial({
              map: this.nameTexture,
              // color: 0xff0000,
            });
          }
          if (e.name.startsWith("logo")) {
            e.material = new THREE.MeshBasicMaterial({
              map: this.eagleTexture,
              transparent: true,
            });
          }

          if (e.name.startsWith("chair_logo")) {
            e.material = new THREE.MeshBasicMaterial({
              map: this.eagleTexture,
              transparent: true,
            });
          }

          if (e.name.startsWith("raffle")) {
            this.intersectObjects.push(e);
            e.material = new THREE.MeshBasicMaterial({
              map: this.buttonTexture,
              transparent: true,
              // color: 0xff0000,
            });
          }
        }
      });
      this.scene.add(this.lockerModel.scene);

      this.lockerModel.scene.position.y = -1;
      if (this.mobileSize) {
        this.lockerModel.scene.position.y = -2.35;
      }

      //? scroll animations
      this.firstSectionTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: ".first-section",
          start: "top top",
          end: "center 300px",
          // markers: true,
          scrub: 1,
        },
      });

      this.firstSectionTimeline.to(".first-section", {
        opacity: 0,
        pointerEvents: "none",
      });

      this.cameraTimeline = new gsap.timeline({
        scrollTrigger: {
          trigger: ".first-section",
          start: "top top",
          end: "bottom .second-heading",
          // markers: true,
          scrub: 1,
        },
      });

      //? how scroll trigger will work if the device is bigger than 1350px
      this.mm = gsap.matchMedia();

      this.mm.add("(min-width:1100px)", () => {
        this.cameraTimeline
          .to(this.camera.position, {
            y: -11,
          })
          .to(this.camera.position, {
            z: 4,
          });
      });

      this.mm.add("(max-width:1024px)", () => {
        this.cameraTimeline
          .to(this.camera.position, {
            y: -12,
          })
          .to(this.camera.position, {
            z: 3.25,
          });
      });

      //! event listeners
      document.querySelector(".ring-buttons").addEventListener("click", (e) => {
        // this.ringActive = false;
        if (e.target.classList.contains("top")) {
          gsap.to(this.ringModel.scene.rotation, {
            // y: -Math.PI,
            y: 0,
            x: 0,
            z: 0,
            duration: 1,
            ease: "back.inOut(2)",
          });
          // gsap.to(".hider", {
          //   top: 0,
          //   duration: 0.5,
          //   ease: "power1.out",
          //   onComplete: () => {
          //     document.querySelector(".info-content").textContent =
          //       "Customize the RING as you like!";
          //     gsap.to(".hider", {
          //       top: "100%",
          //       duration: 0.5,
          //       ease: "power1.out",
          //       delay: 0.35,
          //     });
          //   },
          // });
        } else if (e.target.classList.contains("right")) {
          gsap.to(this.ringModel.scene.rotation, {
            // y: -Math.PI,
            y: 0,
            x: -Math.PI / 2,
            z: -Math.PI / 2,
            duration: 1,
            ease: "back.inOut(2)",
          });

          gsap.to(".hider", {
            top: 0,
            duration: 0.5,
            ease: "power1.out",
            onComplete: () => {
              document.querySelector(".info-content").textContent =
                "Write a custom message to the ring!";
              gsap.to(".hider", {
                top: "100%",
                duration: 0.5,
                ease: "power1.out",
                delay: 0.35,
              });
            },
          });
        } else if (e.target.classList.contains("left")) {
          gsap.to(this.ringModel.scene.rotation, {
            // y: -Math.PI,
            y: 0,

            x: -Math.PI / 2,
            z: Math.PI / 2,
            duration: 1,
            ease: "back.inOut(2)",
          });

          // gsap.to(".hider", {
          //   top: 0,
          //   duration: 0.5,
          //   ease: "power1.out",
          //   onComplete: () => {
          //     document.querySelector(".info-content").textContent =
          //       "Add a custom name to it!";
          //     gsap.to(".hider", {
          //       top: "100%",
          //       duration: 0.5,
          //       ease: "power1.out",
          //       delay: 0.35,
          //     });
          //   },
          // });
        } else if (e.target.classList.contains("bottom")) {
          gsap.to(this.ringModel.scene.rotation, {
            y: 0,
            z: 0,
            x: -Math.PI / 0.835,
            duration: 1,
            ease: "back.inOut(2)",
          });
          // gsap.to(".hider", {
          //   top: 0,
          //   duration: 0.5,
          //   ease: "power1.out",
          //   onComplete: () => {
          //     document.querySelector(".info-content").textContent =
          //       "Add specific dates to the ring!";
          //     gsap.to(".hider", {
          //       top: "100%",
          //       duration: 0.5,
          //       ease: "power1.out",
          //       delay: 0.35,
          //     });
          //   },
          // });
        }
      });

      document.querySelector(".close-button").addEventListener("click", (e) => {
        this.formActive = false;
        document.querySelector(".form-container").style.display = "none";
        document.querySelector("body").style.overflowY = "auto";
      });
    });
  }
  setUpLights() {
    //? lighting
    this.ambientLight = new THREE.AmbientLight(0xf5f5f5, 3);
    // this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 1024;
    this.directionalLight.shadow.mapSize.height = 1024;

    this.directionalLight.shadow.camera.near = 4;
    this.directionalLight.shadow.camera.far = 20;
    this.directionalLight.position.set(8.5, 6.8, -6.7);

    this.directionalLightHelper = new THREE.CameraHelper(
      this.directionalLight.shadow.camera
    );

    this.scene.add(this.directionalLight);
  }

  debugActive() {
    if (this.experience.debug.active) {
      this.worldFolder = this.experience.debug.gui.addFolder("world-Debug");
    }
  }

  resize() {
    if (this.size.mobileSize) {
      this.wordMaterial.map = this.wordTextureSmall;
    } else {
      this.wordMaterial.map = this.wordTextureLarge;
    }
  }

  update() {
    //? updating points inside the scene

    if (this.rayCaster) {
      this.rayCaster.setFromCamera(this.pointer, this.camera);
      this.intersects = this.rayCaster.intersectObjects(this.intersectObjects);

      if (this.intersects.length) {
        if (!this.formActive) {
          document.body.style.cursor = "pointer";

          this.currentIntersect = this.intersects[0];

          gsap.to(this.currentIntersect.object.scale, {
            x: 1.15,
            y: 1.15,
            z: 1.15,
          });
          if (this.clicked) {
            this.formActive = true;
            document.querySelector("body").style.overflow = "hidden ";
            gsap.to(window, {
              duration: 1,
              scrollTo: "#second",
              ease: "power1.out",
            });
            document.querySelector(".form-container").style.display = "flex";
          }
        }
        //? drawer
      } else if (!this.intersects.length) {
        this.currentIntersect = null;

        document.body.style.cursor = "auto";

        if (!this.mobileSize) {
          if (this.intersectObjects) {
            this.intersectObjects.forEach((e) => {
              if (e.scale.y > 1) {
                gsap.to(e.scale, {
                  y: 1,
                  x: 1,
                  z: 1,
                  duration: 0.5,
                  ease: "back.out",
                });
              }
            });
          }
        }
      }
    }

    this.clicked = false;
  }
}
