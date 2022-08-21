<template>
  <v-row>
    <v-col 
      v-if="isDeassignmentVisible"
      class="column-flex-center"
      cols="2"
    >
      <v-btn 
        class="cancel secondary--text"
        @click="doLifting()"
      >
        {{ $t('common.lifting') }}
      </v-btn>
    </v-col>
    <v-col
      class="column"
      :cols="getDynamicCols"
    >
      <SelectField
        v-model="memberValue"
        :label="$t('common.member_name')"
        :items="memberList"
        item-text="name"
        item-value="no"
        :editable="editable"
      />
    </v-col>
    <v-col
      class="column-right-flex-center"
      :cols="getDynamicCols"
    >
      <NumberField
        :value="unitCost"
        :label="$t('common.unit_cost')"
        unit="/h"
        :not-space="true"
      />
    </v-col>
    <v-col 
      v-if="isOperatingTimeVisible"
      class="column-right"
      cols="4"
    >
      <NumberField
        :value="operatingTime"
        :label="$t('common.operating_time')"
        :float="true"
        unit="時間"
      />
    </v-col>
  </v-row>
</template>
<script>
import SelectField from '@/components/Interface/SelectField.vue';
import NumberField from '@/components/Interface/NumberField.vue';

  export default {
    name: 'AssignmemberInfo',
    components: {
    SelectField,
    NumberField
},
    props: {
      member: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
      memberList: {
        type: Array,
        required: true
      },
      editable: {
        type: Boolean,
        default: false
      },
      getDynamicCols: {
        type: Number,
        required: true
      },
      isOperatingTimeVisible: {
        type: Boolean,
        required: true
      },
      isDeassignmentVisible: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      memberValue: {
        get () {
          return this.member.value;
        },
        set (value) {
          this.$emit('update', this.index, 'value', value);
          this.$emit('update', this.index, 'unit', this.getUnitCost(value));
        }
      },
      unitCost:  {
        get () {
          if (this.member.unit !== undefined || this.member.unit !== 0){
            return this.member.unit;
          }
          return this.getUnitCost(this.member.value);
        }
      },
      operatingTime: {
        get () {
          if (this.member.operatingTime !== undefined || this.member.operatingTime !== 0){
            return this.member.operatingTime;
          }
          return 0;
        }
      }
    },
    methods: {
      getUnitCost: function(value) {
        for (let member of this.memberList) {
          if (member.no === value) {
            return member.unit;
          }
        }
        return 0;
      },
      doLifting: function() {
        this.$emit('lifting', this.index);
      }
    }
  }
</script>