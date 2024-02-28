<template>
    <div class="add_bank_account_form_wrapper">
        <BaseModal
            :show="modalApperanceData"
            @controleModalApperance="controleModalApperance"
        >
            <template #modal>
                <form class="mt-4" @submit.prevent="addAccountFormValidate">
                    <div class="page_small_title">
                        <h3>{{ $t("TITLES.choose_bank") }}</h3>
                    </div>
                    <div class="row justify-content-center">
                        <!-- START:: NAME OWNER INPUT GROUP -->
                        <div class="col-md-6">
                            <div class="input_wrapper">
                                <input
                                    type="text"
                                    name="fullname"
                                    class="form-control"
                                    :placeholder="$t('PLACEHOLDERS.owner_name')"
                                    v-model="addAccount.ownerName"
                                />
                            </div>
                        </div>
                        <!-- END:: NAME OWNER INPUT GROUP -->

                        <!-- START:: NAME BANK INPUT GROUP -->
                        <div class="col-md-6">
                            <div class="input_wrapper">
                                <input
                                    type="text"
                                    name="bankName"
                                    class="form-control"
                                    :placeholder="$t('PLACEHOLDERS.bank_name')"
                                    v-model="addAccount.bankName"
                                />
                            </div>
                        </div>
                        <!-- END:: NAME BANK INPUT GROUP -->

                        <!-- START:: NAME BANK INPUT GROUP -->
                        <div class="col-md-6">
                            <div class="input_wrapper">
                                <input
                                    type="number"
                                    name="accountNumber"
                                    class="form-control"
                                    :placeholder="
                                        $t('PLACEHOLDERS.account_number')
                                    "
                                    v-model="addAccount.accountNumber"
                                />
                            </div>
                        </div>
                        <!-- END:: NAME BANK INPUT GROUP -->

                        <!-- START:: NAME BANK INPUT GROUP -->
                        <div class="col-md-6">
                            <div class="input_wrapper">
                                <input
                                    type="text"
                                    name="iban"
                                    class="form-control"
                                    :placeholder="$t('PLACEHOLDERS.iban')"
                                    v-model="addAccount.iban"
                                />
                            </div>
                        </div>
                        <!-- END:: NAME BANK INPUT GROUP -->

                        <!-- START:: SUBMIT FORM BTN -->
                        <div class="col-md-12">
                            <div class="add_btn">
                                <button>
                                    اضافة
                                    <span
                                        class="btn_loader"
                                        v-if="isWaitingRequest"
                                    ></span>
                                </button>
                            </div>
                        </div>
                        <!-- END:: SUBMIT FORM BTN -->
                    </div>
                </form>
            </template>
        </BaseModal>
    </div>
</template>

<script>
// START:: IMPORTING BASE MODAL
import BaseModal from "../ui/BaseModal.vue";
// END:: IMPORTING BASE MODAL

export default {
    name: "AddBankAccount",

    components: {
        BaseModal,
    },

    props: ["modalApperanceData"],

    emits: ["controleModalApperance"],

    data() {
        return {
            // START:: LOADER WAIT
            isWaitingRequest: false,
            // END:: LOADER WAIT

            // START:: ADD ACCOUNT DATA
            addAccount: {
                ownerName: null,
                bankName: null,
                accountNumber: null,
                iban: null,
            },
            // END:: ADD ACCOUNT DATA
        };
    },

    methods: {
        // START:: CONTROLE MODAL APPERANCE
        controleModalApperance() {
            this.$emit("controleModalApperance");
        },
        // END:: CONTROLE MODAL APPERANCE

        // START:: VALIDATE LOGIN FORM INPUTS
        addAccountFormValidate() {
            this.isWaitingRequest = true;

            if (!this.addAccount.ownerName) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.owner_name"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.addAccount.bankName) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.bank_name"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.addAccount.accountNumber) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.account_number"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.addAccount.iban) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.iban"),
                    messageSize: "22",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else {
                this.addAccountFormSubmit();
            }
        },
        // END:: VALIDATE LOGIN FORM INPUTS

        // START:: SUBMIT ADD ACCOUNT FORM
        // START:: FAV CLICK
        addAccountFormSubmit() {
            this.isWaitingRequest = true;
            // START:: SEND REQUEST
            const theData = new FormData();
            // START:: APPEND CONTACT DATA
            theData.append("account_name", this.addAccount.ownerName);
            theData.append("bank_name", this.addAccount.bankName);
            theData.append("account_number", this.addAccount.accountNumber);
            theData.append("iban_number", this.addAccount.iban);
            // END:: APPEND CONTACT DATA
            this.$axios
                .post("user/bank_account", theData, {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("saudi_marche_user_token"),
                        lang: localStorage.getItem("saudi_marche_language"),
                        "cache-control": "no-cache",
                        Accept: "application/json",
                    },
                })
                .then(() => {
                    location.reload();
                    this.isWaitingRequest = false;
                })
                .catch((err) => {
                    this.$iziToast.error({
                        timeout: 2000,
                        message: err.response.data.message,
                        messageSize: "22",
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    return;
                });
        },
        // END:: SUBMIT ADD ACCOUNT FORM
    },
};
</script>
