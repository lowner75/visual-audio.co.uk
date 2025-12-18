// src/main.ts

"use strict";

import luxy from "luxy.js";
import initMessagesModule from "./modules/messages/messages";
import "./modules/legacy/main";

document.addEventListener("DOMContentLoaded", () => {
  
  // Initialize Luxy.js for smooth scrolling and parallax effects on desktop viewports
  const luxyEl = document.getElementById("luxy");

  // Initialise luxy if viewport is desktop size
  if (luxyEl && window.matchMedia("(min-width: 1024px)").matches) {
    try {
      luxy.init();
    } catch (err) {
      console.warn("Luxy failed to initialize:", err);
    }
  }

  // Terms and conditions page specific JS
  const termsPageEl = document.getElementById("terms-page");
  if (!termsPageEl) {
    return;
  } else {

    // Set terms and conditions nav links and active status
    // Desktop nav links
    document.querySelectorAll(".va-nav__link").forEach(el => {
      if (el.id === "menu-link-terms") return;
      el.setAttribute('href', '/');
      el.classList.remove("is-active");
    });
    // Mobile nav links
    document.querySelectorAll(".mmenu-link a").forEach(el => {
      if (el.id === "mmenu-link-terms") return;
      el.setAttribute('href', '/');
      el.classList.remove("is-active");
    });
    document.querySelector("#nav-link-terms")?.classList.add("is-active");
    gsap.to('.nav-background', { duration: 1, autoAlpha: 1, delay: 2 } );

  }

  // Initialize messages module
  initMessagesModule();

});