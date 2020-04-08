import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('fangchan');
  }
  if (to.path == '/index') {
    sessionStorage.removeItem('index');
  }
  // if (!user && !(to.path == '/login' || to.path == '/register')){next({ path: '/login' })}

  // var res;
  // res=confirm("还未登录，请前往登录！");
  // if(res==true)
  //   next({ path: '/login' })
  // else
  //   next({ path: '/index' })


  let user = JSON.parse(sessionStorage.getItem('user'));
  let index = JSON.parse(sessionStorage.getItem('index'));
  if (!index && to.path !='/index') {
    next({ path: '/index' })
  }else {
    if (!user && !(to.path == '/login' || to.path == '/register' || to.path == '/index')){
      var res;
      res=confirm("还未登录，请前往登录！");
      if(res==true)
        next({ path: '/login' })
      else
        next({ path: '/index' })
    }else{
      next()
    } 
  }
})

// router.afterEach(transition => {
// NProgress.done();
// });
// 全局获取缓存数据
Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'watchStorage') {

      // 创建一个StorageEvent事件
      var newStorageEvent = document.createEvent('StorageEvent');
      const storage = {
          setItem: function (k, val) {
              sessionStorage.setItem(k, val);

              // 初始化创建的事件
              newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

              // 派发对象
              window.dispatchEvent(newStorageEvent)
          }
      }
      return storage.setItem(key, newVal);
  }
},
new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

