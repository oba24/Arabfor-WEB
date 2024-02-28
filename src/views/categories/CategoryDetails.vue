<template>
    <div>
        <!-- START:: BREADCRUMB -->
        <Breadcrumb :breadcrumbOptions="breadcrumbData" />
        <!-- END:: BREADCRUMB -->

        <div class="container">
            <!-- START:: CATEGORY FILTER BUTTONS -->
            <div class="filter_content_btns_wrapper">
                <!-- START:: STATIC ALL SUB CATEGORIES FILTER BUTTONS -->
                <button
                    class="filter_content_btn"
                    :class="activeSubCat == 'all' ? 'active_btn' : ''"
                    @click="getCategoryDataBySubCategory('all', 'all')"
                >
                    الكل
                </button>
                <!-- END:: STATIC ALL SUB CATEGORIES FILTER BUTTONS -->

                <button
                    class="filter_content_btn"
                    v-for="item in subCats"
                    :key="item.id"
                    :class="activeSubCat == item.name_trans ? 'active_btn' : ''"
                    @click="getCategoryDataBySubCategory(item.id)"
                >
                    {{ item.name }}
                </button>
            </div>
            <!-- END:: CATEGORY FILTER BUTTONS -->

            <!-- START:: FILTER DRAWER TOGGELER -->
            <div class="filter_drawer_toggeler_wrapper">
                <button
                    class="filter_drawer_toggeler"
                    @click="toggleFilterDrawer"
                >
                    <span class="icon">
                        <i class="fal fa-sliders-v"></i>
                    </span>
                    <span class="text"> فلتر </span>
                </button>
            </div>
            <!-- END:: FILTER DRAWER TOGGELER -->
        </div>

        <!-- START:: LOADER -->
        <ProductsLoader v-if="categoryProductsResource == null" />
        <!-- END:: LOADER -->

        <!-- START:: PAGE CONTENT -->
        <div class="category_content_wrapper small_screens_container" v-else>
            <!-- START:: EMPTY MESSAGE -->
            <EmptyItemsProducts v-if="categoryProductsResource == ''" />
            <!-- END:: EMPTY MESSAGE -->
            <div class="container" v-else>
                <div class="row">
                    <!-- START:: WISHLIST ITEM -->
                    <div
                        class="col-lg-3 my-3"
                        v-for="item in categoryProductsResource"
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

        <!-- START:: FILTER DRAWER -->
        <TheFilter
            :filterDrawerIsOpen="filterDrawerIsOpen"
            @toggleFilter="toggleFilterDrawer"
        />
        <!-- END:: FILTER DRAWER -->
    </div>
</template>

<script>
// START:: IMPORTING VUEX HELPERS
import { mapGetters } from "vuex";
// END:: IMPORTING VUEX HELPERS

// START:: IMPORTING BREADCRUMB
import Breadcrumb from "@/components/structure/TheBreadcrumb.vue";
// END:: IMPORTING BREADCRUMB

// START:: IMPORTING FILTER
import TheFilter from "@/components/drawers/TheFilter.vue";
// END:: IMPORTING FILTER

// START:: IMPORTING PRODUCT CARD COMPONENT
import ProductCard from "@/components/product/ProductCard.vue";
// END:: IMPORTING PRODUCT CARD COMPONENT

// START:: IMPORTING PRODUCT CARD COMPONENT
import EmptyItemsProducts from "../../components/ui/emptyMessages/EmptyItemsProducts.vue";
// END:: IMPORTING PRODUCT CARD COMPONENT

// START:: PRODUCT CARD
import ProductsLoader from "@/components/loaders/Products.vue";
// END:: PRODUCT CARD

export default {
    name: "CategoryDetails",

    props: {
        id: {
            type: String,
            required: true,
        },
    },

    components: {
        ProductCard,
        Breadcrumb,
        TheFilter,
        EmptyItemsProducts,
        ProductsLoader,
    },

    computed: {
        // START:: VUEX GET APP LANG
        ...mapGetters("AppLangModule", ["getAppLocale"]),
        // END:: VUEX GET APP LANG

        // START:: VUEX GET FILTERED PRODUCTS
        ...mapGetters("FilterModule", ["filteredProducts"]),
        // END:: VUEX GET FILTERED PRODUCTS

        categoryProductsResource() {
            return !this.filteredProducts
                ? this.categoryData
                : this.filteredProducts;
        },

        // categoryNameData(){
        //     return this.breadcrumbData.pageTitle == this.categoryName;
        // }
    },

    data() {
        return {
            // START:: BREADCRUMB DATA
            breadcrumbData: {
                pageTitle: null,
                items: [
                    {
                        text: this.$t("TITLES.home"),
                        disabled: false,
                        href: "/",
                    },
                    {
                        text: null,
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

            // START:: FILTER DRAWER APPERANCE DATA
            filterDrawerIsOpen: false,
            // START:: FILTER DRAWER APPERANCE DATA

            // START:: SUB CATEGORIES DATA
            subCats: null,
            categoryName: null,
            activeSubCat: "all",
            // END:: SUB CATEGORIES DATA

            // START:: CATEGORY DATA
            categoryData: null,
            // END:: CATEGORY DATA
        };
    },

    methods: {
        // START:: TOGGLE FILTER DRAWER
        toggleFilterDrawer() {
            this.filterDrawerIsOpen = !this.filterDrawerIsOpen;

            let bodyElement = document.body;
            if (this.filterDrawerIsOpen == true) {
                bodyElement.style.overflowY = "hidden";
            } else {
                bodyElement.style.overflowY = "auto";
            }
        },
        // END:: TOGGLE FILTER DRAWER

        // START:: GET CATEGORY DATA
        getCategoryData() {
            this.$axios({
                method: "GET",
                url: `categories/${this.id}`,
                params: {
                    sub_category_id: "all",
                },
            })
                .then((res) => {
                    console.log(res.data.data);
                    this.subCats = res.data.data.sub_category;
                    this.categoryData = res.data.data.products;
                    this.breadcrumbData.pageTitle =
                        res.data.data.main_category_name;
                    this.breadcrumbData.items[1].text =
                        res.data.data.main_category_name;
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        },
        // END:: GET CATEGORY DATA

        // START:: GET CATEGORY DATA BY SUB CATEGORY
        getCategoryDataBySubCategory(subCatId, activeItem) {
            this.$axios({
                method: "GET",
                url: `categories/${this.id}`,
                params: {
                    sub_category_id: subCatId,
                },
            })
                .then((res) => {
                    this.categoryData = res.data.data.products;
                    let selectedSubCat = this.subCats.find(
                        (element) => element.id == subCatId
                    );
                    if (activeItem) {
                        this.activeSubCat = activeItem;
                    } else {
                        this.activeSubCat = selectedSubCat.name_trans;
                    }
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        },
        // END:: GET CATEGORY DATA BY SUB CATEGORY

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
        // START:: FIRE METHODS
        this.getCategoryData();
        // END:: FIRE METHODS
    },
};
</script>
