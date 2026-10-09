/* Yamane Taiko site behaviour. You normally do not need to edit this file. */

const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const MARK = '<img src="assets/mark.svg" alt="" style="width:100%;height:auto;display:block">';
const SILHOUETTE = '<svg class="ph" viewBox="0 0 120 130" aria-hidden="true"><circle cx="60" cy="42" r="24" fill="currentColor"/><path d="M8 130c4-34 24-52 52-52s48 18 52 52z" fill="currentColor"/></svg>';

/* navigation */
// Links are written as /about, /media, etc. so the address bar shows yamanetaiko.org/about.
// When the files are opened from a computer (or in a preview), point them at the .html files instead.
if (!/(^|\.)yamanetaiko\.org$/.test(location.hostname) && !/^https?:$/.test(location.protocol) || location.hostname.endsWith("claude.ai") || location.hostname.endsWith("claudeusercontent.com")) {
  document.querySelectorAll('a[href^="/"]').forEach(a => { const h = a.getAttribute("href"); const [p, hash = ""] = h.split("#"); a.setAttribute("href", (p === "/" ? "index.html" : p.slice(1) + ".html") + (hash ? "#" + hash : "")); });
}
// On the live site, tidy the address bar if someone arrives at /about.html
if (/(^|\.)yamanetaiko\.org$/.test(location.hostname) && /\.html$/.test(location.pathname)) history.replaceState(null, "", location.pathname.replace(/(index)?\.html$/, "") + location.search + location.hash);
{ const page = document.body.dataset.page || "home";
  document.querySelectorAll("#nav a").forEach(a => { const h = a.getAttribute("href").replace(/^\//, "").replace(/\.html$/, ""); if ((h === "" || h === "index" ? "home" : h) === page) a.setAttribute("aria-current", "page"); }); }
$("#menuBtn").addEventListener("click", () => { const o = $("#nav").classList.toggle("open"); $(".site-head").classList.toggle("menu-open", o); $("#menuBtn").setAttribute("aria-expanded", o); });

/* hero slideshow (home page) */
if ($("#slides")) {
$("#slides").innerHTML = HERO_IMAGES.map((s, i) => `<div class="slide${i ? "" : " on"}${s.src ? "" : " empty"}${s.fit === "whole" ? " whole" : ""}" aria-hidden="${i ? "true" : "false"}">${s.src ? `<canvas class="bg" width="2" height="64" aria-hidden="true"></canvas><img class="fg"${s.focus ? ` style="object-position:center ${esc(s.focus)}"` : ""} src="${esc(s.src)}" alt=""${i ? ' loading="lazy"' : ""}>` : `<span class="ph">${MARK}</span><span class="ph-label caps">Photo ${i + 1}</span>`}</div>`).join("");
$("#dots").innerHTML = HERO_IMAGES.length > 1 ? HERO_IMAGES.map((_, i) => `<button type="button" aria-label="Show photo ${i + 1}" aria-current="${!i}"></button>`).join("") : "";
{ const first = document.querySelector(".slide img.fg"), hero = document.querySelector(".hero");
  // decide from the banner's own size (works even if the home page was hidden when the site loaded)
  const fit = () => { const w = hero.clientWidth, h = hero.clientHeight; if (w && h) hero.classList.toggle("letterbox", h * 2 < w - 2); };
  if (window.ResizeObserver) new ResizeObserver(fit).observe(hero); addEventListener("resize", fit); fit(); }
// soft side fill from each photo's own edge colours (shown on very wide screens)
document.querySelectorAll(".slide img.fg").forEach(img => {
  const paint = () => { const c = img.parentNode.querySelector("canvas.bg"); if (!c || !img.naturalWidth) return;
    const x = c.getContext("2d"), w = img.naturalWidth, h = img.naturalHeight;
    x.drawImage(img, 0, 0, 3, h, 0, 0, 1, 64); x.drawImage(img, w - 3, 0, 3, h, 1, 0, 1, 64); };
  img.complete ? paint() : img.addEventListener("load", paint);
});
let cur = 0, timer;
function show(n) {
  const sl = [...document.querySelectorAll(".slide")], dt = [...document.querySelectorAll("#dots button")];
  cur = (n + sl.length) % sl.length;
  // crossfade: the old photo stays fully visible underneath while the new one fades in on top
  sl.forEach((s, i) => { s.classList.toggle("prev", s.classList.contains("on") && i !== cur); s.classList.toggle("on", i === cur); s.setAttribute("aria-hidden", i !== cur); if (i !== cur && !s.classList.contains("prev")) s.classList.remove("prev"); });
  clearTimeout(show.t); show.t = setTimeout(() => sl.forEach(s => s.classList.remove("prev")), 1300);
  dt.forEach((d, i) => d.setAttribute("aria-current", i === cur));
}
function play() { clearInterval(timer); if (HERO_IMAGES.length > 1) timer = setInterval(() => show(cur + 1), SLIDE_SECONDS * 1000); }
document.querySelectorAll(".hero-nav").forEach(b => { b.hidden = HERO_IMAGES.length < 2; b.addEventListener("click", () => { show(cur + (b.classList.contains("next") ? 1 : -1)); play(); }); });
$("#dots").addEventListener("click", e => { const b = e.target.closest("button"); if (!b) return; show([...b.parentNode.children].indexOf(b)); play(); });
play();
}

/* members */
function photoHTML(m) { return m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy">` : SILHOUETTE; }
if ($("#roster")) $("#roster").innerHTML = MEMBERS.map(m => `<figure class="member"><div class="portrait">${photoHTML(m)}</div><figcaption class="n">${esc(m.name)}</figcaption></figure>`).join("");

/* media */
const ytId = u => (String(u).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/) || [])[1];
const videoCard = v => { const id = ytId(v.url), th = v.thumb || (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "");
  return `<div class="video"><button class="thumb" type="button" ${id ? `data-yt="${id}"` : `data-href="${esc(v.url)}"`} aria-label="Play ${esc(v.title)}"><span class="wm">${MARK}</span>${th ? `<img src="${esc(th)}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span class="play"><svg width="22" height="22" viewBox="0 0 20 20" aria-hidden="true"><path d="M6.5 3.5L16.5 10L6.5 16.5Z" fill="#fff"/></svg></span></button><h3>${esc(v.title)}</h3><a class="yt" href="${esc(v.url)}" target="_blank" rel="noopener">Watch on YouTube ↗</a></div>`; };
// click a thumbnail to play the video right on the page
document.addEventListener("click", e => {
  const b = e.target.closest(".thumb"); if (!b || b.classList.contains("playing")) return;
  // YouTube only plays embedded videos on a hosted site (http/https). Opened as a local file, go to YouTube instead.
  if (!b.dataset.yt || !/^https?:$/.test(location.protocol)) { const u = b.dataset.href || `https://youtu.be/${b.dataset.yt}`; window.open(u, "_blank", "noopener"); return; }
  b.classList.add("playing");
  b.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0" title="${b.getAttribute("aria-label").replace(/^Play /, "")}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
});
if ($("#videos")) $("#videos").innerHTML = VIDEOS.map(videoCard).join("");
if ($("#homeVideos")) $("#homeVideos").innerHTML = VIDEOS.slice(0, 4).map(videoCard).join("");
if ($("#photos")) {
$("#photos").innerHTML = PHOTOS.map((p, i) => `<button type="button" data-i="${i}" aria-label="Open photo ${i + 1}"><img src="${esc(p.thumb || p.src)}" alt="" loading="lazy" onload="if(this.naturalHeight>this.naturalWidth*1.1)this.parentNode.classList.add('tall')"></button>`).join("");
/* photo viewer */
{ const lb = $("#lightbox"), img = $("#lbImg"); let at = 0, lastFocus = null;
  const go = n => { at = (n + PHOTOS.length) % PHOTOS.length; img.src = PHOTOS[at].src; img.alt = ""; $("#lbCount").textContent = `${at + 1} / ${PHOTOS.length}`;
    [at + 1, at - 1].forEach(k => { const p = PHOTOS[(k + PHOTOS.length) % PHOTOS.length]; if (p) new Image().src = p.src; }); };
  const open = n => { lastFocus = document.activeElement; lb.hidden = false; requestAnimationFrame(() => lb.classList.add("open")); document.body.style.overflow = "hidden"; go(n); $("#lbClose").focus(); };
  const close = () => { lb.classList.remove("open"); document.body.style.overflow = ""; setTimeout(() => { lb.hidden = true; }, 200); if (lastFocus) lastFocus.focus(); };
  $("#photos").addEventListener("click", e => { const b = e.target.closest("button"); if (b) open(+b.dataset.i); });
  $("#lbPrev").addEventListener("click", () => go(at - 1));
  $("#lbNext").addEventListener("click", () => go(at + 1));
  $("#lbClose").addEventListener("click", close);
  lb.addEventListener("click", e => { if (e.target === lb || e.target.tagName === "FIGURE") close(); });
  document.addEventListener("keydown", e => { if (lb.hidden) return; if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") go(at - 1); else if (e.key === "ArrowRight") go(at + 1); });
  let sx = null; lb.addEventListener("touchstart", e => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) go(at + (dx < 0 ? 1 : -1)); sx = null; });
}
const tabs = [[$("#tabVideo"), $("#videoPanel")], [$("#tabPhoto"), $("#photoPanel")]];
tabs.forEach(([t]) => t.addEventListener("click", () => tabs.forEach(([x, p]) => { x.setAttribute("aria-selected", x === t); p.hidden = x !== t; })));
// open straight to photos with media.html#photos
if (location.hash === "#photos") $("#tabPhoto").click();
}

/* contact (Formspree, sent in the background so visitors stay on the page) */
if ($("#inquiry")) $("#inquiry").addEventListener("submit", async e => {
  e.preventDefault(); const f = e.target, note = $("#formNote"), btn = f.querySelector('button[type="submit"]'); note.hidden = false;
  if (!f.checkValidity()) { note.textContent = "Please fill in your name, a valid email, a subject, and a message."; return; }
  if (!SITE.formEndpoint) { note.textContent = `This form isn't connected yet. Please email us at ${SITE.email}.`; return; }
  const data = new FormData(f);
  data.set("_subject", `Yamane Taiko website: ${data.get("subject")}`);   // email subject line in the inbox
  data.set("_replyto", data.get("email"));                               // "Reply" goes to the visitor
  btn.disabled = true; const label = btn.textContent; btn.textContent = "Sending…"; note.textContent = "";
  try {
    const r = await fetch(SITE.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
    if (r.ok) { f.reset(); note.textContent = "Thanks! Your message was sent. We'll reply by email."; }
    else {
      const j = await r.json().catch(() => ({}));
      const msg = (j.errors || []).map(x => x.message).filter(Boolean).join(" ");
      note.textContent = msg ? `${msg} You can also email us at ${SITE.email}.` : `Your message didn't go through. Please email us at ${SITE.email}.`;
    }
  } catch { note.textContent = `Your message didn't go through. Please check your connection or email us at ${SITE.email}.`; }
  finally { btn.disabled = false; btn.textContent = label; }
});
const ICONS = {
  Instagram: '<svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
  YouTube: '<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path fill="currentColor" d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2C1.1 8.9 1.1 12 1.1 12s0 3.1.4 4.8a2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2c.4-1.7.4-4.8.4-4.8s0-3.1-.4-4.8zM9.8 15.1V8.9L15.5 12z"/></svg>',
};
if ($("#followLinks")) $("#followLinks").innerHTML = SITE.socials.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener"><span>${esc(s.label)}</span><span aria-hidden="true">↗</span></a>`).join("");
$("#footSocial").innerHTML = SITE.socials.filter(s => ICONS[s.label]).map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="Yamane Taiko on ${esc(s.label)}">${ICONS[s.label]}</a>`).join("");
$("#yr").textContent = new Date().getFullYear();
