import { createApp } from 'vue'

import App from './App.vue'
import './style.css'
import router from './router'

import keycloak from './security/keycloak-config'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// SweetAlert2
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// Animate CSS
import 'animate.css';

// Vue3EasyDataTable
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const vuetify = createVuetify({
  components,
  directives
})

keycloak
  .init({
    // onLoad: 'login-required',
    onLoad:'check-sso',
    // checkLoginIframe: false
  })
  .then(() => {
    const app = createApp(App)
    app.use(router)
    app.use(vuetify)
    app.use(VueSweetalert2)
    app.component('EasyDataTable', Vue3EasyDataTable);
    app.mount('#app')
  })
  .catch((e) => {
    console.log('Serwer lezy: ' + JSON.stringify(e))
  })
