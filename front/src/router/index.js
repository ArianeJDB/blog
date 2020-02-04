import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AppPostDetail from '../components/AppPostDetail'
import AppRegistration from '../components/AppRegistration'
import AppLogin from '../components/AppLogin'

Vue.use(VueRouter)
const isAuth = Home.methods.validateAuth()
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/postdetail/:id',
    name: 'postdetail',
    component: AppPostDetail,
    props: { isAuth: isAuth }
  },
  {
    path: '/registration',
    name: 'registration',
    component: AppRegistration
  },
  {
    path: '/login',
    name: 'login',
    component: AppLogin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (isAuth) next('/login')
//   else next()
// }
// )

export default router
