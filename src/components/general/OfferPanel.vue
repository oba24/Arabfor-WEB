<template>
    <div class="offer_panel_wrapper">
        <!-- v-for="single in slider_body[0]" :key="single.id" -->
        <router-link to="/">
            <img
                src="https://arabfor.sa/new-design/img/offer.26bf3c0b.png"
                :alt="panelImage.name"
                style="
                    object-fit: contain !important;
                    height: initial !important;
                "
            />
        </router-link>
    </div>
</template>

<script>
export default {
    name: "OfferPanel",

    props: {
        panelImage: {
            type: Object,
            required: true,
        },
    },
};
</script>
