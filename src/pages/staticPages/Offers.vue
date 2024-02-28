<template>
  <div>
    <!-- START:: BREADCRUMB -->
    <Breadcrumb :breadcrumbOptions="breadcrumbData" />
    <!-- END:: BREADCRUMB -->

    <!-- START:: PAGE CONTENT -->
    <div
      class="wishlist_content_wrapper small_screens_container"
      v-if="offerData != ''"
    >
      <div class="container">
        <div class="row">
          <!-- START:: WISHLIST ITEM -->
          <div
            class="col-lg-3 col-md-6 my-3"
            v-for="item in offerData"
            :key="item.id"
          >
            <ProductCard :productDetails="item" />
          </div>
          <!-- END:: WISHLIST ITEM -->
        </div>
      </div>
    </div>
    <!-- END:: PAGE CONTENT -->

    <!-- START:: EMPTY CONTENT MESSAGE -->
    <EmptyOffers v-else />
    <!-- START:: EMPTY CONTENT MESSAGE -->
    <!-- <div class="container">
      <div class="col-lg-6">
        <ul>
          <li>list</li>
          <li></li>
        </ul>
      </div>
    </div> -->
  </div>
</template>

<script>
// START:: IMPORTING BREADCRUMB
import Breadcrumb from "@/components/structure/TheBreadcrumb.vue";
// END:: IMPORTING BREADCRUMB

// START:: IMPORTING PRODUCT CARD COMPONENT
import ProductCard from "@/components/product/ProductCard.vue";
// END:: IMPORTING PRODUCT CARD COMPONENT

import EmptyOffers from "@/components/ui/emptyMessages/EmptyOffers";

export default {
  name: "OffersPage",
  components: {
    Breadcrumb,
    ProductCard,
    EmptyOffers,
  },
  data() {
    return {
      // START:: HANDLING SKELETON LOADER APPERANCE
      isLoading: false,
      // END:: HANDLING SKELETON LOADER APPERANCE

      // START:: BREADCRUMB DATA
      breadcrumbData: {
        pageTitle: this.$t("NAVBAR.offers"),
        items: [
          {
            text: this.$t("TITLES.home"),
            disabled: false,
            href: "/",
          },
          {
            text: this.$t("NAVBAR.offers"),
            disabled: true,
            href: "",
          },
        ],
      },
      // END:: BREADCRUMB DATA

      // START: DATA STATIC PAGES
      offerData: null,
      // END: DATA STATIC PAGES
    };
  },

  methods: {
    // START:: GET REQUEST
    getDataRequest() {
      this.$axios({
        method: "GET",
        url: `client/offers`,
      }).then((res) => {
        this.offerData = res.data.data;
      });
    },
    // START:: GET REQUEST
  },

  mounted() {
    this.getDataRequest();
  },
};
</script>
<style>
.product_card_content_wrapper .product_image img {
  height: auto !important;
}
@media (max-width: 767.98px) {
  .wishlist_content_wrapper .product_card_content_wrapper .product_image {
    height: fit-content !important;
  }
}
</style>
