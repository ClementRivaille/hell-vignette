<template>
  <a class="question-link" href="#" @click.prevent="$emit('click')"><slot /></a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "question-link",
  emits: ["click"],
});
</script>

<style scoped>
.question-link {
  text-decoration: none;
  color: black;
  text-shadow: white 0.1em 0.1em 0.2em;
  font-weight: bold;
  font-style: italic;
}

.question-link:hover,
.question-link:focus {
  outline: none;
  color: white;
  text-decoration: underline;
}
</style>
