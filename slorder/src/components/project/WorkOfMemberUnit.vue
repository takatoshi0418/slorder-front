<template>
  <v-row>
    <v-col
      class="column-left-flex-center"
      cols="8"
    >
      {{ name }}
    </v-col>
    <v-col
      class="column"
      cols="4"
    >
      <TimeField 
        v-model="time"
        label=""
        editable
        solo
      />
    </v-col>
  </v-row>
</template>
<script>
  import TimeField from '@/components/Interface/TimeField.vue'
  export default {
    name: 'WorkOfMemberUnit',
    props: {
      projectMember: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },
    computed: {
      name: {
        get() {
          return this.projectMember.name;
        },
      },
      time: {
        get() {
          let workStr = Number.parseInt(this.projectMember.work.workTime / 60).toString() + ':'
            + ('00' + Number.parseInt(this.projectMember.work.workTime % 60).toString()).slice(-2);
          return workStr
        },
        set(value) {
          let spritTimes = value.split(':');
          let workTime = (Number.parseInt(spritTimes[0]) * 60) + Number.parseInt(spritTimes[1]);
          this.$emit('update', this.index, 'work', "workTime", workTime);
        }
      }
    },
    components: {
      TimeField
    }
  }
</script>