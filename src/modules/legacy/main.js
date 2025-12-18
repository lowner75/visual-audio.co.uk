// src/modules/legacy/main.js

"use strict";

// On document ready
$(function() {

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Animate page when loaded
	var pageAnimationsComplete = false;

  // Animate preloader
  gsap.to('#intro-logo', { delay: 0, duration: 1.5, y: "-100px", opacity: 0 });
  gsap.to('#intro-overlay', { delay: 0, duration: 1.5, y: "-100%", ease: "Expo.easeInOut", onComplete: function() {
    gsap.to('#intro-overlay', { duration: 0.5, opacity: 0, ease: "power4.out", onComplete: function() {
      $('#intro-overlay').css('display', 'none');
    }});
  }});
  
  gsap.fromTo('nav', { y: 100, autoAlpha: 0 }, { delay: 1.2, duration: 1.75, y: 0, autoAlpha: 1, ease: "Expo.easeInOut", onComplete: function() {
    pageAnimationsComplete = true;
  }});

  gsap.fromTo('.hamburger', { y: 100, autoAlpha: 0 }, { delay: 1.2, duration: 1.75, y: 0, autoAlpha: 1, ease: "Expo.easeInOut" } );
  gsap.to('#transition-wipe-2', { delay: 0, duration: 1.7, y: "-100%", ease: "Expo.easeInOut", onComplete: function() {
      $('html').css('overflow-y', 'auto');
      gsap.to('#transition-wipe-2', { duration: 0.5, opacity: 0, onComplete: function() {
        $('#transition-wipe-2').css('display', 'none');
      }});
    }
  });
  $('#mm-bg-1, #mm-bg-2').css('width', '100vw'); // Prevents sizing bug

	// Nav animations
	window.onscroll = function() { animateNav() };

	// Animate nav on scroll from top
	function animateNav() {
    if (window.location.pathname === "/terms-and-conditions") {
      return; // Disable header animation on terms and conditions page
    } else {
      // Nav background visibility
      if (window.pageYOffset > window.innerHeight/200 && navOpen !== true) {
        // If scrolling from the top of the page
        gsap.to('.nav-background', { duration: 1, autoAlpha: 1 } );
      } else {
        // Else, if scrolling back to the top of the page
        $('#menu-link-home').addClass('is-active');
        gsap.to('.nav-background', { duration: 1, autoAlpha: 0 } );
      }
    }
	} // End animate nav on scroll from top

	// Animate nav based on scroll direction
	var lastScrollTop = 0, scrollDirection = "down";
	$(window).scroll(function(event){
    if (window.location.pathname === "/terms-and-conditions") {
      return; // Disable header animation on terms and conditions page
    } else {
      if($(this).scrollTop() > lastScrollTop && $(this).scrollTop() > (window.innerHeight * 0.85)) {
        // Down scroll code - hide nav
        if(scrollDirection != "down" && navOpen !== true) {
          gsap.to('nav', { duration: 1, y: -170, ease: "Expo.easeInOut" } );
          gsap.to('.hamburger', { duration: 1, y: -170, ease: "Expo.easeInOut" } );
          gsap.to('.nav-background', { duration: 1, y: -170, ease: "Expo.easeInOut" } );
        }
        scrollDirection = "down";
      } else {
        // Up scroll code - show header
        if(scrollDirection != "up" && navOpen !== true) {
          gsap.to('nav', { duration: 1, y: 0, ease: "Power4.easeOut" } );
          gsap.to('.hamburger', { duration: 1, y: 0, ease: "Power4.easeOut" } );
          gsap.to('.nav-background', { duration: 1, y: 0, ease: "Power4.easeOut" } );
        }
        scrollDirection = "up";
      }
    }
    lastScrollTop = $(this).scrollTop();
	}); // End animate header based on scroll direction

	// Mobile menu animations
	var navOpen = false;
	var wrapperMenu = document.querySelector('.hamburger');

	wrapperMenu.addEventListener('click', function() {
		$('.hamburger').toggleClass('open');
		if(navOpen === true) {

			// Close mobile nav
			gsap.to('.hamburger', { duration: 0.2, transform: "rotate(0deg)" } );
			if(window.pageYOffset > 500) { gsap.to('.nav-background', { delay: 0.5, duration: 0.5, autoAlpha: 1 } ); }
			gsap.to('#mm-bg-1', { delay: 0.1, duration: 1, x: 0, ease: "Expo.easeInOut" });
			gsap.to('#mm-bg-2', { duration: 1, x: 0, ease: "Expo.easeInOut" });
			navOpen = false;

		} else if (navOpen === false) {

			// Open mobile nav
			var width = -(window.innerWidth);
			gsap.to('.hamburger', { duration: 0.2, transform: "rotate(-45deg)" } );
			gsap.to('.nav-background', { delay: 0.5, duration: 0.5, autoAlpha: 0 } );
			gsap.to('#mm-bg-1', { duration: 1, x: width, ease: "Expo.easeInOut" });
			gsap.to('#mm-bg-2', { delay: 0.1, duration: 1, x: width, ease: "Expo.easeInOut" });
			gsap.fromTo('.mmenu-link a', 1, { autoAlpha: 0, x: 100 }, { delay: 0.75, autoAlpha: 1, x: 0, stagger: 0.1, ease: "power4.out" } );
			navOpen = true;

		}
	}); // End mobile menu animations

  // Listener for mobile menu links
	$('.mmenu-link a').click(function(e) {
		var selectedLink = this.id, linkCount = 1, totalLinks = $('.mmenu-link a').length;
		$('.mmenu-link a').each(function() {
			var link = this.id;
			if(link != selectedLink) {
				gsap.fromTo('#'+link, 1, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: 0, ease: "power4.out", onComplete: function() {
					linkCount += 1;
					if(linkCount === totalLinks) {
						$('.hamburger').trigger('click');
						gsap.to('nav', { delay: 1, duration: 1, y: -170, ease: "Expo.easeInOut" } );
	 					gsap.to('.hamburger', { delay: 1, duration: 1, y: -170, ease: "Expo.easeInOut" } );
	 					gsap.to('.nav-background', { delay: 1, duration: 1, y: -170, ease: "Expo.easeInOut" } );
					}
				}});
			}
		});
	}); // End listener for mobile menu links

	// Animate desktop navigation links with active class based on scroll position
  $('.va-nav__link').click(function(e) {
    e.preventDefault(); // stop default jump
    if($(this).attr('href') === "/terms-and-conditions") {
      window.location.href = "/terms-and-conditions";
      return;
    }
    if (window.location.pathname === "/terms-and-conditions") {
      if($(this).attr('href') === "/terms-and-conditions") {
        window.location.href = "/terms-and-conditions";
        return;
      } else {
        window.location.href = "/";
        return; 
      }
    }
    const targetId = $(this).attr('href').slice(1); // remove '#' from href
    const targetEl = document.getElementById(targetId);
    if(!targetEl) return;

    // Optional: temporarily remove observer-triggered is-active, if needed
    // $('.va-nav__link').removeClass('is-active');
    // $(this).addClass('is-active');

    // GSAP smooth scroll
    gsap.to(window, {
      duration: 1,
      onUpdate: () => {
        window.scrollTo({
          top: targetEl.offsetTop,
          left: 0,
          behavior: "auto" // or "smooth" (but gsap already handles animation)
        });
      }
    });

    // Optional: you could also animate other elements here like nav background
  });

  // Intersection Observer for page navigation
  var targets = document.querySelectorAll(".anchor");
  var observer = new IntersectionObserver(entries => {
    entries.forEach(function(entry) {
      if(entry.isIntersecting) {
        // On entry
        if(pageAnimationsComplete == true) {
          $('.va-nav__link').removeClass('is-active');
          var el;
          if(entry.target.id == "home") { el = "#menu-link-home"; }
          if(entry.target.id == "about") { el = "#menu-link-about"; }
          if(entry.target.id == "services") { el = "#menu-link-services"; }
          if(entry.target.id == "work") { el = "#menu-link-work"; }
          if(entry.target.id == "contact") { el = "#menu-link-contact"; }
          $(el).addClass('is-active');
        }
      } else {
        // On exit
        if(entry.target.id == "about") { el = "#menu-link-about"; }
        $(el).removeClass('is-active');
      }
    });
  });
  targets.forEach(target => {
    observer.observe(target);
  });
  // End intersection Observer for page navigation

	// Intersection Observer to animate luxy-el images
	//if(!_ua.Mobile && !_ua.Tablet) {
		var targets = document.querySelectorAll(".luxy-el");
		var observer = new IntersectionObserver(entries => {
			entries.forEach(function(entry) {
				if(entry.isIntersecting) {
					// On entry
					gsap.fromTo('.luxy-el', { backgroundSize: ((minBgSizes[entry.target.id])+(minBgSizes[entry.target.id]*0.15))+"%" }, { duration: 2, backgroundSize: minBgSizes[entry.target.id]+"%" } );
				} else {
					// On exit
				}
			});
		});
		targets.forEach(target => {
		  observer.observe(target);
		});
	//} // End intersection Observer to animate luxy-el images

	// Needed for Bootstrap carousel in case of misfire
	$('.carousel-control-prev').click(function() {
	  $('#carousel').carousel('prev');
	});
	$('.carousel-control-next').click(function() {
	  $('#carousel').carousel('next');
	}); // End Bootstrap fix

	// On browser resize
	$(window).resize(function() {
		minBackgroundSizes();
		$('.luxy-el').each(function () {
			$(this).css('background-size', '' + minBgSizes[this.id] + '%');
		});
		var width = -(window.innerWidth);
		if(navOpen === true) {
			$('#mm-bg-1, #mm-bg-2').css('width', '100%');
			$('#mm-bg-1, #mm-bg-2').css('left', 'width');
			gsap.to('#mm-bg-1', { duration: 0, x: width });
			gsap.to('#mm-bg-2', { duration: 0, x: width });
		}
		if(window.innerWidth <= 960) {
			// If viewport is tablet size or less
			$('.luxy-el').css('height', 'calc(100vh + 200px)');
			$('#luxy').attr("id", "noluxy");
		} else {
			// Else, if viewport is desktop size
			$('.luxy-el').css('height', 'calc(100vh + 200px)');
			$('#noluxy').attr("id", "luxy");
		}
	}); // End browser resize

	// Get element Y position (testing purposes only)
	function getElementYPos() {
		var i = 1;
		console.log("window height: " + window.innerHeight);
		$('.luxy-el-container').each(function() {
			var el = $(this);
			var position = el.position();
			console.log("luxy-el-container " + i + " top: " + position.top);
			i++;
		});
	} // End Y pos

	// Create an array of minimum background sizes for luxy-el class
	let minBgSizes = {};
	function minBackgroundSizes() {

		var luxyEls = $('#luxy-els-container');
		var position = luxyEls.position();
		//console.log("Luxy Els Top: " + position.top);
		//console.log('Screen Height: ' + window.innerHeight + 'px')

		// Get screen aspect ratio
		var aspectRatioType, aspectRatioValue = window.innerWidth / window.innerHeight;
		if(window.innerWidth >= window.innerHeight) {
			aspectRatioType = "Horizontal";
		} else {
			aspectRatioType = "Vertical";
		}

		$('.luxy-el').each(function () {

			// Get background URL
			var el = this.id;
			var bgURL = $(this).css('background-image');
			bgURL = bgURL.replace('url(','').replace(')','').replace(/\"/gi, "");

			// Get actual background Size
			var bgImg = new Image(), bgImgAR, requiredBgHeight, minBgSize;
			requiredBgHeight = window.innerHeight + 200;
			// Backgrouund aspect ratio
			bgImg.src = bgURL;
			bgImg.onload = function() {
				if(this.width >= this.height) {
					bgImgAR = this.width / this.height; // Horizontal aspect ratio
				} else {
					bgImgAR = this.height / this.width; // Vertical aspect ratio
				}
				if(aspectRatioType = "Horizontal") {
					minBgSize = ((requiredBgHeight * bgImgAR) / window.innerWidth) * 100;
				} else if(aspectRatioType = "Vertical") {
					minBgSize = ((requiredBgHeight * bgImgAR) / window.innerHeight) * 100;
				}
				if(minBgSize <= 100) { minBgSize = 100; }
				minBgSizes["" + el + ""] = minBgSize;
				///console.log(el + " Required H " + requiredBgHeight);
				//console.log(minBgSizes);

			}
		});

	} // End minimum background size array function
	minBackgroundSizes();

}); // End document ready