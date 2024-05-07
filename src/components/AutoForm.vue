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
const formObject = ref({});
const sendObject = () => {
  console.log(formObject.value);
}
</script>

<template>
  {{ formObject }}
  <v-form @submit.prevent class="w-100">
    <div v-for="(value, key) in model" :key="key">
      <VInputFactory :inputData="value" v-model="formObject[key]"/>
    </div>
    <v-btn class="mt-2" type="submit" @click="sendObject" block >Submit</v-btn>
  </v-form>
</template>

<style scoped>

</style>
