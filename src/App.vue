<template>
  <main>
    <background-landscape>
      <ui-paragraph>
        <p>Lorem ipsum dolor sit amet hahaha!</p>
        <p>Lorem ipsum dolor sit amet hahaha!</p>
      </ui-paragraph>
    </background-landscape>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { GameState } from '@/utils/states';
import BackgroundLandscape from '@/components/ui/background-landscape.vue';
import UiParagraph from '@/components/ui/ui-paragraph.vue';

export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      state: GameState.Loading,
    });

    return { state };
  },
  components: { BackgroundLandscape, UiParagraph },
});
</script>

<style>
main {
  min-height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;

  color: white;
  font-size: 26px;
}

#app {
  height: 100%;
}

main {
  background: rgb(8, 12, 238);
  background: linear-gradient(rgb(75, 113, 240), rgb(8, 12, 238));
}
</style>
