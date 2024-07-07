<script setup lang="ts">
import {formatFormObject, makeDeepPartial, makeFormObject} from "../utils/zodUtilities";
import {ref} from "vue";
import {ZodObject} from "zod";
import VInputFactory from "./VInputFactory.vue";

const props = defineProps(
    {
      zodSchema: {
        type: ZodObject<any>,
        required: true,
      },
    },
)
const InputsRef = ref([]);
const emit = defineEmits(["submit"]);
const form = ref(makeDeepPartial(props.zodSchema));
const model = ref(makeFormObject(form.value));
const formObject = ref({...model.value});
const sendObject = () => {
  const result = formatFormObject(formObject.value);
  console.log(typeof result.age);
  const validation = props.zodSchema.safeParse(result);
  console.log(validation);

  if (!validation.success) {
    InputsRef.value.forEach((input: any) => {
      input.validateInput(input.model);
    })
    return;
  }
  emit("submit", result);
}
</script>

<template>
  <v-form @submit.prevent class="w-100">
    <div v-for="(value, key) in model" :key="key">
      <VInputFactory ref="InputsRef" :inputData="value" v-model="formObject[key].modelValue"/>
      <template v-if="!value.type">
        <p class="text-capitalize text-left text-h6">{{ key }}</p>
        <template v-for="(input, inputKey) in value" :key="inputKey">
          <VInputFactory ref="InputsRef" v-if="input" :inputData="input"
                         v-model="formObject[key][inputKey].modelValue"/>
        </template>
      </template>
    </div>
    <v-btn class="mt-2" type="submit" @click="sendObject" block>Submit</v-btn>
  </v-form>
</template>

<style scoped>

</style>
