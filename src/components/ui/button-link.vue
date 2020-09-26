<template>
  <a class="button-link" href="#" @click.prevent="click"><slot /></a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'button-link',
  emits: ['click'],
  setup(props, context) {
    return {
      click() {
        context.emit('click');
      },
    };
  },
});
</script>

<style scoped>
.button-link {
  display: inline-block;
  text-decoration: none;
  padding: 0.6em 1.3em;
  border-radius: 2em;
  background: #2a632f;
  color: white;
}

.button-link:focus,
.button-link:hover {
  outline: none;
  box-shadow: rgba(255, 255, 255, 0.6) 0 0 0.8em;
}
</style>
