// src/main.ts

"use strict";

import luxy from "luxy.js";
import "./modules/legacy/main";
import initMessagesModule from "./modules/messages/messages";

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

  initMessagesModule();

});