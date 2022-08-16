<template>
  <span v-if="isEditable()">
    <v-menu
      ref="datePicker"
      v-model="datePicker"
      :close-on-content-click=false
      :return-value.sync="selectDate"
      min-width="auto"
      offset-y>
      <template v-slot:activator="{ on, attrs }">
        <ValidationProvider 
          :rules="rule"
          v-slot="{errors}" 
          :name="label">
          <v-text-field
            :class="centeringCss"
            v-model="dateValue"
            :error-messages="errors"
            dense
            readonly
            :solo=solo
            v-bind="attrs"
            v-on="on" />
        </ValidationProvider>
      </template>
      <v-date-picker
        locale="jp-ja"
        v-model="selectDate"
        @input="$refs.datePicker.save(selectDate)
        menu = false" />
    </v-menu>
  </span>
  <span v-else-if="isEditableElse()">
    {{value}}
  </span>
</template>
<script>

export default {
  name: 'dateField',
  props: {
    value: {
      required: true
    },
    label: {
      type: String,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    },
    solo: {
      type: Boolean,
      default: false
    },
    centering: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      errors: [],
      rule: 'required',
      datePicker: false,
      selectDate: this.value
    }
  },
  methods: {
    isEditable: function(){
      return this.editable;
    },
    isEditableElse: function() {
      return !this.editable;
    }
  },
  computed: {
    dateValue: {
      get () {
        return this.value;
      },
      set (value) {
        this.$emit('input', value);
      }
    },
    centeringCss: function() {
      return this.centering? 'input-centering' : ''
    }
  },
  watch: {
    selectDate: function() {
      this.dateValue = this.selectDate;
    }
  }
}
</script>
<style>
.input-centering input {
  text-align: center;
}
</style>