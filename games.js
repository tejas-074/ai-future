const $ = (s, r = document) => r.querySelector(s), rnd = n => Math.random() * n | 0;
const pop = (n = 20) => window.burst && burst(innerWidth / 2, innerHeight / 3, n);
let S = { total: 0, best: {} };
try { S = JSON.parse(localStorage.getItem('aifGames')) || S; } catch (e) {}
const store = () => { try { localStorage.setItem('aifGames', JSON.stringify(S)); } catch (e) {} };

// id, icon, name, lowerIsBetter
const G = [['memory','🧠','Memory Match',1],['ttt','❌','Tic-Tac-Toe',0],['word','🔤','Word Scramble',0],['rps','✊','Rock Paper Scissors',0],['react','⚡','Reaction',1],['type','⌨️','Typing',0],['snake','🐍','Snake',0]];

const live = document.createElement('div');
live.className = 'sr'; live.setAttribute('aria-live', 'polite');
document.body.appendChild(live);
const say = t => { live.textContent = ''; setTimeout(() => live.textContent = t, 50); };

function board(up) {
  $('#board').innerHTML = `<div class="sc total ${up ? 'up' : ''}"><small>Total points</small><b>${S.total}</b></div>` +
    G.map(g => `<div class="sc ${g[0] === up ? 'up' : ''}"><span aria-hidden="true">${g[1]}</span><small>${g[2]}</small><b>${S.best[g[0]] ?? '-'}</b><small>best</small></div>`).join('');
}
function award(id, score, pts) {
  S.total += pts;
  const low = G.find(g => g[0] === id)[3], b = S.best[id];
  if (b == null || (low ? score < b : score > b)) S.best[id] = score;
  store(); board(id);
}

// ---------- Tabs ----------
const tabs = $('#tabs'), panels = $('#panels'), init = {}, GAMES = {};
G.forEach(g => {
  tabs.insertAdjacentHTML('beforeend', `<button class="tab" role="tab" id="t-${g[0]}" aria-selected="false" aria-controls="p-${g[0]}" tabindex="-1">${g[1]} ${g[2]}</button>`);
  panels.insertAdjacentHTML('beforeend', `<div class="gpanel" role="tabpanel" id="p-${g[0]}" aria-labelledby="t-${g[0]}"></div>`);
});
function openTab(id) {
  G.forEach(g => {
    const on = g[0] === id;
    $('#t-' + g[0]).setAttribute('aria-selected', on);
    $('#t-' + g[0]).tabIndex = on ? 0 : -1;
    $('#p-' + g[0]).classList.toggle('on', on);
  });
  if (!init[id]) { init[id] = 1; GAMES[id]($('#p-' + id)); }
}
tabs.onclick = e => { const b = e.target.closest('.tab'); if (b) openTab(b.id.slice(2)); };
tabs.onkeydown = e => {
  const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!k) return;
  const i = G.findIndex(g => $('#t-' + g[0]).getAttribute('aria-selected') === 'true');
  const n = G[(i + k + G.length) % G.length][0];
  openTab(n); $('#t-' + n).focus();
};
$('#reset').onclick = () => { S = { total: 0, best: {} }; store(); board(); say('Scores reset'); };

// ---------- 1. Memory Match ----------
GAMES.memory = el => {
  const E = ['🤖','🧠','🚀','💡','🛰️','🔮','⚙️','🧬'], N = ['robot','brain','rocket','bulb','satellite','crystal ball','gear','DNA'];
  el.innerHTML = `<div class="stats"><span>Moves <b id="mm">0</b></span><span>Pairs <b id="mp">0</b>/8</span><button class="btn sm" type="button" id="mr">Restart</button></div><div class="mgrid" id="mg"></div>`;
  let a, lock, moves, found;
  function start() {
    a = null; lock = false; moves = 0; found = 0;
    $('#mm').textContent = 0; $('#mp').textContent = 0;
    const d = [...E.keys(), ...E.keys()].sort(() => Math.random() - .5);
    $('#mg').innerHTML = d.map((v, i) => `<button class="mc" type="button" data-v="${v}" aria-label="Card ${i + 1}, face down"><span class="in"><span class="f">❔</span><span class="b">${E[v]}</span></span></button>`).join('');
  }
  $('#mg').onclick = e => {
    const c = e.target.closest('.mc');
    if (!c || lock || c.classList.contains('on')) return;
    c.classList.add('on'); c.setAttribute('aria-label', 'Card: ' + N[c.dataset.v]);
    if (!a) { a = c; return; }
    moves++; $('#mm').textContent = moves;
    if (a.dataset.v === c.dataset.v) {
      a.classList.add('ok'); c.classList.add('ok'); a = null;
      $('#mp').textContent = ++found;
      if (found === 8) { say('You won in ' + moves + ' moves'); pop(24); award('memory', moves, Math.max(10, 70 - moves * 2)); }
    } else {
      lock = true; const p = a; a = null;
      setTimeout(() => { [p, c].forEach(x => { x.classList.remove('on'); x.setAttribute('aria-label', 'Card, face down'); }); lock = false; }, 800);
    }
  };
  $('#mr').onclick = start; start();
};

// ---------- 2. Tic-Tac-Toe vs AI ----------
const L = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const win = b => { for (const [a, c, d] of L) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a]; return b.includes('') ? null : 'T'; };
function mm(b, p) {
  const w = win(b); if (w) return w === 'O' ? 1 : w === 'X' ? -1 : 0;
  let best = p === 'O' ? -2 : 2;
  b.forEach((v, i) => { if (v) return; b[i] = p; const s = mm(b, p === 'O' ? 'X' : 'O'); b[i] = ''; best = p === 'O' ? Math.max(best, s) : Math.min(best, s); });
  return best;
}
function aiMove(b, hard) {
  const e = b.map((v, i) => v ? -1 : i).filter(i => i >= 0);
  if (!hard) return e[rnd(e.length)];
  let bs = -2, bm = e[0];
  e.forEach(i => { b[i] = 'O'; const s = mm(b, 'X'); b[i] = ''; if (s > bs) { bs = s; bm = i; } });
  return bm;
}
GAMES.ttt = el => {
  el.innerHTML = `<div class="stats"><span>Wins <b id="tw">0</b></span><span>Draws <b id="td">0</b></span><span>Losses <b id="tl">0</b></span><label for="tdiff">Level</label><select id="tdiff" style="width:auto"><option value="1">Hard</option><option value="0">Easy</option></select><button class="btn sm" type="button" id="tr">New game</button></div><div class="ttt" id="tg"></div><p class="msg" id="tm" role="status">Your turn (X)</p>`;
  let b, over, w = 0, d = 0, l = 0;
  const draw = () => [...$('#tg').children].forEach((c, i) => {
    c.textContent = b[i]; c.className = 'cell ' + b[i].toLowerCase();
    c.disabled = !!b[i] || !!over; c.setAttribute('aria-label', `Square ${i + 1} ${b[i] || 'empty'}`);
  });
  function start() {
    b = Array(9).fill(''); over = 0; $('#tm').textContent = 'Your turn (X)';
    $('#tg').innerHTML = b.map((_, i) => `<button class="cell" type="button" data-i="${i}"></button>`).join(''); draw();
  }
  function end(r) {
    over = 1; const m = $('#tm');
    if (r === 'X') { w++; m.textContent = 'You won! 🎉'; award('ttt', w, 30); pop(); }
    else if (r === 'O') { l++; m.textContent = 'AI wins this one 🤖'; }
    else { d++; m.textContent = 'Draw!'; award('ttt', w, 10); }
    $('#tw').textContent = w; $('#td').textContent = d; $('#tl').textContent = l;
    say(m.textContent); draw();
  }
  $('#tg').onclick = e => {
    const c = e.target.closest('.cell'); if (!c || over || b[c.dataset.i]) return;
    b[c.dataset.i] = 'X'; let r = win(b);
    if (!r) { b[aiMove(b, +$('#tdiff').value)] = 'O'; r = win(b); }
    if (r) end(r); else { draw(); say('AI played. Your turn'); }
  };
  $('#tr').onclick = start; start();
};

// ---------- 3. Word Scramble ----------
GAMES.word = el => {
  const W = ['ROBOT','ALGORITHM','NEURON','PYTHON','CHATBOT','SENSOR','DATASET','VISION','PROMPT','MODEL'];
  el.innerHTML = `<div class="stats"><span>Score <b id="ws">0</b></span><span>Streak <b id="wk">0</b></span></div><div class="letters" id="wl"></div><form class="row" id="wf"><label for="wi" class="sr">Your answer</label><input id="wi" autocomplete="off" placeholder="Type the word"><button class="btn sm" type="submit">Check</button><button class="btn sm" type="button" id="wh">Hint</button><button class="btn sm" type="button" id="wn">Skip</button></form><p class="msg" id="wm" role="status"></p>`;
  let w, sc = 0, k = 0, hint = 0, bag = [];
  function next() {
    if (!bag.length) bag = [...W].sort(() => Math.random() - .5);
    w = bag.pop(); let s;
    do s = [...w].sort(() => Math.random() - .5).join(''); while (s === w);
    hint = 0;
    $('#wl').innerHTML = [...s].map((c, i) => `<span class="lt" style="animation-delay:${i * 60}ms">${c}</span>`).join('');
    $('#wl').setAttribute('aria-label', 'Scrambled letters: ' + [...s].join(' '));
    $('#wi').value = ''; $('#wi').focus();
  }
  $('#wf').onsubmit = e => {
    e.preventDefault();
    if ($('#wi').value.trim().toUpperCase() === w) {
      const p = hint ? 5 : 10; sc += p; k++;
      $('#ws').textContent = sc; $('#wk').textContent = k;
      $('#wm').textContent = 'Correct! +' + p; say('Correct'); award('word', k, p); pop(10); next();
    } else { k = 0; $('#wk').textContent = 0; $('#wm').textContent = 'Not quite. Try again!'; say('Not quite'); }
  };
  $('#wh').onclick = () => { hint = 1; $('#wm').textContent = `Starts with ${w[0]}, ${w.length} letters`; };
  $('#wn').onclick = () => { k = 0; $('#wk').textContent = 0; $('#wm').textContent = 'It was ' + w; next(); };
  next();
};

// ---------- 4. Rock Paper Scissors vs learning AI ----------
GAMES.rps = el => {
  const M = ['🪨','📄','✂️'], NM = ['rock','paper','scissors'];
  el.innerHTML = `<div class="stats"><span>You <b id="ry">0</b></span><span>AI <b id="ra">0</b></span><span>Ties <b id="rt">0</b></span><span>Win streak <b id="rs">0</b></span></div><div class="choices">${M.map((m, i) => `<button class="ch" type="button" data-i="${i}" aria-label="${NM[i]}">${m}</button>`).join('')}</div><p class="msg" id="rm" role="status">Pick one. The AI studies your habits!</p>`;
  let y = 0, a = 0, t = 0, st = 0, last = -1;
  const tr = [[0,0,0],[0,0,0],[0,0,0]];
  el.querySelector('.choices').onclick = e => {
    const c = e.target.closest('.ch'); if (!c) return;
    const p = +c.dataset.i; let g;
    const row = last < 0 ? null : tr[last];
    if (!row || row.every(v => !v) || Math.random() < .25) g = rnd(3);
    else g = (row.indexOf(Math.max(...row)) + 1) % 3;
    if (last >= 0) tr[last][p]++; last = p;
    let m;
    if (p === g) { t++; st = 0; m = 'Tie'; }
    else if ((p - g + 3) % 3 === 1) { y++; st++; m = 'You win!'; award('rps', st, 5); }
    else { a++; st = 0; m = 'AI wins'; }
    $('#ry').textContent = y; $('#ra').textContent = a; $('#rt').textContent = t; $('#rs').textContent = st;
    $('#rm').textContent = `You ${NM[p]}, AI ${NM[g]}. ${m}`; say($('#rm').textContent);
  };
};

// ---------- 5. Reaction test (color is the only signal) ----------
GAMES.react = el => {
  el.innerHTML = `<div class="stats"><span>Last <b id="rl">-</b> ms</span><span>Best <b id="rb">${S.best.react ?? '-'}</b> ms</span></div><button class="rbox idle" id="rx" type="button">Click to start</button><p class="msg">When the box changes color, click as fast as you can. Color is the only signal, which is a good test for color-related settings.</p>`;
  let st = 0, tm, t0; const box = $('#rx');
  box.onclick = () => {
    if (st === 0 || st === 3) {
      st = 1; box.className = 'rbox wait'; box.textContent = 'Wait...';
      tm = setTimeout(() => { st = 2; box.className = 'rbox go'; t0 = performance.now(); }, 1500 + rnd(2500));
    } else if (st === 1) {
      clearTimeout(tm); st = 3; box.className = 'rbox idle'; box.textContent = 'Too soon! Click to retry';
    } else {
      const ms = Math.round(performance.now() - t0); st = 3;
      box.className = 'rbox idle'; box.textContent = ms + ' ms. Click to retry';
      $('#rl').textContent = ms; award('react', ms, ms < 300 ? 20 : 10); $('#rb').textContent = S.best.react;
    }
  };
};

// ---------- 6. Typing speed ----------
GAMES.type = el => {
  const T = ['Artificial intelligence helps people learn faster and work smarter.', 'Good testers check every button with the keyboard and a screen reader.', 'Machines find patterns in data while humans bring care and judgment.'];
  el.innerHTML = `<div class="stats"><span>Speed <b id="yw">0</b> WPM</span><span>Accuracy <b id="ya">100</b>%</span><button class="btn sm" type="button" id="yr">New sentence</button></div><p class="target" id="yt"></p><label for="yi" class="sr">Type here</label><textarea id="yi" rows="2" placeholder="Start typing to begin the timer" autocomplete="off" spellcheck="false"></textarea><p class="msg" id="ym" role="status"></p>`;
  let s, t0, done;
  const paint = v => $('#yt').innerHTML = [...s].map((c, i) => `<span class="${i < v.length ? (v[i] === c ? 'ok' : 'bad') : ''}">${c}</span>`).join('');
  function start() {
    s = T[rnd(T.length)]; t0 = 0; done = 0; $('#yi').value = ''; $('#ym').textContent = '';
    $('#yw').textContent = 0; $('#ya').textContent = 100; paint('');
  }
  $('#yi').oninput = e => {
    if (done) return;
    const v = e.target.value; if (!t0) t0 = performance.now(); paint(v);
    const mins = Math.max((performance.now() - t0) / 60000, .0083), ok = [...v].filter((c, i) => c === s[i]).length, wpm = Math.round(ok / 5 / mins);
    $('#yw').textContent = wpm; $('#ya').textContent = v.length ? Math.round(ok / v.length * 100) : 100;
    if (v.length >= s.length) {
      done = 1;
      if (v === s) { $('#ym').textContent = 'Perfect! ' + wpm + ' WPM 🎉'; award('type', wpm, wpm >= 30 ? 30 : 15); pop(); }
      else $('#ym').textContent = 'Almost! Some letters are wrong. Press New sentence.';
      say($('#ym').textContent);
    }
  };
  $('#yr').onclick = start; start();
};

// ---------- 7. Snake ----------
GAMES.snake = el => {
  el.innerHTML = `<div class="stats"><span>Score <b id="ss">0</b></span><button class="btn sm" type="button" id="sb">Start</button><span>Arrow keys or WASD</span></div><canvas id="sc" width="360" height="360" role="img" aria-label="Snake game board"></canvas><div class="dpad"><span></span><button type="button" data-d="u" aria-label="Up">▲</button><span></span><button type="button" data-d="l" aria-label="Left">◀</button><button type="button" data-d="d" aria-label="Down">▼</button><button type="button" data-d="r" aria-label="Right">▶</button></div><p class="msg" id="sm" role="status"></p>`;
  const x = $('#sc').getContext('2d'), N = 18, C = 20, V = { u: [0,-1], d: [0,1], l: [-1,0], r: [1,0] }, O = { u: 'd', d: 'u', l: 'r', r: 'l' };
  let sn, dir, nd, f, sc, run, iv;
  function drw() {
    x.clearRect(0, 0, 360, 360);
    x.shadowColor = '#ff3d81'; x.shadowBlur = 14; x.fillStyle = '#ff3d81';
    x.beginPath(); x.arc(f[0] * C + 10, f[1] * C + 10, 7, 0, 7); x.fill();
    x.shadowColor = '#00e5ff';
    sn.forEach((p, i) => { x.fillStyle = i ? '#00b8d4' : '#00e5ff'; x.beginPath(); x.roundRect(p[0] * C + 1, p[1] * C + 1, C - 2, C - 2, 6); x.fill(); });
    x.shadowBlur = 0;
  }
  function place() { do f = [rnd(N), rnd(N)]; while (sn.some(p => p[0] === f[0] && p[1] === f[1])); }
  function reset() { sn = [[9,9],[8,9],[7,9]]; dir = nd = 'r'; sc = 0; $('#ss').textContent = 0; place(); drw(); }
  function tick() {
    if (!el.classList.contains('on')) return;
    dir = nd; const h = [sn[0][0] + V[dir][0], sn[0][1] + V[dir][1]];
    if (h[0] < 0 || h[1] < 0 || h[0] >= N || h[1] >= N || sn.some(p => p[0] === h[0] && p[1] === h[1])) {
      clearInterval(iv); run = 0; $('#sb').textContent = 'Play again';
      $('#sm').textContent = 'Game over. Score ' + sc; say('Game over. Score ' + sc);
      if (sc) award('snake', sc, sc * 2); return;
    }
    sn.unshift(h);
    if (h[0] === f[0] && h[1] === f[1]) { sc++; $('#ss').textContent = sc; place(); } else sn.pop();
    drw();
  }
  const turn = d => { if (run && d !== O[dir]) nd = d; };
  $('#sb').onclick = () => { reset(); run = 1; clearInterval(iv); iv = setInterval(tick, 110); $('#sb').textContent = 'Restart'; $('#sm').textContent = ''; };
  el.querySelector('.dpad').onclick = e => { const b = e.target.closest('[data-d]'); if (b) turn(b.dataset.d); };
  document.addEventListener('keydown', e => {
    if (!run || !el.classList.contains('on')) return;
    const d = { ArrowUp: 'u', w: 'u', ArrowDown: 'd', s: 'd', ArrowLeft: 'l', a: 'l', ArrowRight: 'r', d: 'r' }[e.key];
    if (d) { e.preventDefault(); turn(d); }
  });
  reset();
};

board();
openTab('memory');