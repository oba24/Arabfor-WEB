<template>
    <div class="teacher_modal_wrapper">
        <BaseModal
            :show="modalApperanceData"
            @controleModalApperance="controleModalApperance"
        >
            <template #modal>
                <div class="teacher_modal_wrapper">
                    <!-- START:: INSTRUCTOR INFO -->
                    <div class="instructor_info_wrapper my-2">
                        <div class="instructor_info">
                            <div class="card_wrapper">
                                <!-- START:: IMAGE -->
                                <div class="image_wrapper">
                                    <img
                                        :src="teacherData.image"
                                        alt="Instructor Image"
                                        width="80"
                                        height="80"
                                    />
                                </div>
                                <!-- END:: IMAGE -->

                                <!-- START:: NAME AND COURSES COUNT -->
                                <div class="name_and_count">
                                    <h3 class="name">
                                        {{ teacherData.fullname }}
                                    </h3>
                                    <h4
                                        class="courses_count"
                                        v-if="
                                            $route.name !=
                                            'search_result_teacher'
                                        "
                                    >
                                        {{ teacherData.num_courses }} كورس
                                    </h4>
                                </div>
                                <!-- END:: NAME AND COURSES COUNT -->
                            </div>

                            <div class="card_wrapper">
                                <!-- START:: CHAT ROUTE WRAPPER -->
                                <router-link
                                    :to="`/chat/${teacherData.id}`"
                                    class="chat_route"
                                >
                                    <i class="fal fa-comment-lines"></i>
                                </router-link>
                                <!-- END:: CHAT ROUTE WRAPPER -->
                            </div>
                        </div>
                    </div>
                    <!-- END:: INSTRUCTOR INFO -->
                    <!-- START:: ABOUT INSTRUCTOR -->
                    <div
                        class="about_instructor my-2"
                        v-if="$route.name == 'search_result_teacher'"
                    >
                        <h3 class="about_instructor_title">
                            {{ $t("TITLES.phone_teacher") }}
                        </h3>

                        <div class="text_wrapper">
                            <a
                                :href="'tel:' + teacherData.phone"
                                target="_blank"
                            >
                                {{ teacherData.phone }}
                            </a>
                        </div>
                    </div>
                    <!-- END:: ABOUT INSTRUCTOR -->
                    <!-- START:: ABOUT INSTRUCTOR -->
                    <div class="about_instructor my-2">
                        <h3 class="about_instructor_title">
                            {{ $t("TITLES.about_teacher") }}
                        </h3>

                        <div class="text_wrapper">
                            {{ teacherData.desc }}
                        </div>
                    </div>
                    <!-- END:: ABOUT INSTRUCTOR -->

                    <!-- START:: PARENT INFO FORM -->
                    <div
                        class="parent_info_form my-2"
                        v-if="$route.name != 'search_result_teacher'"
                    >
                        <h3 class="parent_info_form_title">
                            {{ $t("TITLES.parent_info") }}
                        </h3>
                        <h3 class="parent_info_form_subtitle">
                            {{ $t("TITLES.parent_info_form_subtitle") }}
                        </h3>
                        <form @submit.prevent="validateFormInputs">
                            <!-- START:: PHONE INPUT GROUP -->
                            <div
                                class="input_wrapper phone_input_wrapper"
                                dir="ltr"
                            >
                                <div
                                    class="selected_key_wrapper"
                                    @click="toggleCountryKeysMenu"
                                    v-if="countriesData.selectedCountry"
                                >
                                    <div class="flag_wrapper">
                                        <img
                                            :src="
                                                countriesData.selectedCountry
                                                    .flag
                                            "
                                            :alt="
                                                countriesData.selectedCountry
                                                    .name
                                            "
                                            width="30"
                                            height="20"
                                        />
                                    </div>
                                    <div class="key_wrapper" dir="ltr">
                                        {{ countriesData.selectedCountry.key }}
                                    </div>

                                    <transition name="fadeInUp" mode="out-in">
                                        <div
                                            class="country_keys_menu_wrapper"
                                            v-if="countryKiesMenuIsOpen"
                                        >
                                            <ul
                                                class="country_keys_menu"
                                                v-if="countriesData"
                                            >
                                                <li
                                                    class="menu_item"
                                                    v-for="countryKey in countriesData.allCountries"
                                                    :key="countryKey.id"
                                                    @click="
                                                        changeSelectedPhoneCode(
                                                            countryKey
                                                        )
                                                    "
                                                >
                                                    <div class="flag_wrapper">
                                                        <img
                                                            :src="
                                                                countryKey.flag
                                                            "
                                                            :alt="
                                                                countryKey.name
                                                            "
                                                            width="30"
                                                            height="20"
                                                        />
                                                    </div>
                                                    <div
                                                        class="key_wrapper"
                                                        dir="ltr"
                                                    >
                                                        {{ countryKey.key }}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </transition>
                                </div>

                                <input
                                    type="number"
                                    class="form-control"
                                    :placeholder="$t('PLACEHOLDERS.phone')"
                                    v-model="parentPhoneNumber"
                                    @focus="countryKiesMenuIsOpen = false"
                                />
                            </div>
                            <!-- END:: PHONE INPUT GROUP -->
                        </form>
                    </div>

                    <!-- START:: SUBMIT BUTTON WRAPPER -->
                    <div
                        class="btn_wrapper"
                        v-if="$route.name != 'search_result_teacher'"
                    >
                        <button class="mt-0" @click="validateFormInputs">
                            {{ $t("BUTTONS.send_request") }}
                            <span
                                class="btn_loader"
                                v-if="isWaitingRequest"
                            ></span>
                        </button>
                    </div>
                    <!-- END:: SUBMIT BUTTON WRAPPER -->
                    <!-- END:: PARENT INFO FORM -->
                </div>
            </template>
        </BaseModal>

        <!-- START:: SUCCESS MODAL -->
        <SuccessModal
            :modalApperanceData="successModalIsOpen"
            @controleModalApperance="toggleSuccessModal"
        >
            <template #title>
                {{ $t("TITLES.done_withdraw") }}
            </template>
            <template #sub_title>
                {{ $t("TITLES.review_bank") }}
            </template>
            <template #success_btn>
                <router-link to="/">
                    {{ $t("TITLES.home") }}
                </router-link>
            </template>
        </SuccessModal>
        <!-- END:: SUCCESS MODAL -->
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapActions, mapGetters } from "vuex";
// END:: IMPORTING VUEX HELPERS

// START:: IMPORTING BASE MODAL
import BaseModal from "../ui/BaseModal.vue";
// END:: IMPORTING BASE MODAL

// START:: IMPORTING MODALS
import SuccessModal from "../../components/modals/SuccessModal.vue";
// END:: IMPORTING MODALS

export default {
    name: "TeacherModal",

    components: {
        BaseModal,
        SuccessModal,
    },

    props: ["modalApperanceData", "teacherData"],

    emits: ["controleModalApperance"],

    computed: {
        // START:: VUEX GET API GETS DATA
        ...mapGetters("ApiGetsModule", ["countriesData"]),
        // END:: VUEX GET API GETS DATA
    },

    data() {
        return {
            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

            // START:: COUNTRIES KEYS MENU HANDLING DATA
            countryKiesMenuIsOpen: false,
            // END:: COUNTRIES KEYS MENU HANDLING DATA

            // START:: MODALS HANDLING DATA
            successModalIsOpen: false,
            // END:: MODALS HANDLING DATA

            // START:: PARENT PHONE NUMBER
            parentPhoneNumber: null,
            // END:: PARENT PHONE NUMBER
        };
    },

    methods: {
        // START:: CONTROLE MODAL APPERANCE
        controleModalApperance() {
            this.$emit("controleModalApperance");
        },
        // END:: CONTROLE MODAL APPERANCE

        // START:: VUEX API GETS ACTIONS
        ...mapActions("ApiGetsModule", [
            "getCountries",
            "changeSelectedPhoneCode",
        ]),
        // END:: VUEX API GETS ACTIONS

        // START:: TOGGLE SUCCESS MODAL METHOD
        toggleSuccessModal() {
            this.successModalIsOpen = !this.successModalIsOpen;
        },
        // END:: TOGGLE SUCCESS MODAL METHOD

        // START:: TOGGLE COUNTRIES KEYS MENU
        toggleCountryKeysMenu() {
            this.countryKiesMenuIsOpen = !this.countryKiesMenuIsOpen;
        },
        // END:: TOGGLE COUNTRIES KEYS MENU

        // START:: VALIDATE FORM INPUTS
        validateFormInputs() {
            this.isWaitingRequest = true;
            if (!this.parentPhoneNumber) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: this.$t("VALIDATION.phone_number"),
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
            // START:: APPEND DATA
            theData.append("teacher_id", this.teacherData.id);
            theData.append("country_id", this.countriesData.selectedCountry.id);
            theData.append("phone", this.parentPhoneNumber);
            // END:: APPEND DATA

            // START:: SEND REQUEST
            this.$axios
                .post("student/relay_request", theData, {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("saudi_marche_user_token"),
                        lang: localStorage.getItem("saudi_marche_language"),
                        "cache-control": "no-cache",
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    this.isWaitingRequest = false;

                    this.$iziToast.success({
                        timeout: 2000,
                        message: res.data.message,
                        messageSize: "22",
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });

                    this.controleModalApperance();
                    this.toggleSuccessModal();
                    return;
                })
                .catch((err) => {
                    this.isWaitingRequest = false;

                    this.$iziToast.error({
                        timeout: 2000,
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                        message: err.response.data.message,
                        messageSize: "22",
                    });
                    return;
                });
            // END:: SEND REQUEST
        },
        // END:: SUBMIT FORM
    },

    mounted() {
        // START:: FIRE METHODS
        this.getCountries();
        // END:: FIRE METHODS
    },
};
</script>
