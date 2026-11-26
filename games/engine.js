/* ACC Flow 像素小遊戲引擎（2026-11-26）
   每個遊戲只要寫：GE.run({id,title,sub,w,h,chars,start(level,char),step(dt,keys,pressed),draw(g)})
   引擎負責：像素畫布（整數放大、不模糊）、鍵盤＋手機觸控搖桿、音效開關（全部遊戲共用）、
   選關（打過的關＋下一關）、選角色、無限接關、自動存進度（這台裝置 localStorage）。 */
(function (W) {
  'use strict';
  var LS = { get: function (k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
             set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  var AC = null, MUTE = LS.get('arc_mute', true);   /* 2026-11-26 Paul：預設靜音 */
  function ac() { if (!AC) { try { AC = new (W.AudioContext || W.webkitAudioContext)(); } catch (e) {} } if (AC && AC.state === 'suspended') AC.resume(); return AC; }
  /* 音效：type 方波/三角波/鋸齒；f 頻率；d 秒；slide 結束頻率 */
  function beep(f, d, type, vol, slide) {
    if (MUTE) return; var a = ac(); if (!a) return;
    var o = a.createOscillator(), g = a.createGain(), t = a.currentTime;
    o.type = type || 'square'; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, slide), t + d);
    g.gain.setValueAtTime(vol == null ? 0.08 : vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + d + 0.02);
  }
  function noise(d, vol) {
    if (MUTE) return; var a = ac(); if (!a) return;
    var n = Math.floor(a.sampleRate * d), b = a.createBuffer(1, n, a.sampleRate), ch = b.getChannelData(0);
    for (var i = 0; i < n; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / n);
    var s = a.createBufferSource(), g = a.createGain(); g.gain.value = vol == null ? 0.12 : vol; s.buffer = b; s.connect(g); g.connect(a.destination); s.start();
  }
  var SFX = {
    shoot: function () { beep(880, 0.08, 'square', 0.05, 440); }, hit: function () { noise(0.12, 0.1); },
    boom: function () { noise(0.35, 0.16); beep(120, 0.3, 'sawtooth', 0.06, 40); }, coin: function () { beep(988, 0.06, 'square', 0.06); setTimeout(function () { beep(1318, 0.12, 'square', 0.06); }, 60); },
    jump: function () { beep(330, 0.15, 'square', 0.05, 660); }, move: function () { beep(220, 0.03, 'triangle', 0.04); },
    clear: function () { [523, 659, 784, 1046].forEach(function (f, i) { setTimeout(function () { beep(f, 0.12, 'square', 0.06); }, i * 90); }); },
    lose: function () { [392, 330, 262, 196].forEach(function (f, i) { setTimeout(function () { beep(f, 0.16, 'triangle', 0.07); }, i * 120); }); },
    blip: function () { beep(660, 0.04, 'square', 0.04); }
  };

  /* 像素字（3x5），不依賴字型，畫面像紅白機 */
  var FONT = {};
  ('0:111101101101111,1:010110010010111,2:111001111100111,3:111001111001111,4:101101111001001,5:111100111001111,6:111100111101111,7:111001001001001,8:111101111101111,9:111101111001111,' +
   'A:010101111101101,B:110101110101110,C:011100100100011,D:110101101101110,E:111100110100111,F:111100110100100,G:011100101101011,H:101101111101101,I:111010010010111,J:001001001101010,' +
   'K:101101110101101,L:100100100100111,M:101111101101101,N:101111111111101,O:010101101101010,P:110101110100100,Q:010101101110011,R:110101110101101,S:011100010001110,T:111010010010010,' +
   'U:101101101101111,V:101101101101010,W:101101111111101,X:101101010101101,Y:101101010010010,Z:111001010100111, :000000000000000,-:000000111000000,.:000000000000010,!:010010010000010,' +
   '/:001001010100100,x:000101010101000,>:100010001010100,<:001010100010001,=:000111000111000,+:000010111010000,%:101001010100101,?:111001011000010').split(',').forEach(function (s) {
    var p = s.indexOf(':', 1); FONT[s.slice(0, p)] = s.slice(p + 1).replace(/\s/g, ''); });
  FONT[':'] = '000010000010000';
  function text(g, str, x, y, col, sc, align) {
    str = String(str).toUpperCase(); sc = sc || 1; var w = str.length * 4 * sc - sc;
    if (align === 'c') x -= Math.floor(w / 2); else if (align === 'r') x -= w;
    g.fillStyle = col || '#fff';
    for (var i = 0; i < str.length; i++) { var f = FONT[str[i]] || FONT['?']; for (var j = 0; j < 15; j++) if (f[j] === '1') g.fillRect(x + i * 4 * sc + (j % 3) * sc, y + Math.floor(j / 3) * sc, sc, sc); }
  }
  /* 小精靈：用字串陣列畫（每個字母一個顏色），寫實像素風 */
  function sprite(g, rows, pal, x, y, sc, flip) {
    sc = sc || 1;
    for (var r = 0; r < rows.length; r++) for (var c = 0; c < rows[r].length; c++) {
      var ch = rows[r][flip ? rows[r].length - 1 - c : c], col = pal[ch]; if (!col) continue;
      g.fillStyle = col; g.fillRect(Math.round(x + c * sc), Math.round(y + r * sc), sc, sc);
    }
  }

  function run(G) {
    var KEY = 'arc_' + G.id, SAVE = LS.get(KEY, { best: 0, unlocked: 1, level: 1, char: 0, hi: 0 });
    var cv = document.getElementById('cv') || (function () { var c = document.createElement('canvas'); c.id = 'cv'; document.body.appendChild(c); return c; })();
    /* 2026-11-26 Paul：畫面太粗糙 → 畫布用 4 倍解析度畫（座標不變），線條、小數位置和文字都更細緻 */
    var RES = 4; cv.width = G.w * RES; cv.height = G.h * RES; var g = cv.getContext('2d'); g.imageSmoothingEnabled = false; g.setTransform(RES, 0, 0, RES, 0, 0);
    function fit() { var pad = W.matchMedia('(pointer:coarse)').matches ? 170 : 20, s = Math.max(1, Math.floor(Math.min((W.innerWidth - 8) / G.w, (W.innerHeight - pad) / G.h) * 2) / 2);
      s = Math.min((W.innerWidth - 8) / G.w, (W.innerHeight - pad) / G.h); cv.style.width = Math.floor(G.w * s) + 'px'; cv.style.height = Math.floor(G.h * s) + 'px'; }
    W.addEventListener('resize', fit); fit();
    var keys = {}, pressed = {};
    var MAP = { ArrowLeft: 'L', ArrowRight: 'R', ArrowUp: 'U', ArrowDown: 'D', a: 'L', d: 'R', w: 'U', s: 'D', ' ': 'A', z: 'A', j: 'A', x: 'B', k: 'B', Enter: 'S', p: 'S', Escape: 'S' };
    W.addEventListener('keydown', function (e) { var k = MAP[e.key] || MAP[e.key.toLowerCase && e.key.toLowerCase()]; if (!k) return; e.preventDefault(); if (!keys[k]) pressed[k] = 1; keys[k] = 1; ac(); });
    W.addEventListener('keyup', function (e) { var k = MAP[e.key] || MAP[e.key.toLowerCase && e.key.toLowerCase()]; if (k) keys[k] = 0; });
    /* 手機：左邊十字鍵、右邊 A／B，按住可連發 */
    var pad = document.createElement('div'); pad.className = 'ge-pad';
    pad.innerHTML = '<div class="stick"><i></i></div><div class="ab"><b data-k="B">B</b><b data-k="A">A</b></div>';
    document.body.appendChild(pad);
    /* 2026-11-26 Paul：方向鍵難按 → 圓形搖桿，手指在圈內自由移動（8 方向＋類比值 API.ax／API.ay，-1～1） */
    var stick = pad.querySelector('.stick'), knob = stick.querySelector('i'), sid = null, AX = 0, AY = 0;
    function setStick(x, y) { var r = stick.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, R = r.width / 2 - 14, dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy);
      if (d > R) { dx = dx / d * R; dy = dy / d * R; } knob.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; AX = dx / R; AY = dy / R;
      var dead = 0.32, nk = { L: AX < -dead && Math.abs(AX) > Math.abs(AY) * 0.45, R: AX > dead && Math.abs(AX) > Math.abs(AY) * 0.45, U: AY < -dead && Math.abs(AY) > Math.abs(AX) * 0.45, D: AY > dead && Math.abs(AY) > Math.abs(AX) * 0.45 };
      ['L', 'R', 'U', 'D'].forEach(function (k) { if (nk[k] && !keys[k]) pressed[k] = 1; keys[k] = nk[k] ? 1 : 0; }); }
    function endStick() { sid = null; AX = AY = 0; knob.style.transform = ''; ['L', 'R', 'U', 'D'].forEach(function (k) { keys[k] = 0; }); }
    stick.addEventListener('touchstart', function (e) { e.preventDefault(); var t = e.changedTouches[0]; sid = t.identifier; setStick(t.clientX, t.clientY); ac(); }, { passive: false });
    stick.addEventListener('touchmove', function (e) { e.preventDefault(); for (var i = 0; i < e.changedTouches.length; i++) { var t = e.changedTouches[i]; if (t.identifier === sid) setStick(t.clientX, t.clientY); } }, { passive: false });
    stick.addEventListener('touchend', function (e) { e.preventDefault(); endStick(); }, { passive: false }); stick.addEventListener('touchcancel', endStick);
    var md = false; stick.addEventListener('mousedown', function (e) { md = true; setStick(e.clientX, e.clientY); }); W.addEventListener('mousemove', function (e) { if (md) setStick(e.clientX, e.clientY); }); W.addEventListener('mouseup', function () { if (md) { md = false; endStick(); } });
    pad.querySelectorAll('[data-k]').forEach(function (b) { var k = b.dataset.k;
      var on = function (e) { e.preventDefault(); if (!keys[k]) pressed[k] = 1; keys[k] = 1; b.classList.add('on'); ac(); };
      var off = function (e) { e.preventDefault(); keys[k] = 0; b.classList.remove('on'); };
      b.addEventListener('touchstart', on, { passive: false }); b.addEventListener('touchend', off, { passive: false }); b.addEventListener('touchcancel', off, { passive: false });
      b.addEventListener('mousedown', on); b.addEventListener('mouseup', off); b.addEventListener('mouseleave', off); });
    /* 上方小工具列：回大廳、音效、暫停 */
    var bar = document.createElement('div'); bar.className = 'ge-bar';
    bar.innerHTML = '<a href="index.html">◀ 大廳</a><span>' + G.title + '</span><button id="geSnd"></button><button id="gePause">⏸</button>';
    document.body.insertBefore(bar, document.body.firstChild);
    var sndBtn = bar.querySelector('#geSnd'); function paintSnd() { sndBtn.textContent = MUTE ? '🔇' : '🔊'; } paintSnd();
    sndBtn.onclick = function () { MUTE = !MUTE; LS.set('arc_mute', MUTE); paintSnd(); if (!MUTE) SFX.blip(); };
    bar.querySelector('#gePause').onclick = function () { if (mode === 'play') mode = 'pause'; else if (mode === 'pause') mode = 'play'; };
    document.addEventListener('visibilitychange', function () { if (document.hidden && mode === 'play') mode = 'pause'; });

    var mode = 'title', level = SAVE.level || 1, char = SAVE.char || 0, sel = Math.min(SAVE.unlocked, level), msgT = 0, last = 0, flash = 0;
    var API = {
      g: g, text: text, sprite: sprite, sfx: SFX, beep: beep, noise: noise, w: G.w, h: G.h,
      score: 0, lives: 3, get level() { return level; }, get char() { return char; },
      get ax() { return AX || ((keys.R ? 1 : 0) - (keys.L ? 1 : 0)); }, get ay() { return AY || ((keys.D ? 1 : 0) - (keys.U ? 1 : 0)); },
      win: function () { SFX.clear(); level++; SAVE.unlocked = Math.max(SAVE.unlocked, level); SAVE.level = level; persist(); mode = 'clear'; msgT = 1.6; },
      lose: function () { SFX.lose(); mode = 'over'; msgT = 0.8; persist(); },
      add: function (n) { API.score += n; if (API.score > (SAVE.hi || 0)) SAVE.hi = API.score; },
      rnd: function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
    };
    function persist() { SAVE.best = Math.max(SAVE.best || 0, level - 1); SAVE.char = char; LS.set(KEY, SAVE); }
    function begin(lv) { level = lv; SAVE.level = lv; persist(); API.lives = G.lives || 3; G.start(API, lv, char); mode = 'play'; }
    W.GE_API = API;
    /* 2026-11-26 Paul：可選關、跳關 → 開始選單（手機好按）：選角色、關卡可直接跳（−10／−1／+1／+10 或直接打數字），開始／接著玩 */
    var menu = document.createElement('div'); menu.className = 'ge-menu'; document.body.appendChild(menu);
    function paintMenu() {
      if (mode !== 'title') { menu.style.display = 'none'; return; } menu.style.display = '';
      menu.innerHTML = (G.chars && G.chars.length > 1 ? '<div class="row">' + G.chars.map(function (c, i) { return '<button class="chip' + (i === char ? ' on' : '') + '" data-ch="' + i + '">' + c + '</button>'; }).join('') + '</div>' : '') +
        '<div class="row lv"><button data-d="-10">−10</button><button data-d="-1">−1</button><input id="geLv" type="number" min="1" max="999" inputmode="numeric" value="' + sel + '"><button data-d="1">+1</button><button data-d="10">+10</button></div>' +
        '<div class="row"><button class="go" data-go="sel">▶ 從第 ' + sel + ' 關開始</button>' + ((SAVE.level || 1) > 1 ? '<button class="go2" data-go="cont">⏩ 接著玩 第 ' + (SAVE.level || 1) + ' 關</button>' : '') + '</div>' +
        '<div class="hint">已過 ' + (SAVE.best || 0) + ' 關・最高分 ' + (SAVE.hi || 0) + '</div>';
      menu.querySelectorAll('[data-ch]').forEach(function (b) { b.onclick = function () { char = +b.dataset.ch; persist(); SFX.move(); paintMenu(); }; });
      menu.querySelectorAll('[data-d]').forEach(function (b) { b.onclick = function () { sel = Math.max(1, Math.min(999, sel + +b.dataset.d)); SFX.move(); paintMenu(); }; });
      var li = menu.querySelector('#geLv'); li.onchange = function () { sel = Math.max(1, Math.min(999, Math.round(+li.value) || 1)); paintMenu(); };
      menu.querySelectorAll('[data-go]').forEach(function (b) { b.onclick = function () { ac(); SFX.coin(); API.score = 0; menu.style.display = 'none'; begin(b.dataset.go === 'cont' ? (SAVE.level || 1) : sel); }; });
    }
    var _mode = 'title'; Object.defineProperty(API, 'mode', { get: function () { return mode; } });

    function drawTitle() {
      g.fillStyle = '#05060f'; g.fillRect(0, 0, G.w, G.h);
      if (G.titleArt) G.titleArt(API, flash);
      var cx = G.w / 2;
      text(g, G.title, cx, 26, '#ffd23f', 2, 'c');
      text(g, 'HI ' + (SAVE.hi || 0), cx, 46, '#7cf', 1, 'c');
      text(g, 'LEVEL ' + sel + (G.chars && G.chars.length > 1 ? '  ' + G.chars[char] : ''), cx, G.h - 60, '#fff', 1, 'c');
      if (Math.floor(flash * 2) % 2 === 0) text(g, 'A START  B CONTINUE', cx, G.h - 48, '#5f5', 1, 'c');
    }
    function frame(t) {
      var dt = Math.min(0.05, (t - (last || t)) / 1000); last = t; flash += dt;
      if (mode === 'title') {
        if (pressed.L) { sel = Math.max(1, sel - 1); SFX.move(); paintMenu(); } if (pressed.R) { sel = Math.min(999, sel + 1); SFX.move(); paintMenu(); }
        if (G.chars && pressed.U) { char = (char + G.chars.length - 1) % G.chars.length; SFX.move(); paintMenu(); } if (G.chars && pressed.D) { char = (char + 1) % G.chars.length; SFX.move(); paintMenu(); }
        if (pressed.A || pressed.S) { SFX.coin(); API.score = 0; menu.style.display = 'none'; begin(sel); } else if (pressed.B) { SFX.coin(); API.score = 0; menu.style.display = 'none'; begin(SAVE.level || 1); }
        drawTitle();
      } else if (mode === 'play') {
        if (pressed.S) mode = 'pause'; else G.step(API, dt, keys, pressed);
        G.draw(API);
        text(g, 'L' + level, 2, 2, '#ffd23f'); text(g, String(API.score), G.w - 2, 2, '#fff', 1, 'r');
      } else if (mode === 'pause') {
        G.draw(API); g.fillStyle = 'rgba(0,0,0,.6)'; g.fillRect(0, 0, G.w, G.h); text(g, 'PAUSE', G.w / 2, G.h / 2 - 10, '#fff', 2, 'c'); text(g, 'A RESUME  B MENU', G.w / 2, G.h / 2 + 10, '#aaa', 1, 'c');
        if (pressed.A || pressed.S) mode = 'play'; else if (pressed.B) { mode = 'title'; sel = level; paintMenu(); }
      } else if (mode === 'clear') {
        G.draw(API); msgT -= dt; g.fillStyle = 'rgba(0,0,0,.5)'; g.fillRect(0, G.h / 2 - 18, G.w, 36); text(g, 'LEVEL CLEAR!', G.w / 2, G.h / 2 - 10, '#5f5', 2, 'c'); text(g, 'NEXT L' + level, G.w / 2, G.h / 2 + 8, '#fff', 1, 'c');
        if (msgT <= 0) { G.start(API, level, char); mode = 'play'; }
      } else if (mode === 'over') {
        G.draw(API); msgT -= dt; g.fillStyle = 'rgba(0,0,0,.65)'; g.fillRect(0, 0, G.w, G.h); text(g, 'GAME OVER', G.w / 2, G.h / 2 - 22, '#f55', 2, 'c');
        text(g, 'A: CONTINUE L' + level, G.w / 2, G.h / 2, '#5f5', 1, 'c'); text(g, 'B: MENU', G.w / 2, G.h / 2 + 12, '#aaa', 1, 'c');
        if (msgT <= 0 && (pressed.A || pressed.S)) { SFX.coin(); API.score = Math.floor(API.score / 2); begin(level); } else if (msgT <= 0 && pressed.B) { mode = 'title'; sel = level; paintMenu(); }
      }
      pressed = {}; requestAnimationFrame(frame);
    }
    paintMenu();
    requestAnimationFrame(frame);
  }
  W.GE = { run: run, text: text, sprite: sprite, sfx: SFX, beep: beep, LS: LS };
})(window);
