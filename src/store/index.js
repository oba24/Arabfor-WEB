import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// START:: IMPORT ROOT FILES
import rootMutations from "./rootMutations.js";
import rootActions from "./rootActions.js";
import rootGetters from "./rootGetters.js";
// END:: IMPORT ROOT FILES

// START:: IMPORTING MODULES
import AppLangModule from "./modules/appLang/index.js";
import AppThemeModule from "./modules/appTheme/index.js";
import AuthenticationModule from "./modules/authentication/index.js";
import NotificationsModule from "./modules/notifications/index.js";
import WishlistModule from "./modules/wishlist/index.js";
import ApiGetsModule from "./modules/ApisGets/index";
import SearchModule from "./modules/search/index";
import FilterModule from "./modules/filter/index";
// END:: IMPORTING MODULES

export default new Vuex.Store({
    modules: {
        AppLangModule,
        AppThemeModule,
        AuthenticationModule,
        NotificationsModule,
        WishlistModule,
        ApiGetsModule,
        SearchModule,
        FilterModule,
    },
    mutations: rootMutations,
    actions: rootActions,
    getters: rootGetters,
});
