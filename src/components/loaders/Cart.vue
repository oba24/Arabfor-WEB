<template>
    <!-- loader -->
    <div class="row banner">
        <div class="col-lg-12">
            <div class="pro-load">
                <div class="loader-container">
                    <div class="product-shape">
                        <div class="animated-background"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="pro-load">
                <div class="loader-container">
                    <div class="product-shape">
                        <div class="animated-background"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="pro-load">
                <div class="loader-container">
                    <div class="product-shape">
                        <div class="animated-background"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="pro-load">
                <div class="loader-container">
                    <div class="product-shape">
                        <div class="animated-background"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "main-slider-loader",
    mounted() {},
    components: {},
};
</script>
<style scoped>
.banner .pro-load {
    padding: 0;
    position: relative;
    overflow: hidden;
}
.banner .pro-load .product-shape {
    display: flex;
    align-items: center;
}
.banner .animated-background {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeholder;
    animation-timing-function: linear;
    background: #ddd;
    background: linear-gradient(to right, #cbcaca 8%, #b6b6b6 18%, #cbcaca 33%);
    background-size: 1200px 100px;
    min-height: 100px;
    width: 100%;
    margin: 0 0 20px;
    border-radius: 3px;
}
@keyframes placeholder {
    0% {
        background-position: -600px 0;
    }
    100% {
        background-position: 600px 0;
    }
}
</style>
