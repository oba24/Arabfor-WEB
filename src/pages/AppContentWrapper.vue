<template>
    <div class="app_structure_wrapper">
        <!-- START:: HEADER -->
        <TheHeader />
        <!-- END:: HEADER -->

        <!-- START:: APP ROUTER VIEW -->
        <section
            class="main_content"
            style="background-color: white !important"
        >
            <transition name="fadeInUp" mode="out-in">
                <router-view />
            </transition>
        </section>
        <!-- END:: APP ROUTER VIEW -->

        <!-- START:: FOOTER -->
        <TheFooter />
        <!-- END:: FOOTER -->
    </div>
</template>

<script>
// START:: IMPORTING LAYOUTS
import TheHeader from "@/components/layouts/TheHeader.vue";
import TheFooter from "@/components/layouts/TheFooter.vue";
// END:: IMPORTING LAYOUTS

export default {
    name: "AppContentWrapper",

    components: {
        TheHeader,
        TheFooter,
    },
};
</script>
<style>
.app_structure_wrapper {
    background-color: white !important;
}
</style>
