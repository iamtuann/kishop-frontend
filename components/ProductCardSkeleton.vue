<template>
  <div class="card-wrapper">
    <div class="pv-img">
      <CommonAnimatedPlaceholder width="100%" height="200px" border-radius="0.375rem" opacity="0.8"/>
    </div>
    <div class="card-body py-3">
      <CommonAnimatedPlaceholder width="60%" height="24px" border-radius="4px"/>
      <div class="flex flex-col gap-2 mt-2">
        <CommonAnimatedPlaceholder width="100%" height="20px" border-radius="4px"/>
        <CommonAnimatedPlaceholder width="100%" height="20px" border-radius="4px"/>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.card-body {
  min-height: 145px;
}
</style>