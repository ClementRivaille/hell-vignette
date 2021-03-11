import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import frMessages from './locales/fr.json';
import enMessages from './locales/en.json';

const app = createApp(App);

function getLanguage() {
  if (/fr/.test(navigator.language)) {
    return 'fr';
  }
  return 'en';
}

const i18n = createI18n({
  locale: getLanguage(),
  messages: {
    fr: frMessages,
    en: enMessages,
  },
});
app.use(i18n);

app.mount('#app');
