<template>
    <div class="terms_modal_wrapper">
        <BaseModal
            :show="modalApperanceData"
            @controleModalApperance="controleModalApperance"
        >
            <template #modal>
                <div class="terms_content_wrapper">
                    <!-- START:: TITLE -->
                    <h2 class="terms_modal_title">{{ $t("TITLES.terms") }}</h2>
                    <!-- END:: TITLE -->

                    <!-- START:: TERMS CONTENT -->
                    <div class="container">
                        <div
                            class="modal_content"
                            v-html="termsAndConditions"
                        ></div>
                    </div>
                    <!-- END:: TERMS CONTENT -->

                    <!-- START:: MODAL BUTTON -->
                    <div class="btn_wrapper">
                        <button type="button" @click="controleModalApperance">
                            {{ $t("BUTTONS.ok") }}
                        </button>
                    </div>
                    <!-- END:: MODAL BUTTON -->
                </div>
            </template>
        </BaseModal>
    </div>
</template>

<script>
// START:: IMPORTING BASE MODAL
import BaseModal from "../ui/BaseModal.vue";
// END:: IMPORTING BASE MODAL

export default {
    name: "TermsModal",

    components: {
        BaseModal,
    },

    props: ["modalApperanceData"],

    emits: ["controleModalApperance"],

    data() {
        return {
            // START:: TERMS AND CONDITIONS DATA
            termsAndConditions: null,
            // END:: TERMS AND CONDITIONS DATA
        };
    },

    methods: {
        // START:: CONTROLE MODAL APPERANCE
        controleModalApperance() {
            this.$emit("controleModalApperance");
        },
        // END:: CONTROLE MODAL APPERANCE

        // START:: GET TERMS AND CONDITIONS
        getTermsAndConditions() {
            this.$axios
                .get("terms", {
                    headers: {
                        Authorization:
                            "Bearer " +
                            localStorage.getItem("saudi_marche_user_token"),
                        lang: localStorage.getItem("saudi_marche_language"),
                        "cache-control": "no-cache",
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    // START:: HANDLING MAIN LOADER APPERANCE
                    (this.isLoading = false),
                        // END:: HANDLING MAIN LOADER APPERANCE

                        (this.termsAndConditions = res.data.data.terms);
                });
        },
        // END:: GET TERMS AND CONDITIONS
    },

    mounted() {
        // START:: GET TERMS AND CONDITIONS
        this.getTermsAndConditions();
        // END:: GET TERMS AND CONDITIONS
    },
};
</script>
