<template>
  <ui-screen>
    <div class="before-end">
      <ui-dialog :dialogs="beforeEndDialogs" @continue="$emit('continue')" />
    </div>
  </ui-screen>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UiDialog from "@/components/ui/ui-dialog.vue";
import UiScreen from "@/components/ui/ui-screen.vue";
import { beforeEndDialogs } from "@/utils/dialogs";

export default defineComponent({
  name: "screen-before-end",
  components: { UiDialog, UiScreen },
  emits: ["continue"],
  setup: () => ({ beforeEndDialogs }),
});
</script>

<style scoped>
.before-end {
  display: flex;
  justify-content: center;
  align-items: center;
}

.before-end > * {
  width: 100%;
}
</style>
