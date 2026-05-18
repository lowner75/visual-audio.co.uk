// src/modules/beta/client/index.ts

import runPreloader from "./preloader";
import initSmoothScroll from "./smooth-scroll";
import initNavigation from "./nav";

export default function initBetaClient() {
  
  runPreloader();
  initSmoothScroll();
  initNavigation();

};