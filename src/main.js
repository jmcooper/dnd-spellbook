import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GoogleAuth from 'vue-google-auth'

import './assets/main.scss'

Vue.config.productionTip = false

Vue.use(GoogleAuth, { client_id: '127377889999-ac2on7k18id7k3h1ia0fnfk1l0a9gkgt.apps.googleusercontent.com' })
Vue.googleAuth().directAccess()
Vue.googleAuth().load()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
