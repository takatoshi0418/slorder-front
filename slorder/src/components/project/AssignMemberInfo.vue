<template>
  <v-container class="primary--text mb-8">
    <v-row>
      {{$t('common.assign_menber')}}
      <v-btn 
        v-if="viewMode"
        @click="doOperatingRegister"
        class="primary secondary--text d-block ml-auto mb-2">
        {{$t('common.oparating_register')}}
      </v-btn>
      <v-btn 
        v-if="editMode"
        @click="doAddMember()"
        class="primary secondary--text d-block ml-auto mb-2">
        {{$t('common.adding_member')}}
      </v-btn>
    </v-row>
    <v-row>
      <v-col v-if="deassignmentVisible"
        class="header" :cols="2">{{$t('common.deassignment')}}</v-col>
      <v-col class="header" :cols="clos">{{$t('common.member_name')}}</v-col>
      <v-col class="header" :cols="clos">{{$t('common.unit_cost')}}</v-col>
      <v-col v-if="oparatingTimeVisible"
        class="header" cols="4">{{$t('common.oparating_time')}}</v-col>
    </v-row>
    <AssignMemberUnit 
      v-for="(member, index) of members" :key="index"
      :member="member"
      :index="index"
      :memberList="memberList"
      :get-dynamic-cols="clos"
      :editable=editable
      :is-oparating-time-visible="oparatingTimeVisible"
      :is-deassignment-visible="deassignmentVisible"
      v-on:update="dataUpdate"
      v-on:lifting="doLiftingMember" />
      <v-row v-if="error.exists">
        <span class="error--text">{{error.message}}</span>
      </v-row>
  </v-container>
</template>
<script>
  import AssignMemberUnit from '@/components/project/AssignMemberUnit.vue'

  export default {
    name: "assignMenberInfo",
    data: function() {
      return {
        error: {
          exists: false,
          message: ''
        }
      }
    },
    props: {
      members: {
        required: true
      },
      editable: {
        type: Boolean,
        default: false
      },
      doOperatingRegister: {
        type: Function,
        required: true
      }
    },
    computed: {
      memberList: function() {
        return [
          {no: 1, name: "浅井 長政", unit: 2500},
          {no: 2, name: "織田 信長", unit: 4000},
          {no: 3, name: "徳川 家康", unit: 3500},
          {no: 4, name: "豊臣 秀吉", unit: 3500},
          {no: 5, name: "織田 信成", unit: 1500}
        ]
      },
      clos: function() {
        return this.editable? 5: 4;
      },
      oparatingTimeVisible: function() {
        return !this.editable;
      },
      deassignmentVisible: function() {
        return this.editable;
      },
      editMode: function() {
        return this.editable;
      },
      viewMode: function() {
        return !this.editable;
      }
    },
    methods: {
      dataUpdate: function(index, key, value) {
        if (index === undefined || key === undefined || value === undefined) {
          return;
        }
        this.$emit('update', this.members, index, key, value);
      },
      doAddMember: function() {
        let data = {
          value: null,
          unit: 0,
          oparatingTime: 0
        }
        this.$emit('add', this.members, data);
      },
      doLiftingMember: function(index) {
        this.$emit('delete', this.members, index);
      }
    },
    watch: {
      members: {
        handler: function() {
          if (this.members.length <= 0) {
            this.error.exists = true;
            this.error.message = this.$t('message.error_member_not_exists');
            return;
          }
          let set = new Set();
          for (let member of this.members) {
            set.add(member.value);
          }
          if (this.members.length !== set.size) {
            this.error.exists = true;
            this.error.message = this.$t('message.error_member_duplicate');
          } else {
            this.error.exists = false;
            this.error.message = '';
          }
        },
        deep: true
      }
    },
    components: {
      AssignMemberUnit
    }
}
</script>