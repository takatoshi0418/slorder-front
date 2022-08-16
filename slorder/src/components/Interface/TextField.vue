<template>
  <span v-if="isEditable()">
    <ValidationProvider 
      :rules="rule"
      v-slot="{errors}" 
      :name="label">
      <v-text-field
        v-model="textValue"
        :error-messages="errors"
        dense />
    </ValidationProvider>
  </span>
  <span v-else-if="isEditableElse()">
    {{value}}
  </span>
</template>
<script>
export default {
  name: 'textField',
  props: {
    value: {
      required: true
    },
    label: {
      type: String,
      required: true
    },
    maxValue: {
      type: Number,
      required: true,
      validator: function(value) {
        return value > 0;
      }
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      errors: [],
      rule: 'required|max:' + this.maxValue
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
    }
  }
}
</script>