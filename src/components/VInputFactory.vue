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
    const result = refData.value.zodSchema.safeParse(input); // => { success: true; data: "tuna" }
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

</script>

<template>
  <div>
    <v-text-field v-if="inputData.type === 'string'" v-model="refData.modelValue" :label="inputData.label"
      @update:model-value="validateInput" :error-messages="errorMessages"
      @update:focused="resetErrorMessages" />
  </div>
</template>

<style scoped></style>
