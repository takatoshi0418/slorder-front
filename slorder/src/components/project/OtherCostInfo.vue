<template>
  <v-container class="primary--text mb-8">
    <v-row>
      {{$t('common.other_cost')}}
      <v-btn 
        v-if="editable"
        @click="doAddCost()"
        class="primary secondary--text d-block ml-auto mb-2">
        {{$t('common.add_new_data')}}
      </v-btn>
    </v-row>
    <v-row>
      <v-col 
        v-if="deleteVisible"
        class="header" clos="1">{{$t('common.delete')}}</v-col>
      <v-col class="header" cols="3">{{$t('common.product_name')}}</v-col>
      <v-col class="header" :cols=editModeCols>{{$t('common.kind')}}</v-col>
      <v-col class="header" cols="3">{{$t('common.buy_date')}}</v-col>
      <v-col class="header" cols="3">{{$t('common.price')}}</v-col>
    </v-row>
    <OtherCostUnit 
      v-for="(cost,index) of otherCosts" :key="index"
      :cost="cost"
      :otherCostKindList="otherCostKindList"
      :index="index"
      :editable="editable"
      :is-delete-visible="deleteVisible"
      :edit-mode-cols="editModeCols"
      v-on:update="dataUpdate"
      v-on:delete="doDeleteCost" />
  </v-container>
</template>
<script>
  import OtherCostUnit from '@/components/project/OtherCostUnit.vue'

  export default {
    name: 'otherCostInfo',
    props: {
      otherCosts: {
        required: true
      },
      editable: {
        type: Boolean,
        default: false
      }
    },
    components: {
      OtherCostUnit
    },
    computed: {
      otherCostKindList: function() {
        return [
          {id: 1, name: '機器購入費'},
          {id: 2, name: '外注費'}
        ]
      },
      deleteVisible: function() {
        return this.editable;
      },
      editModeCols: function() {
        return this.editable? 2 : 3;
      }
    },
    methods: {
      dataUpdate: function(index, key, value) {
        if (index === undefined || key === undefined || value === undefined) {
          return;
        }
        this.$emit('update', this.otherCosts, index, key, value);
      },
      doAddCost: function() {
        let data = {
          name: null,
          kind: null,
          buyDate: null,
          price: null
        }
        this.$emit('add', this.otherCosts, data);
      },
      doDeleteCost: function(index) {
        this.$emit('delete', this.otherCosts, index);
      }
    }
  }
</script>
<style>
@import '@/assets/projectEdit.css';
</style>