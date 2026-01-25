// src/main.ts

"use strict";

// Module imports
import initAuthClient from "./modules/users/auth/auth.client";
import initMessagesModule from "./modules/messages/messages";

document.addEventListener("DOMContentLoaded", () => {
  
  // Module initializations
  initMessagesModule();
  initAuthClient();

  // --- Settings Panel ---
  const openBtn  = document.querySelector('#btn-settings');
  const closeBtn = document.querySelector('#btn-close-settings');
  const panel    = document.querySelector('#settings-panel');

  if (openBtn && closeBtn && panel) {
    
    const openPanel = () => {
      panel.classList.add('is-open');
      gsap.to(panel, { x: -300, duration: 0.7, ease: "power4.inOut" });
    };
  
    const closePanel = () => {
      panel.classList.remove('is-open');
      gsap.to(panel, { x: 0, duration: 0.7, ease: "power4.inOut" });
    };
  
    openBtn.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);
  
    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!panel.classList.contains('is-open')) return;
  
      const target = e.target as HTMLElement;
      const clickedInsidePanel = panel.contains(target);
      const clickedOpenButton  = openBtn.contains(target);
  
      if (!clickedInsidePanel && !clickedOpenButton) {
        closePanel();
      }
    });
  
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && panel.classList.contains('is-open')) {
        closePanel();
      }
    });

  }  

  // --- Change theme ---
  const changeThemeButtons = document.querySelectorAll(".btn-change-theme");
  if (changeThemeButtons) {

    changeThemeButtons.forEach(button => {
      button.addEventListener("click", () => {
        let theme = button.getAttribute('data-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      });
    });

  }

});