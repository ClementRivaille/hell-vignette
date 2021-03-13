<template>
  <main>
    <background-landscape>
      <transition :name="transition.name" :mode="transition.mode">
        <screen-start
          v-if="state.screen === GameScreen.Start"
          :resume="hasSave"
          :no-input="state.noInput"
          @begin="onBegin"
          @toggle-no-input="toggleNoInput()"
        />

        <screen-loading v-else-if="state.screen === GameScreen.Loading" />

        <screen-torture
          v-else-if="state.screen === GameScreen.Torture"
          :level="state.level"
          :last="state.lastLevel"
          @exit="onExitTorture"
          :wait="state.noInput"
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
          @leave="onLeaveQuestion"
          @select="onSelectQuestion"
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

        <screen-credits v-else-if="state.screen === GameScreen.Credits" />
      </transition>
    </background-landscape>
  </main>
</template>

<script lang="ts">
import ScreenBeforeEnd from '@/components/screens/screen-before-end.vue';
import ScreenCell from '@/components/screens/screen-cell.vue';
import ScreenCredits from '@/components/screens/screen-credits.vue';
import ScreenEnd from '@/components/screens/screen-end.vue';
import ScreenHub from '@/components/screens/screen-hub.vue';
import ScreenQuestions from '@/components/screens/screen-questions.vue';
import ScreenStart from '@/components/screens/screen-start.vue';
import ScreenTorture from '@/components/screens/screen-torture.vue';
import BackgroundLandscape from '@/components/ui/background-landscape.vue';
import '@/styles/fonts.css';
import '@/styles/screen.css';
import { GameScreen } from '@/utils/screens';
import { computed, defineComponent, onMounted, reactive } from 'vue';
import screenLoading from './components/screens/screen-loading.vue';
import {
  activateMusic,
  deactivateMusic,
  loadSounds,
} from './utils/audio-manager';
import { CellConfig, cellsConfigs } from './utils/cells';
import { deleteProgress, loadProgress, saveProgress } from './utils/save';

interface GameState {
  screen: GameScreen;
  level: number;
  lastLevel: boolean;
  cells: string[];
  selectedCell?: CellConfig;
  questions: string[];
  noInput: boolean;
}

const NB_LEVELS = 5;

export default defineComponent({
  name: 'App',
  setup() {
    const state: GameState = reactive({
      screen: GameScreen.Loading,
      level: 0,
      lastLevel: computed(() => state.level > NB_LEVELS),
      cells: [],
      selectedCell: undefined,
      questions: ['deserve', 'eternity', 'tortures', 'pretty', 'who'],
      noInput: false,
    });

    const transition = reactive({
      name: 'fade',
      mode: 'in-out',
    });

    const save = loadProgress();

    onMounted(async () => {
      await loadSounds();
      state.screen = GameScreen.Start;
    });

    const toggleNoInput = () => {
      state.noInput = !state.noInput;
    };

    const onBegin = (resume: boolean) => {
      if (resume && save) {
        state.level = save.level;
        state.questions = save.questions;
      }
      transition.mode = 'in-out';
      state.screen = GameScreen.Torture;
    };

    const onExitTorture = () => {
      transition.mode = 'out-in';

      if (state.level < NB_LEVELS) {
        state.cells = cellsConfigs
          .filter((config) => config.level === state.level)
          .map((config) => config.id);
        state.screen = GameScreen.Hub;
        activateMusic();
      } else if (state.level === NB_LEVELS) {
        state.screen = GameScreen.BeforeEnd;
        activateMusic();
      } else {
        onEnd();
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
    const onSelectQuestion = (question: string) => {
      state.questions = state.questions.filter((q) => q !== question);
      saveProgress({ level: state.level + 1, questions: state.questions });
    };
    const onLeaveQuestion = () => {
      state.level++;
      state.screen = GameScreen.Torture;
      deactivateMusic();
    };
    const onEnterEnd = () => {
      transition.mode = 'out-in';
      state.screen = GameScreen.End;
      deactivateMusic();
    };
    const onRefuseEnd = () => {
      state.level++;
      saveProgress({ level: state.level, questions: state.questions });

      transition.mode = 'in-out';
      state.screen = GameScreen.Torture;
    };
    const onEnd = () => {
      transition.mode = 'in-out';
      state.screen = GameScreen.Credits;
      deleteProgress();
    };

    return {
      state,
      transition,
      GameScreen,
      hasSave: !!save,
      toggleNoInput,
      onBegin,
      onExitTorture,
      onOpenCell,
      onExitCell,
      onSelectQuestion,
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
    ScreenCredits,
    screenLoading,
  },
});
</script>

<style>
main {
  min-height: 100vh;
  width: 100%;
  background: rgb(11, 13, 125);
  background: linear-gradient(rgb(95, 116, 187), rgb(11, 13, 125));

  color: white;
  font-family: sans;
}
</style>
