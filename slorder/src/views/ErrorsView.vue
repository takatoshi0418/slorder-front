<template>
  <v-container>
    <h2>ERROR</h2>
    {{ errors }}
  </v-container>
</template>
<script>
  export default {
    name: 'ErrorsView',
    props: {
      errors: {
        type:Object,
        required: true
      }
    }
  }
</script>