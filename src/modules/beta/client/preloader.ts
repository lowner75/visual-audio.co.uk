// src/modules/beta/client/preloader.ts

export default function runPreloader() {

  // DOM refs
  const preloader = document.querySelector<HTMLElement>("#preloader");
  const nav = document.querySelector<HTMLElement>("nav");
  const mask = document.querySelector<HTMLElement>(".mask");
  const menuBtn = document.querySelector<HTMLElement>(".menu-btn-container");
  const heroText = document.querySelector<HTMLElement>(".hero-text");
  const video = document.querySelector<HTMLVideoElement>("#landing-hero-video");

  // If any required element is missing, abort
  if (!preloader || !nav || !menuBtn) return;

  document.documentElement.style.setProperty("overflow", "hidden", "important");
  document.body.style.setProperty("overflow", "hidden", "important");

  // Disable scroll restoration
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // Remove background color from nav for preloader
  gsap.set(".nav", { backgroundColor: "transparent" });

  // GSAP timeline
  const tl = gsap.timeline();

  tl.fromTo(
    "#preloader img",
    { y: 20, autoAlpha: 0 },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.5,
      ease: "power4.inout",
      onComplete: () => {
        gsap.fromTo(
          "#preloader img",
          { y: 0, autoAlpha: 1 },
          { y: 0, autoAlpha: 1, duration: 0.5, ease: "power4.in" }
        );

        gsap.to("#preloader", { autoAlpha: 0, duration: 0.5, delay: 0.5 });

        if (mask) {
          gsap.fromTo(
            ".mask",
            { scale: 5 },
            { scale: 1, delay: 0.25, duration: 1, ease: "power4.in", onComplete: () => {
              // Restore nav background color
              gsap.set("nav", { backgroundColor: "#000000" });
            }}
          );
        }

        gsap.fromTo(
          "nav",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.5, delay: 0.5, ease: "power4.out" }
        );
        
        gsap.fromTo(
          ".menu-btn-container",
          { x: 20, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 1.5, delay: 0.5, ease: "power4.out" }
        );

        if (heroText) {
          gsap.fromTo(
            ".hero-text",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.5, delay: 0.5, ease: "power4.out" }
          );
        }

      },
    }
  );

  // If video exists, play after a short delay
  setTimeout(() => {
    if (!video) return;
    video.autoplay = true;
    video.play().catch((err) => console.log(err, "video play error"));
  }, 1000);

  // Re-enable scrolling
  document.documentElement.style.setProperty("overflow", "", "important");
  document.body.style.setProperty("overflow", "", "important");

}