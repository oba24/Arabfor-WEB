<template>
  <div class="search_form_content_wrapper" v-if="formApperanceData">
    <!-- START:: CLOSE BTN -->
    <button class="close_btn" @click="toggleForm">
      <i class="fal fa-times"></i>
    </button>
    <!-- END:: CLOSE BTN -->

    <!-- START:: SEARCH FORM -->
    <div class="row w-100 justify-content-center">
      <div class="col-md-7">
        <form @submit.prevent="validateFormInputs">
          <!-- START:: SEARCH INPUT GROUP -->
          <div class="input_wrapper">
            <input
              type="text"
              class="form-control"
              :placeholder="$t('PLACEHOLDERS.search')"
              v-model.trim="data.searchKeyword"
            />
          </div>
          <!-- END:: SEARCH INPUT GROUP -->
        </form>
      </div>
    </div>
    <!-- END:: SEARCH FORM -->
  </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

export default {
  name: "SearchForm",

  emits: ["toggleSearch"],

  props: {
    formApperanceData: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      // START:: DATA
      data: {
        searchKeyword: null,
      },
      // END:: DATA
    };
  },

  methods: {
    // START:: VUEX GET SEARCH RESULTS
    ...mapActions("SearchModule", ["getSearchResult"]),
    // END:: VUEX GET SEARCH RESULTS

    // STRAT:: TOGGEL SEARCH FORM
    toggleForm() {
      this.$emit("toggleSearch");
    },
    // END:: TOGGEL SEARCH FORM

    // START:: VALIDATE FORM INPUTS
    validateFormInputs() {
      if (!this.data.searchKeyword) {
        this.$iziToast.error({
          timeout: 2000,
          message: this.$t("VALIDATION.search"),
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
      this.getSearchResult(this.data.searchKeyword);
      this.toggleForm();
      if (!this.$route.path.includes("search-result")) {
        this.$router.push("/search-result");
      }
    },
    // END:: SUBMIT FORM
  },
};
</script>
