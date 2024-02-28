<template>
    <div>
        <!-- START:: FORM TITLE -->
        <div class="form_title_wrapper">
            <!-- START:: TITLES -->
            <h2 class="form_title">{{ $t("TITLES.register") }}</h2>
            <h3 class="form_subtitle">{{ $t("TITLES.register_welcome") }}</h3>
            <!-- END:: TITLES -->
        </div>
        <!-- END:: FORM TITLE -->

        <!-- START:: FORM -->
        <div class="form_wrapper">
            <form class="mt-2" @submit.prevent="validateFormInputs">
                <!-- START:: NAME INPUT GROUP -->
                <div class="input_wrapper">
                    <input
                        type="text"
                        class="form-control"
                        :placeholder="$t('PLACEHOLDERS.user_name')"
                        v-model.trim="data.name"
                    />
                </div>
                <!-- END:: NAME INPUT GROUP -->

                <!-- START:: EMAIL INPUT GROUP -->
                <div class="input_wrapper">
                    <input
                        type="email"
                        class="form-control"
                        :placeholder="$t('PLACEHOLDERS.email')"
                        v-model.trim="data.email"
                    />
                </div>
                <!-- END:: EMAIL INPUT GROUP -->

                <!-- START:: PHONE NUMBER INPUT GROUP -->
                <div class="input_wrapper">
                    <button
                        type="button"
                        class="password_visibility_toggler"
                        v-if="getAppLocale == 'en'"
                        style="color: #8d8d8d !important"
                    >
                        <span>+966</span>
                    </button>
                    <input
                        type="tel"
                        class="form-control"
                        :placeholder="$t('PLACEHOLDERS.phone')"
                        v-model.trim="data.phone"
                        style="padding-inline-start: 10px"
                    />
                    <button
                        type="button"
                        class="password_visibility_toggler"
                        style="direction: ltr; color: #8d8d8d !important"
                        v-if="getAppLocale == 'ar'"
                    >
                        <span>+966</span>
                    </button>
                </div>
                <!-- END:: PHONE NUMBER INPUT GROUP -->

                <!-- START:: PASSWORD INPUT GROUP -->
                <!-- <div class="input_wrapper password_input_wrapper">
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
        </div> -->
                <!-- END:: PASSWORD INPUT GROUP -->

                <!-- START:: CONFIRM PASSWORD INPUT GROUP -->
                <!-- <div class="input_wrapper password_input_wrapper">
          <input
            type="password"
            class="form-control"
            :placeholder="$t('PLACEHOLDERS.confirm_password')"
            v-model.trim="data.confirmPassword"
          />
          <button
            type="button"
            class="password_visibility_toggler"
            @click="togglePasswordVisibility"
          >
            <i class="fal fa-eye"></i>
            <i class="fal fa-eye-slash"></i>
          </button>
        </div> -->
                <!-- END:: CONFIRM PASSWORD INPUT GROUP -->

                <!-- START:: POLICY TITLE -->
                <p class="policy_title">
                    بمجرد إنشاء الحساب هذا دليل على موافقتك على
                    <button type="button" @click="toggleTermsModal">
                        {{ $t("BUTTONS.terms") }}
                    </button>
                    الخاصة بالتطبيق
                </p>
                <!-- END:: POLICY TITLE -->

                <!-- START:: SUBMIT BUTTON WRAPPER -->
                <div class="btn_wrapper">
                    <button>
                        {{ $t("BUTTONS.submit") }}
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

        <!-- START:: TERMS MODAL -->
        <TermsAndConditionsModal
            :modalApperanceData="termsModalIsOpen"
            @controleModalApperance="toggleTermsModal"
        />
        <!-- END:: TERMS MODAL -->
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters, mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

// START:: IMPORTING MODALS
import TermsAndConditionsModal from "../modals/TermsModal.vue";
// END:: IMPORTING MODALS

export default {
    name: "RegisterForm",

    components: {
        TermsAndConditionsModal,
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

            // START:: MODALS HANDLING DATA
            termsModalIsOpen: false,
            // END:: MODALS HANDLING DATA

            // START:: COUNTRIES KEYS MENU HANDLING DATA
            countryKiesMenuIsOpen: false,
            // END:: COUNTRIES KEYS MENU HANDLING DATA

            // START:: DATA
            data: {
                name: null,
                email: null,
                phone: null,
                password: null,
                confirmPassword: null,
            },
            // END:: DATA
        };
    },

    methods: {
        // START:: VUEX SET AUTHENTICATED USER DATA
        ...mapActions("AuthenticationModule", ["setAuthenticatedUserData"]),
        // END:: VUEX SET AUTHENTICATED USER DATA

        // START:: TOGGLE TERMS MODAL METHOD
        toggleTermsModal() {
            this.termsModalIsOpen = !this.termsModalIsOpen;
        },
        // END:: TOGGLE TERMS MODAL METHOD

        // START:: TOGGLE PASSWORD VISIBILITY METHOD
        // togglePasswordVisibility(e) {
        //   let passwordElement = e.currentTarget.parentElement.children[0];
        //   let passwordTogglerBtn = e.currentTarget;
        //   if (passwordElement.type == "password") {
        //     passwordElement.type = "text";
        //     passwordTogglerBtn.classList.add("password_is_visible");
        //   } else if (passwordElement.type == "text") {
        //     passwordElement.type = "password";
        //     passwordTogglerBtn.classList.remove("password_is_visible");
        //   }
        // },
        // END:: TOGGLE PASSWORD VISIBILITY METHOD

        // START:: VALIDATE FORM INPUTS
        validateFormInputs() {
            this.isWaitingRequest = true;
            var password = "11111111";
            this.data.password = password;
            this.data.confirmPassword = password;

            if (!this.data.name) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.name"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.data.email) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.email"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.data.phone) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.phone"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.data.password) {
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
            } else if (!this.data.confirmPassword) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.password"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (this.data.confirmPassword.length < 6) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.password_length"),
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (this.data.password != this.data.confirmPassword) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.not_equal_passwords"),
                    messageSize: "22",
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
            // START:: APPEND STATIC DATA
            theData.append("type", "ios");
            theData.append("device_token", "static_device_token");
            // END:: APPEND STATIC DATA

            // START:: APPEND GENERAL DATA
            theData.append("user_name", this.data.name);
            theData.append("email", this.data.email);
            theData.append("phone", this.data.phone);
            theData.append("password", this.data.password);
            theData.append("password_confirmation", this.data.confirmPassword);
            // END:: APPEND GENERAL DATA

            // START:: AXIOS
            this.$axios({
                method: "POST",
                url: `client-register`,
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
                    this.setAuthenticatedUserData({
                        verificationCode: res.data.dev_message,
                        phone: res.data.data.phone,
                        type: res.data.data.user_type,
                    });
                    setTimeout(() => {
                        this.clearFormInputs();
                        this.$router.replace(
                            "/auth/phone-verification/activate-account"
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

            // END:: AXIOS
        },
        // END:: SUBMIT FORM

        // START:: CLEAR FORM DATA
        clearFormInputs() {
            this.data.phone = null;
            this.data.password = null;
        },
        // END:: CLEAR FORM DATA
    },

    mounted() {
        // START:: FIRE METHODS
        // END:: FIRE METHODS
    },
};
</script>
