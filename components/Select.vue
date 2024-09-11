<template>
  <div 
    class="form-group w-full flex flex-col gap-1" 
    @blur="open = false" 
    tabindex="0"
    ref="selectEl"
  >
    <div class="font-sans flex items-center">
      <label class="font-medium text-sm">{{ label }}</label>
      <span class="text-sm ml-[2px] text-red-700" v-if="required" >*</span>
      <div class="flex-1"></div>
      <slot name="right_label"></slot>
    </div>
    <div class="select-wrap" :class="{ disabled: disabled }">
      <div class="selected"
        :class="{ open: open }" 
        @click="items.length > 0 ? open = !open : ''"
      >
        <span v-if="selected != null && !isEmptyValue(selected)">
          {{ getTitle(selected) }}
        </span>
        <span v-else>
          {{ titleDefault }}
        </span>
        <div v-if="!disabled && items.length > 0" class="arrow-icon" :class="{ open: open }">
          <span class="left"></span>
          <span class="right"></span>
        </div>
      </div>
      <div class="message">{{ message }}</div>
      <div v-show="open" class="items-wrap" :class="dropdownOpenDirection">
        <div
          class="px-4 py-2 cursor-pointer select-none flex items-center hover:bg-primary-100"
          v-for="(item, i) in items"
          :key="i"
          @click="handleSelect(item)"
        >
          {{ getTitle(item) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, toRef, toRefs } from "vue";
import { isEmptyValue } from "~/utils";
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  name: {type: String, required: false},
  modelValue: { type: [String, Object], required: true },
  default: { type: [String, Object], required: false },
  returnObject: { type: Boolean, default: false },
  items: { type: Array as PropType<(string[] | object[])>, required: true },
  label: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  itemTitle: { type: String, required: false, default: "title" },
  itemValue: { type: [String, Number], required: false, default: "value" },
  errorMessage: { type: String, required: false },
  required: { type: Boolean, required: false },
  titleDefault: {type: String},
  rules: { 
    type: Array as () => ((value: string | Object) => string | true)[],
    require: false
  },
})
const selectEl = ref<HTMLElement | null>(null);
const { modelValue } = toRefs(props);
const message = ref("");
const isValid = ref(true);
const selected = ref(getItemFromValue(modelValue.value)) || (props.default ? toRef(props.default) : ref(null));
const open = ref(false);
const dropdownOpenDirection = ref("below")

watch(open, (isDropdownOpened) => {
  if (isDropdownOpened) {
    setDropdownPosition();
  }
})

watch(modelValue, (newVal) => {
  selected.value = getItemFromValue(newVal);
  validate();
})

function validate() {
  message.value = "";
  if (props.rules && props.rules.length > 0) {
    for (let i = 0; i < props.rules.length; i++) {
      const result = props.rules[i](getValue(modelValue.value));
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

function handleSelect(item: string | object) {
  selected.value = item;
  open.value = false;
  emit('update:modelValue', getValue(item));
}

function setDropdownPosition() {
  if (selectEl.value) {
    const spaceBelow = window.innerHeight - selectEl.value.getBoundingClientRect().bottom;
    const hasEnoughSpaceBelow = spaceBelow > 250;
    if (hasEnoughSpaceBelow) {
      dropdownOpenDirection.value = 'below';
    } else {
      dropdownOpenDirection.value = 'above';
    }
  }
}

function getTitle(item: Record<string, any> | string): string {
  if(typeof item === "object" && item != null) {
    return item[props.itemTitle];
  } else {
    return item;
  }
}

function getValue(item: Record<string, any> | string): Record<string, any> | string {
  if (typeof item === "object" && !props.returnObject) {
    return item[props.itemValue];
  } else {
    return item;
  }
}

function getItemFromValue(value: string | Record<string, any>) {
  if (isArrayOfObjects(props.items)) {  
    if (typeof value == "object") {
      return isEmptyValue(value) ? null : value;
    } else {
      const item = props.items.find(item => {
        return item[props.itemValue] == value;
      })
      return item;
    }
  } else if (isArrayOfStrings(props.items)) {
    return value;
  }
}

function isArrayOfStrings(arr: unknown[]): arr is string[] {
  return arr.every(item => typeof item === 'string');
}

function isArrayOfObjects(arr: unknown[]): arr is Record<string, any>[] {
  return arr.every(item => typeof item === 'object' && item !== null && !Array.isArray(item));
}

defineExpose({
  validate,
  isValid
})
</script>

<style scoped>
.select-wrap {
  position: relative;
}
.select-wrap.disabled {
  pointer-events: none
}
.selected {
  outline: none;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid rgb(102 102 102 / 80%);
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  padding: 10px 24px 10px 12px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 24px;
  position: relative;
}

.selected.open {
  border-color: var(--tw-color-primary);
}

.items-wrap {
  padding: 8px 0;
  border-radius: 0px 0px 4px 4px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: rgba(0, 0, 0, 0.2);
  overflow: auto;
  position: absolute;
  background-color: #fff;
  font-size: 16px;
  left: 0;
  right: 0;
  z-index: 1;
  max-height: 300px;
}

.items-wrap.below {
  top: calc(100% + 4px);
}

.items-wrap.above {
  bottom: calc(100% + 4px);
  top: auto;
}

.message {
  color: #ff5454;
  margin: 0 10px;
  font-size: 13px;
  line-height: 14px;
  height: 14px;
}

.arrow-icon {
  background-color: transparent;
  height: 15px;
  width: 15px;
  display:block;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.arrow-icon span {
  position: absolute;
  background-color: var(--text-title, #111C27);
  top: 8px;
  width: 8px;
  height: 2px;
  display: block;
  border-radius: 8px;
  transition: all .5s cubic-bezier(.25,1.7,.35,.8);
  transform-origin: center center;
}

.arrow-icon .left {
  left: 1px;
  transform: rotate(35deg);
}

.arrow-icon .right {
  right: 1px;
  transform: rotate(-35deg);
}

.arrow-icon.open .left {
  transform: rotate(-35deg);
 }
 
.arrow-icon.open .right {
  transform: rotate(35deg);
}
</style>