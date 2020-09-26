<template>
  <a class="button-link" href="#" @click.prevent="click" :class="{ danger }">
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'button-link',
  emits: ['click'],
  props: {
    danger: Boolean,
  },
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
  background: #47724b;
  box-shadow: rgba(255, 255, 255, 0.6) 0 0 0.8em;
}

.button-link.danger {
  background: #97371a;
}
.button-link.danger:focus,
.button-link.danger:hover {
  background: #bb6950;
}
</style>
