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
if (f) f.addEventListener('submit', e => { e.preventDefault(); document.getElementById('formMsg').textContent = '✅ Form submitted (test only).'; });

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