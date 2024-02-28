<template>
    <div>
        <!-- START:: BREADCRUMB -->
        <Breadcrumb :breadcrumbOptions="breadcrumbData" />
        <!-- END:: BREADCRUMB -->

        <!-- START:: PAGE CONTENT -->
        <div class="wishlist_content_wrapper small_screens_container" v-if="wishlistData != ''">
            <div class="container">
                <div class="row">
                    <!-- START:: WISHLIST ITEM -->
                    <div
                        class="col-lg-3 my-3"
                        v-for="item in wishlistData"
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
                        v-model="paginations.currentPage"
                        :length="paginations.lastPage"
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
                            setPageDataByPagination(
                                null,
                                paginations.currentPage
                            )
                        "
                        @next="
                            setPageDataByPagination(
                                paginations.nextPageLink,
                                null
                            )
                        "
                        @previous="
                            setPageDataByPagination(
                                paginations.previousPageLink,
                                null
                            )
                        "
                    >
                    </v-pagination>
                </div> -->
            </div>
        </div>
        <!-- END:: PAGE CONTENT -->

        <!-- START:: EMPTY MESSAGE -->
        <EmptyItemsWishList  v-else />
        <!-- END:: EMPTY MESSAGE -->
    </div>
</template>

<script>
import EmptyItemsWishList from '@/components/ui/emptyMessages/EmptyItemsWishList'
// START:: IMPORTING VUEX HELPERS
import { mapGetters, mapActions } from "vuex";
// END:: IMPORTING VUEX HELPERS

// START:: IMPORTING BREADCRUMB
import Breadcrumb from "@/components/structure/TheBreadcrumb.vue";
// END:: IMPORTING BREADCRUMB

// START:: IMPORTING PRODUCT CARD COMPONENT
import ProductCard from "@/components/product/ProductCard.vue";
// END:: IMPORTING PRODUCT CARD COMPONENT

export default {
    name: "Wishlist",

    components: {
        ProductCard,
        Breadcrumb,
        EmptyItemsWishList,
    },

    computed: {
        // START:: VUEX GET APP LANG
        ...mapGetters("AppLangModule", ["getAppLocale"]),
        // END:: VUEX GET APP LANG

        // START:: VUEX GET WISHLIST DATA
        ...mapGetters("WishlistModule", ["wishlistData"]),
        // END:: VUEX GET WISHLIST DATA
    },

    data() {
        return {
            // START:: DUMMY WISHLIST DATA

            // END:: DUMMY WISHLIST DATA

            // START:: BREADCRUMB DATA
            breadcrumbData: {
                pageTitle: this.$t("TITLES.favorites"),
                items: [
                    {
                        text: this.$t("TITLES.home"),
                        disabled: false,
                        href: "/",
                    },
                    {
                        text: this.$t("TITLES.favorites"),
                        disabled: true,
                        href: "",
                    },
                ],
            },
            // END:: BREADCRUMB DATA

            // START:: PAGINATION DATA
            paginations: {
                currentPage: 1,
                lastPage: 15,
                itemsPerPage: 3,
                previousPageLink: null,
                nextPageLink: null,
            },
            // END:: PAGINATION DATA
        };
    },

    methods: {
        ...mapActions("WishlistModule", ["getWishlist"]),

        // START:: PAGINATION SET PAGE DATA
        setPageDataByPagination(pageLink, selectedPage) {
            
            let pageNumber = selectedPage ? selectedPage : pageLink.slice(-1);
            console.log(pageNumber);

            // START:: SEND GET REQUEST
            // this.loading = true;
            // this.$axios({
            //     method: "GET",
            //     url: `city`,
            //     params: { page: pageNumber },
            // })
            //     .then((res) => {
            //         this.loading = false;

            //         // START:: SET PAGENATION DATA
            //         this.paginations.previousPageLink = res.data.links.prev;
            //         this.paginations.nextPageLink = res.data.links.next;
            //         this.paginations.lastPage = res.data.meta.last_page;
            //         this.paginations.itemsPerPage = res.data.meta.per_page;
            //         // END:: SET PAGENATION DATA

            //         this.pageData = res.data.data;
            //     })
            //     .catch((err) => {
            //         this.loading = false;
            //         console.log(err.response.data.message);
            //     });
            // END:: SEND GET REQUEST
        },
        // END:: PAGINATION SET PAGE DATA
    },

    created() {
        this.getWishlist();
    },
};
</script>
