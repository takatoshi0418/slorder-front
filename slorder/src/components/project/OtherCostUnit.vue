<template>
  <v-row>
    <v-col 
      v-if="isDeleteVisible"
      class="column-flex-center" cols="1" >
      <v-btn 
        class="cancel secondary--text"
        @click="doDeleteCost()" >
        {{$t('common.delete')}}
      </v-btn>
    </v-col>
    <v-col class="column" cols="3" >
      <TextField 
        v-model="costName"
        :label="$t('common.product_name')"
        :max-value=16
        :editable=editable />
    </v-col>
    <v-col class="column-center" :cols=editModeCols>
      <SelectField
        v-model="costKind"
        :label="$t('common.kind')"
        :items="otherCostKindList"
        item-value="id"
        itemText="name"
        :editable=editable />
    </v-col>
    <v-col class="column-center" cols="3">
      <DateField 
        v-model="buyDate"
        :label="$t('common.buy_date')"
        :editable=editable
        :centering=true />
    </v-col>
    <v-col class="column-right" cols="3">
      <NumberField 
        v-model="price"
        :label="$t('common.price')"
        :unit="$t('common.currency')"
        :editable=editable />
    </v-col>
  </v-row>
</template>
<script>
  import TextField from '@/components/Interface/TextField.vue'
  import DateField from '@/components/Interface/DateField.vue'
  import SelectField from '@/components/Interface/SelectField.vue'
  import NumberField from '@/components/Interface/NumberField.vue'

  export default {
    name: 'otherCostUnit',
    components: {
      TextField,
      DateField,
      SelectField,
      NumberField
    },
    props: {
      cost: {
        required: true
      },
      otherCostKindList: {
        required: true
      },
      index: {
        required: true
      },
      editable: {
        type: Boolean,
        default: false
      },
      isDeleteVisible: {
        type: Boolean,
        required: true
      },
      editModeCols: {
        type: Number,
        required: true
      }
    },
    computed: {
      costName: {
        get () {
          return this.cost.name;
        },
        set (value) {
          this.$emit('update', this.index, 'name', value);
        }
      },
      costKind: {
        get () {
          return this.cost.kind;
        },
        set (value) {
          this.$emit('update', this.index, 'kind', value);
        }
      },
      buyDate: {
        get () {
          return this.cost.buyDate;
        },
        set (value) {
          this.$emit('update', this.index, 'buyDate', value);
        }
      },
      price: {
        get () {
          return this.cost.price;
        },
        set (value) {
          this.$emit('update', this.index, 'price', value);
        } 
      }
    },
    methods: {
      doDeleteCost: function() {
        this.$emit('delete', this.index);
      }
    }
  }
</script>
<style>
@import '@/assets/projectEdit.css';
</style>