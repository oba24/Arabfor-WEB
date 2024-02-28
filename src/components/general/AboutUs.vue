<template>
    <div class="about_us_section_wrapper">
        <div class="container">
            <div class="row">
                <!-- START:: SECTION CONTENT -->
                <div class="col-md-10">
                    <div class="section_content">
                        <h3 class="section_title">
                            {{ $t("TITLES.aboutUs") }}
                        </h3>

                        <div
                            class="section_text"
                            v-if="aboutUsData"
                            v-html="aboutUsData"
                        ></div>

                        <div class="section_route_wrapper">
                            <router-link to="/about-us">
                                <span>
                                    {{ $t("BUTTONS.readMore") }}
                                </span>

                                <span>
                                    <i
                                        :class="
                                            getAppLocale == 'ar'
                                                ? 'fal fa-long-arrow-left'
                                                : 'fal fa-long-arrow-right'
                                        "
                                    ></i>
                                </span>
                            </router-link>
                        </div>

                        <div class="section_image_wrapper">
                            <img
                                src="../../assets/media/images/about.png"
                                alt="About Us"
                                width="200"
                                height="200"
                            />
                        </div>
                    </div>
                </div>
                <!-- END:: SECTION CONTENT -->
            </div>
        </div>
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters } from "vuex";
// END:: IMPORTING VUEX HELPERS

export default {
    name: "AboutUsSec",

    computed: {
        // START:: VUEX GET APP THEME
        ...mapGetters("AppLangModule", ["getAppLocale"]),
        // END:: VUEX GET APP THEME
    },

    props: {
        aboutUsData: {},
    },
};
</script>
