/* ==========================================================================
   IEEE AIQ 2027 — Shared layout + interactions
   The header, navigation and footer are defined ONCE here and injected into
   #site-header / #site-footer on every page. Edit NAV to change the menu.
   ========================================================================== */
(function () {
  "use strict";
  const C = window.AIQ || {};

  /* ---------- Navigation (single source of truth) ---------- */
  const NAV = [
    { label: "Home", href: "index.html", id: "home" },
    { label: "Committee", href: "committee.html", id: "committee" },
    {
      label: "Authors", id: "authors", children: [
        { label: "Call for Papers", href: "call-for-papers.html", id: "call-for-papers" },
        { label: "Instructions for Authors", href: "instructions-for-authors.html", id: "instructions-for-authors" },
        { label: "Review Manuscripts", href: "review-manuscripts.html", id: "review-manuscripts" },
        { label: "Camera Ready", href: "camera-ready.html", id: "camera-ready" },
        { label: "Call for Reviewers", href: C.reviewerFormUrl || "#", external: true }
      ]
    },
    { label: "Call for Papers", href: "call-for-papers.html", id: "call-for-papers" },
    { label: "Important Dates", href: "important-dates.html", id: "important-dates" },
    {
      label: "Program", id: "program", cols: 2, children: [
        { label: "Keynotes", href: "keynotes.html", id: "keynotes" },
        { label: "Speakers", href: "speakers.html", id: "speakers" },
        { label: "Program Overview", href: "programs.html", id: "programs" },
        { label: "Workshops", href: "programs.html#workshops" },
        { label: "Tutorials", href: "programs.html#tutorials" },
        { label: "Industry Forum", href: "programs.html#industry-forum" },
        { label: "Mentoring Program", href: "programs.html#mentoring" },
        { label: "Pre-University STEM Education", href: "programs.html#stem" },
        { label: "Startup Pitch Competition", href: "programs.html#startup-pitch" },
        { label: "Student Program", href: "programs.html#student" },
        { label: "Special Program", href: "programs.html#special" },
        { label: "Technical Sessions", href: "programs.html#technical-sessions" },
        { label: "YP Programs", href: "programs.html#yp" },
        { label: "Women in Engineering", href: "programs.html#wie" }
      ]
    },
    { label: "Registration", href: "registration.html", id: "registration" },
    {
      label: "Attend", id: "attend", children: [
        { label: "Venue Information", href: "venue.html", id: "venue" },
        { label: "Hotel Information", href: "hotels.html", id: "hotels" },
        { label: "Local Attractions", href: "places.html", id: "places" },
        { label: "Visa Information", href: "visa.html", id: "visa" },
        { label: "Visa Letter Request", href: "visa-request.html", id: "visa-request" }
      ]
    },
    { label: "Sponsorship", href: "sponsorship.html", id: "sponsorship" },
    { label: "Contact", href: "contact-us.html", id: "contact-us" }
  ];

  const page = document.body.dataset.page || "";
  const isActive = (item) => item.id === page || (item.children || []).some((c) => c.id === page);
  const ext = (c) => (c.external ? ' target="_blank" rel="noopener"' : "");
  const icon = (n) => `<span class="material-icons" aria-hidden="true">${n}</span>`;

  /* ---------- Header ---------- */
  const desktopNav = NAV.map((item) => {
    if (!item.children) {
      return `<li><a href="${item.href}" class="${isActive(item) ? "active" : ""}">${item.label}</a></li>`;
    }
    const sub = item.children.map((c) =>
      `<li><a href="${c.href}"${ext(c)} class="${c.id === page ? "active" : ""}">${c.label}</a></li>`).join("");
    return `<li><a href="${item.children[0].href}" class="${isActive(item) ? "active" : ""}" aria-haspopup="true">${item.label}<span class="material-icons caret" aria-hidden="true">expand_more</span></a>
      <ul class="dropdown${item.cols === 2 ? " cols-2" : ""}">${sub}</ul></li>`;
  }).join("");

  const mobileNav = NAV.map((item, i) => {
    if (!item.children) {
      return `<li><a href="${item.href}" class="${isActive(item) ? "active" : ""}">${item.label}</a></li>`;
    }
    const sub = item.children.map((c) => `<li><a href="${c.href}"${ext(c)} class="${c.id === page ? "active" : ""}">${c.label}</a></li>`).join("");
    return `<li><button class="m-toggle" aria-expanded="${isActive(item)}" aria-controls="m-sub-${i}">${item.label}${icon("expand_more")}</button>
      <ul class="m-sub${isActive(item) ? " open" : ""}" id="m-sub-${i}">${sub}</ul></li>`;
  }).join("");

  const headerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="meta-bar"><div class="container">
    <div class="meta-links">
      <a href="https://www.ieee.org/" target="_blank" rel="noopener">IEEE.org</a>
      <a href="https://ieeexplore.ieee.org/" target="_blank" rel="noopener">IEEE Xplore</a>
      <a href="https://standards.ieee.org/" target="_blank" rel="noopener">IEEE Standards</a>
      <a href="https://spectrum.ieee.org/" target="_blank" rel="noopener">IEEE Spectrum</a>
      <a href="https://www.ieee.org/sitemap.html" target="_blank" rel="noopener">More Sites</a>
    </div>
    <div class="meta-right">${C.dates} &nbsp;|&nbsp; ${C.format}<a href="${C.submitUrl}" target="_blank" rel="noopener">Submit Paper →</a></div>
  </div></div>
  <header class="site-header" id="top-header"><div class="container">
    <a class="brand" href="index.html" aria-label="${C.shortName} home">
      <img src="assets/img/logos/aiq-logo.svg" alt="" width="50" height="50">
      <span class="brand-text"><strong>${C.shortName}</strong><span>AI &amp; Quantum Computing</span></span>
    </a>
    <nav class="main-nav" aria-label="Main"><ul>${desktopNav}</ul></nav>
    <a class="btn btn-primary btn-sm header-cta" href="${C.submitUrl}" target="_blank" rel="noopener">${icon("upload_file")}Submit Paper</a>
    <button class="nav-toggle" aria-label="Open menu" aria-expanded="false">${icon("menu")}</button>
  </div></header>
  <div class="mobile-nav" aria-hidden="true">
    <div class="panel" role="dialog" aria-label="Menu">
      <div class="panel-head">
        <a class="brand" href="index.html"><img src="assets/img/logos/aiq-logo.svg" alt="" width="40" height="40"><span class="brand-text"><strong>${C.shortName}</strong></span></a>
        <button class="nav-toggle" style="display:inline-flex" aria-label="Close menu">${icon("close")}</button>
      </div>
      <ul>${mobileNav}</ul>
      <div class="m-cta"><a class="btn btn-primary" href="${C.submitUrl}" target="_blank" rel="noopener">${icon("upload_file")}Submit Paper</a></div>
    </div>
    <div class="mask"></div>
  </div>`;

  /* ---------- Footer ---------- */
  const s = C.socials || {};
  const footerHTML = `
  <footer>
    <div class="mega-footer"><div class="container">
      <div class="f-brand">
        <strong>${C.shortName}</strong>
        <p>${C.fullName}. ${C.dates} · ${C.venue}.</p>
        <p class="muted" style="color:rgba(255,255,255,.55);font-size:13px">Technically co-sponsored by IEEE TEMS <em>(TODO: confirm sponsorship &amp; IEEE conference record #)</em></p>
        <div class="socials">
          <a href="${s.linkedin}" aria-label="LinkedIn">in</a>
          <a href="${s.x}" aria-label="X">X</a>
          <a href="${s.youtube}" aria-label="YouTube">YT</a>
          <a href="${s.instagram}" aria-label="Instagram">IG</a>
        </div>
      </div>
      <div><h4>Authors</h4><ul>
        <li><a href="call-for-papers.html">Call for Papers</a></li>
        <li><a href="instructions-for-authors.html">Instructions for Authors</a></li>
        <li><a href="camera-ready.html">Camera Ready</a></li>
        <li><a href="important-dates.html">Important Dates</a></li>
        <li><a href="${C.submitUrl}" target="_blank" rel="noopener">Submit Paper</a></li>
      </ul></div>
      <div><h4>Attend</h4><ul>
        <li><a href="registration.html">Registration</a></li>
        <li><a href="venue.html">Venue</a></li>
        <li><a href="hotels.html">Hotels</a></li>
        <li><a href="visa.html">Visa</a></li>
        <li><a href="sponsorship.html">Sponsorship</a></li>
      </ul></div>
      <div class="f-contact"><h4>Contact</h4><ul>
        <li>${icon("place")}<span>${C.address}</span></li>
        <li>${icon("mail")}<a href="mailto:${C.email}">${C.email}</a></li>
        <li>${icon("call")}<span>${C.phone}</span></li>
      </ul></div>
    </div></div>
    <div class="footer-copy"><div class="container">
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="sitemap.html">Sitemap</a></li>
        <li><a href="https://www.ieee.org/accessibility-statement.html" target="_blank" rel="noopener">Accessibility</a></li>
        <li><a href="https://www.ieee.org/about/corporate/governance/p9-26.html" target="_blank" rel="noopener">Nondiscrimination Policy</a></li>
        <li><a href="https://secure.ethicspoint.com/domain/media/en/gui/20410/index.html" target="_blank" rel="noopener">IEEE Ethics Reporting</a></li>
        <li><a href="https://www.ieee.org/security-privacy.html" target="_blank" rel="noopener">IEEE Privacy Policy</a></li>
        <li><a href="https://www.ieee.org/about/help/site-terms-conditions.html" target="_blank" rel="noopener">Terms</a></li>
      </ul>
      <p>© Copyright ${new Date().getFullYear()} IEEE – All rights reserved. Use of this website signifies your agreement to the IEEE Terms and Conditions. A public charity, IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity.</p>
    </div></div>
  </footer>
  <button class="to-top" aria-label="Back to top">${icon("arrow_upward")}</button>`;

  const headerSlot = document.getElementById("site-header");
  const footerSlot = document.getElementById("site-footer");
  if (headerSlot) headerSlot.outerHTML = headerHTML;
  if (footerSlot) footerSlot.outerHTML = footerHTML;

  /* ---------- Config bindings ---------- */
  document.querySelectorAll("[data-cfg]").forEach((el) => { if (C[el.dataset.cfg] != null) el.textContent = C[el.dataset.cfg]; });
  document.querySelectorAll("[data-cfg-href]").forEach((el) => { if (C[el.dataset.cfgHref]) el.href = C[el.dataset.cfgHref]; });

  /* ---------- Header scroll state + back-to-top ---------- */
  const header = document.getElementById("top-header");
  const toTop = document.querySelector(".to-top");
  const onScroll = () => {
    const y = window.scrollY;
    header && header.classList.toggle("scrolled", y > 10);
    toTop && toTop.classList.toggle("show", y > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop && toTop.addEventListener("click", () => window.scrollTo({ top: 0 }));

  /* ---------- Mobile menu ---------- */
  const mnav = document.querySelector(".mobile-nav");
  const setMenu = (open) => {
    mnav.classList.toggle("open", open);
    mnav.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  document.querySelectorAll(".nav-toggle").forEach((b) => b.addEventListener("click", () => setMenu(!mnav.classList.contains("open"))));
  mnav.querySelector(".mask").addEventListener("click", () => setMenu(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
  mnav.querySelectorAll(".m-toggle").forEach((b) => b.addEventListener("click", () => {
    const sub = document.getElementById(b.getAttribute("aria-controls"));
    const open = !sub.classList.contains("open");
    sub.classList.toggle("open", open);
    b.setAttribute("aria-expanded", String(open));
  }));

  /* ---------- Accordion ---------- */
  document.querySelectorAll(".acc-item").forEach((item) => {
    const head = item.querySelector(".acc-head");
    head.setAttribute("aria-expanded", String(item.classList.contains("open")));
    head.addEventListener("click", () => {
      const open = !item.classList.contains("open");
      item.classList.toggle("open", open);
      head.setAttribute("aria-expanded", String(open));
    });
  });
  // Deep links like call-for-papers.html#track-3 open that track
  const target = location.hash && document.querySelector(`.acc-item#${CSS.escape(location.hash.slice(1))}`);
  if (target) {
    target.classList.add("open");
    target.querySelector(".acc-head").setAttribute("aria-expanded", "true");
  }

  /* ---------- Countdown ---------- */
  const cd = document.querySelector("[data-countdown]");
  if (cd && C.startsAt) {
    const target = new Date(C.startsAt).getTime();
    const parts = ["days", "hours", "minutes", "seconds"];
    cd.innerHTML = parts.map((p) => `<div class="cd"><b data-u="${p}">--</b><small>${p}</small></div>`).join("");
    const tick = () => {
      let d = Math.max(0, target - Date.now()) / 1000;
      const v = { days: Math.floor(d / 86400), hours: Math.floor(d / 3600) % 24, minutes: Math.floor(d / 60) % 60, seconds: Math.floor(d) % 60 };
      parts.forEach((p) => { cd.querySelector(`[data-u="${p}"]`).textContent = String(v[p]).padStart(2, "0"); });
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* ---------- Hero network animation (AI nodes + quantum links) ---------- */
  const canvas = document.querySelector(".hero canvas");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = canvas.getContext("2d");
    let w, h, nodes;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 16000));
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.8 + .8, q: Math.random() < .15
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, dist = Math.hypot(dx, dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(127,220,255,${(1 - dist / 140) * .35})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = a.q ? "rgba(185,168,255,.95)" : "rgba(255,255,255,.85)";
        ctx.beginPath(); ctx.arc(a.x, a.y, a.q ? a.r + 1.5 : a.r, 0, Math.PI * 2); ctx.fill();
        if (a.q) { // "qubit" orbit ring
          ctx.strokeStyle = "rgba(185,168,255,.35)";
          ctx.beginPath(); ctx.ellipse(a.x, a.y, 9, 4, performance.now() / 1200 + i, 0, Math.PI * 2); ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize);
  }
})();
