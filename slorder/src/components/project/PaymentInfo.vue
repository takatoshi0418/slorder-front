<template>
  <v-container class="primary--text mb-8">
    <v-row>{{ $t('common.payment') }}</v-row>
    <v-row>
      <v-col
        class="header"
        cols="2"
      />
      <v-col
        class="header"
        :cols="getCols"
      >
        {{ $t('common.estimate_data') }}
      </v-col>
      <v-col
        v-if="isVisible"
        class="header"
        cols="5"
      >
        {{ $t('common.actual_data') }}
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="side_header"
        cols="2"
      >
        {{ $t('common.operating_work_by_time') }}
      </v-col>
      <v-col
        class="column-left"
        cols="getCols"
      >
        <NumberField 
          v-model="estimateOperatingWorkByTime"
          :label="$t('common.operating_work_by_time')"
          :unit="$t('common.working_man_hours_unit')"
          :float="true"
          :editable="editable"
        />
      </v-col>
      <v-col
        v-if="isVisible"
        class="column-left"
        cols="5"
      >
        <NumberField 
          v-model="actualOperatingWorkByTime"
          :label="$t('common.operating_work_by_time')"
          :unit="$t('common.working_man_hours_unit')"
          :float="true"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="side_header"
        cols="2"
      >
        {{ $t('common.operating_cost') }}
      </v-col>
      <v-col
        class="column-left"
        cols="getCols"
      >
        <NumberField 
          v-model="estimateOperatingCost"
          :label="$t('common.operating_cost')"
          :unit="$t('common.currency')"
        />
      </v-col>
      <v-col
        v-if="isVisible"
        class="column-left"
        cols="5"
      >
        <NumberField 
          v-model="actualOperatingCost"
          :label="$t('common.operating_cost')"
          :unit="$t('common.currency')"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="side_header"
        cols="2"
      >
        {{ $t('common.other_cost') }}
      </v-col>
      <v-col
        class="column-left"
        cols="getCols"
      >
        <NumberField 
          v-model="estimateOtherCost"
          :label="$t('common.other_cost')"
          :unit="$t('common.currency')"
        />
      </v-col>
      <v-col
        v-if="isVisible"
        class="column-left"
        cols="5"
      >
        <NumberField 
          v-model="actualOtherCost"
          :label="$t('common.other_cost')"
          :unit="$t('common.currency')"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="side_header"
        cols="2"
      >
        {{ $t('common.proceeds') }}
      </v-col>
      <v-col
        :class="'column-left '+getDeficitClass(estimateProceeds)"
        cols="getCols"
      >
        <NumberField 
          v-model="estimateProceeds"
          :label="$t('common.proceeds')"
          :unit="$t('common.currency')"
        />
      </v-col>
      <v-col
        v-if="isVisible"
        :class="'column-left '+getDeficitClass(actualProceeds)"
        cols="5"
      >
        <NumberField 
          v-model="actualProceeds"
          :label="$t('common.proceeds')"
          :unit="$t('common.currency')"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import NumberField from '@/components/Interface/NumberField.vue'
  import { dateUtil } from '@/plugins/utilities';

  export default {
    name: 'PaymentInfo',
    components: {
      NumberField,
    },
    props: {
      payment: {
        type: Object,
        required: true
      },
      basic: {
        type: Object,
        required: true
      },
      members: {
        type: Array,
        required: true
      },
      otherCosts: {
        type: Array,
        required: true
      },
      editable: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      estimateOperatingWorkByTime: {
        get () {
          let db = this.payment.operatingWorkByTime;
          if (db !== null) {
            return db;
          }
          let startDate = this.basic.startDate;
          let limitDate = this.basic.limitDate;
          if (!startDate || !limitDate) {
            return 0;
          }
          
          let time = dateUtil.getBetweenHours(startDate, limitDate);
          console.log(time / 24 / 20);
          return Number.parseInt(time / 24 / 20 * this.members.length).toFixed(2)
        },
        set (value) {
          this.$emit('update', this.payment.estimate, 'operatingWorkByTime', value);
        }
      },
      estimateOperatingCost: {
        get () {
          let db = this.payment.operatingCost;
          if (db !== null) {
            return db;
          }
          let startDate = this.basic.startDate;
          let limitDate = this.basic.limitDate;
          if (!startDate || !limitDate) {
            return 0;
          }

          var cost = 0;
          let weekdayCnt = dateUtil.getWeekdays(startDate, limitDate);
          console.log("仕事："+weekdayCnt);
          for (let member of this.members) {
            cost = cost + member.unit * weekdayCnt * 8;
          }
          return cost;
        }
      },
      estimateOtherCost: {
        get () {
          let db = this.payment.otherCost
          if (db !== null) {
            return db;
          }
          let cost = 0;
          for (let otherCost of this.otherCosts) {
            cost = cost + otherCost.price;
          }
          return cost;
        }
      },
      estimateProceeds: {
        get () {
          let sales = this.basic.receiveAmount;
          if (!sales) {
            sales = 0;
          }
          return sales - (this.estimateOperatingCost + this.estimateOtherCost);
        }
      },
      actualOperatingWorkByTime: {
        get () {
          let workTime = Number(0);
          for (let member of this.members) {
            workTime = workTime + Number.parseFloat((member.operatingTime/(8*20)))
          }
          console.log(workTime)
          return workTime.toFixed(2);
        }
      },
      actualOperatingCost: {
        get () {
          let cost = 0;
          for (let member of this.members) {
            cost = cost + (member.operatingTime * member.unit);
          }
          return cost;
        }
      },
      actualOtherCost: {
        get () {
          let cost = 0;
          for (let otherCost of this.otherCosts) {
            cost = cost + otherCost.price;
          }
          return cost;
        }
      },
      actualProceeds: {
        get () {
          let sales = this.basic.receiveAmount;
          if (!sales) {
            sales = 0;
          }
          return sales - (this.actualOperatingCost + this.actualOtherCost);
        }
      },
      getCols: function() {
        return this.editable? 10 : 5;
      },
      isVisible: function() {
        return !this.editable;
      }
    },
    methods: {
      getDeficitClass: function(num) {
        if (num < 0) {
          return 'deficit--text';
        }
        return '';
      }
    }
  }
</script>
<style>
@import '@/assets/projectEdit.css';
</style>