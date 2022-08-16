import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import veeValidate from '@/plugins/veeValidate'
import VueI18n from 'vue-i18n';
import ja from '@/assets/vue-I18n/ja.json'

Vue.config.productionTip = false

Vue.use(VueI18n);

const i18n =  new VueI18n({
  locale: 'ja',
  messages: {
    ja: ja
  }
});

// project initialize
Vue.prototype.$projectStatus = [
  {id: 1, value: 'estimation', label: i18n.tc('project_status.estimation'), checked: true},
  {id: 2, value: 'received', label: i18n.tc('project_status.received'), checked: true},
  {id: 3, value: 'delivered', label: i18n.tc('project_status.delivered'), checked: true},
  {id: 4, value: 'acceptanced', label: i18n.tc('project_status.acceptanced'), checked: true},
  {id: 5, value: 'paymented', label: i18n.tc('project_status.paymented'), checked: false},
  {id: 6, value: 'lostOrder', label: i18n.tc('project_status.lost_order'), checked: false}
];
Vue.prototype.$getProjectStatus = function(value) {
  for (let status of Vue.prototype.$projectStatus) {
    if (status.value === value) {
      return status;
    }
  }
}

Vue.prototype.$projectHistoryKinds = [
  {id: 0, label: i18n.tc('common.new_create')},
  {id: 1, label: i18n.tc('common.receive')},
  {id: 2, label: i18n.tc('common.delivery')},
  {id: 3, label: i18n.tc('common.acceptance')},
  {id: 4, label: i18n.tc('common.peymented')},
  {id: 5, label: i18n.tc('common.lost_order')},
  {id: 6, label: i18n.tc('common.receive_cancel')},
  {id: 7, label: i18n.tc('common.delivery_cancel')},
  {id: 8, label: i18n.tc('common.acceptance_cancel')},
  {id: 9, label: i18n.tc('common.lost_order_cancel')}
]

new Vue({
  router,
  store,
  vuetify,
  veeValidate,
  i18n,
  render: h => h(App)
}).$mount('#app')
