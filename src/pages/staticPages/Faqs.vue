<template>
    <div>
        <!-- START:: BREADCRUMB -->
        <Breadcrumb :breadcrumbOptions="breadcrumbData" />
        <!-- END:: BREADCRUMB -->

        <!-- START:: PAGE CONTENT -->
        <div class="about_us_page_content_wrapper">
            <div class="container">
                <!-- START:: ABOUT COMPANY -->
                <div class="about_company_content">
                    <!-- START:: ========== SECTION TITLE ==========  -->
                    <!-- <div class="section_title_wrapper text-center">
                        <h2 class="section_title">
                            {{ $t("FOOTER.faqs") }}
                        </h2>
                    </div> -->
                    <!-- END:: ========== SECTION TITLE ==========  -->

                    <!-- START:: ========== SECTION CONTENT ==========  -->
                    <div
                        class="section_text_content_wrapper my-5"
                        v-if="getData.length > 0"
                    >
                        <div
                            class="row align-items-center justify-content-center"
                        >
                            <div class="col-md-8">
                                <v-expansion-panels>
                                    <v-expansion-panel
                                        v-for="(item, i) in getData"
                                        :key="item.id"
                                    >
                                        <v-expansion-panel-header>
                                            {{ ++i + "-" + item.question }}
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content>
                                            {{ item.answer }}
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </div>
                        </div>
                    </div>
                    <!-- END:: ========== SECTION CONTENT ==========  -->

                    <!-- START:: EMPTY CONTENT MESSAGE -->
                    <EmptyContent v-else />
                    <!-- START:: EMPTY CONTENT MESSAGE -->
                </div>
                <!-- END:: ABOUT COMPANY -->
            </div>
        </div>
        <!-- END:: PAGE CONTENT -->
    </div>
</template>

<script>
// START:: IMPORTING BREADCRUMB
import Breadcrumb from "@/components/structure/TheBreadcrumb.vue";
// END:: IMPORTING BREADCRUMB

import EmptyContent from "@/components/ui/emptyMessages/EmptyContent";

export default {
    name: "AboutUsPage",
    components: {
        Breadcrumb,
        EmptyContent,
    },
    data() {
        return {
            // START:: HANDLING SKELETON LOADER APPERANCE
            isLoading: false,
            // END:: HANDLING SKELETON LOADER APPERANCE

            // START:: BREADCRUMB DATA
            breadcrumbData: {
                pageTitle: this.$t("FOOTER.faqs"),
                items: [
                    {
                        text: this.$t("TITLES.home"),
                        disabled: false,
                        href: "/",
                    },
                    {
                        text: this.$t("FOOTER.faqs"),
                        disabled: true,
                        href: "",
                    },
                ],
            },
            // END:: BREADCRUMB DATA

            // START: DATA STATIC PAGES
            getData: null,
            // END: DATA STATIC PAGES
        };
    },

    methods: {
        // START:: GET REQUEST
        getDataRequest() {
            this.$axios({
                method: "GET",
                url: `common-questions`,
            }).then((res) => {
                this.getData = res.data.data;
            });
        },
        // START:: GET REQUEST
    },

    mounted() {
        this.getDataRequest();
    },
};
</script>
