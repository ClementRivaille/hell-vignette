<template>
  <button class="toggle" :class="{ active }" @click="$emit('click')">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    active: {
      type: Boolean,
    },
  },
  emits: ['click'],
});
</script>

<style scoped>
.toggle {
  background: none;
  border: none;
  padding: none;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
}

.toggle.active {
  font-weight: bold;
  text-decoration: underline;
}

.toggle:focus {
  outline: none;
  border: dotted 1px white;
  border-radius: 5px;
}
</style>
