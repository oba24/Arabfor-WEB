<template>
    <div class="auth_wrapper">
        <!-- START:: PARTICLES -->
        <vue-particles
            color="#5fa59c"
            :particleOpacity="0.7"
            :particlesNumber="150"
            shapeType="circle"
            :particleSize="5"
            linesColor="#5fa59c"
            :linesWidth="1"
            :lineLinked="false"
            :lineOpacity="0"
            :linesDistance="150"
            :moveSpeed="2"
            :hoverEffect="false"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
        >
        </vue-particles>
        <!-- END:: PARTICLES -->

        <div class="auth_container">
            <!-- START:: FORMS LOGO -->
            <div class="form_logo_wrapper">
                <router-link to="/">
                    <img
                        :src="getAppLocale == 'ar' ? arLogo : enLogo"
                        alt="Arab For Website Logo"
                        style="color: black !important"
                        width="150"
                        height="70"
                    />
                </router-link>
            </div>
            <!-- END:: FORMS LOGO -->

            <!-- START:: AUTH ROUTER VIEW -->
            <transition name="fadeInUp" mode="out-in">
                <div class="form_content_wrapper">
                    <!-- START:: AUTH FORMS ROUTER VIEW -->
                    <router-view />
                    <!-- END:: AUTH FORMS ROUTER VIEW -->
                </div>
            </transition>
            <!-- END:: AUTH ROUTER VIEW -->
        </div>
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters, mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

export default {
    name: "Authentication",

    computed: {
        // START:: VUEX GET APP LANG
        ...mapGetters("AppLangModule", ["getAppLocale"]),
        // END:: VUEX GET APP LANG

        // START:: VUEX GET APP THEME
        ...mapGetters("AppThemeModule", ["getAppTheme"]),
        // END:: VUEX GET APP THEME
    },

    methods: {
        // START:: VUEX SET APP LANG
        ...mapActions("AppLangModule", ["changeAppLanguage"]),
        // END:: VUEX SET APP LANG
    },

    data() {
        return {
            // START:: LOGOS DATA
            // lightLogo: require("../assets/media/logo/logo.svg"),
            // darkLogo: require("../assets/media/logo/logo_dark.svg"),
            arLogo: require("../assets/media/logo/Artboard_ar.svg"),
            enLogo: require("../assets/media/logo/Artboard_en.svg"),
            // END:: LOGOS DATA
        };
    },

    mounted() {
        // START:: FIRE METHODS
        document.body.style.paddingTop = 0;
        // END:: FIRE METHODS
    },
};
</script>
