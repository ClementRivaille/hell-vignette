<template>
  <div class="paragraph" :class="[color]">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export enum TextColor {
  white = "white",
  black = "black",
}

export default defineComponent({
  name: "ui-paragraph",
  props: {
    color: {
      type: String as () => TextColor,
    },
  },
});
</script>

<style scoped>
.paragraph {
  width: 100%;
  color: white;
  text-shadow: black 0.2em 0.2em 1em;
  line-height: 1.7em;
  box-sizing: border-box;
}

.paragraph.black {
  color: black;
}

.paragraph >>> * {
  margin: 0;
}

.paragraph >>> * + * {
  margin-top: 0.8em;
}
</style>
