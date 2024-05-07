<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps(
  {
    inputData: {
      type: Object,
      required: true,
    },
  }
)
const model = defineModel()
const refData = ref({ ...props.inputData });
model.value = refData.value.modelValue;
const errorMessages = ref("");

const validateInput = (input: any) => {
  try {
    if (refData.value.type === "number") input = Number(input)
    const result = refData.value.zodSchema.safeParse(input);
    if (!result.success) {
      const formatted = result.error.format();
      errorMessages.value = formatted?._errors
    }
    else {
      errorMessages.value = "";
    }
  }
  catch (e: any) {
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

</script>

<template>
  <v-text-field v-if="isSimpleTextFields(inputData)" :type="inputData.type" v-model="model"
    :label="inputData.label" @update:model-value="validateInput" :error-messages="errorMessages"
    @update:focused="resetErrorMessages" />
  <template v-if="!inputData.type">
    <template v-for="(value, key) in inputData" :key="key">
      <VInputFactory :inputData="value" v-model="value.modelValue" @update:model-value="$emit('update:modelValue',$event)" />
    </template>
  </template>
</template>
