<template>
    <div class="rates_list_wrapper">
        <div class="container">
            <!-- START:: RATES LIST -->
            <ul class="rates_list" v-if="productRates != null">
                <li
                    class="rate_route_wrapper"
                    v-for="item in productRates"
                    :key="item"
                >
                    <div class="rate_content">
                        <!-- START:: AVATAR -->
                        <div class="avatar_wrapper">
                            <img
                                :src="item.client.image"
                                :alt="item.client.user_name"
                                width="90"
                                height="90"
                            />
                        </div>
                        <!-- END:: AVATAR -->

                        <!-- START:: RATE DETAILS -->
                        <div class="rate_details_wrapper">
                            <div class="name_and_rate_date_wrapper">
                                <h5 class="name">
                                    {{ item.client.user_name }}
                                    <RatingStars :rate="item.rating_value" />
                                </h5>

                                <!-- <h6 class="rate_date_wrapper">30 - 4 - 2022</h6> -->
                            </div>
                            <h6 class="comment_text">
                                {{ item.comment }}
                            </h6>
                        </div>
                        <!-- END:: RATE DETAILS -->
                    </div>
                </li>
            </ul>
            <!-- END:: RATES LIST -->

            <!-- START:: EMPTY MESSAGE -->
            <EmptyItemsRate v-else />
            <!-- END:: EMPTY MESSAGE -->

            <!-- START:: RATE FORM -->
            <form class="rate_form">
                <div class="row">
                    <!-- START:: RATE GROUP -->
                    <div class="col-12 my-3">
                        <div class="rating_wrapper">
                            <label class="rating_label">
                                {{ $t("PLACEHOLDERS.addYourRate") }}
                            </label>
                            <StarRating
                                :border-width="4"
                                border-color="#d8d8d8"
                                :rounded-corners="true"
                                :star-points="[
                                    23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43,
                                    38, 50, 36, 34, 46, 19, 31, 17,
                                ]"
                                :star-size="40"
                                v-model="data.rating_value"
                            />
                        </div>
                    </div>
                    <!-- END:: RATE GROUP -->

                    <div class="col-12 my-3">
                        <!-- START:: COMMENT TEXTAREA -->
                        <label class="comment_label">
                            {{ $t("PLACEHOLDERS.addYourComment") }}
                        </label>
                        <div class="input_wrapper">
                            <textarea
                                class="form-control"
                                name="comment"
                                v-model="data.comment"
                            >
                            </textarea>
                        </div>
                        <!-- END:: COMMENT TEXTAREA -->
                    </div>

                    <!-- START:: BUTTONS GROUP -->
                    <div class="btn_wrapper">
                        <button class="mt-0" type="button" @click="addReview">
                            {{ $t("BUTTONS.send") }}
                            <span
                                class="btn_loader"
                                v-if="isWaitingRequest"
                            ></span>
                        </button>
                    </div>
                    <!-- END:: BUTTONS GROUP -->
                </div>
            </form>
            <!-- END:: RATE FORM -->
        </div>
    </div>
</template>

<script>
// START:: IMPORTING RATING STARS
import RatingStars from "@/components/ui/RatingStars.vue";
// END:: IMPORTING RATING STARS
import EmptyItemsRate from "@/components/ui/emptyMessages/EmptyItemsRate";
// START:: IMPORTING STAR RATING PLUGIN
import StarRating from "vue-star-rating";
// END:: IMPORTING STAR RATING PLUGIN

export default {
    name: "ProductRates",

    props: {
        productRates: {
            type: Object,
            required: true,
        },
    },

    emits: ["getProductDataAfterRate"],

    components: {
        RatingStars,
        StarRating,
        EmptyItemsRate,
    },

    data() {
        return {
            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

            data: {
                rating_value: null,
                comment: null,
            },
        };
    },

    methods: {
        // START:: ADD TO CART
        addReview() {
            this.isWaitingRequest = true;

            const theData = new FormData();
            // START:: APPEND STATIC DATA
            theData.append("product_id", this.$route.params.id);
            theData.append("rating_value", this.data.rating_value);
            theData.append("comment", this.data.comment);
            // END:: APPEND STATIC DATA
            this.$axios({
                method: "POST",
                url: `client/rating`,
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
                    this.data.rating_value = 0;
                    this.data.comment = null;
                    // END:: CLEAR DATA

                    // START:: GET PRODUCT DATA METHOD
                    this.$emit("getProductDataAfterRate");
                    // END:: GET PRODUCT DATA METHOD
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
        // START:: ADD TO CART
    },
};
</script>
