<template>
  <button 
    :disabled="loading" :type="props.type" 
    class="btn-primary min-h-[58px]"
    :class="{'bg-primary-200 hover:bg-primary-200' : loading}"
  >
    <slot name="prepend-icon">
      <div v-if="props.prependIcon" class="mr-4">
        <i :class="props.prependIcon"></i>
      </div>
    </slot>
    <span v-show="!props.loading">
      <slot></slot>
    </span>
    <span v-show="props.loading">
      <Spinner></Spinner>
    </span>
  </button>
</template>

<script setup lang="ts">

type ButtonType = "button" | "submit" | "reset";

const props = defineProps({
  prependIcon: { type: String },
  type: { type: String as PropType<ButtonType>, default: "button" },
  loading: { type: Boolean }
})
</script>

<style scoped>

</style>