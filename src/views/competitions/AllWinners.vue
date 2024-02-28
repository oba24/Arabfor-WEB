<template>
    <div class="all_winners_content_wrapper" v-if="allWinnersData">
        <!-- START:: BREADCRUMB -->
        <Breadcrumb :breadcrumbOptions="breadcrumbData" />
        <!-- END:: BREADCRUMB -->
        <div class="container">
            <div class="row">
                <!-- START:: MONTH CARD WRAPPER -->
                <div
                    class="col-lg-6"
                    v-for="item in allWinnersData"
                    :key="item.id"
                >
                    <div class="competition_month_card">
                        <!-- START:: QUESTIONS DETAILS -->
                        <h4 class="question_month">
                            سؤال شهر {{ item.month }}
                        </h4>
                        <h3 class="question_desc">{{ item.question }}</h3>
                        <h5 class="answer">{{ item.correct_answer }}</h5>
                        <!-- END:: QUESTIONS DETAILS -->

                        <!-- START:: WINNERS LIST -->
                        <div class="row w-100">
                            <!-- START:: WINNER CARD -->
                            <div class="col-lg-4">
                                <div class="winner_card">
                                    <h6 class="winner_position">
                                        المركز الأول
                                    </h6>
                                    <div class="image_wrapper">
                                        <img
                                            :src="item.first_winner.image_url"
                                            :alt="item.first_winner.name"
                                            width="85"
                                            height="85"
                                        />
                                    </div>
                                    <h6 class="winner_name">
                                        {{ item.first_winner.name }}
                                    </h6>
                                    <h6 class="prize">
                                        {{ item.first_winner.prize }}
                                    </h6>
                                </div>
                            </div>
                            <!-- END:: WINNER CARD -->

                            <!-- START:: WINNER CARD -->
                            <div class="col-lg-4">
                                <div class="winner_card">
                                    <h6 class="winner_position">
                                        المركز الثاني
                                    </h6>
                                    <div class="image_wrapper">
                                        <img
                                            :src="item.second_winner.image_url"
                                            :alt="item.second_winner.name"
                                            width="85"
                                            height="85"
                                        />
                                    </div>
                                    <h6 class="winner_name">
                                        {{ item.second_winner.name }}
                                    </h6>
                                    <h6 class="prize">
                                        {{ item.second_winner.prize }}
                                    </h6>
                                </div>
                            </div>
                            <!-- END:: WINNER CARD -->

                            <!-- START:: WINNER CARD -->
                            <div class="col-lg-4">
                                <div class="winner_card">
                                    <h6 class="winner_position">
                                        المركز الثالث
                                    </h6>
                                    <div class="image_wrapper">
                                        <img
                                            :src="item.third_winner.image_url"
                                            :alt="item.third_winner.name"
                                            width="85"
                                            height="85"
                                        />
                                    </div>
                                    <h6 class="winner_name">
                                        {{ item.third_winner.name }}
                                    </h6>
                                    <h6 class="prize">
                                        {{ item.third_winner.prize }}
                                    </h6>
                                </div>
                            </div>
                            <!-- END:: WINNER CARD -->
                        </div>
                        <!-- END:: WINNERS LIST -->
                    </div>
                </div>
                <!-- END:: MONTH CARD WRAPPER -->
            </div>
        </div>
    </div>
</template>

<script>
// START:: IMPORTING BREADCRUMB
import Breadcrumb from "@/components/structure/TheBreadcrumb.vue";
// END:: IMPORTING BREADCRUMB

export default {
    name: "AllWinners",

    components: {
        Breadcrumb,
    },


    data() {
        return {
            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

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
                        disabled: false,
                        href: "/competitions",
                    },
                    {
                        text: this.$t("NAVBAR.winners"),
                        disabled: true,
                        href: "",
                    },
                ],
            },
            // END:: BREADCRUMB DATA

            // STAR/T:: PAGE DATA
            allWinnersData: null,
            // END:: PAGE DATA
        };
    },

    methods: {
        // START:: GET PAGE DATA
        getPageData() {
            // START:: SEND REQUEST
            this.$axios({
                method: "GET",
                url: `client/competition/all_competition`,
            })
                .then((res) => {
                    this.allWinnersData = res.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
            // END:: SEND REQUEST
        },
        // END:: GET PAGE DATA
    },

    created() {
        // START:: FIRE METHODS
        this.getPageData();
        // END:: FIRE METHODS
    },
};
</script>
