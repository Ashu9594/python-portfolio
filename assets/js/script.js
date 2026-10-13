/**
 * Portfolio interactions: drawer, terminal, timeline, form, scroll.
 */

document.addEventListener("DOMContentLoaded", () => {
  mountIcons();
  initDrawer();
  initTerminal();
  initTimeline();
  initReveal();
  initScrollSpy();
  initScrollProgress();
  initSmoothScroll();
  initContactForm();
  initYear();
});

function mountIcons() {
  if (!window.lucide) return;
  window.lucide.createIcons({
    attrs: {
      width: 18,
      height: 18,
      "stroke-width": 1.75,
      "aria-hidden": "true"
    }
  });
}

function initDrawer() {
  const toggle = document.getElementById("navToggle");
  const drawer = document.getElementById("mobileDrawer");
  if (!toggle || !drawer) return;

  const panel = drawer.querySelector(".drawer__panel");
  const closers = drawer.querySelectorAll("[data-close-drawer], .drawer__links a, .drawer__actions a");
  let lastFocus = null;

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    drawer.hidden = !open;
    document.body.classList.toggle("nav-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      lastFocus = document.activeElement;
      const first = panel?.querySelector("a, button");
      first?.focus();
    } else if (lastFocus instanceof HTMLElement) {
      lastFocus.focus();
    }
  }

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  closers.forEach((el) => {
    el.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (drawer.hidden) return;
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key !== "Tab" || !panel) return;
    const focusable = [...panel.querySelectorAll("a, button")].filter((node) => !node.hasAttribute("disabled"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function initTerminal() {
  const body = document.getElementById("terminalBody");
  if (!body) return;

  const script = [
    { kind: "cmd", hot: "fastapi", text: "uvicorn api.main:app --host 0.0.0.0 --port 8000" },
    { kind: "info", text: "INFO  Started server process [1]" },
    { kind: "ok", hot: "fastapi", text: "INFO  Application startup complete · FastAPI" },
    { kind: "cmd", hot: "glue", text: "aws glue start-job-run --job-name decision-etl" },
    { kind: "ok", hot: "glue", text: "JobRunState  SUCCEEDED    reliability  99.9%" },
    { kind: "cmd", hot: "postgres", text: 'psql -c "SELECT 1 FROM pipeline_health;"' },
    { kind: "ok", hot: "postgres", text: "PostgreSQL 16  accepting connections" },
    { kind: "cmd", hot: "docker", text: "docker compose up -d api worker postgres" },
    { kind: "ok", hot: "docker", text: "Containers healthy · FastAPI · Glue · PostgreSQL · Docker" }
  ];

  const chips = document.querySelectorAll(".stack-pills .chip");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setHot(key) {
    chips.forEach((chip) => chip.classList.toggle("is-hot", chip.dataset.hot === key));
  }

  function paint(lines, cursor) {
    body.replaceChildren();
    lines.forEach((line, index) => {
      const row = document.createElement("div");
      row.className = `terminal__line terminal__line--${line.kind}`;
      if (line.kind === "cmd") {
        const prompt = document.createElement("span");
        prompt.className = "terminal__prompt";
        prompt.textContent = "$ ";
        row.append(prompt, document.createTextNode(line.shown));
      } else {
        row.textContent = line.shown;
      }
      if (cursor && index === lines.length - 1) {
        const caret = document.createElement("span");
        caret.className = "terminal__cursor";
        row.append(caret);
      }
      body.append(row);
    });
  }

  if (reduced) {
    paint(script.map((line) => ({ ...line, shown: line.text })), false);
    setHot("docker");
    return;
  }

  const visible = [];
  let index = 0;
  let char = 0;

  function tick() {
    const current = script[index];
    if (!visible.length || visible[visible.length - 1].text !== current.text) {
      visible.push({ ...current, shown: "" });
      if (visible.length > 8) visible.shift();
    }
    const row = visible[visible.length - 1];
    char += 1;
    row.shown = current.text.slice(0, char);
    setHot(current.hot || "");
    paint(visible, true);

    if (char < current.text.length) {
      window.setTimeout(tick, current.kind === "cmd" ? 18 : 12);
      return;
    }

    char = 0;
    index = (index + 1) % script.length;
    if (index === 0) {
      window.setTimeout(() => {
        visible.length = 0;
        tick();
      }, 2200);
      return;
    }
    window.setTimeout(tick, current.kind === "ok" ? 700 : 280);
  }

  tick();
}

function initTimeline() {
  const timeline = document.getElementById("timeline");
  if (!timeline) return;

  const items = [...timeline.querySelectorAll(".role")];
  timeline.classList.add("is-ready");

  function openItem(item) {
    items.forEach((node) => {
      const open = node === item;
      node.classList.toggle("is-open", open);
      const trigger = node.querySelector(".role__trigger");
      trigger?.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  items.forEach((item, index) => {
    const trigger = item.querySelector(".role__trigger");
    trigger?.addEventListener("click", () => {
      const already = item.classList.contains("is-open");
      if (already) {
        item.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
        return;
      }
      openItem(item);
    });

    trigger?.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      const next = event.key === "ArrowDown" ? items[index + 1] : items[index - 1];
      next?.querySelector(".role__trigger")?.focus();
    });
  });
}

function initReveal() {
  const nodes = document.querySelectorAll("[data-reveal]");
  if (!nodes.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((node) => node.classList.add("is-in"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  nodes.forEach((node) => observer.observe(node));
}

function initScrollSpy() {
  const header = document.querySelector(".site-header");
  const links = [...document.querySelectorAll(".nav-link, .drawer__links a")];
  const sections = ["about", "stack", "projects", "experience", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function onScroll() {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
    const marker = window.scrollY + 120;
    let current = "";
    sections.forEach((section) => {
      if (section.offsetTop <= marker) current = section.id;
    });
    links.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;

  function onScroll() {
    const root = document.documentElement;
    const height = root.scrollHeight - root.clientHeight;
    const value = height > 0 ? Math.min(100, Math.round((window.scrollY / height) * 100)) : 0;
    bar.style.width = `${value}%`;
    bar.setAttribute("aria-valuenow", String(value));
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (id !== "#top") {
        history.replaceState(null, "", id);
      }
    });
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const fields = [
    { id: "name", error: "name-error", test: (value) => value.trim().length >= 2, message: "Enter your name." },
    { id: "email", error: "email-error", test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()), message: "Enter a valid email." },
    { id: "message", error: "message-error", test: (value) => value.trim().length >= 10, message: "Add a short note — at least a sentence." }
  ];

  function showError(field, message) {
    const input = document.getElementById(field.id);
    const error = document.getElementById(field.error);
    if (!input || !error) return;
    input.setAttribute("aria-invalid", message ? "true" : "false");
    input.setAttribute("aria-describedby", message ? field.error : "form-note");
    error.hidden = !message;
    error.textContent = message || "";
  }

  fields.forEach((field) => {
    document.getElementById(field.id)?.addEventListener("input", () => showError(field, ""));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let firstInvalid = null;
    let valid = true;

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      const value = input?.value ?? "";
      const ok = field.test(value);
      showError(field, ok ? "" : field.message);
      if (!ok) {
        valid = false;
        firstInvalid = firstInvalid || input;
      }
    });

    if (!valid) {
      if (status) {
        status.textContent = "Check the highlighted fields.";
        status.classList.add("is-error");
      }
      firstInvalid?.focus();
      return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const subject = encodeURIComponent(`Portfolio note from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    if (status) {
      status.textContent = "Opening your email app…";
      status.classList.remove("is-error");
    }
    window.location.href = `mailto:agwane16@gmail.com?subject=${subject}&body=${body}`;
    form.reset();
  });
}

function initYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}
