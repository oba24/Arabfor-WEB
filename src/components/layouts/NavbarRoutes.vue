<template>
  <ul :class="listClassName">
    <!-- eslint-disable  -->
    <li
      :class="listItemClassName"
      v-for="route in routes"
      :key="route.id"
      v-if="route.authRequired == false || route.authRequired == userAuthStatus"
    >
      <router-link :to="route.path" style="color: #fff">
        {{ route.name }}
      </router-link>
    </li>
    <!-- eslint-enable -->
  </ul>
</template>

<script>
export default {
  name: "NavbarRoutes",

  props: {
    listClassName: {
      type: String,
      required: true,
    },
    listItemClassName: {
      type: String,
      required: false,
    },
  },

  computed: {
    // START:: CHECK AUTH STATUS
    userAuthStatus() {
      return this.authedUserToken ? true : false;
    },
    // END:: CHECK AUTH STATUS
  },

  data() {
    return {
      // START:: ROUTES DATA
      routes: [
        {
          id: 1,
          path: "/",
          name: this.$t("NAVBAR.home"),
          authRequired: false,
        },
        {
          id: 2,
          path: "/about-us",
          name: this.$t("NAVBAR.aboutUs"),
          authRequired: false,
        },
        {
          id: 3,
          path: "/offers",
          name: this.$t("NAVBAR.offers"),
          authRequired: false,
        },
        {
          id: 4,
          path: "/competitions",
          name: this.$t("NAVBAR.competitions"),
          authRequired: false,
        },
        {
          id: 5,
          path: "/contact-us",
          name: this.$t("NAVBAR.connectWithUs"),
          authRequired: false,
        },
        // {
        //     id: 6,
        //     path: "/create-advertisement",
        //     name: this.$t("NAVBAR.addAdvertisement"),
        //     authRequired: true,
        // },
      ],
      // END:: ROUTES DATA

      // START:: AUTHED USER TOKEN DATA
      authedUserToken: localStorage.getItem("saudi_marche_user_token"),
      // END:: AUTHED USER TOKEN DATA
    };
  },
};
</script>
