<template>
  <div>
    <nav
      id="navbar"
      class=""
      style="background-color: rgb(0 112 54) !important"
    >
      <!-- START:: NAVBAR CONTENT -->
      <div class="container p-0">
        <div class="navbar_wrapper">
          <!-- START:: LOGO WRAPPER -->
          <div class="logo_wrapper">
            <!-- START:: LOGO -->
            <router-link
              class="logo_wrapper"
              to="/"
              v-if="getAppLocale == 'ar'"
            >
              <img
                src="../../assets/media/logo/Artboard_ar.png"
                alt="Arab For Website Logo"
                width="100%"
                height="50px"
              />
            </router-link>

            <router-link class="logo_wrapper" to="/" v-else>
              <img
                src="../../assets/media/logo/Artboard_en.png"
                alt="Arab For Website Logo"
                width="100%"
                height="50px"
              />
            </router-link>
            <!-- END:: LOGO -->
          </div>
          <!-- END:: LOGO WRAPPER -->

          <!-- START:: ROUTES WRAPPER -->
          <div class="routes_wrapper">
            <NavbarRoutes
              listClassName="routes_list"
              listItemClassName="single_route"
            />
          </div>
          <!-- END:: ROUTES WRAPPER -->

          <!-- START:: NAVBAR BUTTONS -->
          <div class="navbar_btns_wrapper">
            <div class="group">
              <!-- START:: AUTH ROUTE -->
              <router-link
                to="/auth"
                class="auth_route"
                v-if="authedUserToken == null"
              >
                {{ $t("BUTTONS.register_now") }}
              </router-link>
              <!-- END:: AUTH ROUTE -->

              <!-- START:: SEARCH BUTTON -->
              <button
                class="search_btn"
                @click="toggleSearchForm"
                style="color: #ffffff !important"
              >
                <i class="fal fa-search"></i>
                <span class="toolTip">
                  {{ $t("TOOLTIPS.search") }}
                </span>
              </button>
              <!-- END:: SEARCH BUTTON -->

              <!-- START:: CART BUTTON -->
              <button
                class="chats_route"
                @click="toggleCartDrawer(), getCartData()"
                @toggleCartEvent="toggleCartDrawer"
                v-if="authedUserToken !== null"
                style="color: #ffffff !important"
              >
                <i class="fal fa-shopping-cart"></i>
                <span
                  class="badge"
                  style="background-color: #ffffff !important"
                ></span>
                <span class="toolTip">
                  {{ $t("TOOLTIPS.cart") }}
                </span>
              </button>
              <!-- END:: CART BUTTON -->

              <!-- START:: WISHLIST ROUTE -->
              <router-link
                to="/wishlist"
                class="wishlist_route"
                v-if="authedUserToken !== null"
                style="color: #ffffff !important"
              >
                <i class="fal fa-heart"></i>
                <span class="toolTip">
                  {{ $t("TOOLTIPS.wishlist") }}
                </span>
                <small v-if="wishlistData">
                  {{ wishlistData.length }}
                </small>
              </router-link>
              <!-- END:: WISHLIST ROUTE -->

              <!-- START:: PROFILE BUTTON -->
              <button
                class="profile_btn"
                @click="toggleProfileDrawer"
                v-if="authedUserToken !== null"
                style="color: #ffffff !important"
              >
                <i class="fal fa-user"></i>
                <span class="toolTip">
                  {{ $t("TOOLTIPS.profile") }}
                </span>
              </button>
              <!-- END:: PROFILE BUTTON -->

              <!-- START:: CHANGE THEME BUTTON -->
              <!-- <button
                                class="theme_changer"
                                @click="changeAppTheme"
                            >
                                <i
                                    class="fal fa-moon"
                                    v-if="getAppTheme == 'light_theme'"
                                ></i>
                                <i class="fal fa-sun" v-else></i>
                                <span class="toolTip">
                                    {{ $t("TOOLTIPS.change_theme") }}
                                </span>
                            </button> -->
              <!-- END:: CHANGE THEME BUTTON -->

              <!-- START:: LANGUAGE BUTTON -->
              <div class="lang_toggler_wrapper">
                <button
                  class="lang_toggeler_btn"
                  @click="changeAppLanguage('en')"
                  v-if="getAppLocale == 'ar'"
                >
                  عربي- English
                  <!-- <img
                    src="../../assets/media/images/flags/en.png"
                    alt="English"
                    width="30"
                    height="30"
                  /> -->
                </button>
                <button
                  class="lang_toggeler_btn pb-3"
                  @click="changeAppLanguage('ar')"
                  v-else
                >
                  English - العربية
                  <!-- <img
                    src="../../assets/media/images/flags/ksa.png"
                    alt="Arabic"
                    width="30"
                    height="30"
                  /> -->
                </button>
              </div>
              <!-- END:: LANGUAGE BUTTON -->

              <!-- START:: SMALL SCREENS NAVBAR MENU BUTTON -->
              <button
                class="small_screens_navbar_toggeler"
                @click="toggleSmallScreensNavBar"
              >
                <i class="fal fa-bars"></i>
              </button>
              <!-- END:: SMALL SCREENS NAVBAR MENU BUTTON -->
            </div>
          </div>
          <!-- START:: NAVBAR BUTTONS -->
        </div>
      </div>
      <!-- END:: NAVBAR CONTENT -->

      <!-- START:: SMALL SCREENS NAVBAR -->
      <div
        class="small_screens_navbar_wrapper"
        :class="{ active: smallScreensNavbarIsOpen }"
        style="background-color: rgba(0, 0, 0, 0.8) !important"
      >
        <!-- START:: CLOSE BUTTON -->
        <button class="close_btn" @click="toggleSmallScreensNavBar">
          <i class="fal fa-times"></i>
        </button>
        <!-- END:: CLOSE BUTTON -->

        <!-- START:: LINKS -->

        <NavbarRoutes
          listClassName="small_screens_links"
          @click="toggleSmallScreensNavBar"
        />
        <!-- END:: LINKS -->
      </div>
      <!-- END:: SMALL SCREENS NAVBAR -->

      <!-- START:: USER PROFILE DRAWER -->
      <div
        class="profile_drawer_wrapper"
        :class="{ active: profileDrawerIsOpen }"
        @click="toggleProfileDrawer"
        v-if="authedUserToken !== null"
      >
        <!-- START:: DRAWER CONTENT WRAPPER -->
        <div class="drawer_content_wraper">
          <!-- START:: USER INFO -->
          <div class="user_info_wrapper">
            <div class="avatar_wrapper">
              <img
                :src="getAuthenticatedUserData.avatar"
                :alt="getAuthenticatedUserData.userName"
                width="90"
                height="90"
              />
            </div>

            <div class="name_wrapper">
              <h4 class="user_name">
                {{ getAuthenticatedUserData.userName }}
              </h4>

              <router-link class="edit_profile_route" to="/edit-profile">
                <i class="fal fa-pencil-alt"></i>
              </router-link>
            </div>
          </div>
          <!-- END:: USER INFO -->

          <!-- START:: PROFILE DRAWER ROUTES -->
          <ul class="drawer_routes_wrapper">
            <li class="drawer_route_item">
              <span class="icon_wrapper">
                <i class="fad fa-envelope"></i>
              </span>
              <router-link class="drawer_route_item" to="/send-message">
                {{ $t("NAVBAR.contactUs") }}
              </router-link>
            </li>

            <li class="drawer_route_item">
              <span class="icon_wrapper">
                <i class="fad fa-map-marker-alt"></i>
              </span>
              <router-link class="drawer_route_item" to="/addresses">
                {{ $t("NAVBAR.addresses") }}
              </router-link>
            </li>

            <li class="drawer_route_item">
              <span class="icon_wrapper">
                <i class="fad fa-wallet"></i>
              </span>
              <button class="wallet_btn" @click="toggleWalletDrawer">
                {{ $t("NAVBAR.accountBalance") }}
              </button>
            </li>

            <li class="drawer_route_item">
              <span class="icon_wrapper">
                <i class="fad fa-question"></i>
              </span>
              <router-link class="drawer_route_item" to="/">
                {{ $t("NAVBAR.faqs") }}
              </router-link>
            </li>

            <li class="drawer_route_item">
              <span class="icon_wrapper">
                <i class="fad fa-file-alt"></i>
              </span>
              <router-link class="drawer_route_item" to="/privacy-policy">
                {{ $t("NAVBAR.privacyPolicy") }}
              </router-link>
            </li>

            <li class="drawer_route_item">
              <span class="icon_wrapper">
                <i class="fad fa-sign-out-alt"></i>
              </span>
              <button class="logout_btn" @click="logout">
                {{ $t("NAVBAR.logout") }}
              </button>
            </li>
          </ul>
          <!-- END:: PROFILE DRAWER ROUTES -->
        </div>
        <!-- END:: DRAWER CONTENT WRAPPER -->
      </div>
      <!-- END:: USER PROFILE DRAWER -->

      <!-- START:: WALLET DRAWER -->
      <TheWallet
        :walletDrawerIsOpen="walletDrawerIsOpen"
        @toggleWalletDrawer="toggleWalletDrawer"
        @toggleWithdrawDrawer="toggleWithdraw"
      />
      <!-- END:: WALLET DRAWER -->

      <!-- START:: WITHDRAW DRAWER -->
      <TheWithdraw
        :withdrawDrawerIsOpen="withdrawDrawerIsOpen"
        @toggleWithdrawDrawer="toggleWithdraw"
      />
      <!-- END:: WITHDRAW DRAWER -->

      <!-- START:: CART DRAWER -->
      <Cart
        :cartDrawerIsOpen="cartDrawerIsOpen"
        :cartIsOpen="cartDrawerIsOpen"
        @toggleCartEvent="toggleCartDrawer"
        @toggleCartEventFrom="toggleCartDrawer"
        @callData="getCartData"
        :cartDataProp="cartData"
        :cartAmountsProp="cartData"
      />
      <!-- END:: CART DRAWER -->

      <!-- START:: SEARCH FORM -->
      <transition name="fadeInUp">
        <SearchForm
          @toggleSearch="toggleSearchForm"
          :formApperanceData="searchFormIsOpen"
        />
      </transition>
      <!-- END:: SEARCH FORM -->
    </nav>

    <!-- START:: FOOTER BUTTONS -->
    <div class="footer_btns_wrapper" id="small_screens_footer">
      <!-- START:: WISHLIST ROUTE -->
      <router-link
        to="/wishlist"
        class="wishlist_route"
        v-if="authedUserToken !== null"
      >
        <i class="fal fa-heart"></i>
        <span class="toolTip">
          {{ $t("TOOLTIPS.wishlist") }}
        </span>
      </router-link>
      <!-- END:: WISHLIST ROUTE -->

      <!-- START:: CART BUTTON -->
      <button
        class="chats_route"
        @click="toggleCartDrawer(), getCartData()"
        @toggleCartEvent="toggleCartDrawer"
        v-if="authedUserToken !== null"
      >
        <i class="fal fa-shopping-cart"></i>
        <span class="toolTip">
          {{ $t("TOOLTIPS.cart") }}
        </span>
      </button>
      <!-- END:: CART BUTTON -->

      <!-- START:: TERMS ROUTE -->
      <router-link to="/auth" class="auth_route" v-if="authedUserToken == null">
        <i class="fal fa-user"></i>
        {{ $t("TOOLTIPS.register") }}
      </router-link>
      <!-- END:: TERMS ROUTE -->

      <!-- START:: FAQS ROUTE -->
      <router-link
        to="/FAQS"
        class="wishlist_route"
        v-if="authedUserToken == null"
      >
        <i class="fal fa-question-circle"></i>
        <span class="toolTip">
          {{ $t("TOOLTIPS.faqs") }}
        </span>
      </router-link>
      <!-- END:: FAQS ROUTE -->

      <!-- START:: WISHLIST ROUTE -->
      <router-link to="/" class="home_route">
        <i class="fal fa-home"></i>
        <span class="toolTip">
          {{ $t("TOOLTIPS.home") }}
        </span>
      </router-link>
      <!-- END:: WISHLIST ROUTE -->

      <!-- START:: SEARCH BUTTON -->
      <button class="search_btn" @click="toggleSearchForm">
        <i class="fal fa-search"></i>
        <span class="toolTip">
          {{ $t("TOOLTIPS.search") }}
        </span>
      </button>
      <!-- END:: SEARCH BUTTON -->

      <!-- START:: CONTACT US ROUTE -->
      <router-link
        to="/contact-us"
        class="wishlist_route"
        v-if="authedUserToken == null"
      >
        <i class="fal fa-phone-alt"></i>
        <span class="toolTip">
          {{ $t("TOOLTIPS.contact") }}
        </span>
      </router-link>
      <!-- END:: CONTACT US ROUTE -->

      <!-- START:: PROFILE BUTTON -->
      <button
        class="profile_btn"
        @click="toggleProfileDrawer"
        v-if="authedUserToken !== null"
      >
        <i class="fal fa-user"></i>
        <span class="toolTip">
          {{ $t("TOOLTIPS.myProfile") }}
        </span>
      </button>
      <!-- END:: PROFILE BUTTON -->
    </div>
    <!-- START:: FOOTER BUTTONS -->
  </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters, mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

// START:: IMPORTING ROUTES
import NavbarRoutes from "./NavbarRoutes.vue";
// END:: IMPORTING ROUTES

// START:: IMPORTING DRAWERS
import Cart from "../drawers/Cart.vue";
import TheWallet from "../drawers/TheWallet.vue";
import TheWithdraw from "../drawers/TheWithdraw.vue";
// END:: IMPORTING DRAWERS

// START:: IMPORTING SEARCH FORM
import SearchForm from "@/components/search/SearchForm.vue";
// END:: IMPORTING SEARCH FORM

export default {
  name: "TheHeader",

  components: {
    NavbarRoutes,
    Cart,
    TheWallet,
    TheWithdraw,
    SearchForm,
  },

  computed: {
    // START:: VUEX GET APP THEME
    ...mapGetters("AppThemeModule", ["getAppTheme"]),
    // END:: VUEX GET APP THEME

    // START:: VUEX GET APP LANG
    ...mapGetters("AppLangModule", ["getAppLocale"]),
    // END:: VUEX GET APP LANG

    // START:: VUEX GET AUTHENTICATED USER DATA
    ...mapGetters("AuthenticationModule", ["getAuthenticatedUserData"]),
    // END:: VUEX GET AUTHENTICATED USER DATA

    // START:: VUEX GET NOTIFICATIONS DATA
    ...mapGetters("NotificationsModule", ["notificationsData"]),
    // END:: VUEX GET NOTIFICATIONS DATA

    // START:: VUEX GET WISHLIST DATA
    ...mapGetters("WishlistModule", ["wishlistData"]),
    // END:: VUEX GET WISHLIST DATA

    // START:: CHECK AUTH STATUS
    userAuthStatus() {
      return this.authedUserToken ? true : false;
    },
    // END:: CHECK AUTH STATUS
  },

  data() {
    return {
      // START:: AUTHED USER TOKEN DATA
      authedUserToken: localStorage.getItem("saudi_marche_user_token"),
      // END:: AUTHED USER TOKEN DATA

      // START:: SMALL SCREENS NAVBAR APPERANCE DATA
      smallScreensNavbarIsOpen: false,
      // END:: SMALL SCREENS NAVBAR APPERANCE DATA

      // START:: PROFILE DRAWER APPERANCE DATA
      profileDrawerIsOpen: false,
      // END:: PROFILE DRAWER APPERANCE DATA

      // START:: WALLET DRAWER APPERANCE DATA
      cartDrawerIsOpen: false,
      // START:: WALLET DRAWER APPERANCE DATA

      // START:: WALLET DRAWER APPERANCE DATA
      walletDrawerIsOpen: false,
      // START:: WALLET DRAWER APPERANCE DATA

      // START:: WITHDRAW DRAWER APPERANCE DATA
      withdrawDrawerIsOpen: false,
      // START:: WITHDRAW DRAWER APPERANCE DATA

      // START:: SEARCH MENU APPERANCE DATA
      searchFormIsOpen: false,
      // END:: SEARCH MENU APPERANCE DATA

      // START:: CART DATA
      cartData: null,
      amountsCart: null,
      // END:: CART DATA

      // START:: LOGO DATA
      lightLogo: require("../../assets/media/logo/logo_dark.svg"),
      darkLogo: require("../../assets/media/logo/logo.svg"),
      // END:: LOGO DATA
    };
  },

  methods: {
    // START:: TOGGLE CART DRAWER
    toggleCartDrawer() {
      this.cartDrawerIsOpen = !this.cartDrawerIsOpen;
      let bodyElement = document.body;
      if (this.cartDrawerIsOpen == true) {
        bodyElement.style.overflowY = "hidden";
      } else {
        bodyElement.style.overflowY = "auto";
      }
    },
    // END:: TOGGLE CART DRAWER

    // START:: VUEX REMOVE AUTHENTICATED USER DATA
    ...mapActions("AuthenticationModule", ["removeAuthenticatedUserData"]),
    // END:: VUEX REMOVE AUTHENTICATED USER DATA

    // START:: VUEX  APP THEME ACTIONS
    ...mapActions("AppThemeModule", ["changeAppTheme"]),
    // END:: VUEX APP THEME ACTIONS

    // START:: VUEX SET APP LANG
    ...mapActions("AppLangModule", ["changeAppLanguage"]),
    // END:: VUEX SET APP LANG

    // START:: VUEX NOTIFICATIONS ACTIONS
    ...mapActions("NotificationsModule", [
      "getNotifications",
      "deleteNotification",
    ]),
    // END:: VUEX NOTIFICATIONS ACTIONS

    // START:: TOGGLE SMALL SCREENS NAVBAR
    toggleSmallScreensNavBar() {
      this.smallScreensNavbarIsOpen = !this.smallScreensNavbarIsOpen;
    },
    // END:: TOGGLE SMALL SCREENS NAVBAR

    // START:: TOGGLE PROFILE DRAWER
    toggleProfileDrawer() {
      this.profileDrawerIsOpen = !this.profileDrawerIsOpen;

      let bodyElement = document.body;
      if (this.profileDrawerIsOpen == true) {
        bodyElement.style.overflowY = "hidden";
      } else {
        bodyElement.style.overflowY = "auto";
      }
    },
    // END:: TOGGLE PROFILE DRAWER

    // START:: TOGGLE WALLET DRAWER
    toggleWalletDrawer() {
      this.walletDrawerIsOpen = !this.walletDrawerIsOpen;

      let bodyElement = document.body;
      if (!this.profileDrawerIsOpen && this.walletDrawerIsOpen) {
        bodyElement.style.overflowY = "hidden";
      } else {
        bodyElement.style.overflowY = "auto";
      }
    },
    // END:: TOGGLE WALLET DRAWER

    // START:: TOGGLE WITHDRAW DRAWER
    toggleWithdraw() {
      this.withdrawDrawerIsOpen = !this.withdrawDrawerIsOpen;

      let bodyElement = document.body;
      if (this.withdrawDrawerIsOpen) {
        bodyElement.style.overflowY = "hidden";
      } else {
        bodyElement.style.overflowY = "auto";
      }

      if (this.walletDrawerIsOpen == true) {
        this.walletDrawerIsOpen = false;
      }
    },
    // END:: TOGGLE WITHDRAW DRAWER

    // START:: TOGGLE SEARCH FORM
    toggleSearchForm() {
      this.searchFormIsOpen = !this.searchFormIsOpen;
    },
    // END:: TOGGLE SEARCH FORM

    // START:: HANDLING STICKY HEADER
    stickyHeader() {
      const BODY_ELEMENT = document.body;
      let header = document.getElementById("navbar");
      let headerHeight = header.clientHeight;
      let smallScreensFooter = document.getElementById("small_screens_footer");
      let smallScreensFooterHeight = smallScreensFooter.clientHeight;
      BODY_ELEMENT.addEventListener(
        "scroll",
        () => {
          if (BODY_ELEMENT.scrollTop > headerHeight) {
            header.classList.add("sticky");
            BODY_ELEMENT.style.paddingTop = headerHeight + "px";
            if (window.matchMedia("(max-width: 767px)").matches) {
              smallScreensFooter.classList.add("footer_sticky_animation");
              BODY_ELEMENT.style.paddingBottom =
                smallScreensFooterHeight + 0 + "px";
            }
          } else {
            header.classList.remove("sticky");
            BODY_ELEMENT.style.paddingTop = 0;
            if (window.matchMedia("(max-width: 767px)").matches) {
              smallScreensFooter.classList.remove("footer_sticky_animation");
            }
          }
        },
        true
      );
    },
    // END:: HANDLING STICKY HEADER

    // START:: LOGOUT METHOD
    logout() {
      const theData = new FormData();
      // START:: APPEND STATIC DATA
      theData.append("type", "ios");
      theData.append("device_token", "static_device_token");
      // END:: APPEND STATIC DATA

      // START:: SEND REQUEST
      this.$axios({
        method: "POST",
        url: `logout`,
        data: theData,
      })
        .then(() => {
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t("VALIDATION.logout_success"),
            position: this.$t("iziToastConfigs.position"),
            rtl: this.$t("iziToastConfigs.dir"),
          });
          this.removeAuthenticatedUserData({
            token: "saudi_marche_user_token",
            phone: "saudi_marche_user_phone",
            type: "saudi_marche_user_type",
            avatar: "saudi_marche_user_avatar",
            verificationCode: "saudi_marche_verification_code",
            userName: "saudi_marche_user_name",
          });
          setTimeout(() => {
            this.$router.replace("/auth/login");
            // location.reload();
          }, 2000);
        })
        .catch((error) => {
          this.$iziToast.error({
            timeout: 2000,
            message: error.response.data.message,
            position: this.$t("iziToastConfigs.position"),
            rtl: this.$t("iziToastConfigs.dir"),
          });
          setTimeout(() => {
            this.isWaitingRequest = false;
          }, 1000);
        });
    },
    // END:: LOGOUT METHOD

    // START:: GET REQUEST
    getCartData() {
      this.$axios({
        method: "GET",
        url: `client/get_cart`,
        // headers: {
        //     Authorization:
        //         "bearer" + this.authedUserToken,
        // },
      }).then((res) => {
        this.cartData = res.data;
      });
    },
    // START:: GET REQUEST
  },

  mounted() {
    // START:: FIRE METHODS
    this.stickyHeader();
    if (this.authedUserToken != null) {
      this.getCartData();
    }
    // END:: FIRE METHODS
  },

  created() {
    window.addEventListener("click", () => {
      this.profileMenuIsOpen = false;
      this.notificationsMenuIsOpen = false;
    });
  },
};
</script>

<style>
.lang_toggeler_btn {
  color: white !important;
}
</style>
