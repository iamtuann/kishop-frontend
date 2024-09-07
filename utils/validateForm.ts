import { Ref } from 'vue';
import type { ComponentPublicInstance } from 'vue'
import InputText from '~/components/InputText.vue';
import Select from "~/components/Select.vue";

type params = Ref<ComponentPublicInstance<typeof InputText | typeof Select> | null>[]

export function validateForm(inputRefs: params) {
  inputRefs.forEach((input) => {
    if (input.value?.validate) {
      input.value.validate();
    }
  });
  const isValid = inputRefs.every((input) => {
    return input.value?.isValid;
  });
  return isValid;
}