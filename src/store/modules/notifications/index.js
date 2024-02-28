import notificationsMutations from "./mutations";
import notificationsActions from "./actions.js";
import notificationsGetters from "./getters.js";

export default {
    namespaced: true,
    state: {
        // START:: NOTIFICATIONS
        notifications: null,
        unreadNotifications: null,
        // END:: NOTIFICATIONS
    },
    mutations: notificationsMutations,
    actions: notificationsActions,
    getters: notificationsGetters,
};
