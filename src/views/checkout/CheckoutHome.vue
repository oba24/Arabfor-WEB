<template>
    <div class="checkout_content_wrapper">
        <!-- START:: BREADCRUMB -->
        <Breadcrumb :breadcrumbOptions="breadcrumbData" />
        <!-- END:: BREADCRUMB -->

        <transition mode="fadeInUp">
            <router-view />
        </transition>
    </div>
</template>

<script>
// START:: IMPORTING BREADCRUMB
import Breadcrumb from "@/components/structure/TheBreadcrumb.vue";
// END:: IMPORTING BREADCRUMB

export default {
    name: "CheckoutHome",

    components: {
        Breadcrumb,
    },

    data() {
        return {
            // START:: BREADCRUMB DATA
            breadcrumbData: {
                pageTitle: "الدفع",
                items: [
                    {
                        text: this.$t("TITLES.home"),
                        disabled: false,
                        href: "/",
                    },
                    {
                        text: "الدفع",
                        disabled: true,
                        href: "",
                    },
                ],
            },
            // END:: BREADCRUMB DATA
        }
    },
};
</script>
