// Current Year

const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// Mobile Navigation

const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");

function closeMenu() {
  if (!menuToggle || !siteNav) return;

  siteNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}


if (menuToggle && siteNav) {

  menuToggle.addEventListener("click", () => {

    const isOpen = siteNav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation"
        : "Open navigation"
    );

  });


  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });


  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMenu();
    }

  });


  window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {
      closeMenu();
    }

  });

}


// Header Scroll

const header = document.getElementById("site-header");

function updateHeader() {

  if (!header) return;

  header.classList.toggle(
    "scrolled",
    window.scrollY > 12
  );

}

updateHeader();

window.addEventListener(
  "scroll",
  updateHeader,
  { passive: true }
);


// Publication Filter

const filterButtons =
  document.querySelectorAll(".filter-button");

const publicationCards =
  document.querySelectorAll(".publication-card");


filterButtons.forEach((button) => {

  button.setAttribute(
    "aria-pressed",
    button.classList.contains("active")
      ? "true"
      : "false"
  );


  button.addEventListener("click", () => {

    const filter = button.dataset.filter;


    filterButtons.forEach((item) => {

      item.classList.remove("active");

      item.setAttribute(
        "aria-pressed",
        "false"
      );

    });


    button.classList.add("active");

    button.setAttribute(
      "aria-pressed",
      "true"
    );


    publicationCards.forEach((card) => {

      const shouldShow =
        filter === "all" ||
        card.dataset.type === filter;

      card.classList.toggle(
        "hidden",
        !shouldShow
      );

    });

  });

});


// Reveal Animation

const revealElements =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


// Active Navigation

const sections =
  document.querySelectorAll(
    "main section[id]"
  );

const navLinks =
  document.querySelectorAll(
    '.site-nav a[href^="#"]'
  );


if ("IntersectionObserver" in window) {

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const sectionId =
            entry.target.id;


          navLinks.forEach((link) => {

            const isActive =
              link.getAttribute("href") ===
              `#${sectionId}`;

            link.classList.toggle(
              "active",
              isActive
            );

          });

        });

      },
      {
        rootMargin:
          "-35% 0px -55% 0px",

        threshold: 0
      }
    );


  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

}