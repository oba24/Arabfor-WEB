<template>
  <div class="wrapper w-100">
    <!-- START:: BREADCRUMB -->
    <Breadcrumb :breadcrumbOptions="breadcrumbData" class="mb-0" />
    <!-- END:: BREADCRUMB -->

    <!-- START:: CONTENT_WRAPPER -->
    <div class="contact_us_page_wrapper" v-if="getData">
      <!-- START:: CONTENT -->
      <div class="page_content">
        <!-- START:: G-MAP -->
        <div class="map_wrapper">
          <GmapMap
            :center="{
              lat: parseFloat(getData.location.lat),
              lng: parseFloat(getData.location.lng),
            }"
            :zoom="13"
            map-type-id="terrain"
            style="width: 100%; height: 600px"
            :options="{
              fullscreenControl: false,
              mapTypeControl: false,
            }"
          >
          </GmapMap>
        </div>
        <!-- END:: G-MAP -->

        <!-- START:: CONTENT OVERLAY -->
        <div class="content_overlay">
          <!-- START:: CONTACT INFO CARD -->
          <div class="contact_info_card">
            <h4 class="card_title">
              {{ $t("TITLES.contactUsCard") }}
            </h4>
            <div class="card_items_wrapper">
              <!-- ********** START:: SINGLE ITEM ********** -->
              <div class="contact_info_item">
                <div class="icon">
                  <i class="fad fa-map-marker-alt"></i>
                </div>
                <div class="text" v-if="getAppLocale == 'ar'">
                  {{ contact.ar }}
                </div>
                <div class="text" v-else>
                  {{ contact.en }}
                </div>
              </div>
              <!-- ********** END:: SINGLE ITEM ********** -->

              <!-- ********** START:: SINGLE ITEM ********** -->
              <div class="contact_info_item">
                <div class="icon">
                  <i class="fad fa-phone-alt"></i>
                </div>
                <div
                  class="text"
                  v-if="getAppLocale == 'ar'"
                  style="direction: ltr"
                >
                  {{ getData.phone }}
                </div>
                <div class="text" v-else>
                  {{ getData.phone }}
                </div>
              </div>
              <!-- ********** END:: SINGLE ITEM ********** -->

              <!-- ********** START:: SINGLE ITEM ********** -->
              <div class="contact_info_item">
                <div class="icon">
                  <i class="fad fa-envelope"></i>
                </div>

                <div class="text">
                  {{ getData.email }}
                </div>
              </div>
              <!-- ********** END:: SINGLE ITEM ********** -->
            </div>
          </div>
          <!-- END:: CONTACT INFO CARD -->
        </div>
        <!-- END:: CONTENT OVERLAY -->
      </div>
      <!-- END:: CONTENT -->
    </div>
    <!-- END:: CONTENT_WRAPPER -->
  </div>
</template>

<script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyC2MTR_vRbsbQQRPt5f5ZLCvvaKOpzkzlA"></script>
<script>
// START:: IMPORTING BREADCRUMB
import Breadcrumb from "@/components/structure/TheBreadcrumb.vue";
// END:: IMPORTING BREADCRUMB
import { mapGetters } from "vuex";

export default {
  name: "ContactUsPage",
  components: {
    Breadcrumb,
  },
  computed: {
    ...mapGetters("AppLangModule", ["getAppLocale"]),
  },
  data() {
    return {
      // START:: HANDLING MAIN LOADER APPERANCE
      isLoading: true,
      // END:: HANDLING MAIN LOADER APPERANCE

      // START:: BREADCRUMB DATA
      breadcrumbData: {
        pageTitle: this.$t("NAVBAR.connectWithUs"),
        items: [
          {
            text: this.$t("TITLES.home"),
            disabled: false,
            href: "/",
          },
          {
            text: this.$t("NAVBAR.connectWithUs"),
            disabled: true,
            href: "",
          },
        ],
      },
      // END:: BREADCRUMB DATA

      // START: DATA STATIC PAGES
      getData: null,
      // END: DATA STATIC PAGES
      mapData: {
        lat: 31.0409483,
        lng: 31.3784704,
      },
      // END:: CONTACT DATA
    };
  },
  methods: {
    // START:: GET PAGE DATA
    // START:: GET REQUEST
    getDataRequest() {
      this.$axios({
        method: "GET",
        url: `contact`,
      }).then((res) => {
        this.getData = res.data.data;
        this.contact = JSON.parse(this.getData.location.desc);
        console.log(this.contact);
      });
    },
    // START:: GET REQUEST
    // END:: GET PAGE DATA
  },
  created() {
    // START:: FIRE METHODS
    this.getDataRequest();
    // END:: FIRE METHODS
  },
};
</script>
