<script setup>
import { ref } from 'vue'

const text = ref('')
const targetLang = ref('en')
const result = ref('')
const loading = ref(false)
const error = ref('')

const languages = [
  { code: 'en', name: '英文' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日文' },
  { code: 'ko', name: '韓文' },
  { code: 'fr', name: '法文' },
  { code: 'de', name: '德文' }
]

async function translate() {
  if (!text.value) return
  loading.value = true
  error.value = ''
  result.value = ''
  try {
    // 使用 LibreTranslate 免費 API 範例
    const res = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text.value,
        source: 'auto',
        target: targetLang.value,
        format: 'text'
      })
    })
    const data = await res.json()
    if (data.translatedText) {
      result.value = data.translatedText
    } else {
      error.value = '翻譯失敗'
    }
  } catch (e) {
    error.value = 'API 請求錯誤'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <h2>Chrome 擴展翻譯工具</h2>
    </div>
  </header>
  <main>
    <div style="margin-bottom: 1rem;">
      <textarea v-model="text" placeholder="請輸入要翻譯的文字" rows="3" style="width:100%"></textarea>
    </div>
    <div style="margin-bottom: 1rem;">
      <label>目標語言：</label>
      <select v-model="targetLang">
        <option v-for="lang in languages" :key="lang.code" :value="lang.code">{{ lang.name }}</option>
      </select>
      <button @click="translate" :disabled="loading">{{ loading ? '翻譯中...' : '翻譯' }}</button>
    </div>
    <div v-if="result" style="margin-bottom: 1rem;">
      <strong>翻譯結果：</strong>
      <div style="white-space: pre-wrap;">{{ result }}</div>
    </div>
    <div v-if="error" style="color:red">{{ error }}</div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
