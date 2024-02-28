<template>
  <div class="search_result_content_wrapper">
    <!-- START:: BREADCRUMB -->
    <Breadcrumb :breadcrumbOptions="breadcrumbData" />
    <!-- END:: BREADCRUMB -->

    <!-- START:: PAGE CONTENT -->
    <div
      class="search_results_content_wrapper small_screens_container"
      v-if="searchResults != ''"
    >
      <div class="container">
        <div class="row">
          <!-- START:: WISHLIST ITEM -->
          <div
            class="col-lg-3 my-3"
            v-for="item in searchResults"
            :key="item.id"
          >
            <ProductCard :productDetails="item" />
          </div>
          <!-- END:: WISHLIST ITEM -->
        </div>

        <!-- <div class="pagination_container text-center my-4">
                    <v-pagination
                        class="py-0"
                        square
                        v-model="searchResultsPagenation.currentPage"
                        :length="searchResultsPagenation.lastPage"
                        :total-visible="6"
                        :prev-icon="
                            getAppLocale == 'ar'
                                ? 'fal fa-angle-right'
                                : 'fal fa-angle-left'
                        "
                        :next-icon="
                            getAppLocale == 'ar'
                                ? 'fal fa-angle-left'
                                : 'fal fa-angle-right'
                        "
                        @input="
                            setSearchResultsByPagination({
                                pageLink: null,
                                selectedPage:
                                    searchResultsPagenation.currentPage,
                            })
                        "
                        @next="
                            setSearchResultsByPagination({
                                pageLink: searchResultsPagenation.nextPageLink,
                                selectedPage: null,
                            })
                        "
                        @previous="
                            setSearchResultsByPagination({
                                pageLink:
                                    searchResultsPagenation.previousPageLink,
                                selectedPage: null,
                            })
                        "
                    >
                    </v-pagination>
                </div> -->
      </div>
    </div>
    <!-- END:: PAGE CONTENT -->

    <!-- START:: EMPTY MESSAGE -->
    <EmptyItemsSearch v-else />
    <!-- END:: EMPTY MESSAGE -->
  </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters, mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS
import EmptyItemsSearch from "@/components/ui/emptyMessages/EmptyItemsSearch";
// START:: IMPORTING BREADCRUMB
import Breadcrumb from "@/components/structure/TheBreadcrumb.vue";
// END:: IMPORTING BREADCRUMB

// START:: IMPORTING PRODUCT CARD COMPONENT
import ProductCard from "@/components/product/ProductCard.vue";
// END:: IMPORTING PRODUCT CARD COMPONENT

export default {
  name: "SearchResult",

  components: {
    Breadcrumb,
    ProductCard,
    EmptyItemsSearch,
  },

  computed: {
    // START:: VUEX GET APP LANG
    ...mapGetters("AppLangModule", ["getAppLocale"]),
    // END:: VUEX GET APP LANG

    // START:: VUEX GET SRAECH RESULTS
    ...mapGetters("SearchModule", ["searchResults", "searchResultsPagenation"]),
    // END:: VUEX GET SRAECH RESULTS
  },

  data() {
    return {
      // START:: BREADCRUMB DATA
      breadcrumbData: {
        // pageTitle: "نتائج البحث",
        pageTitle: this.$t("TITLES.search_results"),
        items: [
          {
            text: this.$t("TITLES.home"),
            disabled: false,
            href: "/",
          },
          {
            text: this.$t("TITLES.search_results"),
            disabled: true,
            href: "",
          },
        ],
      },
      // END:: BREADCRUMB DATA
    };
  },

  methods: {
    // START:: VUEX GET SEARCH RESULTS
    ...mapActions("SearchModule", ["setSearchResultsByPagination"]),
    // END:: VUEX GET SEARCH RESULTS
  },
};
</script>
