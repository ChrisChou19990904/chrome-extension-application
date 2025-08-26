chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'TRANSLATE') {
    const apiUrl = 'https://translate.argosopentech.com/translate';
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: message.text,
        source: 'auto',
        target: message.targetLang,
        format: 'text'
      })
    })
      .then(async (res) => {
        if (!res.ok) {
          const errText = await res.text();
          sendResponse({ error: `API 錯誤: ${res.status} ${res.statusText} - ${errText}` });
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.translatedText) {
          sendResponse({ result: data.translatedText });
        } else if (data) {
          sendResponse({ error: '翻譯失敗: ' + JSON.stringify(data) });
        }
      })
      .catch((e) => {
        sendResponse({ error: 'API 請求錯誤: ' + (e && e.message ? e.message : e) });
      });
    // 必須 return true 以啟用非同步 sendResponse
    return true;
  }
});

