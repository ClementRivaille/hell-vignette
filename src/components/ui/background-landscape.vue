<template>
  <div class="landscape">
    <slot />
  </div>
</template>

<script lang ="ts">
export default {
  name: "background-landscape"
};
</script>

<style>
.landscape {
  min-height: 100vh;
  background: url("../../assets/landscape.png") no-repeat center bottom;
  background-size: 100% auto;
}
</style>