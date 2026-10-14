// fun.js: glow, 3D tilt, marquee, typing, sparkles, new menu links
const file = location.pathname.split('/').pop() || 'index.html';

// 1. Add new pages to the menu + highlight current page
const ul = document.querySelector('nav ul');
[['journey.html','Journey'],['playground.html','Playground'],['games.html','Games']].forEach(([h,t]) => {
  if (ul && !ul.querySelector(`a[href="${h}"]`)) {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${h}">${t}</a>`;
    ul.appendChild(li);
  }
});
document.querySelectorAll('nav ul a').forEach(a => {
  if (a.getAttribute('href') === file) a.setAttribute('aria-current','page');
});

// 2. Cursor glow
const g = document.createElement('div');
g.id = 'glow';
g.setAttribute('aria-hidden','true');
document.body.appendChild(g);
addEventListener('mousemove', e => {
  g.style.left = e.clientX + 'px';
  g.style.top = e.clientY + 'px';
});

// 3. 3D tilt on cards
document.querySelectorAll('.card').forEach(c => {
  c.addEventListener('mouseenter', () => c.style.transition = 'transform .1s');
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `perspective(800px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`;
  });
  c.addEventListener('mouseleave', () => {
    c.style.transition = '';
    c.style.transform = '';
  });
});

// 4. Typing effect: <span data-type="word one|word two"></span>
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

// 5. Sparkle burst (also used by the quiz)
window.burst = (x, y, n = 14, set = ['✨','⭐','💫','🚀']) => {
  for (let k = 0; k < n; k++) {
    const b = document.createElement('span');
    b.className = 'bit';
    b.textContent = set[k % set.length];
    b.style.left = x + 'px';
    b.style.top = y + 'px';
    b.style.setProperty('--dx', (Math.random() - .5) * 300 + 'px');
    b.style.setProperty('--dy', (Math.random() - .8) * 260 + 'px');
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 1000);
  }
};
document.addEventListener('click', e => {
  if (e.target.closest('.btn')) burst(e.clientX, e.clientY, 8);
});

// 6. Home page: scrolling marquee under the hero
const hero = document.querySelector('header.hero');
if (hero && file.startsWith('index')) {
  const m = document.createElement('div');
  m.className = 'marquee';
  m.setAttribute('aria-hidden','true');
  const t = 'Healthcare ✦ Education ✦ Robotics ✦ Smart Cities ✦ Creativity ✦ Climate ✦ Accessibility ✦ Space ✦ ';
  m.innerHTML = `<div>${t.repeat(4)}</div>`;
  hero.after(m);
}

// 7. Journey page: fill the timeline line while scrolling
const tl = document.querySelector('.timeline');
if (tl) addEventListener('scroll', () => {
  const r = tl.getBoundingClientRect();
  const p = Math.max(0, Math.min(100, (innerHeight * .6 - r.top) / r.height * 100));
  tl.style.setProperty('--p', p + '%');
}, { passive: true });