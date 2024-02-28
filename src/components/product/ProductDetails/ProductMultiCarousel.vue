<template>
    <div class="multi_carousel_wrapper">
        <!-- START:: MAIN IMAGE -->
        <Carousel
            ref="main_image_carousel"
            v-bind="mainImageCarouselSettings"
            @beforeChange="syncSliderBehavior"
        >
            <!-- START:: CLIENT IMAGE WRAPPER -->
            <div
                class="main_image_wrapper"
                v-for="item in productSlider"
                :key="item.id"
            >
                <div class="image_wrapper">
                    <img
                        :src="item.url"
                        alt="item name"
                        width="150"
                        height="150"
                    />
                </div>
            </div>
            <!-- END:: CLIENT IMAGE WRAPPER -->
        </Carousel>
        <!-- END:: MAIN IMAGE -->

        <!-- START:: THUMBNAILS -->
        <Carousel
            class="thumbnails_carousel"
            ref="thumbnails_carousel"
            v-bind="thumbnailsCarouselSettings"
            @beforeChange="syncSliderBehavior"
        >
            <!-- START:: TESTIMONIAL BODY CARD -->
            <div
                class="thumbnails_wrapper"
                v-for="item in productSlider"
                :key="item.id"
            >
                <div class="thumbnail">
                    <img
                        :src="item.url"
                        alt="item name"
                        width="150"
                        height="150"
                    />
                </div>
            </div>
            <!-- END:: TESTIMONIAL BODY CARD -->
        </Carousel>
        <!-- END:: THUMBNAILS -->
    </div>
</template>

<script>
// START:: IMPORTING SLICK CAROUSEL
import Carousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
// END:: IMPORTING SLICK CAROUSEL

export default {
    name: "ProductMultiCarousel",

    props: {
        productSlider: {
            type: Array,
            required: true,
        },
    },

    components: {
        Carousel,
    },

    data() {
        return {
            // START:: SLICK CAROUSEL SETTINGS
            mainImageCarouselSettings: {
                slidesToShow: 1,
                focusOnSelect: true,
                infinite: true,
                responsive: [
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        },
                    },
                ],
            },

            thumbnailsCarouselSettings: {
                dots: false,
                centerMode: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                focusOnSelect: true,
                edgeFriction: 0.35,
                autoplay: false,
                infinite: true,
            },
            // END:: SLICK CAROUSEL SETTINGS

            // START:: PRODUCT IMAGES
            productImages: [
                {
                    id: 1,
                    src: require("@/assets/media/images/product1.png"),
                },
                {
                    id: 2,
                    src: require("@/assets/media/images/product2.png"),
                },
                {
                    id: 3,
                    src: require("@/assets/media/images/product3.png"),
                },
                {
                    id: 4,
                    src: require("@/assets/media/images/product4.png"),
                },
                {
                    id: 5,
                    src: require("@/assets/media/images/product5.png"),
                },
            ],
            // END:: PRODUCT IMAGES
        }
    },

    methods: {
        // START:: SYNC SLIDER BEHAVIOR METHOD
        syncSliderBehavior(nextPosition) {
            this.$refs.main_image_carousel.goTo(nextPosition);
            this.$refs.thumbnails_carousel.goTo(nextPosition);
        },
        // END:: SYNC SLIDER BEHAVIOR METHOD
    },
}
</script>