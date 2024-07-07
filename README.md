# Vuetify + Zod + Forms = Vuetiforms

This library allows you to create forms using Vuetify and Zod with minimal code. It automatically generates form fields based on the Zod schema you provide. It also validates the form data based on the Zod schema.

This a Proof of Concept and is not ready for production.
Feel free to add an issue or feature in the issues section.


Dont forget to install [Vuetify](https://vuetifyjs.com/en/getting-started/installation/#existing-projects) and [Zod](https://zod.dev/?id=installation) before using this package.

## Project setup
```
npm install vuetiforms
```

### Usage
```vue
<script setup lang="ts">
import AutoForm from "vuetiforms";
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
```

