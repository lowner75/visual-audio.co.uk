// src/modules/beta/client/nav.ts// src/modules/beta/client/nav.ts

export default function initNavigation() {

  const services = document.querySelector<HTMLElement>("#services");
  const subMenu = document.querySelector<HTMLElement>(".sub-menu");
  const subMenuLColumns = document.querySelectorAll<HTMLElement>(".sub-menu-column");

  if (!services || !subMenu) return;

  const bgContainer = subMenu.querySelector<HTMLElement>(".container");
  const shouldUseHover = () => window.innerWidth >= 1200;
  let isOpen = false;

  const isInsideMenu = (target: EventTarget | null | undefined) =>
    target instanceof HTMLElement &&
    (target.closest("#services") || target.closest(".sub-menu"));

  // --- Open submenu
  const openDropdown = () => {
    if (!shouldUseHover() || isOpen) return;
    isOpen = true;

    gsap.fromTo(
      subMenu,
      { y: 10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" }
    );

    gsap.fromTo(
      subMenuLColumns,
      { x: 10, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.3, ease: "power4.out", overwrite: "auto" }
    );
  };

  // --- Close submenu
  const closeDropdown = (e?: MouseEvent) => {
    const related = e?.relatedTarget;
    if (isInsideMenu(related) || !isOpen || !shouldUseHover()) return;
    isOpen = false;

    gsap.to(subMenu, { y: 10, autoAlpha: 0, duration: 0.2, ease: "power2.in", overwrite: "auto" });

    if (bgContainer) {
      gsap.to(bgContainer, { backgroundPosition: `50% 50%`, duration: 0.8, ease: "power3.out" });
    }
  };

  // --- Event listeners for hover
  services.addEventListener("mouseenter", openDropdown);
  services.addEventListener("mouseleave", closeDropdown);
  subMenu.addEventListener("mouseenter", openDropdown);
  subMenu.addEventListener("mouseleave", closeDropdown);

  // --- Parallax background (desktop only)
  if (bgContainer) {
    const maxMove = 12; // px, subtle movement

    subMenu.addEventListener("mousemove", (e) => {
      if (!shouldUseHover() || !isOpen) return;

      const rect = subMenu.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xOffset = ((x / rect.width) - 0.5) * maxMove;
      const yOffset = ((y / rect.height) - 0.5) * maxMove;

      gsap.to(bgContainer, {
        backgroundPosition: `${50 + xOffset}% ${50 + yOffset}%`,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    });

    subMenu.addEventListener("mouseleave", () => {
      gsap.to(bgContainer, {
        backgroundPosition: `50% 50%`,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }

  // --- Mobile / tablet accordion
  const toggleAccordion = (): void => {
    const isDesktop = shouldUseHover();
    const titles = document.querySelectorAll<HTMLButtonElement>(".sub-menu-column-title");
    const collapses = document.querySelectorAll<HTMLElement>(".sub-menu-collapse");

    titles.forEach(title => {
      if (isDesktop) {
        title.classList.remove("accordion-button");
        title.removeAttribute("type");
        title.removeAttribute("data-bs-toggle");
      } else {
        title.classList.add("accordion-button");
        title.setAttribute("type", "button");
        title.setAttribute("data-bs-toggle", "collapse");
      }
    });

    collapses.forEach(collapse => {
      if (isDesktop) {
        collapse.classList.remove("accordion-collapse", "collapse");
      } else {
        collapse.classList.add("accordion-collapse", "collapse");
      }
    });
  };

  toggleAccordion();

  window.addEventListener("resize", () => {
    gsap.set(".sub-menu", { autoAlpha: 0 });

    const isMobile = !shouldUseHover();
    gsap.set(document.documentElement, { height: "inherit", overflowY: "auto" });
    gsap.set(document.body, { height: "inherit", overflowY: "hidden" });

    if (isMobile) {
      const menuBtn = document.querySelector(".menu-btn");
      menuBtn?.classList.remove("active");
      menuBtn?.classList.add("not-active");

      document.querySelectorAll<HTMLElement>(".sub-menu-column-title")
        .forEach(el => el.setAttribute("aria-expanded", "false"));

      document.querySelectorAll<HTMLElement>(".accordion-button")
        .forEach(el => el.classList.add("collapsed"));

      document.querySelectorAll<HTMLElement>(".accordion-collapse")
        .forEach(el => el.classList.remove("show"));

      gsap.to(".menu-btn-container span", { backgroundColor: "#fff", duration: 0.2 });
    }

    toggleAccordion();
  });
}