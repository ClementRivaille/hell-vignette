<template>
  <ui-screen color="#2e2e2e">
    <div class="loading">
      {{ $t("loading") }}
    </div>
  </ui-screen>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UiScreen from "../ui/ui-screen.vue";

export default defineComponent({
  name: "screen-loading",
  components: { UiScreen },
});
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>