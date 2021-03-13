<template>
  <div class="info">
    <slot />
  </div>
</template>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-style: italic;
  font-size: 0.7rem;
}

.info > * + * {
  margin-top: 0.2rem;
}
</style>
