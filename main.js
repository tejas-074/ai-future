// 1. Scroll reveal animation
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

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

// 3. Particle network background
const c = document.getElementById('particles');
if (c) {
  const ctx = c.getContext('2d');
  let w, h, pts = [];
  const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
  resize(); addEventListener('resize', resize);
  for (let i = 0; i < 70; i++) pts.push({ x: Math.random()*innerWidth, y: Math.random()*innerHeight, vx: (Math.random()-.5)*.6, vy: (Math.random()-.5)*.6 });
  (function draw() {
    ctx.clearRect(0, 0, w, h);
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.fillStyle = '#00e5ff';
      ctx.fillRect(p.x, p.y, 2, 2);
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(p.x - pts[j].x, p.y - pts[j].y);
        if (d < 120) {
          ctx.strokeStyle = `rgba(139,92,246,${1 - d/120})`;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
        }
      }
    });
    requestAnimationFrame(draw);
  })();
}

// 4. Parallax on orbs
addEventListener('scroll', () => {
  document.querySelectorAll('.orb').forEach((o, i) => {
    o.style.translate = `0 ${scrollY * (i ? -0.12 : 0.15)}px`;
  });
});

// 5. Fake form submit (lab page)
const f = document.getElementById('testForm');
if (f) f.addEventListener('submit', e => { e.preventDefault(); document.getElementById('formMsg').textContent = '✅ Form submitted (test only).'; });

// 6. Tools page: search + category filter
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

// 7. Highlight the current page in the menu
(function () {
  const file = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul a').forEach(a => {
    if (a.getAttribute('href') === file) a.setAttribute('aria-current', 'page');
  });
})();

// 8. Scroll progress bar + rocket
const bar = document.createElement('div');
bar.id = 'scrollbar';
bar.setAttribute('aria-hidden', 'true');
document.body.appendChild(bar);

const rocket = document.createElement('button');
rocket.id = 'rocket';
rocket.type = 'button';
rocket.setAttribute('aria-label', 'Launch back to top');
rocket.innerHTML = '<span class="rk" aria-hidden="true">🚀</span><span class="flame" aria-hidden="true"></span>';
document.body.appendChild(rocket);

let flyTimer;
function onScrollRocket() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? scrollY / max : 0;
  bar.style.width = (p * 100) + '%';
  rocket.style.transform = `translateY(${-p * (innerHeight - 130)}px)`;
  rocket.classList.add('flying');
  clearTimeout(flyTimer);
  flyTimer = setTimeout(() => rocket.classList.remove('flying'), 150);
}
addEventListener('scroll', onScrollRocket, { passive: true });
addEventListener('resize', onScrollRocket);
onScrollRocket();
rocket.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

// 9. Sections "open" when they enter the screen
const secIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('open'); secIO.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('main section').forEach(s => { s.classList.add('sec'); secIO.observe(s); });

// 10. Load the fun effects on every page
const funCss = document.createElement('link');
funCss.rel = 'stylesheet';
funCss.href = 'fun.css';
document.head.appendChild(funCss);
const funJs = document.createElement('script');
funJs.src = 'fun.js';
document.body.appendChild(funJs);