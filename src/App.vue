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
          @open="onOpenCell($event)"
        />

        <screen-cell
          v-else-if="state.screen === GameScreen.Cell && state.selectedCell"
          :cell="state.selectedCell"
          @exit="onExitCell"
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
import ScreenCell from '@/components/screens/screen-cell.vue';

import '@/styles/fonts.css';
import '@/styles/screen.css';
import { CellConfig, cellsConfigs } from './utils/cells';

interface GameState {
  screen: GameScreen;
  level: number;
  cells: string[];
  selectedCell?: CellConfig;
  questions: string[];
}

export default defineComponent({
  name: 'App',
  setup() {
    const state: GameState = reactive({
      screen: GameScreen.Start,
      level: 0,
      cells: [],
      selectedCell: undefined,
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
    const onOpenCell = (cell: string) => {
      const cellConfig = cellsConfigs.find((config) => config.id === cell);
      if (!cellConfig) return;

      state.selectedCell = cellConfig;
      state.screen = GameScreen.Cell;
    };
    const onExitCell = () => {
      state.cells = state.cells.filter(
        (id) => !state.selectedCell || id !== state.selectedCell.id
      );
      state.screen =
        state.cells.length > 0 ? GameScreen.Hub : GameScreen.Question;
    };

    return {
      state,
      transition,
      GameScreen,
      screenIs,
      onBegin,
      onExitTorture,
      onOpenCell,
      onExitCell,
    };
  },
  components: {
    BackgroundLandscape,
    ScreenStart,
    ScreenTorture,
    ScreenHub,
    ScreenCell,
  },
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
