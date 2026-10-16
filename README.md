# 餵奶日記 · 小月亮

記錄每次哺餵（親餵左右側計時、奶瓶量），到時間自動提醒，並可用 LINE／Email 通知家人。

**線上使用**：https://kftseng2oo1.github.io/feeding/

## 主要功能
- **🤱 親餵**：左右側各自計時，結束後自動加總時長
- **🍼 奶瓶**：記錄泡奶量與實際喝的量，畫面上的奶瓶會跟著變化
- **倒數提醒**：設定餵奶間隔，到時間響鈴並可「再 5 分鐘」
- **背景通知**：透過 Worker 排程，App 關閉時仍可用 LINE 或 Email 提醒（可設定多位通知對象，支援 LINE 登入取得 ID）
- **📋 歷史／📊 統計**：查看與刪除過去紀錄

## 技術與依賴
- 單檔 HTML PWA（`index.html` 內含全部 HTML/CSS/JS），`manifest.json` + `sw.js` 提供安裝到主畫面與離線快取。
- 後端：`arcar.kftseng2oo1.workers.dev` 的 `/line-notify`、`/schedule-notify`、`/send-email`
- LINE LIFF SDK（`static.line-scdn.net`）
- 資料存在 localStorage：`nursing_records`、`bottle_records`、`notify_persons`、`notify_plan`、`app_settings` 等

