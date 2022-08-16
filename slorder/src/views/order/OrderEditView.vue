<template>
  <v-container>
    <StatusInfo 
      v-if="isViewMode"
      :value="project.status" 
      :do-receive="doReceive"
      :do-delivery="doDelivery"
      :do-acceptance="doAcceptance"
      :do-peymented="doPeymented"
      :do-lost-order="doLostOrder"
      :do-receive-cancel="doReceiveCancel"
      :do-delivery-cancel="doDeliveryCancel"
      :do-acceptance-cancel="doAcceptanceCancel"
      :do-peymented-cancel="doPeymentedCancel"
      :do-lost-order-cancel="doLostOrderCancel" />

    <!-- basicInfo -->
    <BasicInfo 
      :basicInfo="project.basic"
      :editable=editable
      v-on:update="dataUpdate" />

    <!-- peyment -->
    <PaymentInfo 
      :payment="project.payment"
      :editable="editable"
      v-on:update="dataUpdate" />

    <!-- assign_menber -->
    <AssignMemberInfo
      :members="project.members"
      :editable=editable
      :do-operating-register="doOperatingRegister"
      v-on:update="arrayDataUpdate"
      v-on:add="addArray"
      v-on:delete="deleteArray" />

    <!-- onther_cost -->
    <OtherCostInfo 
      :otherCosts="project.otherCosts"
      v-on:update="arrayDataUpdate"
      :editable=editable
      v-on:add="addArray"
      v-on:delete="deleteArray" />

    <!-- edit button -->
    <v-container 
      v-if="isViewMode"
      class="primary--text mb-8">
      <v-btn 
        class="primary secondary--text d-block mx-auto"
        @click="doEdit">{{$t('common.edit')}}</v-btn>
      <v-btn 
        v-if="isEditMode"
        class="primary secondary--text d-block mx-auto"
        @click="doSave">{{$t('common.save')}}</v-btn>
    </v-container>
    <!-- register cancel button -->
    <v-container 
      v-if="isEditMode"
      class="primary--text mb-8 d-flex justify-center">
      <v-btn 
        class="primary secondary--text mx-4"
        @click="doRegister">{{$t('common.register')}}</v-btn>
      <v-btn 
        class="cancel secondary--text mx-4"
        @click="doCancel">{{$t('common.cancel')}}</v-btn>
    </v-container>
      
    <!-- update_history -->
    <UpdateHistoryInfo 
      v-if="isViewMode"
      :histories="project.histories" />
  </v-container>
</template>
<script>
  import StatusInfo from '@/components/project/StatusInfo.vue'
  import BasicInfo from '@/components/project/BasicInfo.vue'
  import PaymentInfo from '@/components/project/PaymentInfo.vue'
  import OtherCostInfo from '@/components/project/OtherCostInfo.vue'
  import UpdateHistoryInfo from '@/components/project/UpdateHistoryInfo.vue'
  import AssignMemberInfo from '@/components/project/AssignMemberInfo.vue'

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
    data() {
      return {
        editable: false,
        project: {
          status: 1,
          basic: {
            no: 'P-20220301-0002',
            name: 'ペット行動管理システム',
            client: 2,
            startDate: '2022-03-01',
            limitDate: '2022-04-30',
            receiveAmount: 20000000
          },
          payment: {
            estimate: {
              oparatingWorkByTime: 10.00,
              oparatingCost: 8640000,
              otherCost: 5400000,
              proceeds: 5496000
            },
            actual: {
              oparatingWorkByTime: 3.75,
              oparatingCost: 1435735,
              otherCost: 5400000,
              proceeds: 13164265
            }
          },
          members: [
            {value: 1, unit: 2500, oparatingTime: 150.00},
            {value: 2, unit: 4000, oparatingTime: 90.00},
            {value: 3, unit: 3500, oparatingTime: 100.01},
            {value: 4, unit: 3500, oparatingTime: 120.40}
          ],
          otherCosts: [
            {
              name: 'サーバー01',
              kind: 1,
              buyDate: '2022-03-01',
              price: 5000000
            },
            {
              name: '武田信玄',
              kind: 2,
              buyDate: '2022-03-04',
              price: 400000
            }
          ],
          histories: [
            {
              name: '受注 太郎',
              date: '2022-02-01',
              kind: 0
            },
            {
              name: '受注 太郎',
              date: '2022-02-20',
              kind: 1
            }
          ]
        }
      }
    },
    computed: {
      isViewMode: function() {
        return !this.editable;
      },
      isEditMode: function(){
        return this.editable;
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
      doOperatingRegister: function() {
        this.$router.replace({name: 'orderOperatingRegister'});
      },
      doReceive: function() {

      },
      doDelivery: function() {

      },
      doAcceptance: function() {

      },
      doPeymented: function() {

      },
      doLostOrder: function() {

      },
      doReceiveCancel: function() {

      },
      doDeliveryCancel: function() {

      },
      doAcceptanceCancel: function() {

      },
      doPeymentedCancel: function() {

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
      }
    }
}
</script>