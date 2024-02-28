<template>
    <div class="product_details_content_wrapper">
        <!-- START:: PRODUCT CAROUSEL SECTION -->
        <section class="product_multi_carousel_wrapper">
            <div class="container-fluid">
                <div class="row">
                    <!-- ========== START:: ACTIONS BUTTONS ========== -->
                    <div class="col-lg-1 my-2 order-2 order-lg-1">
                        <ul class="actions_btns_wrapper">
                            <li class="list_item">
                                <button>
                                    <i class="fal fa-share-alt"></i>
                                </button>
                            </li>
                            <li
                                class="list_item"
                                v-if="authedUserToken != null"
                            >
                                <button
                                    :class="
                                        productData.is_fav == true
                                            ? 'wishlist_btn active_wishlist_btn'
                                            : 'wishlist_btn'
                                    "
                                    @click="toggleWishlist(productData.id)"
                                >
                                    <i
                                        class="fa fa-heart added_to_wishlist"
                                    ></i>
                                    <i class="fal fa-heart"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <!-- ========== END:: ACTIONS BUTTONS ========== -->

                    <!-- ========== START:: PRODUCT DETAILS ========== -->
                    <LoaderDetails v-if="loading"></LoaderDetails>
                    <div class="col-lg-11 my-2 order-1 order-lg-2" v-else>
                        <div class="product_details_wrapper">
                            <div class="row">
                                <!-- START:: MULTI CAROUSEL -->
                                <div class="col-lg-5 my-2">
                                    <ProductMultiCarousel
                                        :productSlider="
                                            productData.product_image
                                        "
                                    />
                                </div>
                                <!-- END:: MULTI CAROUSEL -->

                                <!-- START:: PRODUCT INFO -->
                                <div class="col-lg-7 my-2">
                                    <div class="product_info_wrapper">
                                        <!-- ========== START:: NAME AND PRICE ========== -->
                                        <div class="name_and_price_wrapper">
                                            <h4 class="product_name">
                                                {{ productData.name }}
                                            </h4>

                                            <!-- START:: PRODUCT PRICE -->
                                            <div
                                                class="with_sale"
                                                v-if="
                                                    productData.price_after_dicount !=
                                                        null ||
                                                    productData.price_after_dicount !=
                                                        ''
                                                "
                                            >
                                                <h4
                                                    class="product_price after_sale"
                                                >
                                                    <span class="price">
                                                        {{
                                                            productData.price_after_dicount
                                                        }}
                                                    </span>
                                                    <span class="currency">
                                                        {{
                                                            $t(
                                                                "TITLES.currency"
                                                            )
                                                        }}
                                                    </span>
                                                </h4>

                                                <h4 class="product_price">
                                                    <span class="price">
                                                        {{
                                                            productData.price_before_dicount
                                                        }}
                                                    </span>
                                                    <span class="currency">
                                                        {{
                                                            $t(
                                                                "TITLES.currency"
                                                            )
                                                        }}
                                                    </span>
                                                </h4>
                                            </div>

                                            <div class="without_sale" v-else>
                                                <h4 class="product_price">
                                                    <span class="price">
                                                        {{
                                                            productData.price_before_dicount
                                                        }}
                                                    </span>
                                                    <span class="currency">
                                                        {{
                                                            $t(
                                                                "TITLES.currency"
                                                            )
                                                        }}
                                                    </span>
                                                </h4>
                                            </div>
                                            <!-- END:: PRODUCT PRICE -->
                                        </div>
                                        <!-- ========== END:: NAME AND PRICE ========== -->

                                        <!-- ========== START:: PRODUCT DESC ========== -->
                                        <h5
                                            class="desc_wrapper"
                                            v-if="productData.category"
                                        >
                                            {{ productData.category.name }}
                                        </h5>
                                        <!-- ========== END:: PRODUCT DESC ========== -->

                                        <div class="about_product_text">
                                            {{ productData.desc }}
                                        </div>
                                        <!-- ========== START:: PRODUCT RATE ========== -->
                                        <div class="rate_wrapper">
                                            <RatingStars
                                                :rate="`${productData.rating_value}`"
                                            />
                                        </div>
                                        <!-- ========== END:: PRODUCT RATE ========== -->

                                        <!-- ========== START:: PRODUCT SPECIFICATIONS ========== -->
                                        <div
                                            class="product_specifications_wrapper"
                                        >
                                            <!-- START:: SPECIFICATION ITEM -->
                                            <h5 class="specifications_item">
                                                <span class="title">
                                                    {{
                                                        $t(
                                                            "TITLES.productCode"
                                                        )
                                                    }}:
                                                </span>
                                                <span class="value">
                                                    {{ productData.id }}
                                                </span>
                                            </h5>
                                            <!-- END:: SPECIFICATION ITEM -->

                                            <!-- START:: SPECIFICATION ITEM -->
                                            <h5 class="specifications_item">
                                                <span class="title">
                                                    {{
                                                        $t("TITLES.productQty")
                                                    }}:
                                                </span>
                                                <span class="value">
                                                    {{ productData.quantity }}
                                                </span>
                                            </h5>
                                            <!-- END:: SPECIFICATION ITEM -->
                                        </div>
                                        <div
                                            class="product_specifications_wrapper"
                                        >
                                            <!-- START:: SPECIFICATION ITEM -->
                                            <h5 class="specifications_item">
                                                <span class="title">
                                                    {{ $t("TITLES.weight") }}:
                                                </span>
                                                <span class="value">
                                                    {{ productData.weight }}
                                                </span>
                                            </h5>
                                            <!-- END:: SPECIFICATION ITEM -->

                                            <!-- START:: SPECIFICATION ITEM -->
                                            <h5 class="specifications_item">
                                                <span class="title">
                                                    {{ $t("TITLES.age") }}:
                                                </span>
                                                <span class="value">
                                                    {{ productData.age }}
                                                </span>
                                            </h5>
                                            <!-- END:: SPECIFICATION ITEM -->
                                        </div>
                                        <div
                                            class="product_specifications_wrapper"
                                        >
                                            <!-- START:: SPECIFICATION ITEM -->
                                            <h5 class="specifications_item">
                                                <span class="title">
                                                    {{ $t("TITLES.model") }}:
                                                </span>
                                                <span class="value">
                                                    {{ productData.model }}
                                                </span>
                                            </h5>
                                            <!-- END:: SPECIFICATION ITEM -->

                                            <!-- START:: SPECIFICATION ITEM -->
                                            <h5 class="specifications_item">
                                                <span class="title">
                                                    {{
                                                        $t("TITLES.areaSpace")
                                                    }}:
                                                </span>
                                                <span class="value">
                                                    {{ productData.area_space }}
                                                </span>
                                            </h5>
                                            <!-- END:: SPECIFICATION ITEM -->
                                        </div>
                                        <!-- ========== END:: PRODUCT SPECIFICATIONS ========== -->

                                        <!-- ========== START:: PRODUCT COLORS & SIZES & ADD TO CART ========== -->
                                        <form class="w-100">
                                            <div class="row">
                                                <!-- START:: COLORS  -->
                                                <div
                                                    class="col-md-6"
                                                    v-if="
                                                        productData.colors[0]
                                                            .color.id != 1 ||
                                                        productData.colors
                                                            .length != 1
                                                    "
                                                >
                                                    <div class="product_colors">
                                                        <h5>
                                                            {{
                                                                $t(
                                                                    "TITLES.colors"
                                                                )
                                                            }}
                                                        </h5>
                                                        <div
                                                            class="colors_container"
                                                        >
                                                            <div
                                                                class="single_color"
                                                                v-for="item in productData.colors"
                                                                :key="item.id"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    :id="`color_${item.color.id}`"
                                                                    :value="
                                                                        item
                                                                            .color
                                                                            .id
                                                                    "
                                                                    name="color"
                                                                    v-model="
                                                                        selectedColor
                                                                    "
                                                                    @change="
                                                                        chooseColor(
                                                                            item
                                                                                .color
                                                                                .id
                                                                        )
                                                                    "
                                                                />
                                                                <label
                                                                    :for="`color_${item.color.id}`"
                                                                    :style="`background-color: ${item.color.hex_value};`"
                                                                ></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- END:: COLORS  -->

                                                <!-- START:: SIZES  -->
                                                <div
                                                    class="col-md-6 fadeIn"
                                                    v-if="
                                                        selectedColor &&
                                                        (selectedColor.sizes
                                                            .length != 1 ||
                                                            selectedColor
                                                                .sizes[0].id !=
                                                                1)
                                                    "
                                                >
                                                    <div class="product_sizes">
                                                        <h5>
                                                            {{
                                                                $t(
                                                                    "TITLES.sizes"
                                                                )
                                                            }}
                                                        </h5>
                                                        <div
                                                            class="sizes_container"
                                                        >
                                                            <div
                                                                class="single_size"
                                                                v-for="item in selectedColor.sizes"
                                                                :key="item.id"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    :id="`size_${item.id}`"
                                                                    name="size"
                                                                    v-model="
                                                                        selectedSize
                                                                    "
                                                                    :value="
                                                                        item.id
                                                                    "
                                                                />
                                                                <label
                                                                    :for="`size_${item.id}`"
                                                                    >{{
                                                                        item.name
                                                                    }}</label
                                                                >
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- END:: SIZES  -->
                                            </div>

                                            <!-- START:: ADD TO CART -->
                                            <div class="add_to_cart">
                                                <div class="cart_btn_min_max">
                                                    <button
                                                        type="button"
                                                        @click="counterPlus"
                                                    >
                                                        <i
                                                            class="fal fa-plus"
                                                        ></i>
                                                    </button>

                                                    <input
                                                        type="number"
                                                        value="0"
                                                        v-model="counterData"
                                                    />
                                                    <button
                                                        type="button"
                                                        @click="counterMinus"
                                                    >
                                                        <i
                                                            class="fal fa-minus"
                                                        ></i>
                                                    </button>
                                                </div>
                                                <!-- START:: SUBMIT BUTTON WRAPPER -->
                                                <div class="btn_wrapper">
                                                    <button
                                                        class="mt-0"
                                                        type="button"
                                                        @click="addToCart()"
                                                    >
                                                        {{
                                                            $t(
                                                                "BUTTONS.addToCart"
                                                            )
                                                        }}
                                                        <span
                                                            class="btn_loader"
                                                            v-if="
                                                                isWaitingRequest
                                                            "
                                                        ></span>
                                                    </button>
                                                </div>
                                                <!-- END:: SUBMIT BUTTON WRAPPER -->
                                            </div>
                                            <!-- END:: ADD TO CART -->
                                        </form>
                                        <!-- ========== END:: PRODUCT COLORS & SIZES & ADD TO CART ========== -->
                                    </div>
                                </div>
                                <!-- END:: PRODUCT INFO -->
                            </div>
                        </div>
                    </div>
                    <!-- ========== END:: PRODUCT DETAILS ========== -->
                </div>
            </div>
        </section>
        <!-- END:: PRODUCT CAROUSEL SECTION -->

        <!-- START:: PRODUCT DETAILS SECTION -->
        <section class="product_details_wrapper">
            <div class="container">
                <!-- START:: SECTION TITLE -->
                <div class="section_title_wrapper">
                    <h2 class="section_title">
                        {{ $t("TITLES.productDetails") }}
                    </h2>
                </div>
                <!-- END:: SECTION TITLE -->

                <!-- START:: SECTIONS TABS -->
                <Tabs :tabsContent="tabsContent">
                    <!-- START:: FAVORITES REGISTERED SUBJECTS -->
                    <template #aboutProduct>
                        <div class="about_product_text">
                            {{ productData.desc }}
                        </div>
                    </template>
                    <!-- END:: FAVORITES REGISTERED SUBJECTS -->

                    <!-- START:: FAVORITES ONLINE SUBJECTS -->
                    <template #comments>
                        <ProductRates
                            :productRates="productData.review"
                            @getProductDataAfterRate="getproductData"
                        />
                    </template>
                    <!-- END:: FAVORITES ONLINE SUBJECTS -->
                </Tabs>
                <!-- END:: SECTIONS TABS -->
            </div>
        </section>
        <!-- END:: PRODUCT DETAILS SECTION -->

        <!-- START:: RELATED PRODUCTS SECTION -->
        <Loader v-if="loading"></Loader>
        <section class="related_products_wrapper" v-else>
            <div class="container">
                <!-- START:: RELATED PRODUCTS -->
                <RelatedProducts
                    :relatedProducts="productData.similerProduct"
                />
                <!-- END:: RELATED PRODUCTS -->
            </div>
        </section>
        <!-- END:: RELATED PRODUCTS SECTION -->
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

// START:: IMPORT PRODUCT DETAILS COMPONENTS
import LoaderDetails from "@/components/loaders/ProductDetails.vue";
import Loader from "@/components/loaders/Products.vue";
import ProductMultiCarousel from "@/components/product/ProductDetails/ProductMultiCarousel.vue";
import ProductRates from "@/components/product/ProductDetails/ProductRates.vue";
import RatingStars from "@/components/ui/RatingStars.vue";
import RelatedProducts from "@/components/product/ProductDetails/RelatedProducts.vue";
// END:: IMPORT PRODUCT DETAILS COMPONENTS

// START:: IMPORTING TABS
import Tabs from "@/components/structure/Tabs.vue";
// END:: IMPORTING TABS

export default {
    name: "ProductDetails",

    components: {
        ProductMultiCarousel,
        ProductRates,
        RatingStars,
        Tabs,
        RelatedProducts,
        LoaderDetails,
        Loader,
    },

    data() {
        return {
            // START:: COUNTER DATA
            counterData: 1,
            // END:: COUNTER DATA

            // START:: GET DATA CHOOSE
            getColor: null,
            selectedColor: null,
            selectedSize: null,
            // END:: GET DATA CHOOSE

            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

            productData: {
                similerProduct: [],
                review: [],
                product_image: [],
            },
            // START:: TABS CONTENT
            tabsContent: [
                {
                    tab: this.$t("TABS.aboutProduct"),
                    key_name: "aboutProduct",
                },
                {
                    tab: this.$t("TABS.comments"),
                    key_name: "comments",
                },
            ],
            // END:: TABS CONTENT

            // START:: LOADER
            loading: false,
            // END:: LOADER

            // START:: AUTHED USER TOKEN DATA
            authedUserToken: localStorage.getItem("saudi_marche_user_token"),
            // END:: AUTHED USER TOKEN DATA
        };
    },

    methods: {
        // START:: METHOD CHOOSE SIZES
        chooseColor(id) {
            let targetColor = this.productData.colors.find(
                (element) => element.color.id == id
            );
            this.selectedColor = targetColor;
        },
        // END:: METHOD CHOOSE SIZES

        // SATRT:: METHOD ADD COUTER
        counterPlus() {
            this.counterData++;
        },
        // SATRT:: METHOD MINUS COUTER
        counterMinus() {
            if (this.counterData > 1) {
                this.counterData--;
            }
        },

        // START:: GET REQUEST
        getproductData() {
            this.loading = true;
            this.$axios({
                method: "GET",
                url: `client/show_product/${this.$route.params.id}`,
            }).then((res) => {
                this.loading = false;
                this.productData = res.data.data;
                if (
                    this.productData.colors.length == 1 &&
                    this.productData.colors[0].color.id == 1
                ) {
                    this.selectedColor = this.productData.colors[0];
                }
            });
        },
        // START:: GET REQUEST

        // START:: ADD TO CART
        addToCart() {
            this.isWaitingRequest = true;
            if (
                this.selectedColor &&
                this.selectedColor.sizes.length == 1 &&
                this.selectedColor.sizes[0].id == 1
            ) {
                this.selectedSize = 1;
            }
            if (!this.selectedColor) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("MESSAGES.select_color"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
            } else if (!this.selectedSize) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("MESSAGES.select_size"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
            } else if (!this.counterData) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("MESSAGES.select_count"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
            } else {
                const theData = new FormData();
                // START:: APPEND STATIC DATA
                theData.append("provider_id", this.productData.user.id);
                theData.append("product_id", this.productData.id);
                theData.append("color_id", this.selectedColor.color.id);
                theData.append("size_id", this.selectedSize);
                theData.append("quantity", this.counterData);
                // END:: APPEND STATIC DATA
                this.$axios({
                    method: "POST",
                    url: `client/add_item`,
                    data: theData,
                })
                    .then((res) => {
                        this.isWaitingRequest = false;
                        this.$iziToast.success({
                            timeout: 2000,
                            message: res.data.message,
                            position: this.$t("iziToastConfigs.position"),
                            rtl: this.$t("iziToastConfigs.dir"),
                        });

                        // START:: CLEAR DATA
                        this.selectedColor = null;
                        this.selectedSize = null;
                        this.counterData = 0;
                        // END:: CLEAR DATA
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
            }
        },
        // START:: ADD TO CART

        // START:: VUEX TOGGLE ITEM WISHLIST
        ...mapActions("WishlistModule", ["toggleWishlistStatus"]),
        // END:: VUEX TOGGLE ITEM WISHLIST

        toggleWishlist(id) {
            this.toggleWishlistStatus(id);
            this.productData.is_fav = !this.productData.is_fav;
        },
    },

    mounted() {
        this.getproductData();
    },
};
</script>

<style>
.product_multi_carousel_wrapper .row {
    background-color: #ffffff !important;
}
.image_wrapper img {
    width: -webkit-fill-available !important;
    height: auto !important;
}
.image_wrapper {
    height: auto !important;
}
</style>
