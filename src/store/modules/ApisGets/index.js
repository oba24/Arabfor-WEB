import ApiGetsMutations from "./mutations";
import ApiGetsActions from "./actions.js";
import ApiGetsGetters from "./getters.js";

export default {
    namespaced: true,
    state: {
        // START:: COUNTRIES
        countries: null,
        selectedCountryKey: null,
        // END:: COUNTRIES
        
        
    },
    mutations: ApiGetsMutations,
    actions: ApiGetsActions,
    getters: ApiGetsGetters,
};
