import AppLangMutations from "./mutations";
import AppLangActions from "./actions.js";
import AppLangGetters from "./getters.js";

export default {
    namespaced: true,
    state: {
        // START:: LANGUAGE DATA
        saudi_marche_language: localStorage.getItem("saudi_marche_language"),
        // END:: LANGUAGE DATA
    },
    mutations: AppLangMutations,
    actions: AppLangActions,
    getters: AppLangGetters,
};
