document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Menu Drawer
  var mobileMenuBtn = document.getElementById("mobile-menu-btn");
  var mobileMenuCloseBtn = document.getElementById("mobile-menu-close-btn");
  var mobileDrawer = document.getElementById("mobile-drawer");
  var mobileBackdrop = document.getElementById("mobile-backdrop");
  var mobileLinks = document.querySelectorAll(".mobile-nav-link");

  function openMobileMenu() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.remove("translate-x-full");
      mobileBackdrop.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.add("translate-x-full");
      mobileBackdrop.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", openMobileMenu);
  }
  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener("click", closeMobileMenu);
  }
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener("click", closeMobileMenu);
  }
  mobileLinks.forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  // FAQ Accordion
  var faqToggles = document.querySelectorAll(".faq-toggle");

  faqToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      var content = this.nextElementSibling;
      var icon = this.querySelector(".faq-chevron");
      var isOpen = content && !content.classList.contains("hidden");

      // Close all other items
      document.querySelectorAll(".faq-content").forEach(function (item) {
        item.classList.add("hidden");
      });
      document.querySelectorAll(".faq-chevron").forEach(function (ic) {
        ic.classList.remove("rotate-180");
      });

      // Toggle current
      if (!isOpen && content) {
        content.classList.remove("hidden");
        if (icon) {
          icon.classList.add("rotate-180");
        }
      }
    });
  });

  // High-Performance Scroll Reveal Animations via IntersectionObserver
  // Strict rule: Zero window.onscroll listeners, single execution, unobserve on reveal
  var revealElements = document.querySelectorAll(".reveal-on-scroll");

  if ("IntersectionObserver" in window) {
    var observerOptions = {
      root: null,
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.1
    };

    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          entry.target.classList.remove("opacity-0", "translate-y-8");
          entry.target.classList.add("opacity-100", "translate-y-0");
          // Unobserve immediately after reveal to save CPU and battery
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Graceful fallback for legacy browsers without IntersectionObserver
    revealElements.forEach(function (el) {
      el.classList.add("is-visible");
      el.classList.remove("opacity-0", "translate-y-8");
      el.classList.add("opacity-100", "translate-y-0");
    });
  }

  // Vercel Speed Insights Integration (Core Web Vitals)
  // Initializes Vercel Speed Insights queue and injects official script safely
  (function initSpeedInsights() {
    if (!window.si) {
      window.si = function () {
        window.siq = window.siq || [];
        window.siq.push(arguments);
      };
    }
    var speedScript = document.createElement("script");
    speedScript.src = "/_vercel/speed-insights/script.js";
    speedScript.defer = true;
    speedScript.dataset.sdkn = "@vercel/speed-insights";
    speedScript.dataset.sdkv = "2.0.0";
    speedScript.onerror = function () {
      // In local dev without Vercel CLI, fall back gracefully
      console.info("[Vercel Speed Insights] Monitoring ready for Vercel deployment.");
    };
    document.head.appendChild(speedScript);
  })();

  // 3D Parallax Mouse Move Effect for Hero Section
  var parallaxBg = document.getElementById("parallax-bg");
  var parallaxCard = document.getElementById("parallax-card");
  
  if (parallaxBg && parallaxCard) {
    var mouseX = 0;
    var mouseY = 0;
    var currentX = 0;
    var currentY = 0;

    function animateParallax() {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;

      // Fundo: translação oposta (-10px a +10px) com scale extra
      var bgX = currentX * -10;
      var bgY = currentY * -10;
      parallaxBg.style.transform = "translate3d(" + bgX + "px, " + bgY + "px, 0) scale(1.05)";

      // Placa: inclinação 3D sutil (-3deg a +3deg)
      var rotateX = currentY * -3;
      var rotateY = currentX * 3;
      parallaxCard.style.transform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

      requestAnimationFrame(animateParallax);
    }

    animateParallax();

    window.addEventListener("mousemove", function(e) {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    window.addEventListener("mouseleave", function() {
      mouseX = 0;
      mouseY = 0;
    });
  }
});

