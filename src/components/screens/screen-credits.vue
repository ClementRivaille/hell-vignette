<template>
  <ui-screen color="black">
    <transition name="credits-fade">
      <div class="credits" v-if="display">
        <h1>{{ $t('start.title') }}</h1>
        <div class="infos">
          <p class="author">{{ $t('credits.author') }}</p>
          <p class="date">{{ $t('credits.date') }}</p>
        </div>
      </div>
      <ui-paragraph v-else>
        {{ $t('credits.goodbye') }}
      </ui-paragraph>
    </transition>
  </ui-screen>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import UiScreen from '@/components/ui/ui-screen.vue';
import UiParagraph from '../ui/ui-paragraph.vue';

export default defineComponent({
  name: 'screen-credits',
  components: { UiScreen, UiParagraph },
  setup() {
    const display = ref(false);
    onMounted(() => (display.value = true));

    return { display };
  },
});
</script>

<style scoped>
.credits h1 {
  font-family: bpreplay;
  font-size: 2rem;
  margin-bottom: 3rem;
  letter-spacing: 3px;
}

.infos > * + * {
  margin-top: 0.5rem;
}

.credits-fade-enter-active {
  animation: credits-fade 8s;
}
.credits-fade-leave-active {
  animation: credits-fade 5s reverse;
}

@keyframes credits-fade {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
