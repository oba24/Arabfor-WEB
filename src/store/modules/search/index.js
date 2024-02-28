import searchMutations from "./mutations";
import searchActions from "./actions.js";
import searchGetters from "./getters.js";

export default {
    namespaced: true,
    state: {
        // START:: SEARCH RESULT DATA
        searchResultData: null,
        // END:: SEARCH RESULT DATA

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
    mutations: searchMutations,
    actions: searchActions,
    getters: searchGetters,
};
