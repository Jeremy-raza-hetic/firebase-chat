import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { $firebase, $db, $storage } from '../firebase.config';
import vClickOutside from 'v-click-outside'

Vue.config.productionTip = false
Vue.use(vClickOutside);
Vue.prototype.$firebase = $firebase;
Vue.prototype.$db = $db;
Vue.prototype.$storage = $storage

router.beforeEach((to, from, next) => {
  $firebase.auth().onAuthStateChanged(user => {
    if (user) {
      store.commit('setIsLogged', true);
      store.dispatch('getProfile');
      next()
    } else if (to.name !== 'auth' && from.name !== 'auth') {
      store.commit('setIsLogged', false);
      next('/auth/login')
    } else {
      next()
    }
  });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
