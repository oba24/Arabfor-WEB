<template>
    <div class="featured_cats_wrapper">
        <div class="container">
            <div class="row">
                <div>
                    <VueSlickCarousel v-bind="sliderConfig">
                        <div
                            class="my-3"
                            v-for="cat in shiftedCatsArray"
                            :key="cat.id"
                        >
                            <router-link
                                :to="`/categories/${cat.id}`"
                                class="cat_card_wrapper"
                            >
                                <div class="cat_image_wrapper">
                                    <img
                                        :src="cat.category_image"
                                        :alt="cat.name"
                                        width="130"
                                        height="130"
                                    />
                                </div>

                                <div class="cat_name_wrapper">
                                    <h4>{{ cat.name }}</h4>
                                </div>
                            </router-link>
                        </div>
                    </VueSlickCarousel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
    name: "FeaturedCategories",
    components: {
        VueSlickCarousel,
    },

    props: {
        featuredCatsData: {
            type: Array,
            required: true,
        },
    },

    computed: {
        // START:: FIRST ELEMENT SHIFTED CATEGORIES ARRAY
        shiftedCatsArray() {
            return [...this.featuredCatsData].splice(
                1,
                this.featuredCatsData.length - 1
            );
        },
        // END:: FIRST ELEMENT SHIFTED CATEGORIES ARRAY
    },
    data() {
        return {
            sliderConfig: {
                arrows: true,
                dots: true,
                infinite: true,
                slidesToShow: 7,
                slidesToScroll: 3,
                responsive: [
                    {
                        breakpoint: 1023,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        },
                    },
                ],
                autoplay: true,
                autoplaySpeed: 2000,
                speed: 4000,
            },
        };
    },
};
</script>

<style>
.cat_card_wrapper {
    background-color: white !important;
    border: white !important;
}
.featured_cats_wrapper {
    margin-block: 0 !important;
    margin-top: 30px !important;
}
</style>
