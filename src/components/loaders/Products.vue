<template>
    <!-- loader -->
    <div class="container">
        <div class="row cards">
            <div class="col-lg-3">
                <div class="card-loader">
                    <div class="animated-background profile-image"></div>
                    <div class="small">
                        <div class="animated-background prod-name-load"></div>
                        <div class="animated-background pro-rate-load"></div>
                        <div class="bottom_flex">
                            <div
                                class="animated-background pro-rate-load"
                            ></div>
                            <div class="animated-background pro-fav-load"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card-loader">
                    <div class="animated-background profile-image"></div>
                    <div class="small">
                        <div class="animated-background prod-name-load"></div>
                        <div class="animated-background pro-rate-load"></div>
                        <div class="bottom_flex">
                            <div
                                class="animated-background pro-rate-load"
                            ></div>
                            <div class="animated-background pro-fav-load"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card-loader">
                    <div class="animated-background profile-image"></div>
                    <div class="small">
                        <div class="animated-background prod-name-load"></div>
                        <div class="animated-background pro-rate-load"></div>
                        <div class="bottom_flex">
                            <div
                                class="animated-background pro-rate-load"
                            ></div>
                            <div class="animated-background pro-fav-load"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card-loader">
                    <div class="animated-background profile-image"></div>
                    <div class="small">
                        <div class="animated-background prod-name-load"></div>
                        <div class="animated-background pro-rate-load"></div>
                        <div class="bottom_flex">
                            <div
                                class="animated-background pro-rate-load"
                            ></div>
                            <div class="animated-background pro-fav-load"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
    mounted() {},
    components: {},
};
</script>
<style lang="scss" scoped>
.cards {
    .card-loader {
        .small {
            display: block;
            text-align: right;
            .animated-background {
                min-height: 12px;
                margin: 10px 0;
                &.prod-name-load {
                    width: 55%;
                }
                &.pro-rate-load {
                    width: 35%;
                }
                &.pro-fav-load {
                    width: 14%;
                }
            }
            .bottom_flex {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
    .profile-image {
        margin-top: 10px;
        width: 100%;
        height: 250px;
    }
    .animated-background {
        animation-duration: 1s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeholder;
        animation-timing-function: linear;
        background: #ddd;
        background: linear-gradient(
            to right,
            #cbcaca 8%,
            #b6b6b6 18%,
            #cbcaca 33%
        );
        background-size: 1200px 100px;
        min-height: 50px;
        width: 100%;
        margin: 0;
        border-radius: 3px;
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
