<template>
    <div class="breadcrumb_wrapper">
        <!-- START:: PAGE TITLE -->
        <h2 class="page_title">
            {{ breadcrumbOptions.pageTitle }}
        </h2>
        <!-- END:: PAGE TITLE -->

        <!-- START:: BREADCRUMB -->
        <v-breadcrumbs :items="breadcrumbOptions.items">
            <template v-slot:divider>
                <i class="fal fa-angle-left" v-show=" getAppLocale == 'ar' "></i>
                <i class="fal fa-angle-right" v-show=" getAppLocale == 'en' "></i>
            </template>
        </v-breadcrumbs>
        <!-- END:: BREADCRUMB -->
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters } from "vuex";
// END:: IMPORTING VUEX HELPERS

export default {
    name: "Breadcrumb",

    props: {
        breadcrumbOptions: {
            type: Object,
            required: true,
        },
    },

    computed: {
        // START:: VUEX GET APP LANG
        ...mapGetters("AppLangModule", ["getAppLocale"]),
        // END:: VUEX GET APP LANG
    },
};
</script>
