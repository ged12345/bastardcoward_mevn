import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

Vue.component(
  'acactiontype',
  require('./components/ActionTypeAutocomplete.vue')
)
Vue.component('overviewmenu', require('./components/OverviewMenu.vue'))
