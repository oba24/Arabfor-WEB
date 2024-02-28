<template>
    <div class="store_item_modal_wrapper">
        <BaseModal
            :show="modalApperanceData"
            @controleModalApperance="controleModalApperance"
        >
            <template #modal>
                <div class="selected_store_item_wrapper">
                    <!-- START:: IMAGE WRAPPER -->
                    <div class="image_wrapper">
                        <img
                            :src="selectedItem.product_image"
                            alt="Store Item"
                            width="180"
                            height="180"
                        />

                        <span
                            class="product_status"
                            v-show="selectedItem.amount == 0"
                        >
                            {{ $t("STATUS.out_of_stock") }}
                        </span>
                    </div>
                    <!-- END:: IMAGE WRAPPER -->

                    <!-- START:: ITEM NAME -->
                    <div class="name_wrapper">
                        <h2>{{ selectedItem.name }}</h2>
                    </div>
                    <!-- END:: ITEM NAME -->

                    <!-- START:: ITEM DESC -->
                    <div class="desc_wrapper">
                        {{ selectedItem.desc }}
                    </div>
                    <!-- END:: ITEM DESC -->

                    <!-- START:: CART BUTTONS WRAPPER -->
                    <div class="cart_btns_wrapper">
                        <!-- START:: INCREMENT BUTTON -->
                        <button
                            class="increment"
                            @click="incrementCartQuantity"
                            :disabled="quantityInCart == selectedItem.amount"
                        >
                            <i class="fal fa-plus-circle"></i>
                        </button>
                        <!-- END:: INCREMENT BUTTON -->

                        <!-- START:: QUANTITY -->
                        <span class="quantity_in_cart">
                            {{ quantityInCart }}
                        </span>
                        <!-- END:: QUANTITY -->

                        <!-- START:: DECREMENT BUTTON -->
                        <button
                            class="decrement"
                            @click="decrementCartQuantity"
                            :disabled="quantityInCart == 0"
                        >
                            <i class="fal fa-minus-circle"></i>
                        </button>
                        <!-- END:: DECREMENT BUTTON -->
                    </div>
                    <!-- END:: CART BUTTONS WRAPPER -->

                    <!-- START:: ADD TO CART & WISHLIST BUTTONS -->
                    <div class="add_to_cart_and_wishlist_btns_wrapper">
                        <!-- START:: ADD TO CART BUTTON -->
                        <button
                            class="add_to_cart_btn"
                            @click="
                                addToCart({
                                    id: selectedItem.id,
                                    count: quantityInCart,
                                });
                                controleModalApperance();
                                quantityInCart = 0;
                            "
                            :disabled="quantityInCart == 0"
                        >
                            {{ $t("BUTTONS.add_to_cart") }}
                        </button>
                        <!-- END:: ADD TO CART BUTTON -->

                        <!-- START:: ADD TO WISHLIST BUTTON -->
                        <button
                            class="add_to_wishlist_btn"
                            @click="favClick(selectedItem.id)"
                            v-show="!selectedItem.is_fav"
                        >
                            <i class="fal fa-heart"></i>
                        </button>
                        <button
                            class="add_to_wishlist_btn"
                            @click="favClick(selectedItem.id)"
                            v-show="selectedItem.is_fav"
                        >
                            <i class="fas fa-heart"></i>
                        </button>
                        <!-- END:: ADD TO WISHLIST BUTTON -->
                    </div>
                    <!-- END:: ADD TO CART & WISHLIST BUTTONS -->
                </div>
            </template>
        </BaseModal>
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

// START:: IMPORTING BASE MODAL
import BaseModal from "../ui/BaseModal.vue";
// END:: IMPORTING BASE MODAL

export default {
    name: "StoreItemModal",

    components: { BaseModal },

    props: ["modalApperanceData", "selectedItem"],

    emits: ["controleModalApperance", "getStudentFavorites"],

    methods: {
        // START:: CONTROLE MODAL APPERANCE
        controleModalApperance() {
            this.$emit("controleModalApperance");
        },
        // END:: CONTROLE MODAL APPERANCE

        // START:: GET FAVS
        getStudentFavorites() {
            this.$emit("getStudentFavorites");
        },
        // END:: GET FAVS

        // START:: DECREMENT CART QUANTITY
        decrementCartQuantity() {
            this.quantityInCart -= 1;
        },
        // END:: DECREMENT CART QUANTITY

        // START:: INCREMENT CART QUANTITY
        incrementCartQuantity() {
            this.quantityInCart += 1;
        },
        // END:: INCREMENT CART QUANTITY

        // START:: ADD TO CART
        ...mapActions("StoreAndWishlistModule", ["addToCart", "getProducts"]),
        // END:: ADD TO CART
        // START:: FAV CLICK
        favClick(id) {
            // START:: SEND REQUEST
            const theData = new FormData();
            // START:: APPEND CONTACT DATA
            theData.append("fav_type", "product");
            theData.append("id", id);
            // END:: APPEND CONTACT DATA

            // START:: SEND REQUEST
            this.$axios
                .post("user/favourite", theData, {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("saudi_marche_user_token"),
                        lang: localStorage.getItem("saudi_marche_language"),
                        "cache-control": "no-cache",
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    this.selectedItem.is_fav = res.data.data.is_fav;
                    this.getProducts();
                    this.getStudentFavorites();
                });
            // .catch((err) => {
            //     this.$iziToast.error({
            //         timeout: 2000,
            //         message: err.response.data.message,
            //         messageSize: "22",
            //         position: this.$t("iziToastConfigs.position"),
            //         rtl: this.$t("iziToastConfigs.dir"),
            //     });
            //     return;
            // });
            // END:: FAV CLICK
        },
    },
    data() {
        return {
            isFav: null,
            quantityInCart: 0,
        };
    },
    mounted() {},
};
</script>
