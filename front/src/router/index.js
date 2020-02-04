import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AppPostDetail from '../components/AppPostDetail'
import AppRegistration from '../components/AppRegistration'
import AppLogin from '../components/AppLogin'

function validateAuth () {
  let isAuth
  if (localStorage.getItem('token') !== null) {
    isAuth = true
  } else {
    isAuth = false
  }
  return isAuth
}
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    props: { isAuth: validateAuth() }
  },
  {
    path: '/postdetail/:id',
    name: 'postdetail',
    component: AppPostDetail,
    props: { isAuth: validateAuth() }
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

export default router
