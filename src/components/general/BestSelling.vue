<template>
  <div class="section_content_wrapper">
    <div class="container">
      <!-- START:: SECTION TITLE -->
      <div class="section_title_wrapper">
        <h2 class="section_title">{{ $t("TITLES.bestSelling") }}</h2>
      </div>
      <!-- END:: SECTION TITLE -->

      <!-- START:: LOADER -->
      <ProductsLoader v-if="bestSelling == null" />
      <!-- END:: LOADER -->

      <!-- START:: SECTION CAROUSEL -->
      <div class="section_carousel_wrapper" v-else>
        <ProductsCarousel :carouselItems="bestSelling" />
      </div>
      <!-- END:: SECTION CAROUSEL -->
    </div>
  </div>
</template>

<script>
// START:: IMPORTING PRODUCTS CAROUSEL
import ProductsCarousel from "../product/ProductSlider.vue";
// END:: IMPORTING PRODUCTS CAROUSEL

// START:: PRODUCT CARD
import ProductsLoader from "@/components/loaders/Products.vue";
// END:: PRODUCT CARD

export default {
  name: "Auction",

  components: {
    ProductsCarousel,
    ProductsLoader,
  },

  props: {
    bestSelling: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>