<template>
  <span v-if="isEditable()">
    <ValidationProvider 
      :rules="rule"
      v-slot="{errors}" 
      :name="label">
      <v-select 
        v-model="selectValue"
        :items="items"
        :item-text="itemText"
        :item-value="itemValue"
        :error-messages="errors"
        :return-object="returnObject"
        dense />
    </ValidationProvider>
  </span>
  <span v-else-if="isEditableElse()">
    {{displayValue}}
  </span>
</template>
<script>
export default {
  name: 'selectField',
  props: {
    value: {
      required: true
    },
    label: {
      type: String,
      required: true
    },
    items: {
      required: true
    },
    itemText: {
      type: String,
      required: true
    },
    itemValue: {
      type: String,
      required: true
    },
    returnObject: {
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
      rule: 'required'
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
    selectValue: {
      get () {
        return this.value;
      },
      set (value) {
        this.$emit('input', value);
      }
    },
    displayValue: function() {
      for (let item of this.items) {
        if (item[this.itemValue] === this.value) {
          return item[this.itemText];
        }
      }
      return '';
    }
  }
}
</script>