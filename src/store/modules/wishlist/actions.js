import iziToast from "izitoast";
import i18n from "@/i18n.js";

// START:: IMPORTING AXIOS
import axios from "axios";
// END:: IMPORTING AXIOS

export default {
    // START:: GET WISHLIST
    getWishlist(context) {
        // START:: SEND GET REQUEST
        axios({
            method: "GET",
            url: `client/favorite_products`,
        })
            .then((res) => {
                context.commit("setWishlist", res.data.data);
                setTimeout(() => {
                }, 1000);
            })
            .catch((err) => {
                this.isWaitingRequest = false;
                console.log(err.response.data.message);
            });
        // END:: SEND GET REQUEST
    },
    // END:: GET WISHLIST

    // START:: TOGGLE WISHLIST STATUS
    toggleWishlistStatus(context, payload) {
        const wishListData = new FormData();

        wishListData.append("product_id", payload);
        // START:: SEND POST REQUEST
        axios({
            method: "POST",
            url: `client/favorite_products`,
            data: wishListData,
        })
            .then((res) => {
                iziToast.success({
                    timeout: 2000,
                    message: res.data.message,
                    position: i18n.t("iziToastConfigs.position"),
                    rtl: i18n.t("iziToastConfigs.dir"),
                });
                context.dispatch("getWishlist");
            })
            .catch((err) => {
                iziToast.error({
                    timeout: 2000,
                    message: err.response.data.message,
                    position: i18n.t("iziToastConfigs.position"),
                    rtl: i18n.t("iziToastConfigs.dir"),
                });
            });
        // END:: SEND POST REQUEST
    },
    // END:: TOGGLE WISHLIST STATUS
};