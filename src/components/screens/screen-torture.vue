<template>
  <ui-screen color="black">
    <div class="torture-screen">
      <transition name="screen-fade" mode="out-in">
        <div class="torture" v-if="!state.displayIntro">
          <div class="prompt">
            <div class="instructions">{{ $t('torture.instruction') }}</div>
            <div class="code">{{ state.prompt }}</div>
          </div>

          <div class="typed">
            {{ state.typed }}
          </div>

          <div class="help">
            <div class="exit">
              <button-link
                @click="exit"
                v-if="last || state.free"
                :danger="last"
              >
                {{ last ? $t(`torture.ready`) : $t(`torture.exit.${level}`) }}
              </button-link>
            </div>
          </div>

          <div class="error" v-if="state.displayError">
            <span class="alert">{{ $t('torture.error') }} </span>
          </div>
        </div>
        <div class="intro" v-else-if="state.displayIntro">
          <ui-paragraph
            ><p>{{ $t('torture.intro') }}</p></ui-paragraph
          >
          <button-link @click="exit(true)">{{
            $t('torture.intro-exit')
          }}</button-link>
        </div>
      </transition>
    </div>
  </ui-screen>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
} from 'vue';
import ButtonLink from '@/components/ui/button-link.vue';
import UiParagraph from '@/components/ui/ui-paragraph.vue';
import UiScreen from '@/components/ui/ui-screen.vue';
import { playCorrect, playTypewriter, playWrong } from '@/utils/audio-manager';

const REQUIRED_SCORE = 4;

interface TortureState {
  locked: boolean;
  displayError: boolean;
  prompt: string;
  typed: string;
  cursor: number;
  score: number;
  free: boolean;
  displayIntro: boolean;
}

const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
export default defineComponent({
  name: 'screen-torture',
  props: {
    level: {
      type: Number,
      required: true,
    },
    last: {
      type: Boolean,
    },
  },
  emit: ['exit'],
  components: { ButtonLink, UiParagraph, UiScreen },
  setup(props, context) {
    const state: TortureState = reactive({
      locked: false,
      displayError: false,
      prompt: '',
      typed: '',
      cursor: 0,
      score: 0,
      free: false,
      displayIntro: false,
    });

    const generatePrompt = () => {
      let prompt = '';
      const length = 6 + Math.floor(Math.random() * 5);
      for (let i = 0; i < length; i++) {
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
      state.locked = true;
      playCorrect();

      if (state.score >= REQUIRED_SCORE) {
        state.free = true;
      }

      setTimeout(() => {
        state.locked = false;
        reset();
      }, 300);
    };

    const onError = () => {
      state.score = Math.max(state.score - 1, 0);
      playWrong();

      state.locked = true;
      state.displayError = true;
      setTimeout(() => {
        state.displayError = false;
        state.locked = false;
        reset();
      }, 400);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (state.locked) return;

      const pressed = e.key;
      if (!characters.includes(pressed.toLowerCase())) return;
      state.typed += pressed;
      playTypewriter();

      const char = state.prompt.charAt(state.cursor) || '';
      if (char === pressed) {
        state.cursor++;
        if (state.cursor === state.prompt.length) {
          onSuccess();
        }
      } else {
        onError();
      }
    };

    onMounted(() => window.addEventListener('keydown', onKeyDown));
    onUnmounted(() => window.removeEventListener('keydown', onKeyDown));

    function exit(force = false) {
      if (props.level === 0 && !force) {
        state.displayIntro = true;
      } else {
        context.emit('exit');
      }
    }

    return { state, exit };
  },
});
</script>

<style scoped>
.torture-screen {
  display: flex;
  flex-direction: column;
}

.torture {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ataristocrat;
}

.instructions {
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
}

.code {
  font-size: 3rem;
  background-color: #777981;
  color: #d1d1d1;
  padding: 0.4em 0.3em;
  width: 70vw;
  text-align: center;
}

.typed {
  height: 6rem;
  width: 80vw;
  border-radius: 50px;
  background-color: rgb(223, 214, 132);
  color: black;
  font-family: typewriter;
  font-size: 3rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.error {
  position: fixed;
  height: 50vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.error .alert {
  font-family: ataristocrat;
  background: rgb(224, 222, 51);
  display: block;
  color: rgb(168, 43, 43);
  border: solid rgb(168, 43, 43) 20px;
  padding: 1rem 9rem;
  font-size: 6rem;
  text-transform: uppercase;
  font-weight: bold;
}

.help {
  height: 2rem;
  font-size: 0.8rem;
}
.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.intro > * + * {
  margin-top: 4rem;
}
</style>
