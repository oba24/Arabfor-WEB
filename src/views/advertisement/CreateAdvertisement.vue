<template>
    <div class="advertisement_form_wrapper">
        <div class="container">
            <!-- START:: SECTION TITLE -->
            <div class="section_title_wrapper">
                <h2 class="section_title"> {{ $t("TITLES.addAdvertisement") }} </h2>
            </div>
            <!-- END:: SECTION TITLE -->

            <!-- START:: FORM -->
            <div class="form_wrapper">
                <form
                    class="mt-4"
                    @submit.prevent="validateFormInputs"
                >
                    <!-- START:: PRODUCT NAME INPUT GROUP -->
                    <div class="input_wrapper">
                        <input
                            type="text"
                            class="form-control"
                            :placeholder="$t('PLACEHOLDERS.productName')"
                            v-model.trim="data.productName"
                        />
                    </div>
                    <!-- END:: PRODUCT NAME INPUT GROUP -->

                    <!-- START:: PRODUCT DESCRIPTION INPUT GROUP -->
                    <div class="input_wrapper">
                        <textarea 
                            class="form-control"
                            :placeholder="$t('PLACEHOLDERS.productDesc')"
                            v-model.trim="data.productDesc"
                            rows="2"
                        ></textarea>
                    </div>
                    <!-- END:: PRODUCT DESCRIPTION INPUT GROUP -->

                    <!-- START:: PRODUCT STATUS INPUT GROUP -->
                    <div class="input_wrapper select_wrapper">
                        <multiselect
                            v-model="data.productStatus"
                            :options="statusList"
                            label="name"
                            track-by="id"
                            :placeholder="$t('PLACEHOLDERS.productStatus')"
                            :searchable="true"
                            :allow-empty="false"
                            :show-labels="false"
                            :open-direction="'bottom'"
                        >
                        </multiselect>
                    </div>
                    <!-- END:: PRODUCT STATUS INPUT GROUP -->

                    <!-- START:: AVAILABLE QUANTITY INPUT GROUP -->
                    <div class="input_wrapper">
                        <input
                            type="number"
                            class="form-control"
                            :placeholder="$t('PLACEHOLDERS.availableQuantity')"
                            v-model.trim="data.availableQuantity"
                        />
                    </div>
                    <!-- END:: AVAILABLE QUANTITY INPUT GROUP -->

                    <!-- START:: MAIN CATEGORY INPUT GROUP -->
                    <div class="input_wrapper select_wrapper">
                        <multiselect
                            v-model="data.mainCategory"
                            :options="mainCategories"
                            label="name"
                            track-by="id"
                            :placeholder="$t('PLACEHOLDERS.mainCategory')"
                            :searchable="true"
                            :allow-empty="false"
                            :show-labels="false"
                            :open-direction="'bottom'"
                        >
                        </multiselect>
                    </div>
                    <!-- END:: MAIN CATEGORY INPUT GROUP -->

                    <!-- START:: SUB CATEGORY INPUT GROUP -->
                    <div class="input_wrapper select_wrapper">
                        <multiselect
                            v-model="data.subCategory"
                            :options="subCategories"
                            label="name"
                            track-by="id"
                            :placeholder="$t('PLACEHOLDERS.subCategory')"
                            :searchable="true"
                            :allow-empty="false"
                            :show-labels="false"
                            :open-direction="'bottom'"
                        >
                        </multiselect>
                    </div>
                    <!-- END:: SUB CATEGORY INPUT GROUP -->

                    <!-- START:: COUNTRY INPUT GROUP -->
                    <div class="input_wrapper select_wrapper">
                        <multiselect
                            v-model="data.country"
                            :options="countries"
                            label="name"
                            track-by="id"
                            :placeholder="$t('PLACEHOLDERS.country')"
                            :searchable="true"
                            :allow-empty="false"
                            :show-labels="false"
                            :open-direction="'bottom'"
                        >
                        </multiselect>
                    </div>
                    <!-- END:: COUNTRY INPUT GROUP -->

                    <!-- START:: CITY INPUT GROUP -->
                    <div class="input_wrapper select_wrapper">
                        <multiselect
                            v-model="data.city"
                            :options="cities"
                            label="name"
                            track-by="id"
                            :placeholder="$t('PLACEHOLDERS.city')"
                            :searchable="true"
                            :allow-empty="false"
                            :show-labels="false"
                            :open-direction="'bottom'"
                        >
                        </multiselect>
                    </div>
                    <!-- END:: CITY INPUT GROUP -->

                    <!-- START:: AUCTION CHECK INPUT GROUP -->
                    <div class="input_wrapper switch_wrapper" dir="ltr">
                        <h5 class="switch_label"> {{ $t("PLACEHOLDERS.addAuctionProduct") }} </h5>
                        <v-switch
                            v-model="data.isAuction"
                            hide-details
                        >
                        </v-switch>
                    </div>
                    <!-- END:: AUCTION CHECK INPUT GROUP -->

                    <!-- START:: ========== IS AUCTION INPUTS -->
                    <transition name="fadeInUp">
                        <div v-if="data.isAuction">
                            <!-- START:: AUCTION START DATE INPUT GROUP -->
                            <div class="input_wrapper">
                                <a-date-picker
                                    :placeholder="$t('PLACEHOLDERS.auctionStartDate')"
                                    format="YYYY-MM-DD"
                                    valueFormat="YYYY-MM-DD"
                                    :disabled-date="disabledDate"
                                    v-model="data.auctionStartDate"
                                />
                            </div>
                            <!-- END:: AUCTION START DATE INPUT GROUP -->

                            <!-- START:: AUCTION END DATE INPUT GROUP -->
                            <div class="input_wrapper">
                                <a-date-picker
                                    :placeholder="$t('PLACEHOLDERS.auctionEndDate')"
                                    format="YYYY-MM-DD"
                                    valueFormat="YYYY-MM-DD"
                                    :disabled-date="disabledDate"
                                    v-model="data.auctionEndDate"
                                />
                            </div>
                            <!-- END:: AUCTION END DATE INPUT GROUP -->

                            <!-- START:: AUCTION STARTER INPUT GROUP -->
                            <div class="input_wrapper">
                                <input
                                    type="number"
                                    class="form-control"
                                    :placeholder="$t('PLACEHOLDERS.auctionStarterPrice')"
                                    v-model.trim="data.auctionStarterPrice"
                                />
                            </div>
                            <!-- END:: AUCTION STARTER INPUT GROUP -->
                        </div>
                    </transition>
                    <!-- END:: ========== IS AUCTION INPUTS -->

                    <!-- START:: AUCTION CHECK INPUT GROUP -->
                    <div class="input_wrapper switch_wrapper" dir="ltr">
                        <h5 class="switch_label"> {{ $t("PLACEHOLDERS.addDirectSaleProduct") }} </h5>
                        <v-switch
                            v-model="data.isDirectSale"
                            hide-details
                        >
                        </v-switch>
                    </div>
                    <!-- END:: AUCTION CHECK INPUT GROUP -->

                    <!-- START:: ========== IS DIRECT SALE INPUTS -->
                    <transition name="fadeInUp">
                        <div v-if="data.isDirectSale">
                            <!-- START:: AUCTION STARTER INPUT GROUP -->
                            <div class="input_wrapper">
                                <input
                                    type="number"
                                    class="form-control"
                                    :placeholder="$t('PLACEHOLDERS.salePrice')"
                                    v-model.trim="data.salePrice"
                                />
                            </div>
                            <!-- END:: AUCTION STARTER INPUT GROUP -->
                        </div>
                    </transition>
                    <!-- END:: ========== IS DIRECT SALE INPUTS -->

                    <!-- START:: SUBMIT BUTTON WRAPPER -->
                    <div class="btn_wrapper">
                        <button>
                            {{ $t("BUTTONS.addProduct") }}
                            <span
                                class="btn_loader"
                                v-if="isWaitingRequest"
                            ></span>
                        </button>
                    </div>
                    <!-- END:: SUBMIT BUTTON WRAPPER -->
                </form>
            </div>
            <!-- END:: FORM -->
        </div>
    </div>
</template>

<script>
// START:: IMPORTING MOMENT
import moment from "moment";
// END:: IMPORTING MOMENT

export default {
    name: "CreateAdvertisement",

    data() {
        return {
            // START:: DUMMY SELECT DATA
            statusList: [
                {
                    id: 1,
                    name: "Status 1"
                },
                {
                    id: 2,
                    name: "Status 2"
                },
                {
                    id: 3,
                    name: "Status 3"
                },
            ],
            mainCategories: [
                {
                    id: 1,
                    name: "Main Category 1"
                },
                {
                    id: 2,
                    name: "Main Category 2"
                },
                {
                    id: 3,
                    name: "Main Category 3"
                },
            ],
            subCategories: [
                {
                    id: 1,
                    name: "SubCategory 1"
                },
                {
                    id: 2,
                    name: "SubCategory 2"
                },
                {
                    id: 3,
                    name: "SubCategory 3"
                },
            ],
            countries: [
                {
                    id: 1,
                    name: "Country 1"
                },
                {
                    id: 2,
                    name: "Country 2"
                },
                {
                    id: 3,
                    name: "Country 3"
                },
            ],
            cities: [
                {
                    id: 1,
                    name: "City 1"
                },
                {
                    id: 2,
                    name: "City 2"
                },
                {
                    id: 3,
                    name: "City 3"
                },
            ],
            // END:: DUMMY SELECT DATA

            // START:: FORM DATA
            data: {
                productName: null,
                productDesc: null,
                productStatus: null,
                availableQuantity: null,
                mainCategory: null,
                subCategory: null,
                country: null,
                city: null,
                isAuction: false,
                auctionStarterPrice: null,
                auctionStartDate: null,
                auctionEndDate: null,
                isDirectSale: false,
                salePrice: null,
            },
            // END:: FORM DATA
        }
    },

    methods: {
        // START:: DATEPICKER DISABLE PREVIOUS DAYS METHOD
        disabledDate(current) {
            return current && current < moment().startOf("day");
        },
        // END:: DATEPICKER DISABLE PREVIOUS DAYS METHOD
    },
}
</script>