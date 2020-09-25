<template>
  <div>Hi!</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { GameState } from "src/utils/states";

export default defineComponent({
  name: "App",
  setup() {
    const state = reactive({
      state: GameState.Loading
    });

    return { state };
  },
  components: {}
});
</script>

<style>
</style>
