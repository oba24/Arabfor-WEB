<template>
    <!-- START:: FILTER DRAWER -->
    <div class="cart_drawer_wrapper" :class="{ active: cartDrawerIsOpen }">
        <!-- START:: DRAWER CONTENT WRAPPER -->
        <div class="drawer_content_wraper">
            <!-- START:: HEAD DRAWER -->
            <div class="head_drawer">
                <button
                    type="button"
                    class="close_btn"
                    @click="$emit('toggleCartEvent')"
                >
                    <i class="fal fa-times"></i>
                </button>
                <h3 v-if="cartDataProp.data != null">
                    {{ $t("TOOLTIPS.cart") }}
                    <span class="count">
                        {{ cartDataProp.data.items.length }}
                        <small>{{ $t("TITLES.cart_count") }}</small>
                    </span>
                </h3>
            </div>
            <!-- END:: HEAD DRAWER -->

            <!-- START:: BODY DRAWER CART -->
            <div
                class="body_drawer_cart_items fadeIn"
                v-if="cartDataProp.data != null"
            >
                <!-- START:: SINGLE ITEM -->
                <div
                    class="single_cart_item"
                    v-for="item in cartDataProp.data.items"
                    :key="item.cart_item_id"
                >
                    <div class="cart_item_image">
                        <img
                            :src="item.product.image"
                            :alt="item.product.name"
                            width=""
                            height=""
                        />
                    </div>

                    <div class="cart_item_details">
                        <ul>
                            <li>
                                <router-link
                                    :to="`/product-details/${item.product.id}`"
                                    >{{ item.product.name }}</router-link
                                >
                            </li>
                            <li>بيت الأزياء</li>
                            <li
                                class="currency"
                                v-if="item.product.price_after_dicount == null"
                            >
                                {{ item.product.price_before_dicount }}
                                {{ $t("TITLES.currency") }}
                            </li>
                            <li class="currency" v-else>
                                {{ item.product.price_after_dicount }}
                                {{ $t("TITLES.currency") }}
                            </li>
                        </ul>
                        <form>
                            <div class="cart_btn_min_max">
                                <button
                                    type="button"
                                    @click="
                                        counterPlus(
                                            item.cart_item_id,
                                            item.quantity
                                        )
                                    "
                                >
                                    <i class="fal fa-plus"></i>
                                </button>
                                <input
                                    type="number"
                                    value="1"
                                    v-model="item.quantity"
                                />
                                <button
                                    type="button"
                                    @click="
                                        counterMinus(
                                            item.cart_item_id,
                                            item.quantity
                                        )
                                    "
                                >
                                    <i class="fal fa-minus"></i>
                                </button>
                            </div>

                            <div class="remove_item">
                                <button
                                    type="button"
                                    @click="deleteItem(item.cart_item_id)"
                                >
                                    <i class="fal fa-trash-alt"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- END:: SINGLE ITEM -->
            </div>
            <!-- END:: BODY DRAWER CART -->

            <!-- START:: FOOTER DRAWER CART -->
            <div
                class="footer_drawer_cart_items fadeIn"
                v-if="cartDataProp.data != null"
            >
                <div class="form_wrapper">
                    <form>
                        <!-- START:: COUPON INPUT GROUP -->
                        <div class="input_wrapper">
                            <input
                                type="text"
                                class="form-control"
                                :placeholder="$t('PLACEHOLDERS.coupon')"
                                v-model="couponData"
                            />
                            <button
                                type="button"
                                class="submit_coupon"
                                @click="submitCoupon"
                            >
                                <template v-if="isWaitingRequest == false">
                                    {{ $t("BUTTONS.send") }}
                                </template>
                                <span class="btn_loader" v-else></span>
                            </button>
                        </div>
                        <!-- END:: COUPON INPUT GROUP -->
                    </form>
                </div>
                <div class="amounts">
                    <ul>
                        <li>
                            <span>سعر المنتجات</span>
                            {{ cartDataProp.total_products_price }}
                            {{ $t("TITLES.currency") }}
                        </li>
                        <li>
                            <span>الخصم</span>
                            {{ cartDataProp.dicount }}
                            {{ $t("TITLES.currency") }}
                        </li>
                        <li>
                            <span>سعر الشحن</span>
                            {{ cartDataProp.delivery_price }}
                            {{ $t("TITLES.currency") }}
                        </li>
                        <li>
                            <span>الإجمالي</span>
                            {{ cartDataProp.total_price }}
                            {{ $t("TITLES.currency") }}
                        </li>
                    </ul>
                </div>

                <!-- START:: SUBMIT BUTTON WRAPPER -->
                <div class="checkout_btn">
                    <button
                        class="mt-0"
                        @click="
                            $emit('toggleCartEvent'), $router.push('/checkout')
                        "
                    >
                        {{ $t("BUTTONS.checkout") }}
                    </button>
                </div>
                <!-- END:: SUBMIT BUTTON WRAPPER -->
            </div>
            <!-- END:: FOOTER DRAWER CART -->

            <transition name="fadeInUp" mode="out-in" v-else>
                <!-- START:: EMPTY MESSAGE -->
                <EmptyItemsCart />
                <!-- END:: EMPTY MESSAGE -->
            </transition>
        </div>
        <!-- END:: DRAWER CONTENT WRAPPER -->

        <!-- START:: DRAWER OVERLAY  -->
        <div class="drawer_overlay" @click="$emit('toggleCartEvent')"></div>
        <!-- END:: DRAWER OVERLAY  -->
    </div>
    <!-- END:: FILTER DRAWER -->
</template>

<script>
import EmptyItemsCart from "@/components/ui/emptyMessages/EmptyItemsCart";
export default {
    name: "Cart",

    emits: ["toggleCartEvent", "callData"],

    props: {
        cartDrawerIsOpen: {
            type: Boolean,
            require: true,
        },
        cartDataProp: {
            require: true,
        },
    },

    data() {
        return {
            // START:: COUNTER DATA
            counterData: 1,
            // END:: COUNTER DATA

            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

            // START:: CART DATA
            couponData: null,
            // END:: CART DATA
        };
    },

    components: {
        EmptyItemsCart,
    },

    methods: {
        // SATRT:: METHOD ADD COUTER
        counterPlus(id, quantity) {
            const theData = new FormData();
            theData.append("quantity", quantity + 1);
            this.$axios({
                method: "POST",
                url: `client/update_item_quantity/${id}`,
                data: theData,
            }).then(() => {
                this.$emit("callData");
            });
        },
        // SATRT:: METHOD MINUS COUTER
        counterMinus(id, quantity) {
            const theData = new FormData();
            theData.append("quantity", quantity - 1);
            this.$axios({
                method: "POST",
                url: `client/update_item_quantity/${id}`,
                data: theData,
            }).then(() => {
                this.$emit("callData");
            });
        },
        // START:: SUBMIT COUPON
        submitCoupon() {
            this.isWaitingRequest = true;
            this.$axios({
                method: "GET",
                url: `client/apply_coupon/${this.couponData}`,
            })
                .then((res) => {
                    this.isWaitingRequest = false;
                    this.$iziToast.success({
                        timeout: 2000,
                        message: res.data.message,
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    setTimeout(() => {
                        this.isWaitingRequest = false;
                        this.couponData = null;
                    }, 1000);
                    this.$emit("callData");
                })
                .catch((error) => {
                    this.$iziToast.error({
                        timeout: 2000,
                        message: error.response.data.message,
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    setTimeout(() => {
                        this.isWaitingRequest = false;
                    }, 1000);
                });
        },
        // END:: SUBMIT COUPON

        // START:: DELETE ITEM
        deleteItem(id) {
            this.$axios({
                method: "DELETE",
                url: `client/delete_item/${id}`,
            })
                .then(() => {
                    this.isWaitingRequest = false;
                    this.$iziToast.success({
                        timeout: 2000,
                        message: this.$t("VALIDATION.deleteItem"),
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    this.$emit("callData");
                })
                .catch((error) => {
                    this.$iziToast.error({
                        timeout: 2000,
                        message: error.response.data.message,
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    setTimeout(() => {
                        this.isWaitingRequest = false;
                    }, 1000);
                });
        },
        // END:: DELETE ITEM
    },
};
</script>
