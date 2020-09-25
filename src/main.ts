import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import frMessages from './locales/fr.json';

const app = createApp(App);

const i18n = createI18n({
  locale: 'fr',
  messages: {
    fr: frMessages,
  },
});
app.use(i18n);

app.mount('#app');
