<template>
  <div class="hv-options">
    <div class="language">
      <span>{{ $t('options.language') }}</span>
      <button
        class="toggle"
        :class="{ active: locale === 'en' }"
        @click="updateLocale('en')"
      >
        {{ $t('options.en') }}
      </button>
      <span>|</span>
      <button
        class="toggle"
        :class="{ active: locale === 'fr' }"
        @click="updateLocale('fr')"
      >
        {{ $t('options.fr') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useLocale, useUpdateLocale } from '@/utils/i18n';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {
      locale: useLocale(),
      updateLocale: useUpdateLocale(),
    };
  },
});
</script>

<style scoped>
.hv-options {
  display: flex;
  justify-content: center;
  font: white;
  font-size: 0.8rem;
}

.hv-options > * + * {
  margin-left: 2rem;
}

.language {
  display: flex;
}

.language > * + * {
  margin-left: 0.2rem;
}

.toggle {
  background: none;
  border: none;
  padding: none;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
}

.toggle.active {
  font-weight: bold;
  text-decoration: underline;
}

.toggle:focus {
  outline: none;
  border: dotted 1px white;
  border-radius: 5px;
}
</style>
