<template>
    <div class="home_page_wrapper">
        <!-- START:: SLIDER -->
        <SliderLoader v-if="!allDataHome.slider_header"></SliderLoader>
        <Slider v-else :sliderData="allDataHome.slider_header" />
        <!-- END:: SLIDER -->

        <!-- START:: ABOUT US -->
        <!-- <AboutUs :aboutUsData="allDataHome.about" /> -->
        <!-- END:: ABOUT US -->

        <!-- START:: FEATURED CATEGORIES -->
        <CategoryLoader v-if="!allDataHome.main_category"></CategoryLoader>
        <FeaturedCategories
            v-else
            :featuredCatsData="allDataHome.main_category"
        />
        <!-- END:: FEATURED CATEGORIES -->

        <!-- START:: AUCTIONS -->
        <ProductsLoader
            v-if="!allDataHome.newer_product_additions"
        ></ProductsLoader>
        <NewerAdditions
            v-else
            :newerAdditionsProducts="allDataHome.newer_product_additions"
        />
        <!-- END:: AUCTIONS -->

        <!-- START:: AD PANEL -->
        <SliderLoader v-if="!allDataHome.slider_body"></SliderLoader>
        <OfferPanel v-else :panelImage="allDataHome.slider_body[0]" />
        <!-- END:: AD PANEL -->

        <!-- START:: AUCTIONS -->
        <!-- <ProductsLoader v-if="!allDataHome.best_seller"></ProductsLoader> -->
        <BestSelling :bestSelling="allDataHome.best_seller" />
        <!-- END:: AUCTIONS -->
    </div>
</template>

<script>
// START:: IMPORTING HOME LOADERS
import SliderLoader from "@/components/loaders/MainSlider.vue";
import CategoryLoader from "@/components/loaders/Categories.vue";
import ProductsLoader from "@/components/loaders/Products.vue";
// END:: IMPORTING HOME LOADERS

// START:: IMPORTING HOME COMPONENTS
import Slider from "@/components/structure/TheSlider.vue";
// import AboutUs from "@/components/general/AboutUs.vue";
import FeaturedCategories from "@/components/general/FeaturedCategories.vue";
import OfferPanel from "@/components/general/OfferPanel.vue";
import NewerAdditions from "@/components/general/NewerAdditions.vue";
import BestSelling from "@/components/general/BestSelling.vue";
// END:: IMPORTING HOME COMPONENTS

export default {
    name: "HomePage",

    components: {
        Slider,
        // AboutUs,
        FeaturedCategories,
        OfferPanel,
        NewerAdditions,
        BestSelling,
        //Loaders
        SliderLoader,
        CategoryLoader,
        ProductsLoader,
    },

    data() {
        return {
            // START:: HOME DATA
            allDataHome: {
                slider_header: null,
                about: null,
                main_category: null,
                newer_product_additions: null,
                slider_body: null,
                best_seller: null,
                loading: false,
            },
            // END:: HOME DATA
        };
    },

    methods: {
        getHomePageData() {
            this.loading = true;
            // START:: SEND REQUEST
            this.$axios({
                method: "GET",
                url: `client/home`,
            }).then((res) => {
                this.allDataHome = res.data.data;
                this.loading = false;
            });
            // START:: SEND REQUEST
        },
    },

    mounted() {
        // START:: FIRE METHODS
        // END:: FIRE METHODS
        this.getHomePageData();
    },
};
</script>
