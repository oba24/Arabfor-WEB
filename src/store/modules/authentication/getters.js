export default {
    // START:: GET AUTHENTICATED USER DATA
    getAuthenticatedUserData(state) {
        return {
            type: state.userType,
            token: state.userToken,
            avatar: state.userAvatar,
            userName: state.userName,
            verificationCode: state.verificationCode,
            phone: state.userPhone
        };
    },
    // END:: GET AUTHENTICATED USER DATA
}