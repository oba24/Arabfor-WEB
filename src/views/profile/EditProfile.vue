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
              <!-- START:: MULTI UPLOAD FILES GROUP -->
              <div class="single_image_input_wrapper mb-5">
                <div class="wrapper">
                  <label for="user_avatar">
                    <i class="fal fa-pencil-alt"></i>
                  </label>
                  <img
                    class="image_uploaded"
                    :src="data.avatar.path"
                    alt="User Avatar"
                    width="160"
                    height="160"
                  />
                  <input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    class="form-control"
                    id="user_avatar"
                    @change="selectUploadedImage"
                  />
                </div>
              </div>
              <!-- END:: MULTI UPLOAD FILES GROUP -->

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

              <!-- START:: FULLNAME INPUT GROUP -->
              <div class="input_wrapper">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="$t('PLACEHOLDERS.fullName')"
                  v-model.trim="data.fullname"
                />
              </div>
              <!-- END:: FULLNAME INPUT GROUP -->

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

              <!-- START:: EDIT PASSWORD CHECK INPUT GROUP -->
              <!-- <div class="input_wrapper switch_wrapper" dir="ltr">
                <h5 class="switch_label">
                  {{ $t("PLACEHOLDERS.editPassword") }}
                </h5>
                <v-switch v-model="data.editPassword" hide-details> </v-switch>
              </div> -->
              <!-- END:: EDIT PASSWORD CHECK INPUT GROUP -->

              <!-- START:: ========== IS AUCTION INPUTS -->
              <transition name="fadeInUp">
                <div v-if="data.editPassword">
                  <!-- START:: PASSWORD INPUT GROUP -->
                  <div class="input_wrapper password_input_wrapper">
                    <input
                      type="password"
                      class="form-control"
                      :placeholder="$t('PLACEHOLDERS.currentPassword')"
                      v-model.trim="data.currentPassword"
                    />
                    <button
                      type="button"
                      class="password_visibility_toggler"
                      @click="togglePasswordVisibility"
                    >
                      <i class="fal fa-eye"></i>
                      <i class="fal fa-eye-slash"></i>
                    </button>
                  </div>
                  <!-- END:: PASSWORD INPUT GROUP -->

                  <!-- START:: PASSWORD INPUT GROUP -->
                  <div class="input_wrapper password_input_wrapper">
                    <input
                      type="password"
                      class="form-control"
                      :placeholder="$t('PLACEHOLDERS.newPassword')"
                      v-model.trim="data.password"
                    />
                    <button
                      type="button"
                      class="password_visibility_toggler"
                      @click="togglePasswordVisibility"
                    >
                      <i class="fal fa-eye"></i>
                      <i class="fal fa-eye-slash"></i>
                    </button>
                  </div>
                  <!-- END:: PASSWORD INPUT GROUP -->

                  <!-- START:: CONFIRM PASSWORD INPUT GROUP -->
                  <div class="input_wrapper password_input_wrapper">
                    <input
                      type="password"
                      class="form-control"
                      :placeholder="$t('PLACEHOLDERS.confirm_new_password')"
                      v-model.trim="data.confirmPassword"
                    />
                    <button
                      type="button"
                      class="password_visibility_toggler"
                      @click="togglePasswordVisibility"
                    >
                      <i class="fal fa-eye"></i>
                      <i class="fal fa-eye-slash"></i>
                    </button>
                  </div>
                  <!-- END:: CONFIRM PASSWORD INPUT GROUP -->
                </div>
              </transition>
              <!-- END:: ========== IS AUCTION INPUTS -->

              <!-- START:: SUBMIT BUTTON WRAPPER -->
              <div class="btn_wrapper">
                <button style="width: 200px">
                  {{ $t("BUTTONS.save") }}
                  <span class="btn_loader" v-if="isWaitingRequest"></span>
                </button>
              </div>
              <!-- END:: SUBMIT BUTTON WRAPPER -->
            </form>
            <!-- <form class="my-4" @submit.prevent="RequestDeleteAccount"> -->
            <!-- START:: SUBMIT BUTTON WRAPPER -->
            <!-- <div class="btn_wrapper">
                <button
                  style="width: 200px; background-color: red; color: white"
                >
                  {{ $t("BUTTONS.deleteAccount") }}
                  <span class="btn_loader" v-if="isWaitingRequestDelete"></span>
                </button>
              </div> -->
            <!-- END:: SUBMIT BUTTON WRAPPER -->
            <!-- </form> -->
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
        pageTitle: this.$t("TITLES.myAccount"),
        items: [
          {
            text: this.$t("TITLES.home"),
            disabled: false,
            href: "/",
          },
          {
            text: this.$t("TITLES.myAccount"),
            disabled: true,
            href: "",
          },
        ],
      },
      // END:: BREADCRUMB DATA
      // START:: LOADERS DATA
      isWaitingRequest: false,
      isWaitingRequestDelete: false,
      isWaitingGetData: false,
      // END:: LOADERS DATA
      // START:: FORM DATA
      data: {
        avatar: {
          path: require("@/assets/media/images/user_avatar.png"),
          file: null,
        },
        user_id: null,
        userName: null,
        fullname: null,
        email: null,
        phoneNumber: null,
        editPassword: false,
        currentPassword: null,
        password: null,
        confirmPassword: null,
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
          //   console.log(res.data);
          this.isWaitingGetData = false;
          // START:: SET PROFILE DATA
          this.data.avatar.path = res.data.data.image;
          this.data.user_id = res.data.data.id;
          this.data.userName = res.data.data.user_name;
          this.data.fullname = res.data.data.fullname;
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
    // START:: TOGGLE PASSWORD VISIBILITY METHOD
    togglePasswordVisibility(e) {
      let passwordElement = e.currentTarget.parentElement.children[0];
      let passwordTogglerBtn = e.currentTarget;
      if (passwordElement.type == "password") {
        passwordElement.type = "text";
        passwordTogglerBtn.classList.add("password_is_visible");
      } else if (passwordElement.type == "text") {
        passwordElement.type = "password";
        passwordTogglerBtn.classList.remove("password_is_visible");
      }
    },
    // END:: TOGGLE PASSWORD VISIBILITY METHOD
    // START:: SELECT UPLOADED IMAGE
    selectUploadedImage(e) {
      this.data.avatar.path = URL.createObjectURL(e.target.files[0]);
      this.data.avatar.file = e.target.files[0];
    },
    // END:: SELECT UPLOADED IMAGE
    // START:: VALIDATE FORM INPUTS
    validateFormInputs() {
      this.isWaitingRequest = true;
      if (!this.data.avatar.path) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("VALIDATION.userImage"),
          position: this.$t("iziToastConfigs.position"),
          rtl: this.$t("iziToastConfigs.dir"),
        });
        return;
      } else if (!this.data.userName) {
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
      } else if (this.data.editPassword && !this.data.currentPassword) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("VALIDATION.currentPassword"),
          position: this.$t("iziToastConfigs.position"),
          rtl: this.$t("iziToastConfigs.dir"),
        });
        return;
      } else if (this.data.editPassword && !this.data.password) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("VALIDATION.password"),
          position: this.$t("iziToastConfigs.position"),
          rtl: this.$t("iziToastConfigs.dir"),
        });
        return;
      } else if (this.data.editPassword && this.data.password.length < 6) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("VALIDATION.password_length"),
          position: this.$t("iziToastConfigs.position"),
          rtl: this.$t("iziToastConfigs.dir"),
        });
        return;
      } else if (this.data.editPassword && !this.data.confirmPassword) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("VALIDATION.password"),
          position: this.$t("iziToastConfigs.position"),
          rtl: this.$t("iziToastConfigs.dir"),
        });
        return;
      } else if (
        this.data.editPassword &&
        this.data.confirmPassword.length < 6
      ) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("VALIDATION.password_length"),
          position: this.$t("iziToastConfigs.position"),
          rtl: this.$t("iziToastConfigs.dir"),
        });
        return;
      } else if (
        this.data.editPassword &&
        this.data.password != this.data.confirmPassword
      ) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("VALIDATION.not_equal_passwords"),
          messageSize: "22",
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
      if (!this.data.editPassword) {
        if (this.data.avatar.file) {
          request_data.append("image", this.data.avatar.file);
        }
        request_data.append("username", this.data.userName);
        request_data.append("fullname", this.data.fullname);
        request_data.append("email", this.data.email);
        request_data.append("phone", this.data.phoneNumber);
      } else {
        request_data.append("old_password", this.data.currentPassword);
        request_data.append("password", this.data.password);
      }
      // END:: APPEND REQUEST DATA (FORM DATA)
      // START:: SEND EDIT PROFILE REQUEST
      if (!this.data.editPassword) {
        this.$axios({
          method: "POST",
          url: `client/profile`,
          data: request_data,
        })
          .then((res) => {
            this.isWaitingRequest = false;
            this.$iziToast.success({
              timeout: 2000,
              message: this.$t("MESSAGES.edited_successfully"),
              position: this.$t("iziToastConfigs.position"),
              rtl: this.$t("iziToastConfigs.dir"),
            });
            this.setAuthenticatedUserData({
              avatar: res.data.data.image,
              name: res.data.data.username,
            });
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
      } else {
        this.$axios({
          method: "POST",
          url: `edit_password`,
          data: request_data,
        })
          .then(() => {
            this.isWaitingRequest = false;
            this.$iziToast.success({
              timeout: 2000,
              message: this.$t("MESSAGES.edited_successfully"),
              position: this.$t("iziToastConfigs.position"),
              rtl: this.$t("iziToastConfigs.dir"),
            });
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
      }
      // END:: SEND EDIT PROFILE REQUEST
    },
    // END:: SUBMIT FORM

    //START:: REQUEST DELETE ACCOUNT
    RequestDeleteAccount() {
      var canDelete = confirm(this.$t("MESSAGES.confirm_deleteAccount"));
      if (canDelete) {
        this.isWaitingRequestDelete = true;
        this.$axios({
          method: "DELETE",
          url: `client/${this.data.user_id}`,
        })
          .then(() => {
            this.isWaitingRequestDelete = false;
            this.$iziToast.success({
              timeout: 2000,
              message: this.$t("MESSAGES.sent_successfully"),
              position: this.$t("iziToastConfigs.position"),
              rtl: this.$t("iziToastConfigs.dir"),
            });
          })
          .catch((err) => {
            this.isWaitingRequestDelete = false;
            this.$iziToast.error({
              timeout: 2000,
              message: err.response.data.message,
              position: this.$t("iziToastConfigs.position"),
              rtl: this.$t("iziToastConfigs.dir"),
            });
          });
      }
    },
    //END:: REQUEST DELETE ACCOUNT
  },
  created() {
    // START:: FIRE METHODS
    this.getDataToEdit();
    // END:: FIRE METHODS
  },
};
</script>
