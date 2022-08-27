<template>
  <v-container>
    <v-container class="primary--text mb-8">
      <v-row>
        <v-col
          class="side_header"
          cols="4"
        >
          {{ $t('common.project_no') }}
        </v-col>
        <v-col
          class="column"
          cols="8"
        >
          {{ project.no }}
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="side_header"
          cols="4"
        >
          {{ $t('common.project_name') }}
        </v-col>
        <v-col
          class="column"
          cols="8"
        >
          {{ project.name }}
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="side_header"
          cols="4"
        >
          {{ $t('common.client_name') }}
        </v-col>
        <v-col
          class="column"
          cols="8"
        >
          {{ project.clientName }}
        </v-col>
      </v-row>
    </v-container>
    <v-container class="primary--text mb-8 d-flex justify-center">
      <v-btn 
        @click="preDay"
        class="primary secondary--text mx-4"
      >
        {{ $t('common.previous_day') }}
      </v-btn>
      <DateField 
        class="input-centering"
        v-model="date"
        :label="$t('common.date')"
        :editable="true"
        :solo="true"
        :centering="true"
      />
      <v-btn 
        @click="nextDay"
        class="primary secondary--text mx-4"
      >
        {{ $t('common.next_day') }}
      </v-btn>
    </v-container>
    <v-container class="primary--text mb-8">
      <v-row>{{ $t('common.assign_member') }}</v-row>
      <v-row>
        <v-col
          class="header"
          cols="8"
        >
          {{ $t('common.member_name') }}
        </v-col>
        <v-col
          class="header"
          cols="4"
        >
          {{ $t('common.operating_time') }}
        </v-col>
      </v-row>
      <WorkOfMemberUnit 
        v-for="(member, index) of projectMembers" 
        :key="index"
        :project-member="member"
        :index="index"
        @update="dataUpdate"
      />
    </v-container>
    <v-row>
      <v-spacer />
      <v-btn 
        @click="doRegister()"
        class="primary secondary--text mx-4"
      >
        {{ $t('common.register') }}
      </v-btn>
      <v-btn 
        @click="doReturn()"
        class="cancel secondary--text mx-4"
      >
        {{ $t('common.return') }}
      </v-btn>
      <v-spacer />
    </v-row>
  </v-container>
</template>
<script>
  import {dateUtil} from '@/plugins/utilities.js'
  import DateField from '@/components/Interface/DateField.vue'
  import {get, post} from '@/plugins/apiHandler'
  import WorkOfMemberUnit from '../../components/project/WorkOfMemberUnit.vue'

  export default {
    name: "OrderWorkingRegisterView",
    props: {
      projectNo: {
        type: Number,
        required: true
      }
    },
    data: function () {
      return {
        date: dateUtil.nowDateStr(),
        project: {},
        isProjectLoaded: false,
        projectMembers :[],
        isProjectMembersLoaded: false
      };
    },
    mounted: function() {
      this.setProjectMemberList();
      this.setProject();
    },
    methods: {
      preDay: function () {
        let pd = dateUtil.addDay(this.date, -1);
        this.date = dateUtil.toStrFormat(pd);
      },
      nextDay: function () {
        let nd = dateUtil.addDay(this.date, 1);
        this.date = dateUtil.toStrFormat(nd);
      },
      setProjectMemberList: function() {
        this.isProjectMembersLoaded = false;
        try {
          get('projectbelongworklist/' + this.projectNo + '/' + this.date).then(response => {
            this.projectMembers = response.data
            console.log(response.data)
            this.isProjectMembersLoaded = true;
          })
          .catch(err => {
            console.error(err);
            throw err;
          });
        } catch (err) {
          console.error(err);
        }
      },
      setProject: function() {
        this.isProjectLoaded = false;
        try {
          get('simpleproject/' + this.projectNo).then(response => {
            this.project = response.data
            console.log(response.data)
            this.isProjectLoaded = true;
          })
          .catch(err => {
            console.error(err);
            throw err;
          });
        } catch (err) {
          console.error(err);
          this.$errorProcess(err);
        }
      },
      dataUpdate: function(index, key1, key2, value) {
        if (index === undefined || key1 === undefined 
          || key2 === undefined || value === undefined) {
          return;
        }
        this.projectMembers[index][key1][key2] = value;
      },
      doReturn: function() {
        this.$router.replace({
          name: 'orderEdit',
          params: {
            projectNo: this.projectNo
          }
        })
      },
      doRegister: function() {
        for (let member of this.projectMembers) {
          member.work.projectId = member.projectId
          member.work.memberId = member.memberId
          member.work.workDate = this.date
        }

        try {
          post('setwork', this.projectMembers).then(response => {
            console.log(response);
          })
          .catch(err => {
            console.error(err);
            throw err;
          })
        } catch (err) {
          console.error(err);
          this.$errorProcess(err);
        }
      }
    },
    computed: {
      isLoadend: {
        get() {
          return this.isProjectMembersLoaded && this.isProjectLoaded
        }
      }
    },
    watch: {
      date: {
        handler: function() {
          this.setProjectMemberList();
        }
      },
      isLoadend: {
        handler: function(isLoadend) {
          if (isLoadend) {
            this.$emit('loading', false);
          } else {
            this.$emit('loading', true);
          }
        },
        immediate: true
      }
    },
    components: {
    DateField,
    WorkOfMemberUnit
}
}
</script>
<style>
@import '@/assets/projectEdit.css';
</style>