<template>
  <div class="form-group w-full flex flex-col gap-1">
    <div class="font-sans flex items-center">
      <label class="font-medium text-sm">{{ label }}</label>
      <span class="text-sm ml-[2px] text-red-700" v-if="required" >*</span>
      <div class="flex-1"></div>
      <slot name="right_label"></slot>
    </div>
    <!-- <p class="sub-label">{{ subLabel }}</p> -->
    <div class="input-wrap">
      <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"  
      />
    </div>
    <div class="message">
      <div v-show="message != ''">{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from "vue";
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  name: {type: String, required: false},
  modelValue: { type: String, required: true },
  label: { type: String, required: false },
  // subLabel: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  hideMessage: { type: Boolean, required: false },
  placeholder: { type: String, required: false },
  errorMessage: { type: String, required: false },
  required: { type: Boolean, required: false },
  type: { type: String, required: false, default: "text"},
  rules: { 
    type: Array as () => ((value: string) => string | true)[],
    require: false
  },
})
const {modelValue} = toRefs(props);
const message = ref("");
const isValid = ref(true);

function validate() {
  message.value = "";
  if (props.rules && props.rules.length > 0) {
    for (let i = 0; i < props.rules.length; i++) {
      const result = props.rules[i](modelValue.value);
      if (result !== true) {
        message.value = result;
        isValid.value = false
        return isValid.value;
      }
    }
  }
  isValid.value = true;
  return isValid.value;
}

watch(modelValue, () => {
  validate();
})

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit("update:modelValue", target.value)
}

defineExpose({
  validate,
  isValid
})

</script>

<style scoped>
.input-wrap input {
  outline: none;
  padding: 10px 12px;
  font-size: 16px;
  font-weight: 400;
  width: 100%;
  border-radius: var(--radius-sm, 10px);
  border: 1px solid rgb(102 102 102 / 80%);
  background: #ffff;
}

.message {
  color: #ff5454;
  margin: 0 10px;
  font-size: 13px;
  line-height: 14px;
  height: 14px;
}
</style>