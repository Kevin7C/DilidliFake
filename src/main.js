// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
import vConsole from 'vconsole'

// require('./mock.js');

import 'common/css/reset.scss'
import 'common/css/variable.scss'
Vue.config.productionTip = false;
fastclick.attach(document.body);

Vue.use(vueLazyLoad);

router.beforeEach((to,from,next)=>{
  console.log("beforeEach");
  next();
});
router.afterEach((to,from)=>{
  console.log("afterEach");
});

/* eslint-disable no-new */
var ttt=new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

console.info("test",ttt);
// console.info("tttt",typeof Vue);
