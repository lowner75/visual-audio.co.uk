// src/modules/beta/client/smooth-scroll.ts

export default function initSmoothScroll() {
  const isHoverCapable = window.matchMedia("(hover: hover)").matches;
  const isMobile = window.innerWidth < 900;

  if (!isHoverCapable || isMobile) {
    document.body.style.height = "";
    return;
  }

  const wrapper = document.querySelector<HTMLElement>("#main");
  if (!wrapper) return;

  const body = document.body;

  gsap.set(wrapper, { willChange: "transform" });

  const setBodyHeight = () => {
    body.style.height = `${wrapper.scrollHeight}px`;
  };

  let scrollPos = 0;

  const update = () => {
    scrollPos = window.scrollY || window.pageYOffset;

    gsap.to(wrapper, {
      y: -scrollPos,
      ease: "power3.out",
      duration: 0.8,
      overwrite: true,
    });

    requestAnimationFrame(update);
  };

  // Intercept PageDown / PageUp
  window.addEventListener("keydown", (e) => {
    if (e.key !== "PageDown" && e.key !== "PageUp") return;
    if (e.repeat) return; // Ignore held key repeats

    e.preventDefault();

    const current = window.scrollY || window.pageYOffset;
    const direction = e.key === "PageDown" ? 1 : -1;

    window.scrollTo({
      top: current + window.innerHeight * direction,
      behavior: "auto",
    });
  });

  setBodyHeight();
  window.addEventListener("resize", setBodyHeight);
  requestAnimationFrame(update);
}