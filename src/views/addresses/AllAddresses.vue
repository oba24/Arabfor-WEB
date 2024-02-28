<template>
    <div class="all_addresses_wrapper">
        <div class="row" v-if="allAddresses != ''">
            <!-- START:: ADDRESS CARD -->
            <div
                class="col-md-6 mb-3"
                v-for="item in allAddresses"
                :key="item.id"
            >
                <div class="address_card">
                    <h4 class="address_name">{{ item.name }}</h4>
                    <h4 class="address_details">{{ item.address }}</h4>
                    <div class="address_actions_btns">
                        <button
                            class="delete_btn"
                            @click="selectDeleteItem(item)"
                        >
                            حذف
                        </button>

                        <router-link
                            :to="`/addresses/edit/${item.id}`"
                            class="edit_route"
                        >
                            <span> تعديل </span>

                            <span>
                                <i
                                    :class="
                                        getAppLocale == 'ar'
                                            ? 'fal fa-long-arrow-left'
                                            : 'fal fa-long-arrow-right'
                                    "
                                ></i>
                            </span>
                        </router-link>
                    </div>
                </div>
            </div>
            <!-- END:: ADDRESS CARD -->
        </div>
        
        <!-- START:: EMPTY MESSAGE -->
        <EmptyItemsAddress v-else />
        <!-- END:: EMPTY MESSAGE -->

        <!-- START:: CREATE ADDRESS ROUTE -->
        <div class="col-12 my-3">
            <div class="btn_wrapper">
                <router-link to="/addresses/create">
                    إضافة عنوان جديد
                </router-link>
            </div>
        </div>
        <!-- END:: CREATE ADDRESS ROUTE -->

        <!-- START:: DELETE DIALOG -->
        <v-dialog v-model="dialogDelete">
            <v-card>
                <v-card-title class="text-h5 justify-center">{{
                    $t("TITLES.areYouSure")
                }}</v-card-title>
                <v-card-actions>
                    <v-btn
                        class="confirm_delete_btn"
                        @click="confirmDeleteItem"
                        >{{ $t("BUTTONS.delete") }}</v-btn
                    >

                    <v-btn
                        class="cancel_delete_btn"
                        @click="dialogDelete = false"
                        >{{ $t("BUTTONS.cancel") }}</v-btn
                    >
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- END:: DELETE DIALOG -->
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters } from "vuex";
// END:: IMPORTING VUEX HELPERS

import EmptyItemsAddress from "@/components/ui/emptyMessages/EmptyItemsAddress";

export default {
    name: "AllAddresses",

    computed: {
        // START:: VUEX GET APP THEME
        ...mapGetters("AppLangModule", ["getAppLocale"]),
        // END:: VUEX GET APP THEME
    },
    components: {
        EmptyItemsAddress,
    },

    data() {
        return {
            // START:: DIALOGS STATUS
            dialogDelete: false,
            itemToDelete: null,
            // END:: DIALOGS STATUS

            // START:: ALL ADDRESSES DATA
            allAddresses: null,
            // END:: ALL ADDRESSES DATA
        };
    },

    methods: {
        // START:: GET PAGE DATA
        getAllAddresses() {
            // START:: SEND REQUEST
            this.$axios({
                method: "GET",
                url: `client/address`,
            })
                .then((res) => {
                    this.allAddresses = res.data.data;
                })
                .catch((error) => {
                    this.$iziToast.error({
                        timeout: 2000,
                        message: error.response.data.message,
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                });
            // END:: SEND REQUEST
        },
        // END:: GET PAGE DATA

        // START:: DELETE ADDRESS
        selectDeleteItem(item) {
            this.dialogDelete = true;
            this.itemToDelete = item;
        },
        confirmDeleteItem() {
            this.$axios({
                method: "DELETE",
                url: `client/address/${this.itemToDelete.id}`,
            })
                .then(() => {
                    this.dialogDelete = false;
                    this.allAddresses = this.allAddresses.filter((item) => {
                        return item.id != this.itemToDelete.id;
                    });
                    this.$iziToast.success({
                        timeout: 2000,
                        message: this.$t("MESSAGES.deleted_successfully"),
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                })
                .catch((err) => {
                    this.dialogDelete = false;
                    this.$message.error(err.response.data.message);
                });
        },
        // END:: DELETE ADDRESS
    },

    created() {
        // START:: FIRE METHODS
        this.getAllAddresses();
        // END:: FIRE METHODS
    },
};
</script>
