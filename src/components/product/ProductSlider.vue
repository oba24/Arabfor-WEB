<template>
    <div class="products_carousel_wrapper" dir="ltr">
        <carousel
            v-if="carouselItems != ''"
            :nav="true"
            :dots="false"
            :items="4"
            :margin="15"
            :loop="false"
            :autoplay="true"
            :autoplayTimeout="6000"
            :dragEndSpeed="2000"
            :smartSpeed="2000"
            :responsive="{
                0: {
                    items: 2,
                    nav: false,
                },
                750: {
                    items: 2,
                    nav: false,
                },
                900: {
                    items: 4,
                },
            }"
        >
            <div
                :dir="getAppLocale == 'ar' ? 'rtl' : 'ltr'"
                class="carousel_item_wrapper"
                v-for="item in carouselItems"
                :key="item.id"
            >
                <ProductCard :productDetails="item" />
            </div>
        </carousel>
        <!-- START:: EMPTY MESSAGE -->
        <EmptyItemsProducts v-else />
        <!-- END:: EMPTY MESSAGE -->
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters } from "vuex";
// START:: IMPORTING VUEX HELPERS

import EmptyItemsProducts from '@/components/ui/emptyMessages/EmptyItemsProducts'

// START:: IMPORTING OWL CAROUSEL
import carousel from "vue-owl-carousel";
// END:: IMPORTING OWL CAROUSEL

// START:: IMPORTING PRODUCT CARD
import ProductCard from "@/components/product/ProductCard.vue";
// END:: IMPORTING PRODUCT CARD

export default {
    name: "ProductSlider",

    components: {
        carousel,
        ProductCard,
        EmptyItemsProducts,
    },

    props: {
        carouselItems: {
            type: Array,
            required: true,
        },
    },

    computed: {
        // START:: VUEX GET APP THEME
        ...mapGetters("AppLangModule", ["getAppLocale"]),
        // END:: VUEX GET APP THEME
    },
};
</script>
