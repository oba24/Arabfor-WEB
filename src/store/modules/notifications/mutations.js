export default {
    // START:: SET NOTIFICATIONS
    setNotifications(state, payload) {
        state.notifications = payload.notifications;
        state.unreadNotifications = payload.unreadnotifications_count;
    },
    // END:: SET NOTIFICATIONS
};
