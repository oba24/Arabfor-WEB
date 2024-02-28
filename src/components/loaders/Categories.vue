<template>
    <!-- loader -->
    <div class="container">
        <div class="row banner">
            <div class="col-lg-3">
                <div class="pro-load">
                    <div class="loader-container">
                        <div class="product-shape">
                            <div class="animated-background"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="pro-load">
                    <div class="loader-container">
                        <div class="product-shape">
                            <div class="animated-background"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="pro-load">
                    <div class="loader-container">
                        <div class="product-shape">
                            <div class="animated-background"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="pro-load">
                    <div class="loader-container">
                        <div class="product-shape">
                            <div class="animated-background"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="pro-load">
                    <div class="loader-container">
                        <div class="product-shape">
                            <div class="animated-background"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="pro-load">
                    <div class="loader-container">
                        <div class="product-shape">
                            <div class="animated-background"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="pro-load">
                    <div class="loader-container">
                        <div class="product-shape">
                            <div class="animated-background"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="pro-load">
                    <div class="loader-container">
                        <div class="product-shape">
                            <div class="animated-background"></div>
                        </div>
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
<style lang="scss" scoped>
.banner {
    .pro-load {
        padding: 0;
        position: relative;
        overflow: hidden;
        .product-shape {
            display: flex;
            align-items: center;
        }
    }
    .animated-background {
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeholder;
        animation-timing-function: linear;
        background: linear-gradient(
            to right,
            #cbcaca 8%,
            #b6b6b6 18%,
            #cbcaca 33%
        );
        background-size: 1200px 100px;
        min-height: 150px;
        width: 100%;
        margin: 0;
        border-radius: 3px;
        margin-bottom: 20px;
        &.diff-sahpe {
            min-height: 320px;
        }
    }
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
