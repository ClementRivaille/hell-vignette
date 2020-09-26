<template>
  <div class="screen end">
    <img class="window" src="@/assets/images/test.png" />
    <ui-dialog
      class="end-dialogs"
      :dialogs="endDialogs"
      @continue="onContinue($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UiDialog from '@/components/ui/ui-dialog.vue';
import { endDialogs } from '@/utils/dialogs';

export default defineComponent({
  name: 'screen-before-end',
  components: { UiDialog },
  emits: ['return', 'end'],
  setup(props, context) {
    const onContinue = (refuse: boolean) => {
      console.log('HEY', refuse);
      context.emit(refuse ? 'return' : 'end');
    };
    return { endDialogs, onContinue };
  },
});
</script>

<style scoped>
.end {
  background: #5a0101;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.end > * + * {
  margin-top: 2rem;
}

.window {
  min-width: 16rem;
  max-width: 80vw;
  object-fit: contain;
  border-radius: 40px;
}

.end-dialogs {
  flex: 1;
  width: 100%;
}
</style>
