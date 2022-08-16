<template>
  <v-container class="primary--text mb-8">
    <v-row>
      <v-col cols="1" class="header">{{$t('common.status')}}</v-col>
      <v-col cols="1" class="column-flex-center">{{status}}</v-col>
      <v-col cols="10">
        <span v-if="ReceiveVisible">
          <v-btn @click="doReceive" class="primary secondary--text mx-2">{{$t('common.receive')}}</v-btn>
        </span>
        <span v-if="DeliveryVisible">
          <v-btn @click="doDelivery" class="primary secondary--text mx-2">{{$t('common.delivery')}}</v-btn>
        </span>
        <span v-if="AcceptanceVisible">
          <v-btn @click="doAcceptance" class="primary secondary--text mx-2">{{$t('common.acceptance')}}</v-btn>
        </span>
        <span v-if="PeymentedVisible">
          <v-btn @click="doPeymented" class="primary secondary--text mx-2">{{$t('common.peymented')}}</v-btn>
        </span>
        <span v-if="LostOrderVisible">
          <v-btn @click="doLostOrder" class="cancel secondary--text mx-2">{{$t('common.lost_order')}}</v-btn>
        </span>
        <span v-if="ReceiveCancelVisible">
          <v-btn @click="doReceiveCancel" class="cancel secondary--text mx-2">{{$t('common.receive_cancel')}}</v-btn>
        </span>
        <span v-if="DeliveryCancelVisible">
          <v-btn @click="doDeliveryCancel" class="cancel secondary--text mx-2">{{$t('common.delivery_cancel')}}</v-btn>
        </span>
        <span v-if="AcceptanceCancelVisible">
          <v-btn @click="doAcceptanceCancel" class="cancel secondary--text mx-2">{{$t('common.acceptance_cancel')}}</v-btn>
        </span>
        <span v-if="PeymentedCancelVisible">
          <v-btn @click="doPeymentedCancel" class="cancel secondary--text mx-2">{{$t('common.peymented_cancel')}}</v-btn>
        </span>
        <span v-if="LostOrderCancelVisible">
          <v-btn @click="doLostOrderCancel" class="cancel secondary--text mx-2">{{$t('common.lost_order_cancel')}}</v-btn>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    name: 'statusInfo',
    props: {
      value: {
        required: true
      },
      doReceive: {
        type: Function,
        required: true
      },
      doDelivery: {
        type: Function,
        required: true
      },
      doAcceptance: {
        type: Function,
        required: true
      },
      doPeymented: {
        type: Function,
        required: true
      },
      doLostOrder: {
        type: Function,
        required: true
      },
      doReceiveCancel: {
        type: Function,
        required: true
      },
      doDeliveryCancel: {
        type: Function,
        required: true
      },
      doAcceptanceCancel: {
        type: Function,
        required: true
      },
      doPeymentedCancel: {
        type: Function,
        required: true
      },
      doLostOrderCancel: {
        type: Function,
        required: true
      }
    },
    computed: {
      status : function() {
        for (let state of this.$projectStatus) {
          if (this.value === state.id) {
            return state.label;
          }
        }
        return '';
      },
      ReceiveVisible: function() {
        return this.$getProjectStatus('estimation').id === this.value
      },
      DeliveryVisible: function() {
        return this.$getProjectStatus('received').id === this.value
      },
      AcceptanceVisible: function() {
        return this.$getProjectStatus('delivered').id === this.value
      },
      PeymentedVisible: function() {
        return this.$getProjectStatus('acceptanced').id === this.value
      },
      LostOrderVisible: function() {
        return this.$getProjectStatus('estimation').id === this.value
          || this.$getProjectStatus('received').id === this.value
      },
      ReceiveCancelVisible: function() {
        return this.$getProjectStatus('received').id === this.value
      },
      DeliveryCancelVisible: function() {
        return this.$getProjectStatus('delivered').id === this.value
      },
      AcceptanceCancelVisible: function() {
        return this.$getProjectStatus('acceptanced').id === this.value
      },
      PeymentedCancelVisible: function() {
        return this.$getProjectStatus('paymented').id === this.value
      },
      LostOrderCancelVisible: function() {
        return this.$getProjectStatus('lostOrder').id === this.value
      }
    }
  }
</script>
<style>
@import '@/assets/projectEdit.css';
</style>