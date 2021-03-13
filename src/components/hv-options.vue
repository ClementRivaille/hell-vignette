<template>
  <div class="hv-options">
    <div class="language">
      <span>{{ $t('options.language') }}</span>
      <ui-toggle :active="locale === 'en'" @click="updateLocale('en')">
        {{ $t('options.en') }}
      </ui-toggle>
      <span>|</span>
      <ui-toggle :active="locale === 'fr'" @click="updateLocale('fr')">
        {{ $t('options.fr') }}
      </ui-toggle>
    </div>
    <div class="accessibility">
      <div>
        <span>{{ $t('options.no-input.label') }}</span>
        <ui-toggle :active="noInput" @click="$emit('toggle-no-input')">
          {{ $t(`options.${noInput ? 'on' : 'off'}`) }}
        </ui-toggle>
      </div>
      <ui-info v-if="noInput">
        {{ $t('options.no-input.description') }}
      </ui-info>
    </div>
  </div>
</template>

<script lang="ts">
import { useLocale, useUpdateLocale } from '@/utils/i18n';
import { defineComponent } from 'vue';
import UiInfo from './ui/ui-info.vue';
import uiParagraph from './ui/ui-paragraph.vue';
import UiToggle from './ui/ui-toggle.vue';

export default defineComponent({
  components: { UiToggle, UiInfo },
  props: {
    noInput: Boolean,
  },
  emits: ['toggle-no-input'],
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
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 0.8rem;
}

.hv-options > * + * {
  margin-top: 1rem;
}

.language {
  display: flex;
}

.language > * + * {
  margin-left: 0.2rem;
}

.accessibility {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.accessibility > * + * {
  margin-top: 0.2rem;
}
</style>
