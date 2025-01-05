import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '../views/Index.vue'
import GoodsType from '../views/GoodsType.vue'
import Goods from '../views/Goods.vue'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue'
import Settlement from '../views/Settlement.vue'
import Payment from '../views/Payment.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Index
  },{
    path: '/index',
    name: 'Index',
    component: Index
  },{
    path: '/goodsType',
    name: 'GoodsType',
    component: GoodsType
  },{
    path: '/goods',
    name: 'Goods',
    component: Goods
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/cart',
    name: 'Cart',
    component: Cart
  },{
    path: '/settlement',
    name: 'Settlement',
    component: Settlement
  },{
    path: '/payment',
    name: 'Payment',
    component: Payment
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router