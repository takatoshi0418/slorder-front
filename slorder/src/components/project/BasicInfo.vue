<template>
  <v-container class="primary--text mb-8">
    <v-row>{{$t('common.basic_info')}}</v-row>
    <v-row v-if="!editable">
      <v-col class="side_header" cols="4">{{$t('common.project_no')}}</v-col>
      <v-col class="column" cols="8">
        <TextField 
          v-model="projectNo"
          :label="$t('common.project_no')"
          :max-value=16 />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="side_header" cols="4">{{$t('common.project_name')}}</v-col>
      <v-col class="column" cols="8">
        <TextField 
          v-model="projectName"
          :label="$t('common.project_name')"
          :max-value=16
          :editable=editable />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="side_header" cols="4">{{$t('common.client_name')}}</v-col>
      <v-col class="column" cols="8">
        <SelectField
          v-model="client"
          :label="$t('common.client_name')"
          :items="clientList"
          item-value="id"
          itemText="name"
          :editable=editable />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="side_header" cols="4">{{$t('common.project_start_date')}}</v-col>
      <v-col class="column" cols="8">
        <DateField 
          v-model="startDate"
          :label="$t('common.project_start_date')"
          :editable=editable />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="side_header" cols="4">{{$t('common.project_limit_date')}}</v-col>
      <v-col class="column" cols="8">
        <DateField 
          v-model="limitDate"
          :label="$t('common.project_limit_date')"
          :editable=editable />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="side_header" cols="4">{{$t('common.project_receive_amount')}}</v-col>
      <v-col class="column" cols="8">
        <NumberField 
          v-model="receiveAmount"
          :label="$t('common.project_receive_amount')"
          :unit="$t('common.currency')"
          :editable=editable />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import TextField from '@/components/Interface/TextField.vue'
  import DateField from '@/components/Interface/DateField.vue'
  import SelectField from '@/components/Interface/SelectField.vue'
  import NumberField from '@/components/Interface/NumberField.vue'
  export default {
    name: 'basicInfo',
    components: {
      TextField,
      DateField,
      SelectField,
      NumberField
    },
    props: {
      basicInfo: {
        required: true
      },
      editable: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      clientList: function() {
        return [
          {id: 1, name: 'ポメラニアン佐藤'},
          {id: 2, name: '三日月農協組合'},
          {id: 3, name: '山田商店'},
          {id: 4, name: '田中文具店'},
          {id: 5, name: 'スズキ薬局'},
          {id: 6, name: '三日月市'}
        ]
      },
      projectNo: {
        get () {
          return this.basicInfo.no;
        },
        set (value) {
          this.$emit('update', this.basicInfo, 'no', value);
        }
      },
      projectName: {
        get () {
          return this.basicInfo.name;
        },
        set (value) {
          this.$emit('update', this.basicInfo, 'name', value);
        }
      },
      client: {
        get () {
          return this.basicInfo.client;
        },
        set (value) {
          this.$emit('update', this.basicInfo, 'client', value);
        }
      },
      startDate: {
        get () {
          return this.basicInfo.startDate;
        },
        set (value) {
          this.$emit('update', this.basicInfo, 'startDate', value);
        }
      },
      limitDate: {
        get () {
          return this.basicInfo.limitDate;
        },
        set (value) {
          this.$emit('update', this.basicInfo, 'limitDate', value);
        }
      },
      receiveAmount: {
        get () {
          return this.basicInfo.receiveAmount;
        },
        set (value) {
          this.$emit('update', this.basicInfo, 'receiveAmount', value);
        }
      }
    }
  }
</script>
<style>
@import '@/assets/projectEdit.css';
</style>