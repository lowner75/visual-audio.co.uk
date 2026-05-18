// src/modules/beta/client/nav.ts

import { spring, animate } from "popmotion";

export default function initNavigation() {
  
  // Grab all submenus (any dropdown)
  const allSubMenus = document.querySelectorAll<HTMLElement>(".sub-menu");

  allSubMenus.forEach(subMenu => {
    const triggerId = subMenu.dataset.trigger;
    if (!triggerId) return;

    const trigger = document.querySelector<HTMLElement>(`#${triggerId}`);
    if (!trigger) return;

    const menuSystem =
      subMenu.closest<HTMLElement>(".sub-menu-system") ||
      trigger.closest<HTMLElement>(".sub-menu-system");

    if (!menuSystem) return;

    const columns = subMenu.querySelectorAll<HTMLElement>(".sub-menu-column");
    const links = subMenu.querySelectorAll<HTMLElement>(".sub-menu-link");
    const triggerBg = subMenu;

    let isOpen = false;

    const shouldUseHover = () => window.innerWidth >= 1200;

    const maxMove = 8; // 12;
    const initialSize = 105;
    const zoomedSize = 108;

    gsap.set(triggerBg, {
      backgroundSize: `${initialSize}%`,
      //backgroundPosition: "50% 50%"
    });

    // Submenu link hover animations
    links.forEach(link => {
      const row = link.querySelector<HTMLElement>(".sub-menu-row");
      if (!row) return;

      link.addEventListener("mouseenter", () => {
        gsap.to(row, {
          x: 5,
          duration: 0.3,
          ease: "power3.out"
        });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(row, {
          x: 0,
          duration: 0.3,
          ease: "power3.out"
        });
      });

    });

    let lastX = 0;
    let lastY = 0;

    // Popmotion
    let xAnimation: { stop: () => void } | null = null;
    let yAnimation: { stop: () => void } | null = null;

    const setBgX = gsap.quickSetter(triggerBg, "backgroundPositionX");
    const setBgY = gsap.quickSetter(triggerBg, "backgroundPositionY");
    const setBgSize = gsap.quickSetter(triggerBg, "backgroundSize");

    // Parallax effect on submenu background
    let lastUpdate = 0;
    const updateDelay = 24; // ms

    const updateParallax = (e: MouseEvent) => {
      if (!shouldUseHover() || !isOpen) return;

      const now = performance.now();
      if (now - lastUpdate < updateDelay) return;
      lastUpdate = now;

      const rect = subMenu.getBoundingClientRect();

      const clamp = (value: number, min: number, max: number) =>
        Math.min(Math.max(value, min), max);

      const x = clamp(e.clientX - rect.left, 0, rect.width);
      const y = clamp(e.clientY - rect.top, 0, rect.height);

      //lastX = ((x / rect.width) - 0.5) * maxMove * rect.width / 100;
      //lastY = ((y / rect.height) - 0.5) * maxMove * rect.height / 100;

      const targetX = ((x / rect.width) - 0.5) * maxMove * rect.width / 100;
      const targetY = ((y / rect.height) - 0.5) * maxMove * rect.height / 100;

      const easing = 0.18;

      xAnimation?.stop();
      yAnimation?.stop();

      const stifness = 50; // 120;
      const damping = 12; // 22;
      const mass = 0.8; // 0.8;

      xAnimation = animate({
        from: lastX,
        to: targetX,
        type: "spring",
        stiffness: stifness,
        damping: damping,
        mass: mass,
        onUpdate: (v) => {
          lastX = v;
          setBgX(`calc(50% + ${v}px)`);
        }
      });

      yAnimation = animate({
        from: lastY,
        to: targetY,
        type: "spring",
        stiffness: stifness,
        damping: damping,
        mass: mass,
        onUpdate: (v) => {
          lastY = v;
          setBgY(`calc(50% + ${v}px)`);
        }
      });

    };

    // Parallax listener
    document.addEventListener("mousemove", updateParallax);
    //subMenu.addEventListener("mousemove", updateParallax);

    // Open dropdown on hover (desktop only)
    const openDropdown = (e?: MouseEvent) => {
      if (!shouldUseHover() || isOpen) return;

      isOpen = true;

      if (e) updateParallax(e);

      gsap.fromTo(
        subMenu,
        {
          //y: 10,
          autoAlpha: 0
        },
        {
          //y: 0,
          autoAlpha: 1,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto"
        }
      );

      gsap.fromTo(
        columns,
        {
          x: 10,
          autoAlpha: 0
        },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.3,
          ease: "power4.out",
          overwrite: "auto"
        }
      );
    };

    const isNearSubMenu = (e?: MouseEvent): boolean => {
      if (!e) return false;

      const rect = subMenu.getBoundingClientRect();
      const tolerance = 32;

      return (
        e.clientX >= rect.left - tolerance &&
        e.clientX <= rect.right + tolerance &&
        e.clientY >= rect.top - tolerance &&
        e.clientY <= rect.bottom + tolerance
      );
    };

    const isSafeSubMenuTarget = (
      target: EventTarget | null | undefined
    ): boolean => {
      if (!(target instanceof HTMLElement)) return false;

      return !!target.closest(
        ".sub-menu-link, .sub-menu-title, .sub-menu-text, .sub-menu-row, .sub-menu-column-title"
      );
    };

    const isPointerInsideRect = (
      e: MouseEvent,
      rect: DOMRect,
      tolerance = 24
    ): boolean => {
      return (
        e.clientX >= rect.left - tolerance &&
        e.clientX <= rect.right + tolerance &&
        e.clientY >= rect.top - tolerance &&
        e.clientY <= rect.bottom + tolerance
      );
    };

    const shouldStayOpen = (e: MouseEvent): boolean => {
      return (
        isPointerInsideRect(e, trigger.getBoundingClientRect(), 16) ||
        isPointerInsideRect(e, subMenu.getBoundingClientRect(), 32)
      );
    };

    const handleGlobalPointerMove = (e: MouseEvent) => {
      if (!isOpen || !shouldUseHover()) return;

      if (shouldStayOpen(e)) return;

      closeDropdown();
    };

    // Close dropdown with mouseleave or when moving to another trigger
    const closeDropdown = (e?: MouseEvent) => {

      if (!isOpen || !shouldUseHover()) return;

      // Helper function
      const isInsideActiveMenuArea = (target: EventTarget | null | undefined): boolean => {
        if (!(target instanceof HTMLElement)) return false;

        return (
          trigger.contains(target) ||
          subMenu.contains(target) ||
          menuSystem.contains(target)
        );
      };

      /*if (isNearSubMenu(e)) return;
      if (isSafeSubMenuTarget(e?.relatedTarget)) return;*/
      if (isInsideActiveMenuArea(e?.relatedTarget)) return;
      if (!isOpen || !shouldUseHover()) return;

      isOpen = false;

      gsap.to(subMenu, {
        //y: 10,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto"
      });

      gsap.to(triggerBg, {
        //backgroundPosition: "50% 50%",
        backgroundSize: `${initialSize}%`,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto"
      });

    };
    
    // Desktop hover listeners
    trigger.addEventListener("mouseenter", openDropdown);
    trigger.addEventListener("mouseleave", closeDropdown);
    subMenu.addEventListener("mouseleave", closeDropdown);
    menuSystem.addEventListener("mouseleave", closeDropdown);

    // Mobile / tablet accordion logic (legacy, to be removed in future)
    const toggleAccordion = (): void => {
      const isDesktop = shouldUseHover();
      const titles = subMenu.querySelectorAll<HTMLButtonElement>(".sub-menu-column-title");
      const collapses = subMenu.querySelectorAll<HTMLElement>(".sub-menu-collapse");

      titles.forEach(title => {
        if (isDesktop) {
          title.classList.remove("accordion-button");
          title.removeAttribute("type");
          title.removeAttribute("data-bs-toggle");
          title.removeAttribute("data-bs-target");
          title.removeAttribute("aria-expanded");
          title.removeAttribute("aria-controls");
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
    window.addEventListener("resize", toggleAccordion);
  });
}