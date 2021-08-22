import Vue from 'vue'
import VueRouter from 'vue-router'

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
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
