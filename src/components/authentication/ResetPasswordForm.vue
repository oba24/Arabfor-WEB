<template>
    <div>
        <!-- START:: FORM TITLE -->
        <div class="form_title_wrapper">
            <h2 class="form_title">{{ $t("TITLES.newPassword") }}</h2>
            <h3 class="form_subtitle">
                {{ $t("TITLES.newPasswordSubtitle") }}
            </h3>
        </div>
        <!-- END:: FORM TITLE -->

        <!-- START:: FORM -->
        <div class="form_wrapper">
            <form class="mt-2" @submit.prevent="validateFormInputs">
                <!-- START:: PASSWORD INPUT GROUP -->
                <div class="input_wrapper password_input_wrapper">
                    <input
                        type="password"
                        class="form-control"
                        :placeholder="$t('PLACEHOLDERS.password')"
                        v-model.trim="data.password"
                    />
                    <button
                        type="button"
                        class="password_visibility_toggler"
                        @click="togglePasswordVisibility"
                    >
                        <i class="fal fa-eye"></i>
                        <i class="fal fa-eye-slash"></i>
                    </button>
                </div>
                <!-- END:: PASSWORD INPUT GROUP -->

                <!-- START:: CONFIRM PASSWORD INPUT GROUP -->
                <div class="input_wrapper password_input_wrapper">
                    <input
                        type="password"
                        class="form-control"
                        :placeholder="$t('PLACEHOLDERS.confirm_password')"
                        v-model.trim="data.confirm_password"
                    />
                    <button
                        type="button"
                        class="password_visibility_toggler"
                        @click="togglePasswordVisibility"
                    >
                        <i class="fal fa-eye"></i>
                        <i class="fal fa-eye-slash"></i>
                    </button>
                </div>
                <!-- END:: CONFIRM PASSWORD INPUT GROUP -->

                <!-- START:: SUBMIT BUTTON WRAPPER -->
                <div class="btn_wrapper">
                    <button>
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
    name: "ResetPasswordForm",

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

            // START:: LOGIN DATA
            data: {
                password: null,
                confirm_password: null,
            },
            // END:: LOGIN DATA

            // START:: GET LOCAL STORAGE DATA
            phoneLocal: localStorage.getItem("saudi_marche_user_phone"),
            codeLocal: localStorage.getItem("saudi_marche_verification_code"),
            // END:: GET LOCAL STORAGE DATA
        };
    },

    methods: {
        // START:: VUEX SET AUTHENTICATED USER DATA
        ...mapActions("AuthenticationModule", ["removeAuthenticatedUserData"]),
        // END:: VUEX SET AUTHENTICATED USER DATA

        // START:: TOGGLE PASSWORD VISIBILITY METHOD
        togglePasswordVisibility(e) {
            let passwordElement = e.currentTarget.parentElement.children[0];
            let passwordTogglerBtn = e.currentTarget;
            if (passwordElement.type == "password") {
                passwordElement.type = "text";
                passwordTogglerBtn.classList.add("password_is_visible");
            } else if (passwordElement.type == "text") {
                passwordElement.type = "password";
                passwordTogglerBtn.classList.remove("password_is_visible");
            }
        },
        // END:: TOGGLE PASSWORD VISIBILITY METHOD

        // START:: VALIDATE LOGIN FORM INPUTS
        validateFormInputs() {
            this.isWaitingRequest = true;

            if (!this.data.password) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.password"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (this.data.password.length < 6) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.password_length"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.data.confirm_password) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.password"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (this.data.confirm_password.length < 6) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.password_length"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (this.data.password != this.data.confirm_password) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.not_equal_passwords"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else {
                this.submitForm();
            }
        },
        // END:: VALIDATE LOGIN FORM INPUTS

        // START:: SUBMIT LOGIN FORM
        submitForm() {
            this.isWaitingRequest = true;

            const theData = new FormData();
            // START:: APPEND GENERAL DATA
            theData.append("phone", this.phoneLocal);
            theData.append("code", this.codeLocal);
            theData.append("password", this.data.password);
            // END:: APPEND GENERAL DATA

            // START:: SEND REQUEST
            this.$axios({
                method: "POST",
                url: `reset_password`,
                data: theData,
            })
                .then(() => {
                    this.isWaitingRequest = false;
                    this.$iziToast.success({
                        timeout: 2000,
                        message: this.$t("MESSAGES.sent_successfully"),
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    this.removeAuthenticatedUserData({
                        verificationCode: "saudi_marche_verification_code",
                    });
                    setTimeout(() => {
                        this.clearFormInputs();
                        this.$router.replace("/auth/login");
                    }, 2000);
                })
                // .catch((error) => {
                //     this.$iziToast.error({
                //         timeout: 2000,
                //         message: error.response.data.message,
                //         position: this.$t("iziToastConfigs.position"),
                //         rtl: this.$t("iziToastConfigs.dir"),
                //     });
                //     setTimeout(() => {
                //         this.isWaitingRequest = false;
                //     }, 1000);
                // });
            // END:: SEND REQUEST
            
        },
        // END:: SUBMIT LOGIN FORM

        // START:: CLEAR LOGIN FORM DATA
        clearFormInputs() {
            this.data.password = null;
        },
        // END:: CLEAR LOGIN FORM DATA
    },
};
</script>
