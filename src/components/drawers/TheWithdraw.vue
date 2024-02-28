<template>
    <div>
        <!-- START:: WITHDRAW DRAWER -->
        <div
            class="withdraw_drawer_wrapper"
            :class="{ active: withdrawDrawerIsOpen }"
        >
            <!-- START:: DRAWER CONTENT WRAPPER -->
            <div class="drawer_content_wraper">
                <!-- START:: CLOSE BUTTON -->
                <button class="close_btn" @click="toggleWithdrawDrawer">
                    <i class="fal fa-times"></i>
                </button>
                <!-- END:: CLOSE BUTTON -->

                <!-- START:: TITLE WRAPPER -->
                <div class="title_wrapper">
                    <h4>طلب السحب</h4>
                </div>
                <!-- END:: TITLE WRAPPER -->

                <!-- START:: BALANCE CARD -->
                <div class="balance_card_wrapper">
                    <h6 class="card_title">رصيدك هو</h6>
                    <h4 class="balance" v-if="walletData">{{ walletData.wallet }} ر.س</h4>
                </div>
                <!-- END:: BALANCE CARD -->

                <!-- START:: FILTER FORM -->
                <form @submit.prevent="validateFormInputs">
                    <div class="row" style="row-gap: 20px">
                        <!-- START:: NAME INPUT GROUP -->
                        <div class="input_wrapper">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="إسم العميل"
                                v-model.trim="data.name"
                            />
                        </div>
                        <!-- END:: NAME INPUT GROUP -->

                        <!-- START:: BANK NAME INPUT GROUP -->
                        <div class="input_wrapper">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="إسم البنك"
                                v-model.trim="data.bankName"
                            />
                        </div>
                        <!-- END:: BANK NAME INPUT GROUP -->

                        <!-- START:: BANK BRANCH INPUT GROUP -->
                        <div class="input_wrapper">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="فرع البنك"
                                v-model.trim="data.bankBranch"
                            />
                        </div>
                        <!-- END:: BANK BRANCH INPUT GROUP -->

                        <!-- START:: ACCOUNT NUMBER INPUT GROUP -->
                        <div class="input_wrapper">
                            <input
                                type="number"
                                class="form-control"
                                placeholder="رقم الحساب"
                                v-model.trim="data.accountNumber"
                            />
                        </div>
                        <!-- END:: ACCOUNT NUMBER INPUT GROUP -->

                        <!-- START:: IBAN NUMBER INPUT GROUP -->
                        <div class="input_wrapper">
                            <input
                                type="number"
                                class="form-control"
                                placeholder="رقم الإيبان"
                                v-model.trim="data.iban"
                            />
                        </div>
                        <!-- END:: IBAN NUMBER INPUT GROUP -->

                        <!-- START:: BUTTONS GROUP -->
                        <div class="btn_wrapper">
                            <button class="mt-0">
                                إرسال الطلب
                                <span
                                    class="btn_loader"
                                    v-if="isWaitingRequest"
                                ></span>
                            </button>
                        </div>
                        <!-- END:: BUTTONS GROUP -->
                    </div>
                </form>
                <!-- END:: FILTER FORM -->
            </div>
            <!-- END:: DRAWER CONTENT WRAPPER -->
        </div>
        <!-- END:: WITHDRAW DRAWER -->
    </div>
</template>

<script>
export default {
    name: "TheWithdraw",

    emits: ["toggleWithdrawDrawer"],

    props: {
        withdrawDrawerIsOpen: {
            type: Boolean,
            require: true,
        },
    },

    data() {
        return {
            isWaitingRequest: false,

            // START:: WALLET DATA
            walletData: null,
            // END:: WALLET DATA

            // START:: DATA
            data: {
                name: null,
                bankName: null,
                bankBranch: null,
                accountNumber: null,
                iban: null,
            },
            // END:: DATA

            // START:: AUTHED USER TOKEN DATA
            authedUserToken: localStorage.getItem("saudi_marche_user_token"),
            // END:: AUTHED USER TOKEN DATA
        };
    },

    methods: {
        // START:: GET WALLET DATA
        getWalletData() {
            this.$axios({
                method: "GET",
                url: `wallet`,
            })
                .then((res) => {
                    this.walletData = res.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        },
        // END:: GET WALLET DATA

        // START:: TOGGLE WITHDRAW
        toggleWithdrawDrawer() {
            this.$emit("toggleWithdrawDrawer");
        },
        // END:: TOGGLE WITHDRAW

        // START:: VALIDATE FORM INPUTS
        validateFormInputs() {
            this.isWaitingRequest = true;

            if (!this.data.name) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: "حقل إسم العميل لايمكن ان يكون فارغ",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.data.bankName) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: "حقل إسم البنك لايمكن ان يكون فارغ",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.data.bankBranch) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: "حقل فرع البنك لايمكن ان يكون فارغ",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.data.accountNumber) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: "حقل رقم الحساب لايمكن ان يكون فارغ",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.data.iban) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: "حقل رقم الإيبان لايمكن ان يكون فارغ",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else {
                this.submitForm();
            }
        },
        // END:: VALIDATE FORM INPUTS

        // START:: SUBMIT FORM
        submitForm() {
            this.isWaitingRequest = true;

            const theData = new FormData();
            // START:: APPEND DATA
            theData.append("client_name", this.data.name);
            theData.append("bank_name", this.data.bankName);
            theData.append("bank_branch", this.data.bankBranch);
            theData.append("account_number", this.data.accountNumber);
            theData.append("iban_number", this.data.iban);
            // END:: APPEND DATA

            // START:: SEND REQUEST
            this.$axios({
                method: "POST",
                url: `wallet/refund`,
                data: theData,
            })
                .then(() => {
                    this.isWaitingRequest = false;
                    this.$iziToast.success({
                        timeout: 2000,
                        message: "تم إرسال طلب السحب بنجاح",
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    this.getWalletData();
                    this.toggleWithdrawDrawer();
                    this.clearFormInputs();
                })
                .catch((error) => {
                    this.isWaitingRequest = false;
                    this.$iziToast.error({
                        timeout: 2000,
                        message: error.response.data.message,
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                });
        },
        // END:: SUBMIT FORM

        // START:: CLEAR FORM INPUTS
        clearFormInputs() {
            this.data.name = null;
            this.data.bankName = null;
            this.data.bankBranch = null;
            this.data.accountNumber = null;
            this.data.iban = null;
        },
        // END:: CLEAR FORM INPUTS
    },

    created() {
        // START:: FIRE METHODS
        if(this.authedUserToken != null){
            this.getWalletData();
        }
        // END:: FIRE METHODS
    },
};
</script>
