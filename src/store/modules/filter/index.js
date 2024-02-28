import filterMutations from "./mutations";
import filterActions from "./actions.js";
import filterGetters from "./getters.js";

export default {
    namespaced: true,
    state: {
        // START:: FILTER RESULT DATA
        filterResultData: null,
        // END:: FILTER RESULT DATA

        // START:: PAGINATION DATA
        paginations: {
            currentPage: 1,
            lastPage: 15,
            itemsPerPage: 3,
            previousPageLink: null,
            nextPageLink: null,
        },
        // END:: PAGINATION DATA
    },
    mutations: filterMutations,
    actions: filterActions,
    getters: filterGetters,
};
