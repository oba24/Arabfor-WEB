export default {
    // START:: NOTIFICATIONS GETTER
    notificationsData(state) {
        return {
            notificationsList: state.notifications,
            unreadNotifications: state.unreadNotifications,
        };
    },
    // END:: NOTIFICATIONS GETTER
};
