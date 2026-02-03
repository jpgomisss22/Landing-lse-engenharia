document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("no-js");
  document.body.classList.add("has-js");

  /* =========================
     ANIMAÇÕES DE SEÇÃO
  ========================== */
  const animatedElements = document.querySelectorAll("[data-animate]");

  if (animatedElements.length) {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedElements.forEach(el => sectionObserver.observe(el));
  }


  /* =========================
     CARROSSEL ABOUT
  ========================== */
  const images = document.querySelectorAll(".about__image");
  let index = 0;

  if (images.length > 1) {
    setInterval(() => {
      images[index].classList.remove("is-active");
      index = (index + 1) % images.length;
      images[index].classList.add("is-active");
    }, 4000);
  }


  /* =========================
     CARDS SERVIÇOS
  ========================== */
  const serviceCards = document.querySelectorAll(".service__card");

  if (serviceCards.length) {
    const cardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    serviceCards.forEach(card => cardObserver.observe(card));
  }


  /* =========================
     MENU MOBILE (SE EXISTIR)
  ========================== */
  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const overlay = document.getElementById("nav-overlay");

  const toggleMenu = (forceState) => {
    if (!menuBtn || !nav) return;

    const isOpen = typeof forceState === "boolean" ? forceState : !nav.classList.contains("is-open");

    nav.classList.toggle("is-open", isOpen);
    menuBtn.classList.toggle("is-active", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
    if (overlay) {
      overlay.classList.toggle("is-visible", isOpen);
      overlay.setAttribute("aria-hidden", String(!isOpen));
    }
  };

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => toggleMenu());

    nav.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    if (overlay) {
      overlay.addEventListener("click", () => toggleMenu(false));
    }

    const desktopMedia = window.matchMedia("(min-width: 768px)");
    desktopMedia.addEventListener("change", (e) => {
      if (e.matches) toggleMenu(false);
    });
  }

});