<template>
    <div>
        <!-- START:: BREADCRUMB -->
        <Breadcrumb :breadcrumbOptions="breadcrumbData" />
        <!-- END:: BREADCRUMB -->

        <!-- START:: PAGE CONTENT -->
        <div class="about_us_page_content_wrapper">
            <div class="container">
                <!-- START:: ABOUT COMPANY -->
                <div class="about_company_content" v-if="getData.about != ''">
                    <!-- START:: ========== SECTION TITLE ==========  -->
                    <div class="section_title_wrapper">
                        <h2 class="section_title">
                            {{ $t("TITLES.aboutCompany") }}
                        </h2>
                    </div>
                    <!-- END:: ========== SECTION TITLE ==========  -->

                    <!-- START:: ========== SECTION CONTENT ==========  -->
                    <div
                        class="section_text_content_wrapper"
                        v-html="getData.about"
                    ></div>
                    <!-- END:: ========== SECTION CONTENT ==========  -->
                </div>
                <!-- END:: ABOUT COMPANY -->

                <!-- START:: EMPTY CONTENT MESSAGE -->
                <EmptyContent v-else />
                <!-- START:: EMPTY CONTENT MESSAGE -->
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
                pageTitle: this.$t("TITLES.aboutUs"),
                items: [
                    {
                        text: this.$t("TITLES.home"),
                        disabled: false,
                        href: "/",
                    },
                    {
                        text: this.$t("TITLES.aboutUs"),
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
                url: `about`,
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
