<template>
  <a class="door-button" href="#" @click.prevent="click" v:bind="$attrs">
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'door-button',
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
.door-button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 1em 1.3em;
  border-radius: 16px;
  background: rgb(74, 135, 216);
  color: white;
  font-weight: bold;
  font-family: bpreplay;
  letter-spacing: 0.1em;
}

.door-button:focus,
.door-button:hover {
  outline: none;
  background: rgb(113, 158, 216);
  text-shadow: rgb(71, 54, 167) 0.2em 0.2em 0.1em;
}
</style>
