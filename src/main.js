import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps"

Vue.use(VueGoogleMaps, {
  load: {
    key: "YOUR API KEY HERE",
    libraries: "places" // necessary for places input
  }
});

new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
})

new Vue({
  el: '#app',
  render: h => h(App)
})
