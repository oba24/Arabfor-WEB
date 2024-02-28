<template>
  <div class="edit_profile_form_wrapper">
    <!-- START:: BREADCRUMB -->
    <Breadcrumb :breadcrumbOptions="breadcrumbData" />
    <!-- END:: BREADCRUMB -->

    <!-- START:: PAGE CONTENT -->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-7">
          <!-- START:: FORM -->
          <div class="form_wrapper">
            <form class="my-4" @submit.prevent="validateFormInputs">
              <!-- START:: USERNAME INPUT GROUP -->
              <div class="input_wrapper">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('PLACEHOLDERS.userName')"
                  v-model.trim="data.userName"
                />
              </div>
              <!-- END:: USERNAME INPUT GROUP -->

              <!-- START:: EMAIL INPUT GROUP -->
              <div class="input_wrapper">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('PLACEHOLDERS.email')"
                  v-model.trim="data.email"
                />
              </div>
              <!-- END:: EMAIL INPUT GROUP -->

              <!-- START:: PHONE INPUT GROUP -->
              <div class="input_wrapper">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('PLACEHOLDERS.phone')"
                  v-model.trim="data.phoneNumber"
                />
              </div>
              <!-- END:: PHONE INPUT GROUP -->
              <!-- START:: TITLE INPUT GROUP -->
              <div class="input_wrapper">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('PLACEHOLDERS.title')"
                  v-model.trim="data.title"
                />
              </div>
              <!-- END:: TITLE INPUT GROUP -->

              <!-- START:: CONTENT INPUT GROUP -->
              <div class="input_wrapper">
                <textarea
                  rows="5"
                  class="form-control"
                  :placeholder="$t('PLACEHOLDERS.content')"
                  v-model.trim="data.content"
                />
              </div>
              <!-- END:: CONTENT INPUT GROUP -->

              <!-- START:: EMAIL INPUT GROUP -->
              <!-- <div class="input_wrapper">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('PLACEHOLDERS.email')"
                  v-model.trim="data.email"
                />
              </div> -->
              <!-- END:: EMAIL INPUT GROUP -->

              <!-- START:: PHONE INPUT GROUP -->
              <!-- <div class="input_wrapper">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('PLACEHOLDERS.phone')"
                  v-model.trim="data.phoneNumber"
                />
              </div> -->
              <!-- END:: PHONE INPUT GROUP -->

              <!-- START:: SUBMIT BUTTON WRAPPER -->
              <div class="btn_wrapper">
                <button style="width: 200px">
                  {{ $t("BUTTONS.send") }}
                  <span class="btn_loader" v-if="isWaitingRequest"></span>
                </button>
              </div>
              <!-- END:: SUBMIT BUTTON WRAPPER -->
            </form>
          </div>
          <!-- END:: FORM -->
        </div>
      </div>
    </div>
    <!-- END:: PAGE CONTENT -->
  </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS
// START:: IMPORTING BREADCRUMB
import Breadcrumb from "@/components/structure/TheBreadcrumb.vue";
// END:: IMPORTING BREADCRUMB
export default {
  name: "EditProfile",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      // START:: BREADCRUMB DATA
      breadcrumbData: {
        pageTitle: this.$t("TITLES.contactUs"),
        items: [
          {
            text: this.$t("TITLES.home"),
            disabled: false,
            href: "/",
          },
          {
            text: this.$t("TITLES.contactUs"),
            disabled: true,
            href: "",
          },
        ],
      },
      // END:: BREADCRUMB DATA
      // START:: LOADERS DATA
      isWaitingRequest: false,
      isWaitingGetData: false,
      // END:: LOADERS DATA
      // START:: FORM DATA
      data: {
        // title: null,
        content: null,
        userName: null,
        fullname: null,
        email: null,
        phoneNumber: null,
      },
      // END:: FORM DATA
    };
  },
  methods: {
    // START:: VUEX SET AUTHENTICATED USER DATA
    ...mapActions("AuthenticationModule", ["setAuthenticatedUserData"]),
    // END:: VUEX SET AUTHENTICATED USER DATA
    // START:: GET DATA TO EDIT
    getDataToEdit() {
      // ====== START:: SEND GET REQUEST ====== //
      this.isWaitingGetData = true;
      this.$axios({
        method: "GET",
        url: "client/profile",
      })
        .then((res) => {
          this.isWaitingGetData = false;
          // START:: SET PROFILE DATA
          this.data.userName = res.data.data.user_name;
          this.data.email = res.data.data.email;
          this.data.phoneNumber = res.data.data.phone;
          // END:: SET PROFILE DATA
        })
        .catch((err) => {
          this.isWaitingGetData = false;
          console.log(err.response.data.message);
        });
      // ====== END:: SEND GET REQUEST ====== //
    },
    // END:: GET DATA TO EDIT

    // START:: VALIDATE FORM INPUTS
    validateFormInputs() {
      this.isWaitingRequest = true;
      if (!this.data.userName) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("VALIDATION.name"),
          position: this.$t("iziToastConfigs.position"),
          rtl: this.$t("iziToastConfigs.dir"),
        });
        return;
      } else if (!this.data.email) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("VALIDATION.email"),
          position: this.$t("iziToastConfigs.position"),
          rtl: this.$t("iziToastConfigs.dir"),
        });
        return;
      } else if (!this.data.phoneNumber) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("VALIDATION.phone"),
          position: this.$t("iziToastConfigs.position"),
          rtl: this.$t("iziToastConfigs.dir"),
        });
        return;
        //   } else if (!this.data.title) {
        //     this.isWaitingRequest = false;
        //     this.$iziToast.error({
        //       timeout: 2000,
        //       message: this.$t("VALIDATION.title"),
        //       position: this.$t("iziToastConfigs.position"),
        //       rtl: this.$t("iziToastConfigs.dir"),
        //     });
        //     return;
      } else if (!this.data.content) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("VALIDATION.content"),
          position: this.$t("iziToastConfigs.position"),
          rtl: this.$t("iziToastConfigs.dir"),
        });
        return;
      } else {
        this.submitForm();
      }
    },
    // END:: VALIDATE FORM INPUTS
    // START:: SUBMIT FORM
    submitForm() {
      const request_data = new FormData();
      // START:: APPEND REQUEST DATA (FORM DATA)
      //   request_data.append("title", this.data.title);
      request_data.append("content", this.data.content);
      // END:: APPEND REQUEST DATA (FORM DATA)
      // START:: SEND EDIT PROFILE REQUEST
      this.$axios({
        method: "POST",
        url: `contact`,
        data: request_data,
      })
        .then(() => {
          this.isWaitingRequest = false;
          this.$iziToast.success({
            timeout: 2000,
            message: this.$t("MESSAGES.sent_successfully"),
            position: this.$t("iziToastConfigs.position"),
            rtl: this.$t("iziToastConfigs.dir"),
          });
          this.data.title = null;
          this.data.content = null;
        })
        .catch((err) => {
          this.isWaitingRequest = false;
          this.$iziToast.error({
            timeout: 2000,
            message: err.response.data.message,
            position: this.$t("iziToastConfigs.position"),
            rtl: this.$t("iziToastConfigs.dir"),
          });
        });
      // END:: SEND EDIT PROFILE REQUEST
    },
    // END:: SUBMIT FORM
  },
  created() {
    // START:: FIRE METHODS
    // this.getDataToEdit();
    // END:: FIRE METHODS
  },
};
</script>
