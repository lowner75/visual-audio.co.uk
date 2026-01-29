// src/modules/beta/client/index.ts

import runPreloader from "./preloader";
import initNavigation from "./nav";
import initSmoothScroll from "./smooth-scroll";

export default function initBetaClient() {
  
  // Client-side functionalities for beta module
  runPreloader();
  initNavigation();
  initSmoothScroll();

};