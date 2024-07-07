<script setup lang="ts">
import VInputFactory from "./VInputFactory.vue";

 defineProps(
    {
      inputData: {
        type: Object,
        required: true,
      },
    }
)
const model = defineModel()

</script>

<template>
  <div>
    <div v-for="(value, key) in model" :key="key">
      <VInputFactory :inputData="value"/>
    </div>
  </div>
</template>

<style scoped>

</style>
