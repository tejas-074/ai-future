const iconPaths = {
  medical: '<path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z"/><path d="M12 8v7m-3.5-3.5h7"/>',
  education: '<path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c3.5 2.7 8.5 2.7 12 0v-5m4-2v6"/>',
  work: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-13 5h18m-11 0v2h4v-2"/>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1V10Z"/>',
  sunrise: '<path d="M3 18h18M5 14a7 7 0 0 1 14 0M12 2v3m-8 1 2 2m14-2-2 2M2 13h3m14 0h3"/>',
  bus: '<path d="M5 16V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11m-14 0h14m-14 0-2 3v1h18v-1l-2-3m-14-5h14M8 8h2m4 0h2M8 20v1m8-1v1"/><circle cx="7.5" cy="16.5" r=".5"/><circle cx="16.5" cy="16.5" r=".5"/>',
  laptop: '<rect x="4" y="4" width="16" height="12" rx="1.5"/><path d="M2 20h20l-2-4H4l-2 4Z"/>',
  cart: '<path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 9H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M11 11v3m4-3v3"/>',
  media: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 5 3-5 3V9Zm-7-1h18M7 5l2 3m4-3 2 3m4-3 2 3"/>',
  moon: '<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/><path d="m17 3 .7 1.5L19 5l-1.3.5L17 7l-.7-1.5L15 5l1.3-.5L17 3Z"/>',
  benefit: '<path d="m4 16 5-5 4 3 7-8"/><path d="M14 6h6v6"/>',
  warning: '<path d="M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 3h.01"/>',
  farm: '<path d="M12 21v-9m0 4c-4 0-7-2-7-6 4 0 7 2 7 6Zm0-4c0-4 3-7 7-7 0 4-3 7-7 7Z"/><path d="M5 21h14"/>',
  bank: '<path d="m3 9 9-6 9 6H3Zm2 2v7m5-7v7m4-7v7m5-7v7M3 21h18m-17-3h16"/>',
  car: '<path d="m5 11 1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11m-15 0h16a2 2 0 0 1 2 2v5h-3v-2H5v2H2v-5a2 2 0 0 1 2-2Zm2 0 1-3h10l1 3"/><circle cx="6.5" cy="13.5" r=".5"/><circle cx="17.5" cy="13.5" r=".5"/>',
  factory: '<path d="M3 21V9l6 3V8l6 4V5h6v16H3Z"/><path d="M7 17h2m3 0h2m3-8h2m-2 4h2m-2 4h2"/>',
  weather: '<path d="M7 18a5 5 0 1 1 1.2-9.9A6 6 0 0 1 20 10a4 4 0 0 1-1 8H7Z"/><path d="m9 20-1 2m7-2-1 2"/>',
  access: '<circle cx="12" cy="4" r="2"/><path d="M4 8h16m-8 0v6m0 0-5 7m5-7 5 7m-5-7-4-4m4 4 4-4"/>',
  support: '<path d="m14.5 6.5 3-3a5 5 0 0 1-6.6 6.6L5 16a2.1 2.1 0 0 0 3 3l5.9-5.9a5 5 0 0 1 6.6-6.6l-3 3-3-3Z"/>',
  newspaper: '<path d="M6 4h14v16H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z"/><path d="M6 4v13m4-8h6m-6 4h6m-6 4h6"/>',
  brain: '<path d="M12 5a3 3 0 0 0-5.8-1A3.5 3.5 0 0 0 4 10a3.5 3.5 0 0 0 1 6.5A3 3 0 0 0 11 18V6m1-1a3 3 0 0 1 5.8-1A3.5 3.5 0 0 1 20 10a3.5 3.5 0 0 1-1 6.5A3 3 0 0 1 13 18V6m-2 3H8m3 4H7m6-4h3m-3 4h4"/>',
  grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
  word: '<path d="M4 6h16M4 12h10M4 18h13"/><path d="m18 14 2 4 2-4"/>',
  hand: '<path d="M8 12V6a1.5 1.5 0 0 1 3 0v5-7a1.5 1.5 0 0 1 3 0v7-5a1.5 1.5 0 0 1 3 0v6-3a1.5 1.5 0 0 1 3 0v5a8 8 0 0 1-8 8h-1a7 7 0 0 1-5.5-2.7L3 15a1.8 1.8 0 0 1 2.8-2.2L8 15"/>',
  press: '<path d="M7 3h10l4 4v14H7V3Z"/><path d="M17 3v5h4M10 12h8m-8 4h8"/>',
  scissors: '<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="m8 8 12 12M8 16l12-12m-4 4 4 4"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z"/>',
  keyboard: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h.01M9 9h.01M12 9h.01M15 9h.01M18 9h.01M6 12h.01M9 12h.01M12 12h.01M15 12h.01M18 12h.01M8 15h8"/>',
  snake: '<path d="M4 7h8a3 3 0 1 0-3-3m11 13h-8a3 3 0 1 0 3 3M4 7v10h4m12-10v10h-4"/>',
  robot: '<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4m-4 5h.01M16 12h.01M9 16h6M2 12h2m16 0h2"/>',
  rocket: '<path d="M12 3c4 2 6 6 6 11l-6 7-6-7c0-5 2-9 6-11Z"/><circle cx="12" cy="10" r="2"/><path d="m6 13-3 3 1 3 4-2m10-4 3 3-1 3-4-2m-4 5v-3"/>',
  bulb: '<path d="M9 18h6m-5 3h4m-2-19a7 7 0 0 0-4 12.7c.8.6 1.3 1.4 1.5 2.3h5c.2-.9.7-1.7 1.5-2.3A7 7 0 0 0 12 2Z"/>',
  satellite: '<path d="m8 8 8 8m-6-10 6 2-6 6-2-6Zm6 10 6 2-2-6-6 6Zm-9-9-3 3m5 5-3 3m10-13 3-3"/>',
  crystal: '<path d="m12 3 8 6-3 10H7L4 9l8-6Z"/><path d="m4 9 8 2 8-2m-8-6v16m-5-10 5 10 5-10"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.8 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.8-1l-1.7.7-1.4-2.4L7.9 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.8-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.8 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1 0 2Z"/>',
  dna: '<path d="M7 3c0 6 10 12 10 18M17 3c0 6-10 12-10 18M8 6h8m-9 5h10m-9 5h8m-8 5h8"/>',
  spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm7 13 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"/>'
};

window.siteIcon = (name, className = 'line-icon') =>
  `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${iconPaths[name] || iconPaths.spark}</svg>`;

document.querySelectorAll('[data-icon]').forEach(icon => {
  icon.innerHTML = window.siteIcon(icon.dataset.icon, 'line-icon');
});

// 1. Scroll reveal animation
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('show');
    io.unobserve(e.target);
  });
}, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach(el => {
  el.classList.add('scroll-reveal');
  io.observe(el);
});

// 2. Animated counters
const counters = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count;
    let n = 0;
    const step = Math.max(1, Math.ceil(end / 60));
    const t = setInterval(() => {
      n += step;
      if (n >= end) { n = end; clearInterval(t); }
      el.textContent = n.toLocaleString() + (el.dataset.suffix || '');
    }, 25);
    counters.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => counters.observe(el));

// 3. Fake form submit (lab page)
const f = document.getElementById('testForm');
if (f) f.addEventListener('submit', e => { e.preventDefault(); document.getElementById('formMsg').textContent = 'Form submitted (test only).'; });

// 4. Tools page: search + category filter
const search = document.getElementById('toolSearch');
const cat = document.getElementById('toolCat');
if (search && cat) {
  const cards = document.querySelectorAll('.tool');
  const empty = document.getElementById('noResults');
  const apply = () => {
    const q = search.value.toLowerCase();
    let shown = 0;
    cards.forEach(c => {
      const ok = c.textContent.toLowerCase().includes(q) && (cat.value === 'all' || c.dataset.cat === cat.value);
      c.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });
    empty.style.display = shown ? 'none' : 'block';
  };
  search.addEventListener('input', apply);
  cat.addEventListener('change', apply);
}

// 5. Highlight the current page in the menu
(function () {
  const file = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul a').forEach(a => {
    if (a.getAttribute('href') === file) a.setAttribute('aria-current', 'page');
  });
})();

// 6. Scroll progress bar
const bar = document.createElement('div');
bar.id = 'scrollbar';
bar.setAttribute('aria-hidden', 'true');
document.body.appendChild(bar);

function onScrollProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? scrollY / max : 0;
  bar.style.width = (p * 100) + '%';
}
addEventListener('scroll', onScrollProgress, { passive: true });
addEventListener('resize', onScrollProgress);
onScrollProgress();

// 7. Load the fun effects on every page
const funCss = document.createElement('link');
funCss.rel = 'stylesheet';
funCss.href = 'fun.css';
document.head.appendChild(funCss);
const funJs = document.createElement('script');
funJs.src = 'fun.js';
document.body.appendChild(funJs);