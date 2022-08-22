<template>
  <v-container class="primary--text mb-8">
    <v-row>
      {{ $t('common.assign_member') }}
      <v-btn 
        v-if="viewMode"
        @click="doOperatingRegister"
        class="primary secondary--text d-block ml-auto mb-2"
      >
        {{ $t('common.operating_register') }}
      </v-btn>
      <v-btn 
        v-if="editMode"
        @click="doAddMember()"
        class="primary secondary--text d-block ml-auto mb-2"
      >
        {{ $t('common.adding_member') }}
      </v-btn>
    </v-row>
    <v-row>
      <v-col
        v-if="deassignmentVisible"
        class="header"
        :cols="2"
      >
        {{ $t('common.deassignment') }}
      </v-col>
      <v-col
        class="header"
        :cols="clos"
      >
        {{ $t('common.member_name') }}
      </v-col>
      <v-col
        class="header"
        :cols="clos"
      >
        {{ $t('common.unit_cost') }}
      </v-col>
      <v-col
        v-if="operatingTimeVisible"
        class="header"
        cols="4"
      >
        {{ $t('common.operating_time') }}
      </v-col>
    </v-row>
    <AssignMemberUnit 
      v-for="(member, index) of members"
      :key="index"
      :member="member"
      :index="index"
      :member-list="selectableMembers"
      :get-dynamic-cols="clos"
      :editable="editable"
      :is-operating-time-visible="operatingTimeVisible"
      :is-deassignment-visible="deassignmentVisible"
      @update="dataUpdate"
      @lifting="doLiftingMember"
    />
    <v-row v-if="error.exists">
      <span class="error--text">{{ error.message }}</span>
    </v-row>
  </v-container>
</template>
<script>
  import AssignMemberUnit from '@/components/project/AssignMemberUnit.vue'

  export default {
    name: "AssignMemberInfo",
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
        type: Array,
        required: true
      },
      selectableMembers: {
        type: Array,
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
      clos: function() {
        return this.editable? 5: 4;
      },
      operatingTimeVisible: function() {
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
          operatingTime: 0
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