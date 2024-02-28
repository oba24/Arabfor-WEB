<template>
  <div class="section_content_wrapper">
    <div class="container">
      <!-- START:: SECTION TITLE -->
      <div class="section_title_wrapper">
        <h2 class="section_title">{{ $t("TITLES.relatedProducts") }}</h2>
      </div>
      <!-- END:: SECTION TITLE -->

      <!-- START:: LOADER -->
      <ProductsLoader v-if="relatedProducts == null" />
      <!-- END:: LOADER -->

      <!-- START:: SECTION CAROUSEL -->
      <div class="section_carousel_wrapper" v-else>
        <ProductsCarousel
          :carouselItems="relatedProducts"
          productViewRouteType="auction-product"
        />
      </div>
      <!-- END:: SECTION CAROUSEL -->
    </div>
  </div>
</template>

<script>
// START:: IMPORTING PRODUCTS CAROUSEL
import ProductsCarousel from "@/components/product/ProductSlider.vue";
// END:: IMPORTING PRODUCTS CAROUSEL

// START:: PRODUCT CARD
import ProductsLoader from "@/components/loaders/Products.vue";
// END:: PRODUCT CARD

export default {
  name: "RelatedProducts",

  components: {
    ProductsCarousel,
    ProductsLoader,
  },

  props: {
    relatedProducts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>