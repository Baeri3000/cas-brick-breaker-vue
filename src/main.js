import './assets/styles/main.css'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import './assets/scripts/game.js'
import {registerSW} from 'virtual:pwa-register';

const app = createApp(App)


if ('serviceWorker' in navigator) {
    registerSW();
}

app.use(router)

app.mount('#app')
