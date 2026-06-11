const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const reveals = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const cursorGlow = document.querySelector(".cursor-glow");

document.getElementById("year").textContent = new Date().getFullYear();

window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true }
);

menuButton.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -50px" }
);

reveals.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.count);
      const duration = 1300;
      const startTime = performance.now();

      const tick = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener(
    "pointermove",
    (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    },
    { passive: true }
  );
} else {
  cursorGlow.remove();
}

const heroContent = document.querySelector(".hero-content");
const heroOrbits = document.querySelectorAll(".hero-orbit");

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > window.innerHeight) return;
    const offset = window.scrollY;
    heroContent.style.transform = `translateY(${offset * 0.08}px)`;
    heroOrbits.forEach((orbit, index) => {
      orbit.style.transform = `translateY(${offset * (0.04 + index * 0.03)}px)`;
    });
  },
  { passive: true }
);
