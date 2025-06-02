<template>
  <div :class="['translator', darkMode ? 'dark' : 'light']">
    <button class="theme-toggle" @click="toggleTheme">
      Switch to {{ darkMode ? 'Light' : 'Dark' }} Mode
    </button>

    <h1>Multilingual Translator</h1>

    <!-- Language selectors -->
    <div class="lang-select">
      <label>
        From:
        <select v-model="sourceLang">
          <option v-for="(name, code) in languageOptions" :key="code" :value="code">
            {{ name }}
          </option>
        </select>
      </label>

      <label>
        To:
        <select v-model="targetLang">
          <option v-for="(name, code) in languageOptions" :key="code" :value="code">
            {{ name }}
          </option>
        </select>
      </label>
    </div>

    <input
      v-model="inputText"
      type="text"
      placeholder="Enter text here..."
      @keyup.enter="translateText"
    />
    <button @click="translateText">Translate</button>

    <div class="translated-text" v-if="translatedText">
      <strong>{{ languageOptions[targetLang] }}:</strong> {{ translatedText }}
      <button class="speak-button" @click="speakText" title="Speak Translation">🔊</button>
    </div>

    <div class="error" v-if="error">{{ error }}</div>

    <HistoryLive :history="history" @clear-history="clearHistory" />
  </div>
</template>

<script>
import axios from "axios";
import HistoryLive from "./HistoryLive.vue";

export default {
  components: { HistoryLive },
  data() {
    return {
      inputText: "",
      translatedText: "",
      history: [],
      error: "",
      darkMode: true,
      sourceLang: "en",
      targetLang: "hi",
      languageOptions: {
        en: "English",
        hi: "Hindi",
        es: "Spanish",
        fr: "French",
        de: "German",
        ja: "Japanese",
        zh: "Chinese",
        ru: "Russian",
        ar: "Arabic",
        it: "Italian",
        ko: "Korean",
      },
      voices: [],
    };
  },
  mounted() {
    // Load voices, retry until available
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        this.voices = voices;
      } else {
        setTimeout(loadVoices, 100);
      }
    };
    loadVoices();

    // Also update voices if they change dynamically
    window.speechSynthesis.onvoiceschanged = () => {
      this.voices = speechSynthesis.getVoices();
    };
  },
  methods: {
    async translateText() {
      if (!this.inputText.trim()) return;
      this.error = "";
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        const response = await axios.post(
          `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
          {
            q: this.inputText,
            source: this.sourceLang,
            target: this.targetLang,
            format: "text",
          }
        );

        this.translatedText = response.data.data.translations[0].translatedText;
        this.history.unshift({
          source: this.inputText,
          translation: this.translatedText,
          from: this.languageOptions[this.sourceLang],
          to: this.languageOptions[this.targetLang],
        });
        if (this.history.length > 10) this.history.pop();
        this.inputText = "";
      } catch (err) {
        this.error = "Translation failed. Check API key or internet connection.";
      }
    },
    speakText() {
      if (!this.translatedText) return;

      // Cancel any ongoing speech
      speechSynthesis.cancel();

      // Find a voice that matches target language (prefix match)
      let selectedVoice = this.voices.find(v =>
        v.lang.toLowerCase().startsWith(this.targetLang.toLowerCase())
      );

      // Fallback to English if no match
      if (!selectedVoice) {
        selectedVoice = this.voices.find(v => v.lang.toLowerCase().startsWith("en"));
      }

      const utterance = new SpeechSynthesisUtterance(this.translatedText);

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else {
        // Use targetLang code if voice not found
        utterance.lang = this.targetLang;
      }

      speechSynthesis.speak(utterance);
    },
    clearHistory() {
      this.history = [];
      this.translatedText = "";
      this.error = "";
    },
    toggleTheme() {
      this.darkMode = !this.darkMode;
    },
  },
};
</script>

<style scoped>
.translator {
  min-height: 100vh;
  max-width: 900px;
  margin: 0 auto;
  padding: 50px 30px;
  border-radius: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Dark Theme */
.dark {
  background: linear-gradient(135deg, #000000, #0bb2c8);
  color: #fff;
}

/* Light Theme */
.light {
  background: linear-gradient(135deg, #f8f9fa, #dee2e6);
  color: #212529;
}

h1 {
  margin-bottom: 20px;
}

input {
  width: 100%;
  max-width: 700px;
  padding: 18px 25px;
  border-radius: 40px;
  border: none;
  font-size: 1.3rem;
  outline: none;
  font-weight: 600;
  margin: 15px 0;
}

input::placeholder {
  color: #888;
  font-style: italic;
}

button {
  width: 100%;
  max-width: 700px;
  padding: 18px 0;
  border-radius: 40px;
  border: none;
  font-weight: 700;
  font-size: 1.3rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
  transform: scale(1.05);
}

.theme-toggle {
  margin-bottom: 20px;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 25px;
  background: #fff;
  color: #333;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.translated-text {
  width: 100%;
  max-width: 700px;
  margin-top: 35px;
  padding: 25px 30px;
  border-radius: 25px;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  user-select: text;
  min-height: 80px;
  position: relative;
}

/* Speak button inside translated text */
.speak-button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #007bff;
  transition: color 0.3s ease;
}

.speak-button:hover {
  color: #0056b3;
}

.error {
  margin-top: 20px;
  font-weight: 700;
  font-size: 1.1rem;
  color: #ff6b6b;
}

.lang-select {
  display: flex;
  gap: 1rem;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.lang-select label {
  font-weight: 600;
}

.lang-select select {
  padding: 8px 16px;
  font-size: 1rem;
  border-radius: 10px;
  margin-left: 10px;
}
</style>
