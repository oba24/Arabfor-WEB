<template>
    <div>
        <!-- START:: FORM TITLE -->
        <div class="form_title_wrapper">
            <h2 class="form_title">{{ $t("TITLES.verificationCode") }}</h2>
            <h3 class="form_subtitle">
                {{ $t("TITLES.verificationCodeSubtitle") }}
            </h3>
            <h2 class="form_title phone_number" dir="ltr">
                {{ phoneForVerificationCode }}
            </h2>
        </div>
        <!-- END:: FORM TITLE -->

        <!-- START:: FORM -->
        <div class="form_wrapper">
            <form dir="ltr" @submit.prevent="validateFormInputs">
                <!-- START:: VERIFICATION INPUTS -->
                <div class="input_wrapper verification_inputs_wrapper">
                    <input
                        ref="first_input"
                        class="form-control"
                        type="text"
                        maxlength="1"
                        size="1"
                        placeholder="-"
                        @keyup="toggleFocus"
                        v-model.trim="firstNumber"
                    />
                    <input
                        class="form-control"
                        type="text"
                        maxlength="1"
                        size="1"
                        placeholder="-"
                        @keyup="toggleFocus"
                        v-model.trim="secondNumber"
                    />
                    <input
                        class="form-control"
                        type="text"
                        maxlength="1"
                        size="1"
                        placeholder="-"
                        @keyup="toggleFocus"
                        v-model.trim="thirdNumber"
                    />
                    <input
                        class="form-control"
                        type="text"
                        maxlength="1"
                        size="1"
                        placeholder="-"
                        @keyup="toggleFocus"
                        v-model.trim="fourthNumber"
                    />
                    <input
                        class="form-control"
                        type="text"
                        maxlength="1"
                        size="1"
                        placeholder="-"
                        @keyup="toggleFocus"
                        v-model.trim="fiveNumber"
                    />
                </div>
                <!-- END:: VERIFICATION INPUTS -->

                <!-- START:: SUBMIT BUTTON -->
                <div class="btn_wrapper">
                    <button>
                        {{ $t("BUTTONS.send") }}
                        <span class="btn_loader" v-if="isWaitingRequest"></span>
                    </button>
                </div>
                <!-- END:: SUBMIT BUTTON -->

                <!-- START:: COUNTDOWN TIMER -->
                <div class="timer_wrapper">
                    <h3>{{ "0 : " + timerCount }}</h3>
                    <div class="resend_btn_wrapper">
                        <button
                            id="resend_btn"
                            type="button"
                            v-if="timerCount > 0"
                            class="disabled"
                            disabled="disabled"
                        >
                            {{ $t("BUTTONS.resend_code") }}
                        </button>

                        <button
                            id="resend_btn"
                            type="button"
                            v-else
                            @click="resendVerificationCode"
                            :class="timerCount"
                        >
                            {{ $t("BUTTONS.resend_code") }}
                        </button>
                    </div>
                </div>
                <!-- END:: COUNTDOWN TIMER -->
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
    name: "PhoneVerification",

    props: {
        verificationType: {
            type: String,
            required: true,
        },
    },

    computed: {
        // START:: VUEX GET APP LANG
        ...mapGetters("AppLangModule", ["getAppLocale"]),
        // END:: VUEX GET APP LANG
    },

    data() {
        return {
            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

            // START:: USER PHONE NUMBER FOR VERIFICATION CODE DATA
            phoneForVerificationCode: localStorage.getItem(
                "saudi_marche_user_phone"
            ),
            // END:: USER PHONE NUMBER FOR VERIFICATION CODE DATA

            // START:: VERIFICATION INPUTS DATA
            firstNumber: null,
            secondNumber: null,
            thirdNumber: null,
            fourthNumber: null,
            fiveNumber: null,
            // END:: VERIFICATION INPUTS DATA

            // START:: TIMER DATA
            timerCount: 60,
            // END:: TIMER DATA
        };
    },

    methods: {
        // START:: VUEX SET AUTHENTICATED USER DATA
        ...mapActions("AuthenticationModule", [
            "setAuthenticatedUserData",
            "removeAuthenticatedUserData",
        ]),
        // END:: VUEX SET AUTHENTICATED USER DATA

        // START:: TOGGLE INPUTS FOCUS
        toggleFocus(e) {
            if (e.currentTarget.value.length == 1) {
                if (e.currentTarget.nextSibling) {
                    e.currentTarget.blur();
                    e.currentTarget.nextSibling.focus();
                }
            } else if (e.currentTarget.value.length == 0) {
                if (e.currentTarget.previousSibling) {
                    e.currentTarget.blur();
                    e.currentTarget.previousSibling.focus();
                }
            }
        },
        // END:: TOGGLE INPUTS FOCUS

        // START:: COUNTDOWN TIMER
        countDown() {
            if (this.timerCount > 0) {
                setTimeout(() => {
                    this.timerCount -= 1;
                    this.countDown();
                }, 1000);
            }
        },
        // END:: COUNTDOWN TIMER

        // START:: RESEND VERIFICATION CODE
        resendVerificationCode() {
            this.timerCount = 60;
            setTimeout(() => {
                this.timerCount -= 1;
                this.countDown();
            }, 1000);
            const theData = new FormData();

            // START:: APPEND GENERAL DATA
            theData.append("phone", this.phoneForVerificationCode);
            // END:: APPEND GENERAL DATA

            this.$axios({
                method: "POST",
                url: `resend-code`,
                data: theData,
            })
                .then((res) => {
                    this.$iziToast.success({
                        timeout: 2000,
                        message: res.data.message,
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                })
                .catch((error) => {
                    this.$iziToast.error({
                        timeout: 2000,
                        message: error.response.data.message,
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                });
        },
        // END:: RESEND VERIFICATION CODE

        // START:: VALIDATE PHONE VERIFICATION FORM INPUTS
        validateFormInputs() {
            this.isWaitingRequest = true;

            if (
                !this.firstNumber ||
                !this.secondNumber ||
                !this.thirdNumber ||
                !this.fourthNumber ||
                !this.fiveNumber
            ) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.phoneVerificationInputs"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else {
                this.submitForm();
            }
        },
        // END:: VALIDATE PHONE FORM INPUTS

        // START:: SUBMIT PHONE VERIFICATION FORM
        submitForm() {
            this.isWaitingRequest = true;

            const theData = new FormData();
            // START:: APPEND STATIC DATA
            theData.append("type", "ios");
            theData.append("device_token", "static_device_token");
            // END:: APPEND STATIC DATA

            // START:: APPEND GENERAL DATA
            theData.append("phone", this.phoneForVerificationCode);
            theData.append(
                "code",
                this.firstNumber +
                    this.secondNumber +
                    this.thirdNumber +
                    this.fourthNumber +
                    this.fiveNumber
            );
            // END:: APPEND GENERAL DATA

            if (this.verificationType == "activate-account") {
                // START:: SEND REQUEST
                this.$axios({
                    method: "POST",
                    url: `verify`,
                    data: theData,
                })
                    .then((res) => {
                        this.isWaitingRequest = false;
                        this.$iziToast.success({
                            timeout: 2000,
                            message: this.$t("MESSAGES.verified_successfully"),
                            position: this.$t("iziToastConfigs.position"),
                            rtl: this.$t("iziToastConfigs.dir"),
                        });
                        setTimeout(() => {
                            this.setAuthenticatedUserData({
                                token: res.data.data.token.access_token,
                                phone: res.data.data.phone,
                                type: res.data.data.user_type,
                                avatar: res.data.data.image,
                                userName: res.data.data.user_name,
                            });
                        }, 1000);
                        this.removeAuthenticatedUserData({
                            verificationCode: "saudi_marche_verification_code",
                        });
                        setTimeout(() => {
                            this.clearFormInputs();
                            //   this.$router.replace("/auth/login");
                            this.$router.replace("/");
                            location.reload();
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
                // END:: SEND REQUEST
            } else if (this.verificationType == "reset-password") {
                // START:: SEND REQUEST
                this.$axios({
                    method: "POST",
                    url: `check_code`,
                    data: theData,
                })
                    .then(() => {
                        this.isWaitingRequest = false;
                        this.$iziToast.success({
                            timeout: 2000,
                            message: this.$t("MESSAGES.verified_successfully"),
                            position: this.$t("iziToastConfigs.position"),
                            rtl: this.$t("iziToastConfigs.dir"),
                        });
                        setTimeout(() => {
                            this.clearFormInputs();
                            this.$router.replace("/auth/reset-password");
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
                // END:: SEND REQUEST
            }
        },
        // END:: SUBMIT PHONE VERIFICATION FORM

        // START:: CLEAR FORM INPUTS DATA
        clearFormInputs() {
            this.firstNumber = null;
            this.secondNumber = null;
            this.thirdNumber = null;
            this.fourthNumber = null;
            this.fiveNumber = null;
        },
        // END:: CLEAR FORM INPUTS DATA
    },

    created() {
        // START:: COUNTDOWN TIMER
        this.countDown();
        // END:: COUNTDOWN TIMER
    },

    mounted() {
        this.$refs.first_input.focus();
    },
};
</script>

<style>
.verification_inputs_wrapper input {
    background-color: #00703655 !important;
}
</style>
