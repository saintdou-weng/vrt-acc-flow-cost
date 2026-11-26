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
  { id: 'roadracer',   file: 'road-racer.html',   t: 'ROAD RACER',   zh: '公路賽車',   cat: 'race',    c1: '#ff4d4d', c2: '#ffd23f', v: 'V01' }
];
window.ARC_CATS = { all: '全部', shoot: '🔫 射擊', puzzle: '🧩 益智', action: '🏃 動作', classic: '👾 經典', race: '🏎 競速', sport: '⚽ 運動' };
