import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateMode from '../views/CreateMode.vue'
import UpdateMode from '../views/UpdateMode.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Create',
    component: CreateMode
  },
  {
    path: '/update_mode',
    name: 'Update',
    component: UpdateMode
  },
  {
    path: '/read_mode',
    name: 'Read',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ReadMode.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
