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
          :level="state.level"
          @exit="onExitTorture"
        />

        <screen-hub
          v-else-if="state.screen === GameScreen.Hub"
          :level="state.level"
          :cells="state.cells"
          :first="state.cells.length === 4"
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
import ScreenHub from '@/components/screens/screen-hub.vue';

import '@/styles/fonts.css';
import '@/styles/screen.css';
import { cellsConfigs } from './utils/cells';

interface GameState {
  screen: GameScreen;
  level: number;
  cells: string[];
  questions: string[];
}

export default defineComponent({
  name: 'App',
  setup() {
    const state: GameState = reactive({
      screen: GameScreen.Start,
      level: 0,
      cells: [],
      questions: ['why'],
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
    const onExitTorture = () => {
      transition.mode = 'out-in';

      state.cells = [
        cellsConfigs[0].id,
        cellsConfigs[2].id,
        cellsConfigs[3].id,
        cellsConfigs[1].id,
      ];
      state.screen = GameScreen.Hub;
    };

    return { state, transition, GameScreen, screenIs, onBegin, onExitTorture };
  },
  components: { BackgroundLandscape, ScreenStart, ScreenTorture, ScreenHub },
});
</script>

<style>
main {
  min-height: 100vh;
  width: 100%;
  background: rgb(8, 12, 238);
  background: linear-gradient(rgb(75, 113, 240), rgb(8, 12, 238));

  color: white;
  font-family: sans;
}
</style>
