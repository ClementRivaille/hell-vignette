<template>
  <div class="screen torture">
    <div class="prompt">
      <div class="instructions">{{ $t('torture.instruction') }}</div>
      {{ state.prompt }}
    </div>

    <div class="typed">
      {{ state.typed }}
    </div>

    <div class="exit">
      <div v-if="state.score >= 2">TODO</div>
    </div>

    <div class="error" v-if="state.displayError">
      <span class="alert">{{ $t('torture.error') }} </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive } from 'vue';

const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
export default defineComponent({
  name: 'screen-torture',
  props: {
    level: {
      type: Number,
    },
  },
  emit: ['exit'],
  setup(props, context) {
    const state = reactive({
      displayError: false,
      prompt: '',
      typed: '',
      cursor: 0,
      score: 0,
    });

    const generatePrompt = () => {
      let prompt = '';
      for (let i = 0; i < 10; i++) {
        let char = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        if (Math.random() > 0.5) {
          char = char.toUpperCase();
        }
        prompt += char;
      }
      state.prompt = prompt;
    };
    generatePrompt();

    const reset = () => {
      state.typed = '';
      state.cursor = 0;
      generatePrompt();
    };

    const onSuccess = () => {
      state.score++;
      reset();
    };

    const onError = () => {
      state.score += -1;

      state.displayError = true;
      setTimeout(() => {
        state.displayError = false;
        reset();
      }, 400);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (state.displayError) return;

      const pressed = e.key;
      if (!characters.includes(pressed.toLowerCase())) return;

      const char = state.prompt.charAt(state.cursor) || '';
      if (char === pressed) {
        state.cursor++;
        state.typed += char;
        if (state.cursor === state.prompt.length) {
          onSuccess();
        }
      } else {
        onError();
      }
    };

    onMounted(() => window.addEventListener('keydown', onKeyDown));
    onUnmounted(() => window.removeEventListener('keydown', onKeyDown));

    return { state };
  },
});
</script>

<style scoped>
.torture {
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.error {
  position: fixed;
  height: 50vh;
  width: 100wh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.error .alert {
  background: yellow;
  color: red;
  padding: 5rem 6rem;
  font-size: 3rem;
  font-variant: small-caps;
}
</style>
