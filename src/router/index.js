import Vue from 'vue'
import VueRouter from 'vue-router'
// import Library from "../views/Library.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Library',
    component: () => import('../views/Library/Index.vue'),
  },
  {
    path: '/library/:id',
    name: 'LibraryItem',
    component: () => import('../views/Library/Item.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
