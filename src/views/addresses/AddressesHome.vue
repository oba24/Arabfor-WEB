<template>
    <div class="addresses_content_wrapper">
        <!-- START:: BREADCRUMB -->
        <Breadcrumb :breadcrumbOptions="breadcrumbData" />
        <!-- END:: BREADCRUMB -->

        <div class="container">
            <transition name="fadeInUp">
                <router-view />
            </transition>
        </div>
    </div>
</template>

<script>
// START:: IMPORTING BREADCRUMB
import Breadcrumb from "@/components/structure/TheBreadcrumb.vue";
// END:: IMPORTING BREADCRUMB

export default {
    name: "AddressesHome",

    components: {
        Breadcrumb,
    },

    data() {
        return {
            // START:: BREADCRUMB DATA
            breadcrumbData: {
                pageTitle: "العناوين",
                items: [
                    {
                        text: this.$t("TITLES.home"),
                        disabled: false,
                        href: "/",
                    },
                    {
                        text: "العناوين",
                        disabled: true,
                        href: "",
                    },
                ],
            },
            // END:: BREADCRUMB DATA
        };
    },
};
</script>
