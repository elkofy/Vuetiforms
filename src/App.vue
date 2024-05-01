<script setup lang="ts">
import AutoForm from "./components/AutoForm.vue";
import {z} from "zod";

const user = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  strings: z.array(z.object({ value: z.string() })),
});

</script>

<template>
<div class="myForm">
  <AutoForm :zod-schema="user"/>
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
