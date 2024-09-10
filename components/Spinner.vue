<template>
  <div class="spinner w-7 h-7"></div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.spinner {
  border-radius: 100%;
  border-width: 4px;
  border-style: solid;
  stroke-dasharray: 80;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation:
    colors calc(1.4s * 4) ease-in-out infinite,
    spinner 0.8s infinite linear alternate,
    spinner-scale 1.6s infinite linear;
}

@keyframes colors {
  0% { border-color: #1d4e9c; }
  25% { border-color: #b3312a; }
  50% { border-color: #aa8618; }
  75% { border-color: #147241; }
  100% { border-color: #2b5497; }
}

@keyframes spinner {
   0% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
   }

   12.5% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
   }

   25% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
   }

   50% {
      clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
   }

   62.5% {
      clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
   }

   75% {
      clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
   }

   100% {
      clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
   }
}

@keyframes spinner-scale {
   0% {
      transform: scaleY(1) rotate(0deg);
   }

   49.99% {
      transform: scaleY(1) rotate(135deg);
   }

   50% {
      transform: scaleY(-1) rotate(0deg);
   }

   100% {
      transform: scaleY(-1) rotate(-135deg);
   }
}
</style>