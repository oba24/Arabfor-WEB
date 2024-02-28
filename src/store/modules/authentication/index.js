import AuthenticationMutations from "./mutations.js";
import AuthenticationActions from "./actions.js";
import AuthenticationGetters from "./getters.js";

export default {
    namespaced: true,

    state: {
        // START:: AUTHENTICATED USER DATA
        userType: localStorage.getItem("saudi_marche_user_type"),
        userToken: localStorage.getItem("saudi_marche_user_token"),
        userAvatar: localStorage.getItem("saudi_marche_user_avatar"),
        userName: localStorage.getItem("saudi_marche_user_name"),
        verificationCode: localStorage.getItem("saudi_marche_verification_code"),
        userPhone: localStorage.getItem("saudi_marche_user_phone"),
        // END:: AUTHENTICATED USER DATA
    },

    mutations: AuthenticationMutations,
    actions: AuthenticationActions,
    getters: AuthenticationGetters
}