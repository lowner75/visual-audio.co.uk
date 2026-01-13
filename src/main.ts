// src/main.ts

"use strict";

// Import legacy module for backward compatibility
import "./modules/legacy/main";

// Import and initialize messages module
import initMessagesModule from "./modules/messages/messages";

document.addEventListener("DOMContentLoaded", () => {
  
  // Initialize messages module
  initMessagesModule();

});