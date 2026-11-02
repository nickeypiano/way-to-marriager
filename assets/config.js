// 成家路上網站設定 —— 只需要改這個檔案
window.SITE = {
  // LINE 官方帳號連結（所有「LINE 預約諮詢」按鈕最後都會導到這裡）
  lineUrl: 'https://lin.ee/v7WsTke',  // 官網專用加入管道（LINE 後台：加入管道「官網」）

  // Google Analytics 4 評估 ID（資源：way-to-marriage.com）
  // Google Ads 的「聯絡人」轉換 = GA4 裡 /line-thanks 的網頁載入，所以只要這個 ID 就能追蹤
  gaId: 'G-GYFBH1GLT5',

  // （選填）Google Ads 代碼 ID，格式像 'AW-123456789'。目前用不到，留空即可。
  googleAdsId: '',
  lineConversionLabel: '',

  // Meta 像素：每頁送 PageView；/line-thanks 送 Lead = IG／FB 廣告的「加 LINE」轉換
  // 1146626684982358 = 資料集「成家路上 官網」（商家資產管理組合：成家路上）
  // 2167491760470159 = 像素「成家路上 官網（廣告帳號）」（目前投放廣告用的廣告帳號 119521064803943）
  metaPixelId: '1146626684982358',
  metaPixelIds: ['1146626684982358', '2167491760470159']
};
