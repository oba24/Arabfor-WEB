<template>
    <div>
        <!-- START:: FORM TITLE -->
        <div class="form_title_wrapper">
            <h2 class="form_title">{{ $t("TITLES.confirmAccount") }}</h2>
            <h3 class="form_subtitle">{{ $t("TITLES.enterPone") }}</h3>
        </div>
        <!-- END:: FORM TITLE -->

        <!-- START:: FORM -->
        <div class="form_wrapper">
            <form class="mt-2" @submit.prevent="validateFormInputs">
                <!-- START:: PHONE INPUT GROUP -->
                <div class="input_wrapper">
                    <input
                        type="tel"
                        class="form-control"
                        :placeholder="$t('PLACEHOLDERS.phone')"
                        v-model.trim="data.phone"
                    />
                </div>
                <!-- END:: PHONE INPUT GROUP -->

                <!-- START:: SUBMIT BUTTON WRAPPER -->
                <div class="btn_wrapper">
                    <button class="mt-0">
                        {{ $t("BUTTONS.send") }}
                        <span class="btn_loader" v-if="isWaitingRequest"></span>
                    </button>
                </div>
                <!-- END:: SUBMIT BUTTON WRAPPER -->

                <!-- START:: LOGIN ROUTE WRAPPER -->
                <router-link to="/auth/login" class="register_route">
                    <span>{{ $t("BUTTONS.have_account") }}</span>
                    <span> {{ $t("BUTTONS.login") }}</span>
                </router-link>
                <!-- END:: LOGIN ROUTE WRAPPER -->
            </form>
        </div>
        <!-- END:: FORM -->
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters, mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

export default {
    name: "ResetPasswordPhoneNumberForm",

    data() {
        return {
            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

            // START:: LOGIN DATA
            data: {
                phone: null,
            },
            // END:: LOGIN DATA
        };
    },

    computed: {
        // START:: VUEX GET APP LANG
        ...mapGetters("AppLangModule", ["getAppLocale"]),
        // END:: VUEX GET APP LANG
    },

    methods: {
        // START:: VUEX SET AUTHENTICATED USER DATA
        ...mapActions("AuthenticationModule", ["setAuthenticatedUserData"]),
        // END:: VUEX SET AUTHENTICATED USER DATA

        // START:: VALIDATE PHONE FORM INPUTS
        validateFormInputs() {
            this.isWaitingRequest = true;

            if (!this.data.phone) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.phone"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else {
                this.submitForm();
            }
        },
        // END:: VALIDATE PHONE FORM INPUTS

        // START:: SUBMIT PHONE FORM
        submitForm() {
            this.isWaitingRequest = true;

            const theData = new FormData();
            // START:: APPEND STATIC DATA
            theData.append("phone", this.data.phone);
            // END:: APPEND TEACHER DATA

            // START:: SEND REQUEST
            this.$axios({
                method: "POST",
                url: `forgot_password`,
                data: theData,
            })
                .then((res) => {
                    this.isWaitingRequest = false;
                    this.$iziToast.success({
                        timeout: 2000,
                        message: this.$t("MESSAGES.sent_successfully"),
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    this.setAuthenticatedUserData({
                        phone: this.data.phone,
                        verificationCode: res.data.data.code,
                    });
                    setTimeout(() => {
                        this.clearFormInputs();
                        this.$router.replace(
                            "/auth/phone-verification/reset-password"
                        );
                    }, 2000);
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

            // START:: SEND REQUEST
        },
        // END:: SUBMIT PHONE FORM

        // START:: CLEAR PHONE FORM DATA
        clearFormInputs() {
            this.data.phone = null;
        },
        // END:: CLEAR PHONE FORM DATA
    },
    mounted() {},
};
</script>
