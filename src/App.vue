<script setup lang="ts">
import AutoForm from "./components/AutoForm.vue";
import {z} from "zod";
import {makeDeepPartial} from "./utils/zodUtilities.ts";

const user = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  strings: z.array(z.object({ value: z.string() })),
});

console.log(makeDeepPartial(user));
</script>

<template>

  <AutoForm/>
</template>

