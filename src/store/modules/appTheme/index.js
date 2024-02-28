import AppThemeMutations from "./mutations";
import AppThemeActions from "./actions.js";
import AppThemeGetters from "./getters.js";

export default {
    namespaced: true,

    state: {
        // START:: THEME DATA
        saudi_marche_theme: localStorage.getItem("saudi_marche_theme"),
        // END:: THEME DATA
    },

    mutations: AppThemeMutations,
    actions: AppThemeActions,
    getters: AppThemeGetters,
};
