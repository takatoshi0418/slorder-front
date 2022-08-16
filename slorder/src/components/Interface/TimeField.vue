<template>
  <span v-if="isEditable()">
    <v-menu
      ref="timePicker"
      v-model="timePicker"
      :close-on-content-click=false
      :return-value.sync="selectTime"
      min-width="auto"
      offset-y>
      <template v-slot:activator="{ on, attrs }">
        <ValidationProvider 
          :rules="rule"
          v-slot="{errors}" 
          :name="label">
          <v-text-field
            v-model="timeValue"
            :error-messages="errors"
            dense
            readonly
            :solo=solo
            v-bind="attrs"
            v-on="on" />
        </ValidationProvider>
      </template>
      <v-time-picker
        v-model="selectTime"
        @click:minute="$refs.timePicker.save(selectTime)
        timePicker = false"
        format="24hr"
        scrollable />
    </v-menu>
  </span>
  <span v-else-if="isEditableElse()">
    {{value}}
  </span>
</template>
<script>

export default {
  name: 'timeField',
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
    }
  },
  data: function() {
    return {
      errors: [],
      rule: 'required',
      timePicker: false,
      selectTime: this.value
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
    timeValue: {
      get () {
        return this.value;
      },
      set (value) {
        this.$emit('input', value);
      }
    }
  },
  watch: {
    selectTime: {
      handler: function(value) {
        this.timeValue = value;
      },
      deep: true
    }
  }
}
</script>