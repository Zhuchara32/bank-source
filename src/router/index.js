import Vue from 'vue'
import VueRouter from 'vue-router'
import TheHome from '../views/TheHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: TheHome
  },
  {
    path: '/calculator',
    name: 'TheCalculator',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TheCalculator.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
