import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home'
import Common from 'components/common'
import Guide from 'components/guide'
import VidoeList from 'components/video-list'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/animation',
      component: Guide,
      children:[
        {
          path:':id',
          component:VidoeList
        }
      ]
    },
    {
      path:'/drama',
      component: Guide,
      children:[
        {
          path:':id',
          component:VidoeList
        }
      ]
    }
  ]
})
