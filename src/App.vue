<template>
  <main>
    <background-landscape>
      <transition :name="transition.name" :mode="transition.mode">
        <screen-start
          v-if="state.screen === GameScreen.Start"
          @begin="onBegin"
        />

        <screen-torture
          v-else-if="state.screen === GameScreen.Torture"
          :level="0"
        />
      </transition>
    </background-landscape>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { GameScreen } from '@/utils/screens';
import BackgroundLandscape from '@/components/ui/background-landscape.vue';
import ScreenStart from '@/components/screens/screen-start.vue';
import ScreenTorture from '@/components/screens/screen-torture.vue';

export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      screen: GameScreen.Start,
    });
    const screenIs = (value: GameScreen) => state.screen === value;

    const transition = reactive({
      name: 'fade',
      mode: 'out-in',
    });

    const onBegin = () => {
      transition.mode = 'in-out';
      state.screen = GameScreen.Torture;
    };

    return { state, transition, GameScreen, screenIs, onBegin };
  },
  components: { BackgroundLandscape, ScreenStart, ScreenTorture },
});
</script>

<style>
main {
  min-height: 100vh;
  width: 100%;
  background: rgb(8, 12, 238);
  background: linear-gradient(rgb(75, 113, 240), rgb(8, 12, 238));

  color: white;
  font-size: 26px;
}

.screen {
  position: absolute;
  top: 0;
  min-height: 100vh;
  width: 100vw;
  padding: 3rem 5rem;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
