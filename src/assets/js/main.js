(() => {
  "use strict";

  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("#navbarMain");
  const backToTop = document.querySelector(".back-to-top");
  const heroVideo = document.querySelector("#bground-video");
  const heroVideoToggle = document.querySelector("[data-video-toggle]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const updateScrolledState = () => {
    const isScrolled = window.scrollY > 45;
    navbar?.classList.toggle("sticky-top", isScrolled);
    navbar?.classList.toggle("shadow-sm", isScrolled);
    backToTop?.classList.toggle("is-visible", window.scrollY > 300);
  };

  navToggle?.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navToggle.setAttribute("aria-label", expanded ? "Open navigation menu" : "Close navigation menu");
    navMenu?.classList.toggle("show", !expanded);
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle?.setAttribute("aria-expanded", "false");
      navToggle?.setAttribute("aria-label", "Open navigation menu");
      navMenu?.classList.remove("show");
    });
  });

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
  });

  heroVideoToggle?.addEventListener("click", () => {
    if (!heroVideo) return;
    const icon = heroVideoToggle.querySelector("i");
    if (heroVideo.paused) {
      heroVideo.play();
      heroVideoToggle.setAttribute("aria-label", "Pause background video");
      icon?.classList.replace("fa-play", "fa-pause");
    } else {
      heroVideo.pause();
      heroVideoToggle.setAttribute("aria-label", "Play background video");
      icon?.classList.replace("fa-pause", "fa-play");
    }
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const publicationSearch = document.querySelector("[data-publication-search]");
  const publicationYear = document.querySelector("[data-publication-year]");
  const publicationItems = [...document.querySelectorAll("[data-publication-item]")];
  const publicationGroups = [...document.querySelectorAll("[data-publication-year-group]")];
  const publicationPublishedSection = document.querySelector("[data-publication-published-section]");
  const publicationEmpty = document.querySelector("[data-publication-empty]");

  const filterPublications = () => {
    const query = publicationSearch?.value.trim().toLowerCase() || "";
    const year = publicationYear?.value || "";
    let visibleCount = 0;

    publicationItems.forEach((item) => {
      const matchesQuery = !query || item.textContent.toLowerCase().includes(query);
      const matchesYear = !year || item.dataset.year === year;
      const visible = matchesQuery && matchesYear;
      item.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    publicationGroups.forEach((group) => {
      const hasVisibleItems = [...group.querySelectorAll("[data-publication-item]")]
        .some((item) => !item.hidden);
      group.hidden = !hasVisibleItems;
    });

    if (publicationPublishedSection) {
      const hasVisiblePublishedItems = [...publicationPublishedSection.querySelectorAll("[data-publication-item]")]
        .some((item) => !item.hidden);
      publicationPublishedSection.hidden = !hasVisiblePublishedItems;
    }

    if (publicationEmpty) publicationEmpty.hidden = visibleCount !== 0;
  };

  publicationSearch?.addEventListener("input", filterPublications);
  publicationYear?.addEventListener("change", filterPublications);

  window.addEventListener("scroll", updateScrolledState, { passive: true });
  updateScrolledState();
})();
