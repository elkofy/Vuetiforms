<script setup lang="ts">
import {ref} from "vue";

const props= defineProps(
    {
      inputData: {
        type: Object,
        required: true,
      },
    }
)
const refData = ref(props.inputData);
console.log(refData.value);
</script>

<template>
  <div>
    <v-text-field 
    v-if="inputData.type === 'string'"
    v-model="inputData.modelValue"
    :label="inputData.label"
   />
  </div>
</template>

<style scoped>

</style>
