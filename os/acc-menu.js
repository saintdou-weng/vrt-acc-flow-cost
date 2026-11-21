/* ACC Flow 平台選單 v1.0（2026-11-21）
   Paul：除了 Telegram 群組的選單，平台本身也要能從選單進各分類。
   · window.ACC_OS_GROUPS：四大分類與入口（os/index.html 也用這一份，改一個地方兩邊一起變）。
   · 每頁左下角一顆「◈ 選單」按鈕 → 側邊選單：ACC 首頁、四大分類（點開看全部入口）、工廠數位地圖、會計 → VRT ERP 財務。
   · 路徑都相對於 os/ 資料夾，這支程式會自己換成正確網址，所以根目錄、os/、biz/、law/ 頁面都能用。
   · 被嵌在別的頁面裡（iframe，例如 PSJERP 財務）時不顯示按鈕。只加按鈕，不動頁面原本的功能與資料。 */
(function(){
  'use strict';
  var GROUPS=[
    {id:'biz',icon:'🏢',zh:'企業營運',en:'Business OS',color:'#13786d',items:[
      ['📘','開業 SOP 學院','Startup SOP Academy','../biz/sop.html','五種生意從無到有・圖解・名詞・中英'],
      ['🏨','精品酒店','Hotel OS','../biz/hotel.html','訂房・房務・餐飲・USALI 財務'],
      ['☕','咖啡店','Café OS','../biz/cafe.html','營運・POS・採購・庫存'],
      ['👞','鞋廠','Shoe OS','../biz/shoe.html','製造・原料・成品・人事'],
      ['🛠️','五金百貨','Hardware OS','../biz/hbs.html','進銷存・採購・零售'],
      ['🏪','超商','Convenience OS','../biz/cvs.html','POS・庫存・人事'],
      ['🧵','成衣專業','Garment','../learn/index.html?view=learning&category=garment','既有專業教材'],
      ['📈','經營管理','Management','../learn/index.html?view=learning&category=business','既有經營管理教材']]},
    {id:'law',icon:'⚖️',zh:'全球法規',en:'Global Law',color:'#385faf',items:[
      ['🌐','跨國法規','Global Law OS','../law/global.html','法規・比較・追蹤'],
      ['💵','外籍／當地薪資','Manager Payroll','../modules/foreign-manager-payroll.html','既有薪資工具'],
      ['💰','薪資管理','Salary & Labor Cost','../modules/salary-management.html','既有人工成本工具'],
      ['🏖️','年假','Leave','../modules/leave-manager.html','既有年假系統'],
      ['📄','合約','Contracts','../modules/contract-manager.html','既有合約系統']]},
    {id:'edu',icon:'🎓',zh:'知識學習',en:'Knowledge OS',color:'#7752a1',items:[
      ['📚','學習中心','Courses','../learn/index.html?view=learning','全部既有課程'],
      ['↻','繼續閱讀／進度','Reading progress','../learn/index.html?view=learning&focus=progress','既有閱讀紀錄'],
      ['🌍','語言學習','Languages','../modules/language-learning.html','既有語言課程'],
      ['🔧','科技工程','Technology','../learn/index.html?view=learning&category=science','既有科技課程'],
      ['🎬','AI 與創作','AI & Creation','../learn/index.html?view=learning&category=creative','既有創作課程'],
      ['📜','古書與傳統文化','Classics','../learn/index.html?view=learning&category=classics','既有文化教材'],
      ['📐','基礎學科','Fundamentals','../learn/index.html?view=learning&category=general','既有基礎學科']]},
    {id:'acc',icon:'👤',zh:'個人工具',en:'Personal Tools',color:'#9a713c',items:[
      ['👤','個人專用','Personal','../learn/index.html?view=personal','原有個人中心'],
      ['⭐','個人喜好','Interests','../learn/index.html?view=learning&category=personal','興趣課程'],
      ['🧰','全部工具','All tools','../learn/index.html?view=tools','原有全部工具'],
      ['📈','台股財報','TWSE','../modules/twse-stock-analyzer.html','財報研究'],
      ['🗂️','個人管理','Life Manager','../modules/life-manager.html','個人生活'],
      ['✈️','旅遊規劃','Travel','../modules/travel-planner.html','旅行'],
      ['🎬','影片分析','Video Analysis','../modules/video-analyzer.html','影片工具'],
      ['📊','AI 簡報','AI Presentation','../modules/ai-ppt-generator.html','簡報'],
      ['🎨','漫畫','Manga','../modules/manga-generator.html','創作'],
      ['🎞️','小說影片','Novel Video','../modules/novel-to-video.html','小說影片'],
      ['🔎','OCR','OCR','../modules/ocr-tool.html','文字辨識'],
      ['🎱','樂透統計','Lottery','../modules/lottery-ai.html','統計'],
      ['💰','VRT ERP 財務','ERP Finance','https://saintdou-weng.github.io/PSJERP/?s=fin','ERP 原入口']]}
  ];
  window.ACC_OS_GROUPS=GROUPS;

  var me=document.currentScript;
  var BASE=me&&me.src?new URL('.',me.src).href:new URL('/vrt-acc-flow-cost/os/',location.href).href;
  function abs(p){try{return new URL(p,BASE).href;}catch(e){return p;}}
  function lang(){try{return localStorage.getItem('acc_os_hub_lang')||'zh';}catch(e){return 'zh';}}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  var inFrame=false;try{inFrame=window.top!==window.self;}catch(e){inFrame=true;}
  if(inFrame){window.ACCMenu={open:function(){},close:function(){},groups:GROUPS};return;}

  var css='#accMenuBtn{position:fixed;left:12px;bottom:calc(78px + env(safe-area-inset-bottom,0px));z-index:9;border:0;border-radius:999px;padding:8px 12px;background:#183247;color:#fff;font:700 13px system-ui,-apple-system,"Noto Sans TC",sans-serif;box-shadow:0 6px 18px rgba(16,40,60,.28);cursor:pointer;opacity:.92}'+
    '#accMenuBtn:hover{opacity:1}'+
    '#accMenuVeil{position:fixed;inset:0;z-index:2147482000;background:rgba(12,30,44,.45);display:none}'+
    '#accMenu{position:fixed;z-index:2147482001;top:0;bottom:0;left:0;width:min(360px,90vw);background:#f4f7fa;color:#182d40;box-shadow:10px 0 40px rgba(0,0,0,.25);transform:translateX(-105%);transition:transform .22s;display:flex;flex-direction:column;font:14px/1.45 system-ui,-apple-system,"Noto Sans TC",sans-serif}'+
    '#accMenu.on{transform:none}#accMenu header{display:flex;align-items:center;gap:8px;padding:14px;background:#183247;color:#fff}#accMenu header b{font-size:16px}#accMenu header small{display:block;opacity:.75;font-size:11px}'+
    '#accMenu header button{margin-left:auto;border:0;background:rgba(255,255,255,.15);color:#fff;border-radius:10px;padding:6px 10px;font:inherit;cursor:pointer}'+
    '#accMenu .am-body{overflow:auto;padding:10px 10px 24px;-webkit-overflow-scrolling:touch}'+
    '#accMenu a.am-row,#accMenu summary{display:flex;align-items:center;gap:9px;padding:11px 12px;margin:5px 0;border-radius:12px;background:#fff;border:1px solid #dce5ed;color:#1b3348;text-decoration:none;font-weight:700;cursor:pointer;list-style:none}'+
    '#accMenu summary::-webkit-details-marker{display:none}#accMenu summary:after{content:"▾";margin-left:auto;color:#7a8b9b}#accMenu details[open] summary:after{content:"▴"}'+
    '#accMenu details[open] summary{background:var(--t);color:#fff;border-color:var(--t)}'+
    '#accMenu .am-sub{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:2px 2px 6px}#accMenu .am-sub a{display:block;padding:9px 10px;border-radius:10px;background:#fff;border:1px solid #e1e8ef;color:#1b3348;text-decoration:none;font-size:13px;font-weight:650}'+
    '#accMenu .am-sub a small{display:block;font-weight:400;color:#6a7c8d;font-size:11px}#accMenu .am-sub a.cur{border-color:var(--t);box-shadow:inset 0 0 0 1px var(--t)}'+
    '#accMenu .am-more{font-size:12px;color:#556a7d;text-decoration:none;display:block;text-align:right;padding:2px 6px 8px}';
  var st=document.createElement('style');st.textContent=css;(document.head||document.documentElement).appendChild(st);

  var here=location.href.split('#')[0];
  function build(){
    var zh=lang()!=='en';
    var h='<header><span style="font-size:22px">◈</span><div><b>ACC Flow</b><small>'+(zh?'Saintdou AI OS · 平台選單':'Saintdou AI OS · Menu')+'</small></div><button type="button" data-am="close">✕</button></header><div class="am-body">';
    h+='<a class="am-row" href="'+esc(abs('../index.html'))+'">🏠 '+(zh?'ACC 首頁':'ACC Home')+'</a>';
    GROUPS.forEach(function(g){
      var open=g.items.some(function(x){return abs(x[3]).split('#')[0]===here;});
      h+='<details style="--t:'+g.color+'"'+(open?' open':'')+'><summary>'+g.icon+' '+esc(zh?g.zh:g.en)+'<small style="font-weight:400;opacity:.7">'+g.items.length+'</small></summary><div class="am-sub">';
      g.items.forEach(function(x){var u=abs(x[3]);h+='<a href="'+esc(u)+'"'+(u.split('#')[0]===here?' class="cur"':'')+'>'+x[0]+' '+esc(zh?x[1]:x[2])+'<small>'+esc(zh?x[4]:x[1])+'</small></a>';});
      h+='</div><a class="am-more" href="'+esc(abs('index.html?view='+g.id))+'">'+(zh?'開分類首頁 →':'Open category →')+'</a></details>';
    });
    h+='<a class="am-row" href="'+esc(abs('../factory-map.html'))+'">🗺️ '+(zh?'工廠數位地圖 / Factory Map':'Factory Map')+'</a>';
    h+='<a class="am-row" href="https://saintdou-weng.github.io/PSJERP/?s=fin">💰 '+(zh?'會計 → VRT ERP 財務':'Accounting → VRT ERP Finance')+'</a>';
    return h+'</div>';
  }
  var btn,veil,panel;
  function open(){panel.innerHTML=build();veil.style.display='block';requestAnimationFrame(function(){panel.classList.add('on');});}
  function close(){panel.classList.remove('on');veil.style.display='none';}
  function mount(){
    if(document.getElementById('accMenu'))return;
    veil=document.createElement('div');veil.id='accMenuVeil';veil.onclick=close;
    panel=document.createElement('nav');panel.id='accMenu';panel.setAttribute('aria-label','ACC Flow menu');
    panel.addEventListener('click',function(e){var t=e.target.closest('[data-am="close"]');if(t)close();});
    document.body.appendChild(veil);document.body.appendChild(panel);
    if(!(me&&me.hasAttribute('data-nobutton'))){
      btn=document.createElement('button');btn.id='accMenuBtn';btn.type='button';btn.textContent=lang()!=='en'?'◈ 選單':'◈ Menu';btn.onclick=open;document.body.appendChild(btn);
    }
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('on'))close();});
    window.ACCMenu={open:open,close:close,groups:GROUPS};
  }
  window.ACCMenu={open:function(){mount();open();},groups:GROUPS};
  if(document.body)mount();else document.addEventListener('DOMContentLoaded',mount);
})();
