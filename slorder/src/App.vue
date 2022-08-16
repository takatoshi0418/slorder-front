<template>
  <v-app>
    <v-app-bar app flat clipped-left color="secondary" :class="getAppberClass">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up" />
      <v-toolbar-title class="text-h3 primary--text font-weight-bold">
        {{$t('common.system_name')}}
      </v-toolbar-title>
      <v-spacer />
      <usermenuVue />
    </v-app-bar>

    <!-- ナビゲーションメニュー -->
    <v-navigation-drawer app
      v-model="drawer"
      floating
      color="primary"
      clipped
      :permanent="isPermanent">
      <v-list-item-group
        v-model="group"
        mandatory
        active-class="secondary">
        <v-list-item 
          v-for="navi of naviMenus"
          :key="navi.index"
          v-slot="{active}"
          @click="moveMenu(navi.name)"
          class="py-4 ">
          <v-list-item-title 
            :class="active? 'primary--text' : 'secondary--text'">
            {{navi.label}}
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
      <v-list-group class="hidden-md-and-up">
          <template v-slot:activator>
            <v-list-item-title class="secondary--text">受注太郎</v-list-item-title>
          </template>
            <v-list-item class="secondary--text">{{$t('common.logout')}}</v-list-item>
      </v-list-group>
    </v-navigation-drawer>

    <v-main class="secondary">
      <v-container fluid class="px-5">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import usermenuVue from './components/flame/UserMenu.vue';

export default {
  name: 'App',
  data: function() {
    return {
      drawer: false,
      naviMenus: this.getMenus(),
      group: this.getCurrentMenu()
    }
  },
  methods: {
    moveMenu: function(name) {
      if (name !== this.$route.name) {
        this.$router.replace({name: name})
      }
    },
    getCurrentMenu: function() {
      for (let menu of this.getMenus()) {
        if (menu.name === this.$route.name) {
          return menu.id
        }
      }
      return 0;
    },
    getMenus: function() {
      return [
        {id: 0, name: 'home', label: this.$t('menu.home')},
        {id: 1, name: 'orderList', label: this.$t('menu.project')},
        {id: 2, name: 'home', label: this.$t('menu.client')},
        {id: 3, name: 'home', label: this.$t('menu.menber')},
        {id: 4, name: 'home', label: this.$t('menu.payment_report')},
      ];
    }
  },
  computed: {
    isPermanent: function() {
      return !this.$vuetify.breakpoint.mobile
    },
    getAppberClass: function() {
      if (this.$vuetify.breakpoint.mobile) {
        return 'pr-12 pl-3'
      }
      return 'px-12'
    }
  },
  components: {
    usermenuVue
  }
};
</script>