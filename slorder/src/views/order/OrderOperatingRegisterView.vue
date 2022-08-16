<template>
  <v-container>
    <v-container class="primary--text mb-8">
      <v-row>
        <v-col class="side_header" cols="4">{{$t('common.project_no')}}</v-col>
        <v-col class="column" cols="8">{{project.no}}</v-col>
      </v-row>
      <v-row>
        <v-col class="side_header" cols="4">{{$t('common.project_name')}}</v-col>
        <v-col class="column" cols="8">{{project.name}}</v-col>
      </v-row>
      <v-row>
        <v-col class="side_header" cols="4">{{$t('common.client_name')}}</v-col>
        <v-col class="column" cols="8">{{project.client}}</v-col>
      </v-row>
    </v-container>
    <v-container class="primary--text mb-8 d-flex justify-center">
      <v-btn 
        @click="preDay"
        class="primary secondary--text mx-4">
        {{$t('common.previous_day')}}
      </v-btn>
      <DateField 
        class="input-centering"
        v-model="date"
        :label="$t('common.date')"
        :editable="true"
        :solo="true"
        :centering=true />
      <v-btn 
        @click="nextDay"
        class="primary secondary--text mx-4">
        {{$t('common.next_day')}}
      </v-btn>
    </v-container>
    <v-container class="primary--text mb-8">
      <v-row>{{$t('common.assign_menber')}}</v-row>
      <v-row>
        <v-col class="header" cols="8">{{$t('common.member_name')}}</v-col>
        <v-col class="header" cols="4">{{$t('common.oparating_time')}}</v-col>
      </v-row>
      <v-row v-for="member of project.memberList" :key="member.index">
        <v-col class="column" cols="8">{{member.name}}</v-col>
        <v-col class="column" cols="4">
          <TimeField 
            v-model="member.oparatingTime"
            :label="$t('common.oparating_time')"
            editable
            solo />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
  import {dateUtil} from '@/plugins/utilities.js'
  import DateField from '@/components/Interface/DateField.vue'
  import TimeField from '@/components/Interface/TimeField.vue'
  export default {
    name: "orderWorkingRegisterView",
    data: function () {
        return {
          date: dateUtil.nowDateStr(),
          memberList: [],
          project: {
            no: 'P-20220301-0002',
            name: 'ペット行動管理システム',
            client: "ポメラニアン佐藤",
            memberList: [
              {name: '浅井 長政', oparatingTime: '08:01'},
              {name: '織田 信長', oparatingTime: '08:01'},
              {name: '徳川 家康', oparatingTime: '08:01'},
              {name: '豊臣 秀吉', oparatingTime: '08:01'}
            ]
          }
      };
    },
    methods: {
        preDay: function () {
          let pd = dateUtil.addDayByStr(this.date, -1);
          this.date = dateUtil.toStrFormat(pd);
        },
        nextDay: function () {
          let nd = dateUtil.addDayByStr(this.date, 1);
          this.date = dateUtil.toStrFormat(nd);
        }
    },
    watch: {
      date: {
        handler: function() {
          this.project.memberList = [
            {name: '浅井 長政', oparatingTime: '08:01'},
            {name: '織田 信長', oparatingTime: '08:01'},
            {name: '徳川 家康', oparatingTime: '08:01'},
            {name: '豊臣 秀吉', oparatingTime: '08:01'}
          ]
        }
      }
    },
    components: {
    DateField,
    TimeField
}
}
</script>
<style>
@import '@/assets/projectEdit.css';
</style>