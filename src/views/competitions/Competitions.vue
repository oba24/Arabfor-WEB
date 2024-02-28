<template>
    <div class="competition_content_wrapper" v-if="pageData">
        <!-- START:: BREADCRUMB -->
        <Breadcrumb :breadcrumbOptions="breadcrumbData" />
        <!-- END:: BREADCRUMB -->

        <div class="conteiner">
            <!-- START:: QUESTION -->
            <div class="row justify-content-center">
                <!-- START:: QUESTION CARD -->
                <div class="col-lg-5">
                    <div class="question_card">
                        <h5 class="question_title">سؤال الشهر</h5>
                        <h3 class="question_desc">{{ pageData.question }}</h3>
                    </div>

                    <div class="answer_wrapper" v-if="!pageData.is_answer">
                        <input
                            class="form-control"
                            type="text"
                            placeholder="الإجابة"
                            v-model.trim="answer"
                        />
                        <button
                            class="answer_code_btn"
                            type="button"
                            @click="validateFormInputs"
                        >
                            {{ $t("BUTTONS.send") }}
                        </button>
                    </div>
                    <div class="answer_hint" v-else>
                        لقد قمت بالإجابة علي هذا السؤال
                    </div>
                </div>
                <!-- END:: QUESTION CARD -->
            </div>
            <!-- END:: QUESTION -->

            <!-- START:: WINNERS -->
            <div class="row justify-content-center">
                <div class="col-lg-6 mt-4">
                    <!-- START:: TITLES -->
                    <h4 class="winners_title">
                        قائمة الفائزين بشهر {{ pageData.month }}
                    </h4>
                    <!-- END:: TITLES -->

                    <!-- START:: WINNERS LIST -->
                    <div class="row w-100">
                        <!-- START:: WINNER CARD -->
                        <div class="col-lg-4 my-3">
                            <div class="winner_card">
                                <h5 class="winner_position">المركز الأول</h5>
                                <div class="image_wrapper">
                                    <img
                                        :src="
                                            pageData.previous_month_winners
                                                .first_winner.image_url
                                        "
                                        :alt="
                                            pageData.previous_month_winners
                                                .first_winner.name
                                        "
                                        width="100"
                                        height="100"
                                    />
                                </div>
                                <h4 class="winner_name">
                                    {{
                                        pageData.previous_month_winners
                                            .first_winner.name
                                    }}
                                </h4>
                                <h6 class="prize">
                                    {{
                                        pageData.previous_month_winners
                                            .first_winner.prize
                                    }}
                                </h6>
                            </div>
                        </div>
                        <!-- END:: WINNER CARD -->

                        <!-- START:: WINNER CARD -->
                        <div class="col-lg-4 my-3">
                            <div class="winner_card">
                                <h5 class="winner_position">المركز الثاني</h5>
                                <div class="image_wrapper">
                                    <img
                                        :src="
                                            pageData.previous_month_winners
                                                .second_winner.image_url
                                        "
                                        :alt="
                                            pageData.previous_month_winners
                                                .second_winner.name
                                        "
                                        width="100"
                                        height="100"
                                    />
                                </div>
                                <h4 class="winner_name">
                                    {{
                                        pageData.previous_month_winners
                                            .second_winner.name
                                    }}
                                </h4>
                                <h6 class="prize">
                                    {{
                                        pageData.previous_month_winners
                                            .second_winner.prize
                                    }}
                                </h6>
                            </div>
                        </div>
                        <!-- END:: WINNER CARD -->

                        <!-- START:: WINNER CARD -->
                        <div class="col-lg-4 my-3">
                            <div class="winner_card">
                                <h5 class="winner_position">المركز الثالث</h5>
                                <div class="image_wrapper">
                                    <img
                                        :src="
                                            pageData.previous_month_winners
                                                .third_winner.image_url
                                        "
                                        :alt="
                                            pageData.previous_month_winners
                                                .third_winner.name
                                        "
                                        width="100"
                                        height="100"
                                    />
                                </div>
                                <h4 class="winner_name">
                                    {{
                                        pageData.previous_month_winners
                                            .third_winner.name
                                    }}
                                </h4>
                                <h6 class="prize">
                                    {{
                                        pageData.previous_month_winners
                                            .third_winner.prize
                                    }}
                                </h6>
                            </div>
                        </div>
                        <!-- END:: WINNER CARD -->
                    </div>
                    <!-- END:: WINNERS LIST -->

                    <!-- START:: ROUTE WRAPER -->
                    <div class="route_wrapper">
                        <router-link to="/all-winners">
                            فائزين الأشهر الماضية
                        </router-link>
                    </div>
                    <!-- END:: ROUTE WRAPER -->
                </div>
            </div>
            <!-- END:: WINNERS -->
        </div>
    </div>
</template>

<script>
// START:: IMPORTING BREADCRUMB
import Breadcrumb from "@/components/structure/TheBreadcrumb.vue";
// END:: IMPORTING BREADCRUMB
export default {
    name: "Competitions",

    data() {
        return {
            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA
            authedUserToken: localStorage.getItem("saudi_marche_user_token"),

            // START:: BREADCRUMB DATA
            breadcrumbData: {
                pageTitle: this.$t("NAVBAR.competitions"),
                items: [
                    {
                        text: this.$t("TITLES.home"),
                        disabled: false,
                        href: "/",
                    },
                    {
                        text: this.$t("NAVBAR.competitions"),
                        disabled: true,
                        href: "",
                    },
                ],
            },
            // END:: BREADCRUMB DATA

            // START:: ANSWER DATA
            answer: null,
            // END:: ANSWER DATA

            // STAR/T:: PAGE DATA
            pageData: null,
            // END:: PAGE DATA
        };
    },

    components: {
        Breadcrumb,
    },

    methods: {
        // START:: GET PAGE DATA
        getPageData() {
            // START:: SEND REQUEST
            this.$axios({
                method: "GET",
                url: `client/competition`,
            })
                .then((res) => {
                    this.pageData = res.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
            // END:: SEND REQUEST
        },
        // END:: GET PAGE DATA

        // START:: VALIDATE FORM INPUTS
        validateFormInputs() {
            this.isWaitingRequest = true;

            if (!this.answer) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: "حقل الإجابة لايمكن ان يكون فارغ",
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
            theData.append("answer", this.answer);
            // END:: APPEND DATA

            // START:: SEND REQUEST
            this.$axios({
                method: "POST",
                url: `client/competition/add_answer/${this.pageData.id}`,
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
                    this.answer = null;
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
        // END:: SUBMIT FORM
    },

    computed: {
        userAuthStatus() {
            return this.authedUserToken ? true : false;
        },
    },

    created() {
        if (!this.userAuthStatus) {
            this.$router.push("/auth");
        }
        // START:: FIRE METHODS
        this.getPageData();
        // END:: FIRE METHODS
    },
};
</script>
