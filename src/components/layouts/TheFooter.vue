<template>
  <div>
    <footer style="background-color: #3f3f3e !important">
      <div class="container">
        <div class="container">
          <div class="row justify-content-between">
            <!-- START:: LOGO -->
            <div class="col-lg-4 my-3">
              <div class="logo_wrapper" v-if="contactData">
                <router-link
                  class="logo_wrapper"
                  to="/"
                  v-if="getAppLocale == 'ar'"
                >
                  <img
                    src="../../assets/media/logo/Artboard_ar.png"
                    alt="Arab For Website Logo"
                    width="100%"
                    height="80px"
                  />
                </router-link>

                <router-link class="logo_wrapper" to="/" v-else>
                  <img
                    src="../../assets/media/logo/Artboard_en.png"
                    alt="Arab For Website Logo"
                    width="100%"
                    height="80px"
                  />
                </router-link>

                <!-- <div class="logo_desc" v-if="getAppLocale == 'ar'">
                  {{ contact.ar }}
                </div>
                <div class="logo_desc" v-else>
                  {{ contact.en }}
                </div> -->

                <ul class="footer_links">
                  <li class="footer_link">
                    <div class="logo_desc" v-if="getAppLocale == 'ar'">
                      {{ contact.ar }}
                    </div>
                    <div class="logo_desc" v-else>
                      {{ contact.en }}
                    </div>
                  </li>
                  <li class="footer_link">
                    <a href="https://linktr.ee/arabfor" target="_blank">
                      {{ $t("FOOTER.means_of_comunication") }}
                    </a>
                  </li>

                  <li class="footer_link">
                    <a
                      href="https://online.fliphtml5.com/aqocl/cpvh/"
                      target="_blank"
                    >
                      {{ $t("FOOTER.company_profile") }}
                    </a>
                  </li>
                </ul>

                <!-- <div class="mail_and_phone">
                  <h6>{{ contactData.email }}</h6>
                  <h6
                    v-if="getAppLocale == 'ar'"
                    style="direction: ltr; float: right"
                  >
                    {{ contactData.phone }}
                  </h6>
                  <h6 v-else>{{ contactData.phone }}</h6>
                </div> -->
              </div>
            </div>
            <!-- END:: LOGO -->

            <!-- START:: LINKS -->
            <div class="col-lg-4 my-3">
              <div class="footer_links_wrapper">
                <div class="links_group">
                  <h5
                    class="links_group_title"
                    style="margin: 30px 0px !important"
                  >
                    {{ $t("TITLES.mainCats") }}
                  </h5>
                  <ul class="footer_links">
                    <!-- <li class="footer_link">
                                <router-link to="/test">
                                    {{ $t("FOOTER.help") }}
                                </router-link>
                            </li>
                            -->

                    <li class="footer_link">
                      <router-link to="/FAQS">
                        {{ $t("FOOTER.faqs") }}
                      </router-link>
                    </li>

                    <li class="footer_link">
                      <router-link to="/privacy-policy">
                        {{ $t("FOOTER.privacy") }}
                      </router-link>
                    </li>

                    <li class="footer_link">
                      <router-link to="/terms">
                        {{ $t("FOOTER.terms") }}
                      </router-link>
                    </li>

                    <!-- <li class="footer_link">
                                <router-link to="/test">
                                    {{ $t("FOOTER.usageGuide") }}
                                </router-link>
                            </li> -->
                  </ul>
                </div>

                <div class="links_group">
                  <h5
                    class="links_group_title"
                    style="margin: 30px 0px !important"
                  >
                    {{ $t("TITLES.importantLinks") }}
                  </h5>

                  <ul class="footer_links">
                    <!-- <li class="footer_link">
                      <router-link to="/">
                        {{ $t("FOOTER.home") }}
                      </router-link>
                    </li> -->

                    <li class="footer_link">
                      <router-link to="/about-us">
                        {{ $t("FOOTER.aboutUs") }}
                      </router-link>
                    </li>

                    <li class="footer_link">
                      <router-link to="/offers">
                        {{ $t("FOOTER.offers") }}
                      </router-link>
                    </li>

                    <!-- <li class="footer_link">
                      <router-link to="/competitions">
                        {{ $t("NAVBAR.competitions") }}
                      </router-link>
                    </li> -->

                    <li class="footer_link">
                      <router-link to="/contact-us">
                        {{ $t("FOOTER.connectWithUs") }}
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- END:: LINKS-->

            <!-- START:: DOWNLOAD APP SECTION -->
            <div class="col-lg-4 my-3">
              <div class="download_app_wrapper">
                <div class="title" style="margin: 30px 0px !important">
                  <h3>{{ $t("FOOTER.downloadApp") }}</h3>
                </div>

                <div
                  class="content"
                  style="justify-content: space-between !important"
                >
                  <!-- <div class="image">
                    <img
                      src="../../assets/media/images/app-screen.svg"
                      width=""
                      height=""
                      alt=""
                    />
                  </div> -->
                  <div class="text">
                    <!-- <h4>{{ $t("FOOTER.getOffers") }}</h4>
                    <h5>{{ $t("FOOTER.onOurApp") }}</h5> -->
                    <div class="images">
                      <div>
                        <a target="_blank">
                          <img
                            src="../../assets/media/images/app-store.svg"
                            width="100"
                            height="45"
                            alt=""
                          />
                        </a>
                        <ul class="footer_links app_download">
                          <li class="footer_link">
                            <a
                              href="https://apps.apple.com/app/arabfor/id6457673047"
                              target="_blank"
                            >
                              {{ $t("FOOTER.customer") }}
                            </a>
                          </li>
                          <li class="footer_link">
                            <a
                              href="https://apps.apple.com/app/arabfor-vendor/id6463065374"
                              target="_blank"
                            >
                              {{ $t("FOOTER.vendor") }}
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <a target="_blank">
                          <img
                            src="../../assets/media/images/google-play.svg"
                            width="100"
                            height="45"
                            alt=""
                          />
                        </a>
                        <ul class="footer_links">
                          <li class="footer_link">
                            <a
                              href="https://play.google.com/store/apps/details?id=com.arabfor.arabforClient"
                              target="_blank"
                            >
                              {{ $t("FOOTER.customer") }}
                            </a>
                          </li>
                          <li class="footer_link">
                            <a
                              href="https://play.google.com/store/apps/details?id=com.arabfor.vendor_app"
                              target="_blank"
                            >
                              {{ $t("FOOTER.vendor") }}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END:: DOWNLOAD APP SECTION -->
          </div>

          <!-- <div class="container">
            <table
              class="table table-striped table-boarded table-hover table-responsive table-dark"
            >
              <thead>
                <tr>
                  <td colspan="2" rowspan="2" scope="col" style="width: 200px">
                    <router-link
                      class="logo_wrapper"
                      to="/"
                      v-if="getAppLocale == 'ar'"
                    >
                      <img
                        src="../../assets/media/logo/Artboard_ar.png"
                        alt="Arab For Website Logo"
                        width="100%"
                        height="150px"
                      />
                    </router-link>

                    <router-link class="logo_wrapper" to="/" v-else>
                      <img
                        src="../../assets/media/logo/Artboard_en.png"
                        alt="Arab For Website Logo"
                        width="100%"
                        height="150px"
                      />
                    </router-link>
                  </td>
                  <td scope="col">
                    <h5 class="links_group_title">
                      {{ $t("TITLES.mainCats") }}
                    </h5>
                  </td>
                  <td scope="col">
                    <h5 class="links_group_title">
                      {{ $t("TITLES.importantLinks") }}
                    </h5>
                  </td>
                  <td colspan="2" scope="col">
                    <div class="title">
                      <h3>{{ $t("FOOTER.downloadApp") }}</h3>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <router-link to="/FAQS">
                      {{ $t("FOOTER.faqs") }}
                    </router-link>
                  </td>
                  <td>
                    <router-link to="/about-us">
                      {{ $t("FOOTER.aboutUs") }}
                    </router-link>
                  </td>
                  <td>
                    <div class="images">
                      <a href="#" target="_blank">
                        <img
                          src="../../assets/media/images/google-play.svg"
                          width="100"
                          height="45"
                          alt=""
                        />
                      </a>
                    </div>
                  </td>
                  <td>
                    <div class="images">
                      <a href="#" target="_blank">
                        <img
                          src="../../assets/media/images/app-store.svg"
                          width="100"
                          height="45"
                          alt=""
                        />
                      </a>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">site:</td>
                  <td>
                    <div class="logo_desc" v-if="getAppLocale == 'ar'">
                      {{ contact.ar }}
                    </div>
                    <div class="logo_desc" v-else>
                      {{ contact.en }}
                    </div>
                  </td>
                  <td scope="row">
                    <router-link to="/privacy-policy">
                      {{ $t("FOOTER.privacy") }}
                    </router-link>
                  </td>

                  <td>
                    <router-link to="/offers">
                      {{ $t("FOOTER.offers") }}
                    </router-link>
                  </td>
                  <td>customer</td>
                  <td>customer</td>
                </tr>
                <tr>
                  <td colspan="2" scope="row">Means of communication</td>
                  <td>
                    <router-link to="/terms">
                      {{ $t("FOOTER.terms") }}
                    </router-link>
                  </td>
                  <td>
                    <router-link to="/contact-us">
                      {{ $t("FOOTER.contactUs") }}
                    </router-link>
                  </td>
                  <td>the supplier</td>
                  <td>the supplier</td>
                </tr>
                <tr>
                  <td colspan="2" scope="row">Company profile</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div> -->
        </div>
      </div>
    </footer>
    <!-- START:: COPYRIGHTS -->
    <div
      style="background-color: #3f3f3e; padding-bottom: 10px; margin-top: -20px"
    >
      <div class="copy_rights_wrapper">
        <div class="m-0 copyright">
          ©{{ currentYear }} Arab For. All Rights Reserved
        </div>
      </div>
    </div>
    <!-- START:: COPYRIGHTS -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TheFooter",
  computed: {
    ...mapGetters("AppLangModule", ["getAppLocale"]),
  },
  data() {
    return {
      // START:: CURRENT YEAR DATA
      currentYear: new Date().getFullYear(),
      // END:: CURRENT YEAR DATA
      contactData: null,
      // contact: null,
    };
  },
  methods: {
    // START:: GET REQUEST
    getContactData() {
      this.$axios({
        method: "GET",
        url: `contact`,
      }).then((res) => {
        this.contactData = res.data.data;
        this.contact = JSON.parse(this.contactData.location.desc);
        // console.log(this.contactData);
      });
    },
    // START:: GET REQUEST
  },
  created() {
    this.getContactData();
  },
};
</script>

<style>
.footer_link a {
  color: #ffffff !important;
}

.footer_link a:hover {
  color: #e2e290 !important;
}
.download_app_wrapper .content .text .images a {
  height: auto !important;
  margin: 3px !important;
}

.copyright {
  background-color: #007036;
  border: 1px solid #007036;
  border-radius: 5px;
  padding: 10px 0;
  color: white !important;
  text-align: center;
}
</style>
