// src/modules/beta/client/nav.ts// src/modules/beta/client/nav.ts

export default function initNavigation() {

  const services = document.querySelector<HTMLElement>("#services");
  const servicesSubMenu = document.querySelector<HTMLElement>(".sub-menu-services");
  const subMenuColumns = document.querySelectorAll<HTMLElement>(".sub-menu-column");
  const subMenuLinks = document.querySelectorAll<HTMLElement>(".sub-menu-link");
  
  // --- Submenu link hover animations
  subMenuLinks.forEach(link => {
    const subMenuRow = link.querySelector<HTMLElement>(".sub-menu-row");

    if (!subMenuRow) return;

    link.addEventListener("mouseenter", () => {
      gsap.to(subMenuRow, {
        x: 5,
        duration: 0.3,
        ease: "power3.out",
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(subMenuRow, {
        x: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    });

  });

  // --- Submenu dropdown (desktop only)
  if (!services || !servicesSubMenu) return;

  const bgContainer = servicesSubMenu.querySelector<HTMLElement>(".container");
  const shouldUseHover = () => window.innerWidth >= 1200;
  let isOpen = false;

  const isInsideMenu = (target: EventTarget | null | undefined) =>
    target instanceof HTMLElement &&
    (target.closest("#services") || target.closest(".sub-menu-services"));

  // --- Open submenu
  const openDropdown = () => {
    if (!shouldUseHover() || isOpen) return;
    isOpen = true;

    gsap.fromTo(
      servicesSubMenu,
      { y: 10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" }
    );

    gsap.fromTo(
      subMenuColumns,
      { x: 10, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.3, ease: "power4.out", overwrite: "auto" }
    );
  };

  // --- Close submenu
  const closeDropdown = (e?: MouseEvent) => {
    const related = e?.relatedTarget;
    if (isInsideMenu(related) || !isOpen || !shouldUseHover()) return;
    isOpen = false;

    gsap.to(servicesSubMenu, { y: 10, autoAlpha: 0, duration: 0.2, ease: "power2.in", overwrite: "auto" });

    if (bgContainer) {
      gsap.to(bgContainer, { backgroundPosition: `50% 50%`, duration: 0.8, ease: "power3.out" });
    }
  };

  // --- Event listeners for hover
  services.addEventListener("mouseenter", openDropdown);
  services.addEventListener("mouseleave", closeDropdown);
  servicesSubMenu.addEventListener("mouseenter", openDropdown);
  servicesSubMenu.addEventListener("mouseleave", closeDropdown);

  // --- Parallax background (desktop only)
  if (bgContainer) {
    const maxMove = 12;       // max offset in px
    const initialSize = 105;  // % when dropdown opens
    const zoomedSize = 108;   // % while moving

    // Initialize background
    gsap.set(bgContainer, { backgroundSize: `${initialSize}%`, backgroundPosition: "50% 50%" });

    servicesSubMenu.addEventListener("mousemove", (e) => {
      if (!shouldUseHover() || !isOpen) return;

      const rect = servicesSubMenu.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xOffset = ((x / rect.width) - 0.05) * maxMove;
      const yOffset = ((y / rect.height) - 0.05) * maxMove;

      gsap.to(bgContainer, {
        backgroundPositionX: `${50 + xOffset}%`,
        backgroundPositionY: `${50 + yOffset}%`,
        backgroundSize: `${zoomedSize}%`,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    });

    servicesSubMenu.addEventListener("mouseleave", () => {
      gsap.to(bgContainer, {
        backgroundPosition: "50% 50%",
        backgroundSize: `${initialSize}%`,
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
    gsap.set(".sub-menu-services", { autoAlpha: 0 });

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