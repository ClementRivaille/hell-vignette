<template>
  <div class="start screen">
    <h1>{{ $t('start.title') }}</h1>
    <div class="menu">
      <a @click.prevent="begin">{{ $t('start.begin') }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'screen-start',
  emits: ['begin'],
  setup(_props, context) {
    return {
      begin() {
        context.emit('begin');
      },
    };
  },
});
</script>

<style scoped>
.start {
  background-color: #2e2e2e;
}

h1 {
  font-size: 4rem;
  text-align: center;
  margin-bottom: 4em;
}

a {
  cursor: pointer;
  border: solid lightgrey 2px;
  padding: 0.3em 0.6em;
  border-radius: 15px;
}
a:hover {
  color: #d1df92;
  border-color: #d1df92;
}
</style>
