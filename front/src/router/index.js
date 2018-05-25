import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/views/Home"
import Login from "@/components/views/Login"
import SubmitTopic from "@/components/views/SubmitTopic"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/submit',
      name: 'submitTopic',
      component: SubmitTopic
    }
  ]
})
