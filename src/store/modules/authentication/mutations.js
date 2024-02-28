export default {
    // START:: SET AUTHENTICATED USER DATA
    setAuthenticatedUserData(state, payload) {
        if (payload.type) {
            state.userType = payload.type;
            localStorage.setItem("saudi_marche_user_type", payload.type);
        }
        if (payload.token) {
            state.userToken = payload.token;
            localStorage.setItem("saudi_marche_user_token", payload.token);
        }
        if (payload.avatar) {
            state.userAvatar = payload.avatar;
            localStorage.setItem("saudi_marche_user_avatar", payload.avatar);
        }
        if (payload.verificationCode) {
            state.verificationCode = payload.verificationCode;
            localStorage.setItem("saudi_marche_verification_code", payload.verificationCode);
        }
        if (payload.phone) {
            state.userPhone = payload.phone;
            localStorage.setItem("saudi_marche_user_phone", payload.phone);
        }
        if (payload.userName) {
            state.userName = payload.userName;
            localStorage.setItem("saudi_marche_user_name", payload.userName);
        }
    },
    // END:: SET AUTHENTICATED USER DATA

    // START:: SET AUTHENTICATED USER DATA
    removeAuthenticatedUserData(_, payload) {
        if (payload.type) {
            localStorage.removeItem(payload.type);
        }
        if (payload.token) {
            localStorage.removeItem(payload.token);
        }
        if (payload.avatar) {
            localStorage.removeItem(payload.avatar);
        }
        if (payload.verificationCode) {
            localStorage.removeItem(payload.verificationCode);
        }
        if (payload.phone) {
            localStorage.removeItem(payload.phone);
        }
        if (payload.userName) {
            localStorage.removeItem(payload.userName);
        }
    },
    // END:: SET AUTHENTICATED USER DATA
};
