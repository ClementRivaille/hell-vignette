<template>
  <ui-screen>
    <div class="hub">
      <ui-paragraph>
        {{ first ? $t(`hub.text-${level}`) : $t("hub.next") }}
      </ui-paragraph>
      <div class="cells">
        <door-button
          class="cell"
          v-for="cell in cells"
          :key="cell"
          @click="open(cell)"
          :style="getCellPosition(cell)"
        >
          {{ $t(`cells.${cell}.title`) }}
        </door-button>
      </div>
    </div>
  </ui-screen>
</template>

<script lang="ts">
import { defineComponent, StyleHTMLAttributes } from "vue";
import UiParagraph from "@/components/ui/ui-paragraph.vue";
import DoorButton from "@/components/ui/door-button.vue";
import { cellsConfigs } from "@/utils/cells";
import UiScreen from "@/components/ui/ui-screen.vue";

export default defineComponent({
  name: "screen-hub",
  props: {
    level: {
      type: Number,
      required: true,
    },
    cells: {
      type: Array as () => string[],
      required: true,
    },
    first: {
      type: Boolean,
    },
  },
  emits: ["open"],
  setup(props, context) {
    const getCellPosition = (cell: string) => {
      const cellConfig = cellsConfigs.find((config) => config.id === cell);
      if (!cellConfig) return {};

      const column = cellConfig.position % 5;
      const row = Math.floor(cellConfig.position / 5) + 1;

      return {
        gridColumn: `${column} / span 1`,
        gridRow: `${row} / span 1`,
      };
    };
    const open = (cell: string) => {
      context.emit("open", cell);
    };

    return { getCellPosition, open };
  },
  components: { UiParagraph, DoorButton, UiScreen },
});
</script>

<style scoped>
.hub {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cells {
  height: 18rem;
  width: 100%;
  display: grid;
  grid-template: repeat(4, 1fr) / repeat(5, 1fr);
  gap: 1.5rem;
  justify-items: stretch;
  align-items: stretch;
}
</style>
