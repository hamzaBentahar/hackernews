import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/views/Home"
import Login from "@/components/views/Login"
import SubmitTopic from "@/components/views/SubmitTopic"
import Topic from "@/components/views/Topic"

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Login',
      name: 'login',
      component: Login,
      meta: {
        isNotAuthenticated: true
      }
    },
    {
      path: '/submit',
      name: 'submitTopic',
      component: SubmitTopic,
      meta: {
        isAuthenticated: true
      }
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component: Topic,
      props: true
    }
  ]
})
