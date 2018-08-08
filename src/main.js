// 引用 vue 没什么要说的
import Vue from 'vue'
// 引用路由
import VueRouter from 'vue-router'
// 光引用不成，还得使用
Vue.use(VueRouter);
// 入口文件为 src/App.vue 文件 所以要引用
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
// 引用路由配置文件
import routes from './config/routes'
// 引用移动端适配方案
import 'lib-flexible'
// 使用配置文件规则
const router = new VueRouter({
  routes,

});
// router.beforeEach((to, from, next) => {
//   if (to.matched.length ===0) {  //如果未匹配到路由
//     console.log( from.path)
//     from.path ?  next({to}) : next('/');   
//     //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
//   } else {
//     next();                                                                            
//     //如果匹配到正确跳转
//   }
// });
// 跑起来吧
new Vue({
  router,
  el: '#app',
  render: (h) => h(App)
});
