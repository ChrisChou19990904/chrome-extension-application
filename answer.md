使用vue檔案幫我做chrome-extension的翻譯功能
要在Chrome擴展中使用Vue來實現翻譯功能，你可以按照以下步驟進行：
1. 建立Chrome擴展的基本結構
首先，你需要建立一個基本的Chrome擴展結構，包括manifest.json文件和
2. 安裝Vue
你可以使用Vue CLI來建立一個新的Vue專案，或者直接在你的擴展中引入Vue的CDN。
3. 建立翻譯介面
在你的Vue專案中，建立一個翻譯介面，包含輸入框和翻譯結果顯示區域。
4. 使用翻譯API
你可以使用Google翻譯API或其他翻譯服務來實現翻譯功能。在你的Vue組件中，使用axios或fetch來呼叫翻譯API。
5. 將Vue應用整合到Chrome擴展中
在你的manifest.json中，指定你的Vue應用作為擴展的popup或options頁面。
以下是一個簡單的範例代碼：
manifest.json
```json
{
  "manifest_version": 2,
  "name": "Vue Translator",
  "version": "1.0",
  "description": "A simple translation extension using Vue",
  "browser_action": {                                                           