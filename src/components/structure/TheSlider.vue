<template>
    <div class="">
        <el-carousel indicator-position="outside" v-if="isMobile()">
            <el-carousel-item
                class="mobile"
                v-for="slide in sliderData"
                :key="slide.id"
            >
                <img
                    :src="slide.image"
                    alt="Slider Image"
                    class="slider_image"
                    width="100%"
                    height="300px"
                />
            </el-carousel-item>
        </el-carousel>
        <el-carousel
            indicator-position="outside"
            class="desktop"
            style="height: 900px"
            v-else
        >
            <el-carousel-item v-for="slide in sliderData" :key="slide.id">
                <img
                    :src="slide.image"
                    alt="Slider Image"
                    class="slider_image"
                    width="100%"
                    height="900px"
                />
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters } from "vuex";
// END:: IMPORTING VUEX HELPERS

// START:: IMPORTING LOADERS
// import SliderSkeletonLoader from "../ui/loaders/SliderSkeletonLoader.vue";
// END:: IMPORTING LOADERS

// START:: IMPORTING OWL CAROUSEL
// import carousel from "vue-owl-carousel";
// END:: IMPORTING OWL CAROUSEL

export default {
    name: "TheSlider",

    components: {
        // SliderSkeletonLoader,
        // carousel,
    },

    props: {
        sliderData: {
            type: Array,
            required: true,
        },
    },

    computed: {
        // START:: VUEX GET APP THEME
        ...mapGetters("AppLangModule", ["getAppLocale"]),
        // END:: VUEX GET APP THEME
    },
    methods: {
        // START:: GET REQUEST
        getSocialLinks() {
            this.$axios({
                method: "GET",
                url: `contact`,
            }).then((res) => {
                this.socialData = res.data.data.social;
            });
        },

        isMobile() {
            if (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                )
            ) {
                return true;
            } else {
                return false;
            }
        },
        // START:: GET REQUEST
    },
    mounted() {
        this.getSocialLinks();
    },

    data() {
        return {
            socialData: null,
        };
    },
};
</script>

<style>
.desktop .el-carousel__container {
    height: 900px;
}

.mobile .el-carousel__container {
    height: 300px;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
