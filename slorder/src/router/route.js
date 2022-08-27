import LoginView from '@/views/LoginView.vue'
import OrderListView from '@/views/order/OrderListView.vue'
import HomeView from '@/views/HomeView.vue'
import OrderEditView from '@/views/order/OrderEditView.vue'
import OrderOperatingRegisterView from '@/views/order/OrderOperatingRegisterView.vue'
import ErrorsView from '@/views/ErrorsView.vue'

export default [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/order/list',
    name: 'orderList',
    component: OrderListView
  },
  {
    path: '/order/edit',
    name: 'orderEdit',
    component: OrderEditView,
    props: true
  },
  {
    path: '/order/operatingregister',
    name: 'orderOperatingRegister',
    component: OrderOperatingRegisterView,
    props: true
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/error',
    name: 'errors',
    component: ErrorsView,
    props: true
  },
]