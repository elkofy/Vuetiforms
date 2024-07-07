<script setup lang="ts">
import AutoForm from "./components/AutoForm.vue";
import {z} from "zod";
import {ref} from "vue";

const userSchema = z.object({
  username: z.string().min(3).max(20),
  age: z.number().int().positive(),
  location: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
});
const formData = ref({});
const submit = (data: any) => {
  console.log(data);
  formData.value = data;
}

</script>

<template>
  <div class="myForm">
    <AutoForm :zod-schema="userSchema" @submit="submit" />
  </div>
</template>

<style scoped>
.myForm{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 50vw;
}
</style>
