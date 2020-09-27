<template>
  <ui-screen color="#5a0101">
    <div class="end">
      <img class="window" src="@/assets/images/car.png" />
      <ui-dialog
        class="end-dialogs"
        :dialogs="endDialogs"
        @continue="onContinue($event)"
      />
    </div>
  </ui-screen>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UiDialog from "@/components/ui/ui-dialog.vue";
import { endDialogs } from "@/utils/dialogs";
import UiScreen from "@/components/ui/ui-screen.vue";

export default defineComponent({
  name: "screen-before-end",
  components: { UiDialog, UiScreen },
  emits: ["return", "end"],
  setup(props, context) {
    const onContinue = (refuse: boolean) => {
      console.log("HEY", refuse);
      context.emit(refuse ? "return" : "end");
    };
    return { endDialogs, onContinue };
  },
});
</script>

<style scoped>
.end {
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
