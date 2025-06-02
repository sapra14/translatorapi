# TranslatorAPI – English to Hindi Translator SPA (Vue.js + Google Translate API)

A single-page Vue.js application that translates English text into Hindi using the Google Translate API. It maintains a history of the last 10 translations, supports light/dark mode, includes error handling, text-to-speech functionality, and offers a sleek, modern UI.

---

## Directory Structure

translatorapi/
├── public/ # Static assets
├── src/
│ ├── assets/ # Project images, icons, logos
│ ├── components/ # Reusable Vue components
│ │ ├── Translator.vue # Main translation interface
│ │ ├── History.vue # Component for showing translation history
│ │ └── ThemeToggle.vue # Light/Dark mode toggle button
│ ├── views/
│ │ └── HomeView.vue # Main view, includes all components
│ ├── App.vue # Root component
│ ├── main.js # Application entry point
│ └── utils/
│ └── api.js # Axios wrapper for Google Translate API
├── .gitignore
├── index.html # HTML entry point for Vite
├── vite.config.js # Vite configuration
└── package.json # Project dependencies and scripts
