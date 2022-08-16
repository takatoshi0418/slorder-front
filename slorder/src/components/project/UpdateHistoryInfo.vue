<template>
  <v-container class="primary--text">
    <v-row>{{$t('common.update_history')}}</v-row>
    <v-row>
      <v-col class="header" cols="4">{{$t('common.update_user')}}</v-col>
      <v-col class="header" cols="4">{{$t('common.update_date')}}</v-col>
      <v-col class="header" cols="4">{{$t('common.kind')}}</v-col>
    </v-row>
    <v-row v-for="history of histories" :key="history.index">
      <v-col class="column" cols="4">{{history.name}}</v-col>
      <v-col class="column-center" cols="4">{{history.date}}</v-col>
      <v-col class="column-center" cols="4">
        {{getProjectHistoryName(history.kind)}}
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    name: 'updateHistoryInfo',
    props: {
      histories: {
        required: true
      }
    },
    methods: {
      getProjectHistoryName: function(kindId) {
        for (let hist of this.$projectHistoryKinds) {
          if (kindId === hist.id) {
            return hist.label;
          }
        }
        return '';
      }
    }
  }
</script>
<style>
@import '@/assets/projectEdit.css';
</style>