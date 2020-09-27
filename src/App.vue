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
          :last="state.lastLevel"
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

        <screen-questions
          v-else-if="state.screen === GameScreen.Question"
          :level="state.level"
          :questions="state.questions"
          @leave="onLeaveQuestion($event)"
        />

        <screen-before-end
          v-else-if="state.screen === GameScreen.BeforeEnd"
          @continue="onEnterEnd"
        />

        <screen-end
          v-else-if="state.screen === GameScreen.End"
          @return="onRefuseEnd"
          @end="onEnd"
        />

        <div v-else-if="state.screen === GameScreen.Credits">pouet</div>
      </transition>
    </background-landscape>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { GameScreen } from "@/utils/screens";
import BackgroundLandscape from "@/components/ui/background-landscape.vue";
import ScreenStart from "@/components/screens/screen-start.vue";
import ScreenTorture from "@/components/screens/screen-torture.vue";
import ScreenHub from "@/components/screens/screen-hub.vue";
import ScreenCell from "@/components/screens/screen-cell.vue";
import ScreenQuestions from "@/components/screens/screen-questions.vue";
import ScreenBeforeEnd from "@/components/screens/screen-before-end.vue";
import ScreenEnd from "@/components/screens/screen-end.vue";

import "@/styles/fonts.css";
import "@/styles/screen.css";
import { CellConfig, cellsConfigs } from "./utils/cells";

interface GameState {
  screen: GameScreen;
  level: number;
  lastLevel: boolean;
  cells: string[];
  selectedCell?: CellConfig;
  questions: string[];
}

const NB_LEVELS = 5;

export default defineComponent({
  name: "App",
  setup() {
    const state: GameState = reactive({
      screen: GameScreen.Start,
      level: 0,
      lastLevel: computed(() => state.level > NB_LEVELS),
      cells: [],
      selectedCell: undefined,
      questions: ["deserve", "eternity", "tortures", "pretty", "who"],
    });

    const transition = reactive({
      name: "fade",
      mode: "out-in",
    });

    const onBegin = () => {
      transition.mode = "in-out";
      state.screen = GameScreen.Torture;
    };
    const onExitTorture = () => {
      transition.mode = "out-in";

      if (state.level < NB_LEVELS) {
        state.cells = cellsConfigs
          .filter((config) => config.level === state.level)
          .map((config) => config.id);
        state.screen = GameScreen.Hub;
      } else if (state.level === NB_LEVELS) {
        state.screen = GameScreen.BeforeEnd;
      } else {
        transition.mode = "in-out";
        state.screen = GameScreen.Credits;
      }
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
    const onLeaveQuestion = (question: string) => {
      state.questions = state.questions.filter((q) => q !== question);
      state.level++;
      state.screen = GameScreen.Torture;
    };
    const onEnterEnd = () => {
      transition.mode = "out-in";
      state.screen = GameScreen.End;
    };
    const onRefuseEnd = () => {
      state.level++;
      transition.mode = "in-out";
      state.screen = GameScreen.Torture;
    };
    const onEnd = () => {
      console.log("Waaaaa!?");
      transition.mode = "in-out";
      state.screen = GameScreen.Credits;
    };

    return {
      state,
      transition,
      GameScreen,
      onBegin,
      onExitTorture,
      onOpenCell,
      onExitCell,
      onLeaveQuestion,
      onEnterEnd,
      onRefuseEnd,
      onEnd,
    };
  },
  components: {
    BackgroundLandscape,
    ScreenStart,
    ScreenTorture,
    ScreenHub,
    ScreenCell,
    ScreenQuestions,
    ScreenBeforeEnd,
    ScreenEnd,
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
