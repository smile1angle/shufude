import VueLuckyCanvas from '@lucky-canvas/vue';
import 'vant/lib/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

const app = createApp(App)
app.use(router).use(VueLuckyCanvas)
app.mount('#app')