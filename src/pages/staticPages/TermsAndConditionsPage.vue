<template>
    <div class="wrapper w-100">
        <!-- START:: BREADCRUMB -->
        <Breadcrumb :breadcrumbOptions="breadcrumbData" />
        <!-- END:: BREADCRUMB -->

        <!-- START:: CONTENT_WRAPPER -->
        <div class="privacy_policy_page_wrapper" v-if="getData.terms != ''">
            <!-- START:: CONTENT -->
            <div class="container">
                <div class="page_content" v-html="getData.terms"></div>
            </div>
            <!-- END:: CONTENT -->
        </div>
        <!-- END:: CONTENT_WRAPPER -->

        <!-- START:: EMPTY CONTENT MESSAGE -->
        <EmptyContent v-else />
        <!-- START:: EMPTY CONTENT MESSAGE -->
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
                pageTitle: this.$t("TITLES.termsAndConditions"),
                items: [
                    {
                        text: this.$t("TITLES.home"),
                        disabled: false,
                        href: "/",
                    },
                    {
                        text: this.$t("TITLES.termsAndConditions"),
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
                url: `terms`,
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
