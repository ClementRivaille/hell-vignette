<template>
  <div class="screen cell" :style="{ background: cell.color }">
    <div class="description">
      <ui-paragraph :color="cell.black ? TextColor.Black : TextColor.White">
        <p v-for="i in cell.nbParagraphs" :key="`${cell.id}.${i}`">
          {{ $t(`cells.${cell.id}.description.${i}`) }}
        </p>
      </ui-paragraph>
    </div>
    <img class="image" :src="imageSrc" />
    <door-button @click="$emit('exit')">{{ $t('cells.exit') }}</door-button>
  </div>
</template>

<script lang="ts">
import { CellConfig } from '@/utils/cells';
import Vue, { defineComponent } from 'vue';
import UiParagraph, { TextColor } from '@/components/ui/ui-paragraph.vue';
import DoorButton from '@/components/ui/door-button.vue';

export default defineComponent({
  name: 'screen-cell',
  props: {
    cell: {
      type: Object as () => CellConfig,
      required: true,
    },
  },
  emits: ['exit'],
  components: { UiParagraph, DoorButton },
  setup: (props) => {
    return { TextColor, imageSrc: require(`@/assets/images/test.png`) };
  },
});
</script>

<style scoped>
.cell {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.cell * + * {
  margin-top: 1rem;
}

.description {
  width: 100%;
}

.image {
  min-width: 16rem;
  max-width: 80vw;
  object-fit: contain;
  border-radius: 40px;
}
</style>
