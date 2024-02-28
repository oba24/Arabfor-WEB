<template>
    <div>
        <!-- START:: FORM TITLE -->
        <div class="form_title_wrapper">
            <h2 class="form_title">{{ $t("TITLES.login") }}</h2>
            <h3 class="form_subtitle">{{ $t("TITLES.loginSubtitle") }}</h3>
        </div>
        <!-- END:: FORM TITLE -->

        <!-- START:: FORM -->
        <div class="form_wrapper">
            <form class="mt-4" @submit.prevent="validateFormInputs">
                <!-- START:: PHONE INPUT GROUP -->
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
                <!-- END:: PHONE INPUT GROUP -->

                <!-- START:: PASSWORD INPUT GROUP -->
                <!-- <div class="input_wrapper password_input_wrapper">
          <input
            type="password"
            class="form-control"
            :placeholder="$t('PLACEHOLDERS.password')"
            v-model.trim="data.password"
            autocomplete="off"
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

                <!-- START:: FORGET PASSWORD ROUTE WRAPPER -->
                <!-- <router-link
          to="/auth/reset-password-phone-number"
          class="forget_pass_route"
        >
          {{ $t("BUTTONS.forget_password") }}
        </router-link> -->
                <!-- END:: FORGET PASSWORD ROUTE WRAPPER -->

                <!-- START:: SUBMIT BUTTON WRAPPER -->
                <div class="btn_wrapper">
                    <button class="mt-0">
                        {{ $t("BUTTONS.login") }}
                        <span class="btn_loader" v-if="isWaitingRequest"></span>
                    </button>
                </div>
                <!-- END:: SUBMIT BUTTON WRAPPER -->

                <!-- START:: LOGIN ROUTE WRAPPER -->
                <router-link to="/auth/register" class="register_route">
                    <span>{{ $t("BUTTONS.dont_have_account") }}</span>
                    <span> {{ $t("BUTTONS.register") }}</span>
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
    name: "LoginForm",

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
                phone: null,
                // password: null,
            },
            // END:: LOGIN DATA

            // START:: AUTHED USER TOKEN DATA
            authedUserToken: localStorage.getItem("saudi_marche_user_token"),
            // END:: AUTHED USER TOKEN DATA
        };
    },

    mounted() {
        // if(this.authedUserToken != null) {
        //     this.$router.replace("/");
        // }
    },

    methods: {
        // START:: VUEX SET AUTHENTICATED USER DATA
        ...mapActions("AuthenticationModule", ["setAuthenticatedUserData"]),
        // END:: VUEX SET AUTHENTICATED USER DATA

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

        // START:: VALIDATE LOGIN FORM INPUTS
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
                //   } else if (!this.data.password) {
                //     this.isWaitingRequest = false;
                //     this.$iziToast.error({
                //       timeout: 2000,
                //       message: this.$t("VALIDATION.password"),
                //       position: this.$t("iziToastConfigs.position"),
                //       rtl: this.$t("iziToastConfigs.dir"),
                //     });
                //     return;
                //   } else if (this.data.password.length < 6) {
                //     this.isWaitingRequest = false;
                //     this.$iziToast.error({
                //       timeout: 2000,
                //       message: this.$t("VALIDATION.password_length"),
                //       position: this.$t("iziToastConfigs.position"),
                //       rtl: this.$t("iziToastConfigs.dir"),
                //     });
                //     return;
            } else {
                this.submitForm();
            }
        },
        // END:: VALIDATE LOGIN FORM INPUTS

        // START:: SUBMIT LOGIN FORM
        submitForm() {
            this.isWaitingRequest = true;

            const theData = new FormData();
            // START:: APPEND STATIC DATA
            theData.append("type", "ios");
            theData.append("device_token", "static_device_token");
            theData.append("phone", this.data.phone);
            //   theData.append("password", this.data.password);
            // END:: APPEND STATIC DATA

            // START:: SEND REQUEST
            this.$axios({
                method: "POST",
                url: `login`,
                data: theData,
            })
                .then((res) => {
                    this.isWaitingRequest = false;
                    //   this.$iziToast.success({
                    //     timeout: 2000,
                    //     message: this.$t("VALIDATION.login_success"),
                    //     position: this.$t("iziToastConfigs.position"),
                    //     rtl: this.$t("iziToastConfigs.dir"),
                    //   });
                    //   setTimeout(() => {
                    //     this.setAuthenticatedUserData({
                    //       token: res.data.data.token.access_token,
                    //       phone: res.data.data.phone,
                    //       type: res.data.data.user_type,
                    //       avatar: res.data.data.image,
                    //       userName: res.data.data.user_name,
                    //     });
                    //   }, 1000);
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

                    //   setTimeout(() => {
                    //     this.clearFormInputs();
                    //     this.$router.replace("/");
                    //     location.reload();
                    //   }, 1000);
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
        // END:: SUBMIT LOGIN FORM

        // START:: CLEAR LOGIN FORM DATA
        clearFormInputs() {
            this.data.phone = null;
            //   this.data.password = null;
        },
        // END:: CLEAR LOGIN FORM DATA
    },
};
</script>
