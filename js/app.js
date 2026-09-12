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

  // Interactive Quick-Order & Delivery Estimator for Soul Brothers (Zero Inline Scripts)
  var burgerSelect = document.getElementById("order-burger-select");
  var sideSelect = document.getElementById("order-side-select");
  var qtyInput = document.getElementById("order-qty-input");
  var distanceSelect = document.getElementById("order-distance-select");
  var priceDisplay = document.getElementById("order-total-price");
  var timeDisplay = document.getElementById("order-est-time");
  var whatsappBtn = document.getElementById("order-whatsapp-cta");

  function updateOrderEstimator() {
    if (!burgerSelect || !priceDisplay) return;

    var burgerPrices = {
      "classico": 36.00,
      "duplo": 48.00,
      "vina": 46.00,
      "smash-duplo": 42.00
    };

    var burgerNames = {
      "classico": "O Clássico (140g na brasa)",
      "duplo": "O Clássico Duplo (280g na brasa)",
      "vina": "Vina Gretchen Especial (180g na brasa)",
      "smash-duplo": "Double Smash na Brasa (2x 90g)"
    };

    var sidePrices = {
      "nenhum": 0.00,
      "fritas": 16.00,
      "cheddar-bacon": 28.00,
      "polenta": 22.00
    };

    var sideNames = {
      "nenhum": "Sem acompanhamento",
      "fritas": "Batata Frita Rústica Crocante",
      "cheddar-bacon": "Super Batata com Cheddar & Bacon",
      "polenta": "Polenta Frita Crocante com Aioli"
    };

    var bKey = burgerSelect.value || "classico";
    var sKey = (sideSelect && sideSelect.value) || "nenhum";
    var qty = (qtyInput && parseInt(qtyInput.value, 10)) || 1;
    if (qty < 1) qty = 1;
    if (qty > 20) qty = 20;

    var basePrice = ((burgerPrices[bKey] || 36.00) * qty) + (sidePrices[sKey] || 0.00);
    priceDisplay.textContent = "R$ " + basePrice.toFixed(2).replace(".", ",");

    var distance = (distanceSelect && distanceSelect.value) || "local";
    var baseMinutes = 20;
    if (distance === "trindade") baseMinutes = 25;
    if (distance === "itacorubi") baseMinutes = 30;
    if (distance === "corrego") baseMinutes = 28;
    if (distance === "outro") baseMinutes = 35;

    if (timeDisplay) {
      timeDisplay.textContent = baseMinutes + " - " + (baseMinutes + 10) + " MIN";
    }

    if (whatsappBtn) {
      var msg = "Olá, Soul Brothers! Gostaria de fazer o pedido: " +
        qty + "x " + (burgerNames[bKey] || bKey) +
        (sKey !== "nenhum" ? " + " + (sideNames[sKey] || sKey) : "") +
        ". Valor estimado: R$ " + basePrice.toFixed(2).replace(".", ",") +
        " (Entrega: " + (distanceSelect ? distanceSelect.options[distanceSelect.selectedIndex].text : "Santa Mônica") + ").";
      whatsappBtn.href = "https://wa.me/5548991208940?text=" + encodeURIComponent(msg);
    }
  }

  if (burgerSelect) {
    burgerSelect.addEventListener("change", updateOrderEstimator);
    if (sideSelect) sideSelect.addEventListener("change", updateOrderEstimator);
    if (qtyInput) qtyInput.addEventListener("input", updateOrderEstimator);
    if (distanceSelect) distanceSelect.addEventListener("change", updateOrderEstimator);
    updateOrderEstimator();
  }



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
});

