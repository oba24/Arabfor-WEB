import iziToast from "izitoast";
import i18n from "@/i18n.js";

// START:: IMPORTING AXIOS
import axios from "axios";
// END:: IMPORTING AXIOS

export default {
    // START:: GET NOTIFICATIONS
    getNotifications(context) {
        axios
            .get("notifications", {
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("saudi_marche_user_token"),
                    "lang": localStorage.getItem(
                        "saudi_marche_language"
                    ),
                    "cache-control": "no-cache",
                    Accept: "application/json",
                },
            })
            .then((res) => {
                context.commit("setNotifications", res.data.data);
            });
    },
    // END:: GET NOTIFICATIONS

    // START:: DELETE NOTIFICATION
    deleteNotification(context, payload) {
        axios
            .delete(`notifications/${payload}`, {
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("saudi_marche_user_token"),
                    "lang": localStorage.getItem(
                        "saudi_marche_language"
                    ),
                    "cache-control": "no-cache",
                    Accept: "application/json",
                },
            })
            .then(() => {
                iziToast.success({
                    timeout: 2000,
                    message: i18n.t("MESSAGES.deleted_successfully"),
                    messageSize: "22",
                    position: i18n.t("iziToastConfigs.position"),
                    rtl: i18n.t("iziToastConfigs.dir"),
                });
                context.dispatch("getNotifications");
                return;
            })
            .catch((err) => {
                iziToast.error({
                    timeout: 2000,
                    message: err.response.data.message,
                    messageSize: "22",
                    position: i18n.t("iziToastConfigs.position"),
                    rtl: i18n.t("iziToastConfigs.dir"),
                });
                return;
            });
    },
    // END:: DELETE NOTIFICATION
};
