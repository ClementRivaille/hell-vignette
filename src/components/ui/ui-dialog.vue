<template>
  <transition name="screen-fade" mode="out-in">
    <div class="dialog" v-if="dialog" :key="dialogIdx">
      <ui-paragraph class="lines">
        <p v-for="line in dialog.lines" :key="line">{{ $t(line) }}</p>
      </ui-paragraph>
      <div class="reaction">
        <question-link v-if="dialog.question" @click="next">{{
          $t(dialog.question)
        }}</question-link>
        <button-link v-if="dialog.accept" @click="next(true)" :danger="true">{{
          $t(dialog.accept)
        }}</button-link>
        <button-link v-if="dialog.refuse" @click="next">{{
          $t(dialog.refuse)
        }}</button-link>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import UiParagraph from '@/components/ui/ui-paragraph.vue';
import ButtonLink from '@/components/ui/button-link.vue';
import QuestionLink from '@/components/ui/question-link.vue';
import { Dialog } from '@/utils/dialogs';

export default defineComponent({
  name: 'ui-dialog',
  components: { UiParagraph, ButtonLink, QuestionLink },
  props: {
    dialogs: {
      type: Array as () => Dialog[],
      required: true,
    },
  },
  emits: ['continue'],
  setup(props, context) {
    const dialogIdx = ref(0);
    const dialog = computed(() => props.dialogs[dialogIdx.value]);

    const next = (accept?: boolean) => {
      if (accept) {
        context.emit('continue', false);
      } else {
        if (dialogIdx.value < props.dialogs.length - 1) {
          dialogIdx.value++;
        } else {
          context.emit('continue', !accept);
        }
      }
    };

    return { dialog, dialogIdx, next };
  },
});
</script>

<style scoped>
.dialog {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.lines {
  width: 100%;
  margin-bottom: 2rem;
}

.reaction {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.reaction > * + * {
  margin-left: 3rem;
}
</style>
