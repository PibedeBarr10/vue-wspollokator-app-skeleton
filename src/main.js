import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import store from "./store"
import router from "./router";
import { VueMaskDirective } from 'v-mask'
// import validation from './plugins/validation';


import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import apiService from "./services/api";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetinaUrl,
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
});

window.$request = apiService(store, router)

const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
    beforeMount: vMaskV2.bind,
    updated: vMaskV2.componentUpdated,
    unmounted: vMaskV2.unbind
}

const app = createApp(App)
    .directive('mask', vMaskV3)
    .use(store)
    .use(router);

// app.config.globalProperties.$rules = validation

app.mount("#app")