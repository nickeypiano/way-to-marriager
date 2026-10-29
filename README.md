# 成家路上 官網 way-to-marriage.com

純靜態網站（HTML + CSS + 一點 JS），不需要安裝或編譯，直接放上 Vercel 即可。

## 頁面
| 網址 | 檔案 |
|---|---|
| / | index.html |
| /dress | dress.html（禮服系列） |
| /gold | gold.html（仿真金飾） |
| /ritual | ritual.html（文定與迎娶） |
| /line-thanks | line-thanks.html（回報 Google Ads 轉換後跳到 LINE） |

所有「LINE 預約諮詢」按鈕都會先到 /line-thanks，再跳到 https://lin.ee/QhKamjT。

## 常改的地方
- **追蹤碼、LINE 連結**：只改 `assets/config.js`（已填入 GA4 評估 ID `G-GYFBH1GLT5`；Google Ads 的「聯絡人」轉換就是 GA4 記錄到的 /line-thanks 網頁載入，網址不能改）
- **價格、文字**：直接在對應的 .html 搜尋文字修改
- **照片**：換掉 `images/` 裡同名的 .jpg 即可

## 部署步驟
1. GitHub 建立新 repo（例如 `way-to-marriage`），把這個資料夾全部上傳（網頁版 Add file → Upload files 即可）。
2. Vercel → Add New → Project → 匯入該 repo。Framework 選 **Other**，其他都不用改 → Deploy。
3. 先用 Vercel 給的 xxx.vercel.app 網址檢查一遍。
4. Vercel 專案 → Settings → Domains → 加入 `www.way-to-marriage.com` 和 `way-to-marriage.com`（設定 apex 轉到 www）。
5. 到買網域的地方（或目前 Wix 的 DNS 設定）照 Vercel 顯示的值改 DNS：
   - `A` 紀錄 `@` → Vercel 給的 IP
   - `CNAME` 紀錄 `www` → Vercel 給的值
6. DNS 生效後（通常幾分鐘到幾小時），確認網站正常，再取消 Wix 方案。

之後要改網站：改 GitHub 上的檔案並儲存，Vercel 會自動重新上線。
