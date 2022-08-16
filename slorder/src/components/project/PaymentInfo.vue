<template>
  <v-container class="primary--text mb-8">
    <v-row>{{$t('common.peyment')}}</v-row>
    <v-row>
      <v-col class="header" cols="2" />
      <v-col class="header" :cols=getCols>{{$t('common.estimate_data')}}</v-col>
      <v-col v-if="isVisible" class="header" cols="5">{{$t('common.actual_data')}}</v-col>
    </v-row>
    <v-row>
      <v-col class="side_header" cols="2" >{{$t('common.oparating_work_by_time')}}</v-col>
      <v-col class="column-left" cols=getCols>
        <NumberField 
          v-model="estimateOparatingWorkByTime"
          :label="$t('common.oparating_work_by_time')"
          :unit="$t('common.working_man_hours_unit')"
          :float=true
          :editable=editable />
      </v-col>
      <v-col v-if="isVisible" class="column-left" cols="5">
        <NumberField 
          v-model="actualOparatingWorkByTime"
          :label="$t('common.oparating_work_by_time')"
          :unit="$t('common.working_man_hours_unit')"
          :float=true
          :editable=editable />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="side_header" cols="2" >{{$t('common.oparating_cost')}}</v-col>
      <v-col class="column-left" cols=getCols>
        <NumberField 
          v-model="estimateOparatingCost"
          :label="$t('common.oparating_cost')"
          :unit="$t('common.currency')"
          :editable=editable />
      </v-col>
      <v-col v-if="isVisible" class="column-left" cols="5">
        <NumberField 
          v-model="actualOparatingCost"
          :label="$t('common.oparating_cost')"
          :unit="$t('common.currency')"
          :editable=editable />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="side_header" cols="2" >{{$t('common.other_cost')}}</v-col>
      <v-col class="column-left" cols=getCols>
        <NumberField 
          v-model="estimateOtherCost"
          :label="$t('common.other_cost')"
          :unit="$t('common.currency')"
          :editable=editable />
      </v-col>
      <v-col v-if="isVisible" class="column-left" cols="5">
        <NumberField 
          v-model="actualOtherCost"
          :label="$t('common.other_cost')"
          :unit="$t('common.currency')"
          :editable=editable />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="side_header" cols="2" >{{$t('common.proceeds')}}</v-col>
      <v-col class="column-left" cols=getCols>
        <NumberField 
          v-model="estimateProceeds"
          :label="$t('common.proceeds')"
          :unit="$t('common.currency')"
          :editable=editable />
      </v-col>
      <v-col v-if="isVisible" class="column-left" cols="5">
        <NumberField 
          v-model="actualProceeds"
          :label="$t('common.proceeds')"
          :unit="$t('common.currency')"
          :editable=editable />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import NumberField from '@/components/Interface/NumberField.vue'

  export default {
    name: 'paymentInfo',
    components: {
      NumberField,
    },
    props: {
      payment: {
        required: true
      },
      editable: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      estimateOparatingWorkByTime: {
        get () {
          return this.payment.estimate.oparatingWorkByTime;
        },
        set (value) {
          this.$emit('update', this.payment.estimate, 'oparatingWorkByTime', value);
        }
      },
      estimateOparatingCost: {
        get () {
          return this.payment.estimate.oparatingCost
        },
        set (value) {
          this.$emit('update', this.payment.estimate, 'oparatingCost', value);
        }
      },
      estimateOtherCost: {
        get () {
          return this.payment.estimate.otherCost
        },
        set (value) {
          this.$emit('update', this.payment.estimate, 'otherCost', value);
        }
      },
      estimateProceeds: {
        get () {
          return this.payment.estimate.proceeds
        },
        set (value) {
          this.$emit('update', this.payment.estimate, 'proceeds', value);
        }
      },
      actualOparatingWorkByTime: {
        get () {
          return this.payment.estimate.oparatingWorkByTime;
        },
        set (value) {
          this.$emit('update', this.payment.estimate, 'oparatingWorkByTime', value);
        }
      },
      actualOparatingCost: {
        get () {
          return this.payment.actual.oparatingCost
        },
        set (value) {
          this.$emit('update', this.payment.actual, 'oparatingCost', value);
        }
      },
      actualOtherCost: {
        get () {
          return this.payment.actual.otherCost
        },
        set (value) {
          this.$emit('update', this.payment.actual, 'otherCost', value);
        }
      },
      actualProceeds: {
        get () {
          return this.payment.actual.proceeds
        },
        set (value) {
          this.$emit('update', this.payment.actual, 'proceeds', value);
        }
      },
      getCols: function() {
        return this.editable? 10 : 5;
      },
      isVisible: function() {
        return !this.editable;
      }
    }
  }
</script>
<style>
@import '@/assets/projectEdit.css';
</style>