<script setup lang="ts">
import {makeDeepPartial, makeFormObject} from "../utils/zodUtilities.ts";
import {ref} from "vue";
import {ZodObject} from "zod";
import VInputFactory from "./VInputFactory.vue";

const props = defineProps(
    {
      zodSchema: {
        type: ZodObject<any>,
        required: true,
      },
    }
)
const form = ref(makeDeepPartial(props.zodSchema));
const model = ref(makeFormObject(form.value));
console.log(model.value);
</script>

<template>
  <v-form @submit.prevent class="w-100">
    <div v-for="(value, key) in model" :key="key">
      <VInputFactory :inputData="value"/>
    </div>
  </v-form>
</template>

<style scoped>

</style>
