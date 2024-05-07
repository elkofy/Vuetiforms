<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(
  {
    inputData: {
      type: Object,
      required: true,
    },
  }
)
const refData = ref({ ...props.inputData });
const errorMessages = ref("");

const validateInput = (input: any) => {
  try {
    if (refData.value.type === "number") input = Number(input)
    const result = refData.value.zodSchema.safeParse(input);
    if (!result.success) {
      const formatted = result.error.format();
      errorMessages.value = formatted?._errors
    }
    else{
      errorMessages.value = "";
    }
  }
  catch (e: any) {
    errorMessages.value = e.errors;
  }
}
const resetErrorMessages = (enter: boolean) => {
  enter && refData.value.modelValue ? validateInput(refData.value.modelValue):errorMessages.value = "";
}
const isSimpleTextFields = (input: any) => {
  return input.type === "string" || input.type === "number" || input.type === "boolean";
}
</script>

<template>
    <v-text-field v-if="isSimpleTextFields(inputData)" :type="inputData.type" v-model="refData.modelValue" :label="inputData.label"
      @update:model-value="validateInput" :error-messages="errorMessages"
      @update:focused="resetErrorMessages" />
</template>

<style scoped></style>
