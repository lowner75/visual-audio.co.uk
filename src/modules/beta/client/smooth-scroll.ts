// src/modules/beta/client/smooth-scroll.ts

export default function initSmoothScroll() {
  const isHoverCapable = window.matchMedia("(hover: hover)").matches;
  const isMobile = window.innerWidth < 900;
  if (!isHoverCapable || isMobile) return;

  const wrapper = document.querySelector<HTMLElement>("#main");

  if (!wrapper) return;

  const body = document.body;

  const setBodyHeight = () => {
    const height = wrapper.getBoundingClientRect().height;
    body.style.height = `${height}px`;
  };

  let scrollPos = 0;
  let smoothPos = 0;

  const ease = 0.03;
  const endEase = 0.12;

  const update = () => {
    scrollPos = window.scrollY || window.pageYOffset;

    gsap.to(wrapper, {
      y: -scrollPos,
      ease: "power3.out",
      duration: 0.8,
      overwrite: true
    });

    requestAnimationFrame(update);
  };

  // Intercept PageDown / PageUp
  window.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key === "PageDown" || key === "PageUp") {
      e.preventDefault();

      const current = window.scrollY || window.pageYOffset;
      const pageHeight = window.innerHeight;
      const direction = key === "PageDown" ? 1 : -1;

      const target = current + pageHeight * (direction * 0.5);

      window.scrollTo({
        top: target,
        behavior: "auto",
      });
    }
  });

  setBodyHeight();
  window.addEventListener("resize", setBodyHeight);
  requestAnimationFrame(update);
}
