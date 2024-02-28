<template>
    <div class="container">
        <div class="exp-loader">
            <div class="row">
                <div class="col-lg-6">
                    <div class="loader-container">
                        <div class="animated-background prod-image-load"></div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="loader-container">
                        <div class="inner-flex">
                            <div class="block-element">
                                <div
                                    class="animated-background prod-name-load"
                                ></div>
                            </div>
                            <div
                                class="animated-background pro-price-load"
                            ></div>
                        </div>
                        <div class="desc-loader">
                            <div class="block-element">
                                <div
                                    class="animated-background prod-category-load"
                                ></div>
                                <div
                                    class="animated-background prod-desc-load"
                                ></div>
                                <div
                                    class="animated-background prod-desc-load"
                                ></div>
                                <div
                                    class="animated-background prod-desc-load"
                                ></div>
                            </div>
                        </div>
                        <div class="inner-flex">
                            <div class="block-element">
                                <div
                                    class="animated-background prod-name-load"
                                ></div>
                                <div
                                    class="animated-background prod-name-load"
                                ></div>
                            </div>
                            <div
                                class="animated-background pro-rate-load"
                            ></div>
                        </div>
                        <div class="block-element">
                            <div
                                class="animated-background prod-desc-load"
                            ></div>
                            <div
                                class="animated-background prod-desc-load"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.exp-loader {
    .animated-background {
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeholder;
        animation-timing-function: linear;
        background: #eeeeee;
        background: linear-gradient(to right, #eee 8%, #ddd 18%, #eee 33%);
        background-size: 1200px 100px;
        min-height: 14px;
        width: 100%;
        margin: 20px 0 20px 0;
        border-radius: 3px;
        &.prod-name-load,
        &.pro-rate-load,
        &.pro-price-load {
            width: 150px;
            margin: 15px 20px;
        }
        &.prod-category-load {
            width: 160px;
            margin-bottom: 25px;
        }
        &.prod-image-load {
            width: 100%;
            height: 350px;
        }
    }
    .inner-flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
