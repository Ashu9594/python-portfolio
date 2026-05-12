/**
 * Portfolio — interactions, theme, scroll UX
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initTypewriter();
  initReveal();
  initSkillTiles();
  initFormHandling();
  initScrollHint();
  initSmoothScroll();
  initScrollProgress();
  initNavScrollSpy();
  updateYear();
});

function initTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem("portfolio-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";
  root.setAttribute("data-theme", initial);

  const btn = document.getElementById("themeToggle");
  btn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
  });
}

function initNavigation() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 40) {
        navbar?.classList.add("is-scrolled");
      } else {
        navbar?.classList.remove("is-scrolled");
      }
    },
    { passive: true }
  );

  toggle?.addEventListener("click", () => {
    const open = navMenu?.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu?.classList.remove("is-open");
      toggle?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });
}

function initTypewriter() {
  const roles = [
    "Senior Python Developer",
    "Full Stack Developer",
    "Web Scraping Expert",
    "API & platform engineer",
    "AWS data workflows",
  ];

  const roleText = document.getElementById("roleText");
  if (!roleText) return;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const typeSpeed = 48;
  const pause = 2000;

  function tick() {
    const current = roles[roleIndex];

    if (deleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    roleText.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex === current.length) {
      deleting = true;
      setTimeout(tick, pause);
      return;
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(tick, deleting ? typeSpeed * 0.45 : typeSpeed);
  }

  tick();
}

function initReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
}

function initSkillTiles() {
  const tiles = document.querySelectorAll(".skill-tile");
  if (!tiles.length) return;

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const tile = entry.target;
        const level = tile.getAttribute("data-skill");
        if (level) {
          tile.style.setProperty("--level", level);
        }
        tile.classList.add("is-visible");
        obs.unobserve(tile);
      });
    },
    { threshold: 0.35 }
  );

  tiles.forEach((t) => io.observe(t));
}

function initFormHandling() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name")?.value ?? "";
    const email = document.getElementById("email")?.value ?? "";
    const message = document.getElementById("message")?.value ?? "";
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${email}`);
    window.location.href = `mailto:agwane16@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  });
}

function initScrollHint() {
  const btn = document.getElementById("scrollHint");
  btn?.addEventListener("click", () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  });

  window.addEventListener(
    "scroll",
    () => {
      if (!btn) return;
      if (window.scrollY > 240) {
        btn.style.opacity = "0";
        btn.style.pointerEvents = "none";
      } else {
        btn.style.opacity = "";
        btn.style.pointerEvents = "";
      }
    },
    { passive: true }
  );
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      if (href.includes(".pdf")) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const pct = height > 0 ? Math.min(100, Math.round((scrollTop / height) * 100)) : 0;
    bar.style.width = `${pct}%`;
    bar.setAttribute("aria-valuenow", String(pct));
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}

function initNavScrollSpy() {
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav-link");

  const onScroll = () => {
    let current = "";
    const y = window.scrollY + 140;
    sections.forEach((sec) => {
      if (sec.offsetTop <= y) {
        current = sec.getAttribute("id") || "";
      }
    });
    links.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("is-active", href === `#${current}`);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function updateYear() {
  const el = document.getElementById("currentYear");
  if (el) el.textContent = String(new Date().getFullYear());
}
