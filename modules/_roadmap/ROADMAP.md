# ACC Flow 個人工具＋知識學習 改良 ROADMAP

> 每晚排程自動改良 1～3 項，做完更新本檔。2026-11-27 Paul：「👤 個人工具」與「🎓 知識學習」兩個選單的東西都要在自動優化中，直到完整。
> 一項做到「完成」才換下一項；全部完成後改成每晚巡檢（錯誤、壞連結、手機跑版）。

## 總表
| 輪 | 項目 | 檔案 | 完成度 |
|---|---|---|---|
| 1 | 漫畫生成 | modules/manga-generator.html | 進行中 |
| 1 | 台股財報 | modules/twse-stock-analyzer.html | 未開始 |
| 1 | 影片分析 | modules/video-analyzer.html | 未開始 |
| 1 | 小說影片 | modules/novel-to-video.html | 未開始 |
| 1 | AI 簡報 | modules/ai-ppt-generator.html | 未開始 |
| 1 | OCR | modules/ocr-tool.html | 未開始 |
| 2 | 個人管理 | modules/life-manager.html | 未開始 |
| 2 | 旅遊規劃 | modules/travel-planner.html | 未開始 |
| 2 | 樂透統計 | modules/lottery-ai.html | 未開始 |
| 2 | 個人專用／全部工具頁 | learn/index.html?view=personal、view=tools | 未開始 |
| 3 | 學習中心與各分類頁 | learn/index.html?view=learning | 未開始 |
| 3 | 繼續閱讀／進度 | learn/index.html?focus=progress | 未開始 |
| 3 | 語言學習 | modules/language-learning.html | 未開始 |
| 3 | 每日一課閱讀頁 | learn/daily/index.html | 未開始 |
| 3 | 書庫 | learn/library/index.html | 進行中 |

（小遊戲由「小遊戲＋測驗每晚新增」排程負責；每日一課內容由每週六排程補。）

## 群組訊息規則
- 2026-11-27 Paul：台股情報由平台自己定時發群組（Apps Script 觸發器），Claude 不再每天發或寫情報；Claude 只負責改良台股工具的功能與資料完整、即時。發送程式：modules/data/TWSE_SENDER_apps_script.gs.txt（TWSE 官方大盤／三大法人／觀察清單產業強弱，休市自動不發，附兩個連結）。**2026-11-27 已部署**到 VRT-ACC-Flow-Cost-Cloud（檔案「台股收盤摘要.gs」），previewTwseDaily() 預覽 11/27 收盤正確（加權 39,308.08 +156.27、三大法人合計與分項加總相符）；改讀 www.twse.com.tw rwd，OpenAPI 只當備援（OpenAPI 隔天才更新，原本每天會被當成休市）。**2026-11-27 晚上 Paul 同意後已裝觸發器**（sendTwseDaily，每 10 分鐘檢查，交易日柬埔寨 14:30～15:30 發一次）；第一次自動發送是下一個交易日。
- 2026-11-27：ACC Flow 群組（AI_acc_flow）每則訊息／摘要底下都加「🎓 知識學習｜👤 個人工具」兩個連結；每日一課 feed.json 全部已加，README 與發送程式已同步。

## 目前輪到：🎨 漫畫生成（modules/manga-generator.html）

### 已完成
- 2026-11-27
  - 畫風系統：基本畫風 6 種（日漫／美漫／寫實／古代／玄幻／水彩）＋年代類型預設 6 種（90 年代熱血籃球運動風、80 年代神話戰士熱血動畫風、港漫武俠彩色風、少女漫畫風、美式英雄漫畫風、2000 年代都市黑色懸疑風）＋自訂畫風描述；預設名稱不使用任何作品名，提示詞加上 original characters / no logo。
  - 每格 AI 繪圖：用免金鑰的 Pollinations（image.pollinations.ai）依畫風＋鏡頭角度＋情緒＋場景＋角色外觀產生畫面；同一角色固定種子保持一致；同時最多 2 張依序載入、失敗重試 1 次，仍失敗則保留示意圖。可切換「AI 繪圖／簡易示意圖」。
  - 對白語言（中文／English）＋分鏡引擎（AI 自動／本機快速）：AI 服務（GAS aiProxy）連不上時自動改用本機規則分鏡——依「」偵測對白與說話者、自動抓角色、依內容判斷鏡頭（遠景／中景／近景／特寫／俯角／仰角）、情緒、狀聲字，版型依格數自動選。

### 待辦（依優先順序）
1. 下載整頁 PNG／整本 PDF（需確認 Pollinations 圖片 CORS；可用 html2canvas/jsPDF 從 cdnjs 載入）。
2. 封面頁：作品標題＋主角立繪（AI 繪圖）＋作者欄。
3. 格數／頁數控制：使用者可指定每頁格數（3／4／6）、總頁數上限；版型增加跨欄大格（首格 span2 等）。
4. 對話框美化：喊叫用鋸齒框、思考用雲朵框、旁白框；狀聲字依情緒變色、可放大。
5. 角色卡可編輯（外觀中／英文），編輯後重新生成指定頁；單格「重畫」按鈕（換種子）。
6. 本機分鏡在 English 模式只翻譯狀聲字，對白仍保留原文（翻譯需 AI 服務）——之後可在 AI 可用時補翻譯。
7. 生成結果存到工作資料（acc-module-shell outputs 已包含 #episodes-container，確認圖片 URL 能還原）。

## 📚 書庫（learn/library/index.html）
### 已完成
- 2026-11-27（Paul：不符標準的不用放，確保完整可看）
  - 盤點：目錄 2,826 筆 → 上架 2,823（書 1,563、漫畫 1,260）。不上架：系統暗檔 1 個、散裝圖片資料夾 2 個（不是漫畫）；目錄整理時已排除重複 1,096、模糊 359、epub 12、zip 3、垃圾檔 90。
  - 47 本檔名亂碼的書還原真正書名（頁面內 TFIX 對照表，雲端檔名不動；其中 10 本由檔名反推、1 本無法確定）。
  - 書名整理 tidy()：拿掉下載站標記（文字版_PDF電子書、VDOOK、60de…），「[書名].作者」「《書名》作者」改成「書名｜作者」。
  - 漫畫：只寫「第1卷」的補上作品名；「第298-299話」「番外」併回原系列。
### 待辦
1. GAS 端（程式不在 repo）：summary_requests.json 是 {id:{t,at}} 物件、排程無法改寫 → 精華做完後清單不會清掉，需在 GAS 加「已有精華就從清單移除」。
2. 精華完成後在書卡上顯示「有精華」標記。

## 之後的工具
- 📈 台股（twse-stock-analyzer.html）：產業分類代表股（modules/data/twse-watchlist.json 已有）、TWSE OpenAPI 財報、交叉驗算核對、大盤、多空參考訊號、頁首改為頁面自己即時讀 TWSE（大盤、三大法人、觀察清單強弱），不再依賴排程寫入的 twse-intel.json（舊檔保留當備援）；改良群組發送程式 TWSE_SENDER（內容、欄位容錯）、Audit 外部參考範本。
- 🎬 影片分析、📖 小說影片、📊 AI 簡報、🔤 OCR：先實際使用找出最影響使用的問題再改。

## 做不到／跳過紀錄
- （目前無）
