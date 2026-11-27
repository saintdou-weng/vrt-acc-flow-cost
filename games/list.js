/* 遊戲清單：新增遊戲只要在這裡加一行（id 要和遊戲檔裡 GE.run 的 id 一樣）
   cat：shoot 射擊、puzzle 益智、action 動作、classic 經典、race 競速、sport 運動 */
window.ARC_GAMES = [
  { id: 'tankbattle',  file: 'tank-battle.html',  t: 'TANK BATTLE',  zh: '坦克大戰',   cat: 'shoot',   c1: '#3fae4a', c2: '#ffd23f', v: 'V01' },
  { id: 'blockdrop',   file: 'block-drop.html',   t: 'BLOCK DROP',   zh: '落下方塊',   cat: 'puzzle',  c1: '#29d3ff', c2: '#c36bff', v: 'V01' },
  { id: 'starstriker', file: 'star-striker.html', t: 'STAR STRIKER', zh: '星際突擊',   cat: 'shoot',   c1: '#3d8bff', c2: '#ff4d4d', v: 'V01' },
  { id: 'brickblast',  file: 'brick-blast.html',  t: 'BRICK BLAST',  zh: '打磚塊',     cat: 'classic', c1: '#ff9a3d', c2: '#ffe14d', v: 'V01' },
  { id: 'neonsnake',   file: 'neon-snake.html',   t: 'NEON SNAKE',   zh: '霓虹貪吃蛇', cat: 'classic', c1: '#4dff7a', c2: '#ff4d6d', v: 'V01' },
  { id: 'pixelrunner', file: 'pixel-runner.html', t: 'PIXEL RUNNER', zh: '像素跑跳',   cat: 'action',  c1: '#5ec8ff', c2: '#e5383b', v: 'V01' },
  { id: 'gemmatch',    file: 'gem-match.html',    t: 'GEM MATCH',    zh: '寶石三消',   cat: 'puzzle',  c1: '#c58bff', c2: '#ffe066', v: 'V01' },
  { id: 'mazemuncher', file: 'maze-muncher.html', t: 'MAZE MUNCHER', zh: '迷宮吃豆',   cat: 'classic', c1: '#fff27a', c2: '#ff4d5e', v: 'V01' },
  { id: 'roadracer',   file: 'road-racer.html',   t: 'ROAD RACER',   zh: '公路賽車',   cat: 'race',    c1: '#ff4d4d', c2: '#ffd23f', v: 'V01' },
  { id: 'goldgrabber', file: 'gold-grabber.html', t: 'GOLD GRABBER', zh: '搶金塊',     cat: 'classic', c1: '#ffd23f', c2: '#8a5a2e', v: 'V01' },
  { id: 'bubblepop',   file: 'bubble-pop.html',   t: 'BUBBLE POP',   zh: '泡泡龍',     cat: 'puzzle',  c1: '#6fd0ff', c2: '#ff7a7a', v: 'V01' },
  { id: 'skyace',      file: 'sky-ace.html',      t: 'SKY ACE',      zh: '藍天王牌',   cat: 'shoot',   c1: '#4aa8ff', c2: '#e5383b', v: 'V01' },
  { id: 'kofighter',   file: 'ko-fighter.html',   t: 'KO FIGHTER',   zh: '一對一格鬥', cat: 'action',  c1: '#ff6ba8', c2: '#ffd23f', v: 'V01' },
  { id: 'targetshot',  file: 'target-shot.html',  t: 'TARGET SHOT',  zh: '打靶高手',   cat: 'shoot',   c1: '#e33',    c2: '#f2f2f2', v: 'V01' },
  { id: 'turbocircuit', file: 'turbo-circuit.html', t: 'TURBO CIRCUIT', zh: '環道賽車', cat: 'race',   c1: '#ff3b3b', c2: '#ffffff', v: 'V01' },
  { id: 'castleguard', file: 'castle-guard.html', t: 'CASTLE GUARD', zh: '城堡守衛',   cat: 'puzzle',  c1: '#7a8cff', c2: '#ffd23f', v: 'V01' },
  { id: 'stacktower',  file: 'stack-tower.html',  t: 'STACK TOWER',  zh: '堆疊高樓',   cat: 'puzzle',  c1: '#ff9a3d', c2: '#6fd0ff', v: 'V01' },
  { id: 'hopcross',    file: 'hop-cross.html',    t: 'HOP CROSS',    zh: '小雞過馬路', cat: 'classic', c1: '#7ddc4a', c2: '#ffd23f', v: 'V01' },
  { id: 'junglecopter', file: 'jungle-copter.html', t: 'JUNGLE COPTER', zh: '叢林直升機', cat: 'shoot', c1: '#3fae4a', c2: '#ffb347', v: 'V01' }
];
window.ARC_CATS = { all: '全部', shoot: '🔫 射擊', puzzle: '🧩 益智', action: '🏃 動作', classic: '👾 經典', race: '🏎 競速', sport: '⚽ 運動' };
