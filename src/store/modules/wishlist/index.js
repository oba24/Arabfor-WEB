import wishlistMutations from "./mutations";
import wishlistActions from "./actions.js";
import wishlistGetters from "./getters.js";

export default {
    namespaced: true,
    state: {
        // START:: WISHLIST
        wishlist: null,
        // END:: WISHLIST
    },
    mutations: wishlistMutations,
    actions: wishlistActions,
    getters: wishlistGetters,
};