<template>
  <v-menu 
    close-on-click
    offset-y 
    open-on-hover 
    rounded="b-lg">
    <template v-slot:activator="{attrs, on}">
      <v-btn
        color="primary"
        large
        shaped
        v-bind="attrs"
        v-on="on"
        class="hidden-sm-and-down">
        {{username}}
        <v-icon class="ml-10">mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="logout()">
        <v-list-item-title>{{$t('common.logout')}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script>
  export default {
    name: 'UserMenu',
    data: function() {
      return {
        username: '受注太郎'
      }
    },
    methods: {
      logout: function() {
        this.$router.replace({name: 'login'})
      }
    }
  }
</script>