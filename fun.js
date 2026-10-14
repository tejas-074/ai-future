// fun.js: typing, coding click effect, and shared page effects
const file = location.pathname.split('/').pop() || 'index.html';

// 1. Highlight the current page in the menu
const ul = document.querySelector('nav ul');
if (ul) {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav ul a').forEach(a => {
    if (a.getAttribute('href') === current) a.setAttribute('aria-current','page');
  });
}

// 2. Typing effect: <span data-type="word one|word two"></span>
document.querySelectorAll('[data-type]').forEach(el => {
  const w = el.dataset.type.split('|');
  let i = 0, j = 0, d = false;
  el.classList.add('cursor');
  (function t() {
    const s = w[i];
    el.textContent = s.slice(0, j);
    if (!d && j === s.length) { d = true; return setTimeout(t, 1400); }
    if (d && j === 0) { d = false; i = (i + 1) % w.length; }
    j += d ? -1 : 1;
    setTimeout(t, d ? 40 : 80);
  })();
});

// 3. Coding burst effect on every click
window.burst = (x, y, n = 14, set = ['<', '>', '{', '}', '/', '=>', '&&', 'AI']) => {
  for (let k = 0; k < n; k++) {
    const b = document.createElement('span');
    b.className = 'bit';
    b.textContent = set[k % set.length];
    b.style.left = x + 'px';
    b.style.top = y + 'px';
    const a = (Math.PI * 2 * k) / n + (Math.random() - .5);
    const r = 20 + Math.random() * 32;
    b.style.setProperty('--dx', (Math.cos(a) * r) + 'px');
    b.style.setProperty('--dy', (Math.sin(a) * r - 14) + 'px');
    b.style.setProperty('--rot', `${(Math.random() - .5) * 180}deg`);
    const color = ['#00e5ff', '#8b5cf6', '#ff4ecd', '#7ef9ff', '#a78bfa'][k % 5];
    b.style.color = color;
    b.style.setProperty('--glow', color);
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 900);
  }
};
document.addEventListener('click', e => {
  const opts = ['<', '>', '{', '}', '/', '==', '=>', '&&', 'AI'];
  const codeSet = e.target.closest('a, button, .btn, .opt') ? ['<', '>', '{', '}', '/', '==', '=>', '&&', 'const', 'return', 'AI'] : opts;
  burst(e.clientX, e.clientY, 7, codeSet);
});
