import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import "./registerServiceWorker";
import "vue-head";

// START:: IMPORTING VUE ROUTER & VUEX
import router from "./router";
import store from "./store";
// END:: IMPORTING VUE ROUTER & VUEX

// START:: IMPORTING I18N
import i18n from "./i18n";
// END:: IMPORTING I18N

// START:: IMPORTING VUE META
import VueMeta from "vue-meta";
// END:: IMPORTING VUE META

// START:: SET APP LANG  & THEME
store.dispatch("AppLangModule/handelAppDefaultLanguage");
store.dispatch("AppThemeModule/handelAppDefaultTheme");
// END:: SET APP LANG  & THEME

// ========  START:: AXIOS
import axios from "axios";
Vue.prototype.$axios = axios;

// **** CONSTS
const USER_TOKEN =
    store.getters["AuthenticationModule/getAuthenticatedUserData"].token;
const CURRENT_LANG = store.getters["AppLangModule/getAppLocale"];

// Global headers
// axios.defaults.baseURL = "https://khlod.aait-d.com/saudi_marsheeh/public/api/";
axios.defaults.baseURL = "https://arabfor.sa/arabFor/public/api/";
// axios.defaults.baseURL = "https://arabfor.sa/saudi_marsheeh/public/api/";
// axios.defaults.baseURL = "https://localhost:8000/api";
axios.defaults.headers.common["cache-control"] = "no-cache";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Accept-language"] = CURRENT_LANG;

// Set Token If Exists
if (USER_TOKEN) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + USER_TOKEN;
}
// ========  END:: AXIOS

// START:: IMPORTING VUE GOOGLE MAPS
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyC2MTR_vRbsbQQRPt5f5ZLCvvaKOpzkzlA",
        libraries: "places",
    },
});
// END:: IMPORTING VUE GOOGLE MAPS

// START:: IMPORTING VUE SPLIDE SLIDER
import VueSplide from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
// END:: IMPORTING VUE SPLIDE SLIDER

// START:: IMPORTING MAIN SASS STYLES FILE
import "./assets/sass/main.scss";
// END:: IMPORTING MAIN SASS STYLES FILE

// START:: IMPORTING BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// END:: IMPORTING BOOTSTRAP

// START:: IMPORTING VUETIFY
import vuetify from "./plugins/vuetify";
// START:: IMPORTING VUETIFY

// START:: IMPORTING ANT-DESIGN
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.config.productionTip = false;
// END:: IMPORTING ANT-DESIGN

// START:: IMPORTING LAZY LOAD
import VueLazyload from "vue-lazyload";
import loaderGIF from "./assets/media/images/Loading_icon.gif";

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: loaderGIF,
    loading: loaderGIF,
    attempt: 1,
});
// END:: IMPORTING LAZY LOAD

// START:: IMPORTING ZOOM HOVER
import ZoomOnHover from "vue-zoom-on-hover";
Vue.use(ZoomOnHover);
// END:: IMPORTING ZOOM HOVER

// START:: IMPORTING VUE-SELECT
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
// END:: IMPORTING VUE-SELECT

// START:: IMPORTING FONT AWESOME
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
// END:: IMPORTING FONT AWESOME

// START:: IMPORTING IZI TOAST
import iziToast from "izitoast";
import "./assets/css/iziToast.min.css";
// END:: IMPORTING IZI TOAST

// START:: IMPORTING AOS
import AOS from "aos";
import "aos/dist/aos.css";
// END:: IMPORTING AOS

// START:: IMPORTING CHAT SCROLL
import VueChatScroll from "vue-chat-scroll";
// END:: IMPORTING CHAT SCROLL

// START:: IMPORTING SOCIAL SHARE
import VueSocialSharing from "vue-social-sharing";
// END:: IMPORTING SOCIAL SHARE

// START:: VUE PARTICLES
import VueParticles from "vue-particles";
Vue.use(VueParticles);
// END:: VUE PARTICLES

// START:: IMPORTING VUE APEX CHARTS
import VueApexCharts from "vue-apexcharts";
Vue.component("apexchart", VueApexCharts);
// END:: IMPORTING VUE APEX CHARTS

AOS.init();
Vue.component("multiselect", Multiselect);
Vue.use(VueMeta);
Vue.use(VueSplide);
Vue.use(ElementUI);
Vue.use(Antd);
Vue.use(iziToast);
Vue.use(VueChatScroll);
Vue.use(VueSocialSharing);
Vue.use(VueApexCharts);
Vue.prototype.$iziToast = iziToast;
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: (h) => h(App),
}).$mount("#app");
