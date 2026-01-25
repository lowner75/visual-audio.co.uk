// js/theme.js

(function() {
  function getCookie(name) {
    return document.cookie
      .split('; ')
      .find(c => c.startsWith(name + '='))
      ?.split('=')[1];
  }

  let theme =
    getCookie('theme') ||
    localStorage.getItem('theme') ||
    'dark'; // default theme

  // persist to localStorage if missing
  localStorage.setItem('theme', theme);

  document.documentElement.setAttribute('data-theme', theme);
})();