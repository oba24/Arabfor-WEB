<template>
    <!-- START:: FILTER DRAWER -->
    <div class="filter_drawer_wrapper" :class="{ active: filterDrawerIsOpen }">
        <!-- START:: DRAWER CONTENT WRAPPER -->
        <div class="drawer_content_wraper">
            <!-- START:: CLOSE BUTTON -->
            <button class="close_btn" @click="toggleFilter">
                <i class="fal fa-times"></i>
            </button>
            <!-- END:: CLOSE BUTTON -->

            <!-- START:: TITLE WRAPPER -->
            <div class="title_wrapper">
                <h4>{{ $t("TITLES.filter") }}</h4>
            </div>
            <!-- END:: TITLE WRAPPER -->

            <!-- START:: FILTER FORM -->
            <form @submit.prevent="filterProducts">
                <div class="row">
                    <!-- START:: CLASSIFICATION GROUP -->
                    <div class="col-12 my-2">
                        <div class="input_wrapper select_wrapper">
                            <multiselect
                                v-model="filterData.classification"
                                :options="classificationList"
                                label="name"
                                track-by="id"
                                placeholder="التصنيف"
                                :searchable="true"
                                :allow-empty="false"
                                :show-labels="false"
                                :open-direction="'bottom'"
                            >
                            </multiselect>
                        </div>
                    </div>
                    <!-- END:: CLASSIFICATION GROUP -->

                    <!-- START:: PRICE GROUP -->
                    <div class="col-12 my-2">
                        <div class="input_wrapper slider_wrapper">
                            <span class="slider_title"> السعر </span>
                            <div class="slider_wrapper" dir="ltr">
                                <a-slider
                                    range
                                    :marks="marks"
                                    :min="0"
                                    :max="1000"
                                    v-model="filterData.price"
                                />
                            </div>
                        </div>
                    </div>
                    <!-- END:: PRICE GROUP -->

                    <!-- START:: RATE GROUP -->
                    <div class="col-12 my-3">
                        <div class="rating_wrapper">
                            <label class="rating_label"> التقييم </label>
                            <StarRating
                                :border-width="4"
                                border-color="#d8d8d8"
                                :rounded-corners="true"
                                :star-points="[
                                    23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43,
                                    38, 50, 36, 34, 46, 19, 31, 17,
                                ]"
                                :star-size="22"
                                v-model="filterData.rate"
                            />
                        </div>
                    </div>
                    <!-- END:: RATE GROUP -->

                    <!-- START:: BUTTONS GROUP -->
                    <div class="btn_wrapper">
                        <button class="mt-0">
                            {{ $t("BUTTONS.search") }}
                            <span
                                class="btn_loader"
                                v-if="isWaitingRequest"
                            ></span>
                        </button>

                        <button
                            type="button"
                            class="cancel_btn mt-0"
                            @click="toggleFilter"
                        >
                            {{ $t("BUTTONS.cancel") }}
                        </button>
                    </div>
                    <!-- END:: BUTTONS GROUP -->
                </div>
            </form>
            <!-- END:: FILTER FORM -->
        </div>
        <!-- END:: DRAWER CONTENT WRAPPER -->

        <!-- START:: DRAWER OVERLAY  -->
        <div class="drawer_overlay" @click="toggleFilter"></div>
        <!-- END:: DRAWER OVERLAY  -->
    </div>
    <!-- END:: FILTER DRAWER -->
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

// START:: IMPORTING STAR RATING PLUGIN
import StarRating from "vue-star-rating";
// END:: IMPORTING STAR RATING PLUGIN

export default {
    name: "TheFilter",

    components: {
        StarRating,
    },

    emits: ["toggleFilter"],

    props: {
        filterDrawerIsOpen: {
            type: Boolean,
            require: true,
        },
    },

    data() {
        return {
            // START:: BUTTON LOADER APPERANCE DATA
            isWaitingRequest: false,
            // END:: BUTTON LOADER APPERANCE DATA

            // START:: SELECTS DATA
            classificationList: [
                {
                    id: "best_seller ",
                    name: "الأفضل مبيعا",
                },
                {
                    id: "recently_added",
                    name: "المضاف حديثا",
                },
            ],
            // END:: SELECTS DATA

            // START:: PRICE SLIDER DATA
            marks: {
                0: "0",
                10000: "10000",
            },
            // END:: PRICE SLIDER DATA

            // START:: FILTER DATA
            filterData: {
                classification: null,
                price: [0, 0],
                color: null,
                rate: null,
            },
            // END:: FILTER DATA
        };
    },

    methods: {
        // START:: VUEX SET FILTERED PRODUCTS
        ...mapActions("FilterModule", ["setFilteredProductsData"]),
        // END:: VUEX SET FILTERED PRODUCTS

        // START:: TOGGLE FILTER
        toggleFilter() {
            this.$emit("toggleFilter");
        },
        // START:: TOGGLE FILTER

        // START:: FILTER PRODUCTS
        filterProducts() {
            this.isWaitingRequest = true;

            // START:: SEND REQUEST
            this.$axios({
                method: "GET",
                url: `filter`,
                params: {
                    classification: this.filterData.classification,
                    price_from: this.filterData.price[0],
                    price_to: this.filterData.price[1],
                    color_id: this.filterData.color,
                    rating_value: this.filterData.rate,
                },
            })
                .then((res) => {
                    this.isWaitingRequest = false;
                    // START:: SET FILTERED PRODUCTS
                    this.setFilteredProductsData(res.data.data.products);
                    // END:: SET FILTERED PRODUCTS
                    this.toggleFilter();
                })
                .catch((error) => {
                    this.isWaitingRequest = false;
                    console.log(error.response.data.message);
                });
            // START:: SEND REQUEST
        },
        // END:: FILTER PRODUCTS
    },
};
</script>
