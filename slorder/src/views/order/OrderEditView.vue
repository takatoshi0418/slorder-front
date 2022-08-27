<template>
  <v-container>
    <StatusInfo 
      v-if="isViewMode"
      :value="project.status" 
      :do-receive="doReceive"
      :do-delivery="doDelivery"
      :do-acceptance="doAcceptance"
      :do-paymented="doPaymented"
      :do-lost-order="doLostOrder"
      :do-receive-cancel="doReceiveCancel"
      :do-delivery-cancel="doDeliveryCancel"
      :do-acceptance-cancel="doAcceptanceCancel"
      :do-paymented-cancel="doPaymentedCancel"
      :do-lost-order-cancel="doLostOrderCancel"
    />

    <!-- basicInfo -->
    <BasicInfo 
      v-if="isLoadend"
      :basic-info="project.basic"
      :selectable-clients="selectableClients"
      :editable="editable"
      @update="dataUpdate"
    />

    <!-- payment -->
    <PaymentInfo 
      v-if="isLoadend"
      :payment="project.payment"
      :basic="project.basic"
      :members="project.members"
      :other-costs="project.otherCosts"
      :editable="editable"
      @update="dataUpdate"
    />

    <!-- assign_member -->
    <AssignMemberInfo
      v-if="isLoadend"
      :members="project.members"
      :project-no="projectNo"
      :selectable-members="selectableMembers"
      :editable="editable"
      @update="arrayDataUpdate"
      @add="addArray"
      @delete="deleteArray"
      @registerWork="doOperatingRegister"
    />

    <!-- other_cost -->
    <OtherCostInfo 
      v-if="isLoadend"
      :other-costs="project.otherCosts"
      @update="arrayDataUpdate"
      :editable="editable"
      @add="addArray"
      @delete="deleteArray"
    />

    <!-- edit button -->
    <v-container 
      v-if="isViewMode"
      class="primary--text mb-8"
    >
      <v-btn 
        class="primary secondary--text d-block mx-auto"
        @click="doEdit"
      >
        {{ $t('common.edit') }}
      </v-btn>
      <v-btn 
        v-if="isEditMode"
        class="primary secondary--text d-block mx-auto"
        @click="doSave"
      >
        {{ $t('common.save') }}
      </v-btn>
    </v-container>
    <!-- register cancel button -->
    <v-container 
      v-if="isEditMode"
      class="primary--text mb-8 d-flex justify-center"
    >
      <v-btn 
        class="primary secondary--text mx-4"
        @click="doRegister"
      >
        {{ $t('common.register') }}
      </v-btn>
      <v-btn 
        class="cancel secondary--text mx-4"
        @click="doCancel"
      >
        {{ $t('common.cancel') }}
      </v-btn>
    </v-container>
      
    <!-- update_history -->
    <UpdateHistoryInfo 
      v-if="isViewMode"
      :histories="project.histories"
    />
  </v-container>
</template>
<script>
  import StatusInfo from '@/components/project/StatusInfo.vue'
  import BasicInfo from '@/components/project/BasicInfo.vue'
  import PaymentInfo from '@/components/project/PaymentInfo.vue'
  import OtherCostInfo from '@/components/project/OtherCostInfo.vue'
  import UpdateHistoryInfo from '@/components/project/UpdateHistoryInfo.vue'
  import AssignMemberInfo from '@/components/project/AssignMemberInfo.vue'
  import { get } from '@/plugins/apiHandler'

  export default {
    name: 'OrderEditView',
    components: {
    StatusInfo,
    BasicInfo,
    PaymentInfo,
    OtherCostInfo,
    UpdateHistoryInfo,
    AssignMemberInfo
    },
    props: {
      projectNo: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        editable: false,
        project: {},
        selectableMembers: [],
        selectableClients: [],
        isProjectLoaded: false,
        isSelectableMembersLoaded: false,
        isSelectableClientsLoaded: false
      }
    },
    mounted: function() {
      this.setProject();
      this.setSelectableMembers();
      this.setSelectableClients();
    },
    computed: {
      isViewMode: function() {
        return this.isLoadend && !this.editable;
      },
      isEditMode: function(){
        return this.isLoadend && this.editable;
      },
      isLoadend: function() {
        return this.isProjectLoaded 
          && this.isSelectableMembersLoaded
          && this.isSelectableClientsLoaded
      }
    },
    methods: {
      doEdit: function() {
        this.editable = true;
      },
      doRegister: function() {
        this.editable = false;
      },
      doCancel: function() {
        this.editable = false;
      },
      doOperatingRegister: function(projectNo) {
        this.$router.replace({
          name: 'orderOperatingRegister',
          params: {
            projectNo: projectNo
          }
        });
      },
      doReceive: function() {

      },
      doDelivery: function() {

      },
      doAcceptance: function() {

      },
      doPaymented: function() {

      },
      doLostOrder: function() {

      },
      doReceiveCancel: function() {

      },
      doDeliveryCancel: function() {

      },
      doAcceptanceCancel: function() {

      },
      doPaymentedCancel: function() {

      },
      doLostOrderCancel: function() {

      },
      dataUpdate: function(dict, key, value) {
        if (dict === undefined || key === undefined || value === undefined) {
          return;
        }
        if (dict[key] !== undefined) {
          dict[key] = value;
        }
      },
      arrayDataUpdate: function(dict, index, key, value) {
        if (dict === undefined 
          || index === undefined
          || key === undefined 
          || value === undefined ) {
          return;
        }
        if (dict[index][key] !== undefined) {
          dict[index][key] = value;
        }
      },
      addArray: function(array, data) {
        if (array === undefined || !Array.isArray(array)) {
          return;
        }
        array.push(data);
      },
      deleteArray: function(array, index) {
        if (array === undefined || !Array.isArray(array)) {
          return;
        }
        if (index === undefined || typeof index !== 'number') {
          return;
        }
        array.splice(index, 1);
      },
      setProject: function() {
        try {
          get('project/'+this.projectNo).then(response => {
            this.project = response.data;
          })
          .catch(err => {
            console.error(err);
            throw err;
          });
        } catch (err) {
          console.error(err);
          this.$emit('loading', false);
        }
      },
      setSelectableMembers: function() {
        try {
          get('selectablememberlist').then(response => {
            this.selectableMembers = response.data;
          })
          .catch(err => {
            console.error(err);
            throw err;
          });
        } catch (err) {
          console.error(err);
          this.$emit('loading', false);
        }
      },
      setSelectableClients: function() {
        try {
          get('selectableclientlist').then(response => {
            this.selectableClients = response.data;
            console.log(response.data);
          })
          .catch(err => {
            console.error(err);
            throw err;
          });
        } catch (err) {
          console.error(err);
          this.$emit('loading', false);
        }
      }
    },
    watch: {
      project: {
        handler() {
          this.isProjectLoaded = true
        },
        deep: true
      },
      selectableMembers: {
        handler() {
          this.isSelectableMembersLoaded = true
        },
        deep: true
      },
      selectableClients: {
        handler() {
          this.isSelectableClientsLoaded = true
        }
      },
      isLoadend: {
        handler(isLoadend) {
          if (isLoadend) {
            this.$emit('loading', false);
          }else {
            this.$emit('loading', true);
          }
        },
        immediate: true
      }
    }
  }
</script>