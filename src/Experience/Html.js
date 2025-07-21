import Experience from "./Experience";
import gsap from "gsap";

export default class HTML {
  constructor() {
    this.experience = new Experience();
    this.body = document.querySelector("body");
    this.canvas = this.experience.canvas;
    this.resources = this.experience.resources;
    this.mobile = this.experience.size.mobileSize;

    //! html

    //? animate background
    this.bg = document.createElement("div");
    this.bg.classList.add("bg");
    this.bgContent = `
    <div class="img-con">
      <img src="./textures/eagle_logo.png" alt="logo">

      </div>
      <svg
  class="container" 
  x="0px" 
  y="0px"
  viewBox="0 0 55 23.1"
  height="23.1"
  width="55"
  preserveAspectRatio='xMidYMid meet'
>
  <path
    class="track" 
    fill="none" 
    stroke-width="4" 
    pathlength="100"
    d="M26.7,12.2c3.5,3.4,7.4,7.8,12.7,7.8c5.5,0,9.6-4.4,9.6-9.5C49,5,45.1,1,39.8,1c-5.5,0-9.5,4.2-13.1,7.8l-3.4,3.3c-3.6,3.6-7.6,7.8-13.1,7.8C4.9,20,1,16,1,10.5C1,5.4,5.1,1,10.6,1c5.3,0,9.2,4.5,12.7,7.8L26.7,12.2z"
  />
  <path
    class="car" 
    fill="none" 
    stroke-width="4" 
    pathlength="100"
    d="M26.7,12.2c3.5,3.4,7.4,7.8,12.7,7.8c5.5,0,9.6-4.4,9.6-9.5C49,5,45.1,1,39.8,1c-5.5,0-9.5,4.2-13.1,7.8l-3.4,3.3c-3.6,3.6-7.6,7.8-13.1,7.8C4.9,20,1,16,1,10.5C1,5.4,5.1,1,10.6,1c5.3,0,9.2,4.5,12.7,7.8L26.7,12.2z"
  />
</svg>


      `;
    this.bg.innerHTML = this.bgContent;
    this.body.appendChild(this.bg);

    //! end HTML
    this.htmlTimeline = gsap.timeline({ ease: "power1.out" });

    this.resources.on("resourcesReady", () => {
      gsap.to(".bg", {
        duration: 1.5,
        opacity: 0,
        y: 0,
        ease: "ease-out",
        display: "none",
        onComplete: () => {
          this.htmlTimeline
            .to(".nav", {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "back.inOut(2)",
            })
            .to(".w-1", {
              opacity: 1,
              duration: 0.3,
            })
            .to(".w-2", {
              opacity: 1,
              duration: 0.3,
            })
            .to(".w-3", {
              opacity: 1,
              duration: 0.3,
            })
            .to(".w-4", {
              opacity: 1,
              duration: 0.3,
            })
            .to(".w-5", {
              opacity: 1,
              duration: 0.3,
            })
            .to(".w-6", {
              opacity: 1,
              duration: 0.3,
            })
            .to(".ring-buttons", {
              opacity: 1,
              scale: 1,
              duration: 0.75,
              ease: "back.out(4)",
            })
            .to(".second-heading", {
              opacity: 1,
              // marginTop: -100,
              // duration: 0.5,
            })
            .to(".enter-button", {
              opacity: 1,
              y: 0,
              duration: 0.5,
              onComplete: () => {
                document.querySelector("body").style.overflowY = "auto";
              },
            });
        },
      });
    });
  }

  update() {}
}
