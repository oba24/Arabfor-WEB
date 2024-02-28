<template>
  <div class="product_card_content_wrapper">
    <!-- START:: PRODUCT BADGES -->
    <span
      class="product_badge new"
      v-if="productDetails.badge && productDetails.badge == 'new'"
    >
      {{ $t("BADGES.new") }}
    </span>
    <span
      class="product_badge sale"
      v-else-if="productDetails.badge && productDetails.badge == 'sale'"
    >
      {{ $t("BADGES.sale") }} {{ productDetails.sale }}%
    </span>
    <span
      class="product_badge out_of_stock"
      v-else-if="productDetails.badge && productDetails.badge == 'out_of_stock'"
    >
      {{ $t("BADGES.outOfStock") }}
    </span>
    <!-- END:: PRODUCT BADGES -->

    <!-- START:: PRODUCT IMAGE -->
    <router-link
      :to="`/product-details/${productDetails.id}`"
      class="product_image"
    >
      <img
        v-if="productDetails.product_image[0]"
        :alt="productDetails.name"
        v-lazy="productDetails.product_image[0].url"
      />
      <img
        v-if="productDetails.product_image[1]"
        v-lazy="productDetails.product_image[1].url"
        :alt="productDetails.name"
        class="hover_image"
      />
    </router-link>
    <!-- END:: PRODUCT IMAGE -->

    <!-- START:: PRODUCT DETAILS -->
    <div class="product_details_wrapper">
      <!-- ========== START:: NAME AND BRAND ========== -->
      <h4 class="product_name">{{ productDetails.name }}</h4>
      <h5 class="brand_name">{{ productDetails.category.name }}</h5>
      <!-- ========== END:: NAME AND BRAND ========== -->

      <!-- ========== START:: PRICE AND BUTTONS ========== -->
      <div class="price_and_btns_wrapper">
        <!-- START:: PRODUCT PRICE -->
        <div
          class="product_price with_sale"
          v-if="productDetails.price_after_dicount != null"
        >
          <h5 class="before_sale">
            <span class="price">
              {{ productDetails.price_before_dicount }}
            </span>
            <span class="currency">
              {{ $t("TITLES.currency") }}
            </span>
          </h5>

          <h5 class="after_sale">
            <span class="price">
              {{ productDetails.price_after_dicount }}
            </span>
            <span class="currency">
              {{ $t("TITLES.currency") }}
            </span>
          </h5>
        </div>

        <div class="product_price without_sale" v-else>
          <h5 class="price_witout_sale">
            <span class="price">
              {{ productDetails.price_before_dicount }}
            </span>
            <span class="currency">
              {{ $t("TITLES.currency") }}
            </span>
          </h5>
        </div>
        <!-- END:: PRODUCT PRICE -->

        <!-- START:: CARD BUTTONS -->
        <div class="card_buttons">
          <button class="share_btn" @click="toggleShareBtnsMenu">
            <i class="fas fa-share-alt"></i>
          </button>

          <button
            v-if="authedUserToken != null"
            :class="
              productDetails.is_fav == true
                ? 'wishlist_btn active_wishlist_btn'
                : 'wishlist_btn'
            "
            @click="toggleWishlist(productDetails.id)"
          >
            <i class="fa fa-heart added_to_wishlist"></i>
            <i class="fal fa-heart"></i>
          </button>

          <transition name="fadeInUp">
            <ul class="social_share_btns" v-if="shareBtnsMenuIsOpen">
              <li class="single_share_btn">
                <button @click="toggleShareBtnsMenu">
                  <ShareNetwork
                    network="facebook"
                    url="`https://speed-4-ever/#/${$route.path}`"
                    title="subjectName"
                    description="Product Description"
                    hashtags="Arab For"
                  >
                    <img
                      src="../../assets/media/icons/social/facebook.svg"
                      alt="Facebook"
                      width="25"
                      height="25"
                    />
                  </ShareNetwork>
                </button>
              </li>

              <li class="single_share_btn">
                <button @click="toggleShareBtnsMenu">
                  <ShareNetwork
                    network="twitter"
                    url="`https://speed-4-ever/#/${$route.path}`"
                    title="subjectName"
                    description="Product Description"
                    hashtags="Arab For"
                  >
                    <img
                      src="../../assets/media/icons/social/Twitter.svg"
                      alt="Twitter"
                      width="25"
                      height="25"
                    />
                  </ShareNetwork>
                </button>
              </li>

              <li class="single_share_btn">
                <button @click="toggleShareBtnsMenu">
                  <ShareNetwork
                    network="whatsapp"
                    url="`https://speed-4-ever/#/${$route.path}`"
                    title="subjectName"
                    description="Product Description"
                    hashtags="Arab For"
                  >
                    <img
                      src="../../assets/media/icons/social/whatsapp.svg"
                      alt="Twitter"
                      width="25"
                      height="25"
                    />
                  </ShareNetwork>
                </button>
              </li>
            </ul>
          </transition>
        </div>
        <!-- END:: CARD BUTTONS -->
      </div>
      <!-- ========== END:: PRICE AND BUTTONS ========== -->
    </div>
    <!-- END:: PRODUCT DETAILS -->
  </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

export default {
  name: "SingleProductCard",

  props: {
    productDetails: {
      type: Object,
      required: true,
    },
  },

  components: {},

  data() {
    return {
      // START:: SHARE BUTTONS MENU APPERANCE  DATA
      shareBtnsMenuIsOpen: false,
      // END:: SHARE BUTTONS MENU APPERANCE  DATA

      // START:: AUTHED USER TOKEN DATA
      authedUserToken: localStorage.getItem("saudi_marche_user_token"),
      // END:: AUTHED USER TOKEN DATA
    };
  },

  methods: {
    // START:: TOGGLE SHARE BUTTONS MENU
    toggleShareBtnsMenu() {
      this.shareBtnsMenuIsOpen = !this.shareBtnsMenuIsOpen;
    },
    // end:: TOGGLE SHARE BUTTONS MENU

    // START:: VUEX TOGGLE ITEM WISHLIST
    ...mapActions("WishlistModule", ["toggleWishlistStatus"]),
    // END:: VUEX TOGGLE ITEM WISHLIST

    toggleWishlist(id) {
      this.toggleWishlistStatus(id);
      this.productDetails.is_fav = !this.productDetails.is_fav;
    },
  },
};
</script>
