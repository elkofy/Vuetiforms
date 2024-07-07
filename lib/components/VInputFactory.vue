<script setup lang="ts">
import {ref} from "vue";

const props = defineProps(
    {
      inputData: {
        type: Object,
        required: true,
      },
    }
)
const model = defineModel()
const errorMessages = ref("");
const refData = ref({...props.inputData});
model.value = refData.value.modelValue;

const validateInput = (input: any) => {
  try {
    if (!input) {
      input = model.value;
    }
    if (refData.value.type === "number") {
      input = Number(input)
      console.log(input)
    }
    const result = refData.value.zodSchema.safeParse(input);
    if (!result.success) {
      const formatted = result.error.format();
      errorMessages.value = formatted?._errors
    } else {
      errorMessages.value = "";
    }
  } catch (e: any) {
    errorMessages.value = e.errors;
  }
}
const resetErrorMessages = (enter: boolean) => {
  enter && model.value ? validateInput(model.value) : errorMessages.value = "";
}
const isSimpleTextFields = (input: any) => {
  if (!input) return false;
  return input.type === "string" || input.type === "number" || input.type === "boolean";
}

defineExpose({
  validateInput,
})
</script>

<template>
  <v-text-field v-if="isSimpleTextFields(inputData)" :type="inputData.type" v-model="model"
                :label="inputData.label" @update:model-value="validateInput" :error-messages="errorMessages"
                @update:focused="resetErrorMessages"/>

</template>
