import { Ref } from 'vue';
import type { ComponentPublicInstance } from 'vue'
import InputText from '~/components/InputText.vue';

type params = Ref<ComponentPublicInstance<typeof InputText> | null>[]

export function validateForm(inputRefs: params) {
  console.log(inputRefs);
  
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