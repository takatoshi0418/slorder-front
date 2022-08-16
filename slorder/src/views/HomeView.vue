<template>
  <v-container>
    <h1>HomeView</h1>
    <div v-for="time of times" :key="time.index">
      <TimeField 
        v-model="time.value"
        label="aaaa"
        editable />
    </div>
    <div v-for="time of time2s" :key="time.index">
      <TimeField 
        v-model="time.value"
        label="aaaa"
        editable />
    </div>
  </v-container>
</template>
<script>
  import TimeField from '@/components/Interface/TimeField.vue'
  export default {
    name: "HomeView",
    data: function () {
      return {
        times: [
          {value: '08:01'},
          {value: '08:01'},
          {value: '08:01'},
          {value: '08:01'},
        ]
      };
    },
    computed: {
      time2s: function() {
        return [
          {value: '08:01'},
          {value: '08:01'},
          {value: '08:01'},
          {value: '08:01'},
        ]
      }
    },
    components: { TimeField }
}
</script>