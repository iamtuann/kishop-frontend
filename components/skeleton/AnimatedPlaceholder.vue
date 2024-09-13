<template>
  <div class="placeholder">
    &nbsp;
  </div>
</template>

<script setup>
defineProps({
  height: { type: String },
  width: { type: String, default: '100%' },
  borderRadius: { type: String, default: '4px' },
  speedDuration: { type: String, default: '1s' },
  opacity: { type: String, default: '1'},
})
</script>

<style scoped>
@keyframes bgAnimated {
  0% {
    background-position: 50% 0;
  }
  100% {
    background-position: -150% 0;
  }
}
.placeholder {
  height: v-bind(height);
  width: v-bind(width);
  border-radius: v-bind(borderRadius);
  opacity: v-bind(opacity);
  background-image: linear-gradient(
    to right,
    #ddd 0%,
    #e8e8e8 10%,
    #ddd 20%,
    #ddd 100%
  );
  background-size: 200% 100%;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  animation: bgAnimated v-bind(speedDuration) linear infinite;
}
</style>