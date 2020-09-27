<template>
  <div class="screen" :style="{ background: color || '' }">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
export default defineComponent({
  name: "ui-screen",
  props: {
    color: String,
  },
});
</script>

<style scoped>
.screen {
  position: absolute;
  top: 0;
  min-height: 100vh;
  max-height: 100vh;
  overflow: auto;
  width: 100vw;
  padding: 0 4rem;
  padding-top: 5rem;
  /* padding-bottom: 2rem; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.screen::v-deep > * {
  flex: 1;
}

.screen::v-deep > *:after {
  content: " ";
  display: block;
  height: 2rem;
}
</style>