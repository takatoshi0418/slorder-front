<template>
  <span v-if="isEditable()">
    <ValidationProvider 
      :rules="rule"
      v-slot="{errors}" 
      :name="label">
      <v-text-field
        v-model="textValue"
        :error-messages="errors"
        :suffix="suffix"
        dense />
    </ValidationProvider>
  </span>
  <span v-else-if="isEditableElse()">
    {{displayString}}
  </span>
</template>
<script>

export default {
  name: 'numberField',
  props: {
    value: {
      required: true
    },
    label: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      require: true
    },
    notSpace: {
      type: Boolean,
      default: false
    },
    float: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      errors: [],
      rule: 'required|integer'
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
    textValue: {
      get () {
        return this.value;
      },
      set (value) {
        this.$emit('input', value);
      }
    },
    suffix: function() {
      return (this.notSpace? '': ' ') + this.unit;
    },
    displayString: function() {
      let number = Number.parseFloat(this.value);
      let fractionDigits = 0
      if (this.float) {
        fractionDigits = 2;
      } 
      return number.toLocaleString('ja-JP',{minimumFractionDigits:fractionDigits}) + this.suffix;
    }
  }
}
</script>