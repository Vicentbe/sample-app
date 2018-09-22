import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps"

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCwgrL1hJAB-hFrSasgyLbErTalu_x1sw0",
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
