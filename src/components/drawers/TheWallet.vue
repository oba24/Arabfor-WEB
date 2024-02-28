<template>
    <!-- START:: WALLET DRAWER -->
    <div class="wallet_drawer_wrapper" :class="{ active: walletDrawerIsOpen }">
        <!-- START:: DRAWER CONTENT WRAPPER -->
        <div class="drawer_content_wraper">
            <!-- START:: CLOSE BUTTON -->
            <button class="close_btn" @click="toggleWallet">
                <i class="fal fa-times"></i>
            </button>
            <!-- END:: CLOSE BUTTON -->

            <!-- START:: TITLE WRAPPER -->
            <div class="title_wrapper">
                <h4>رصيد الحساب</h4>
            </div>
            <!-- END:: TITLE WRAPPER -->

            <!-- START:: BALANCE CARD -->
            <div class="balance_card_wrapper">
                <h6 class="card_title">رصيدك هو</h6>
                <h4 class="balance" v-if="walletData">{{ walletData.wallet }} ر.س</h4>
            </div>
            <!-- END:: BALANCE CARD -->

            <!-- START:: WITHDRAW BUTTON -->
            <div class="button_wrapper">
                <button class="withdraw_btn" @click="toggleWithdraw">
                    طلب استرداد المبلغ
                </button>
            </div>
            <!-- END:: WITHDRAW BUTTON -->
        </div>
        <!-- END:: DRAWER CONTENT WRAPPER -->
    </div>
    <!-- END:: WALLET DRAWER -->
</template>

<script>
export default {
    name: "TheWallet",

    emits: ["toggleWalletDrawer", "toggleWithdrawDrawer"],

    props: {
        walletDrawerIsOpen: {
            type: Boolean,
            require: true,
        },
    },

    data() {
        return {
            // START:: WALLET DATA
            walletData: null,
            // END:: WALLET DATA

            // START:: AUTHED USER TOKEN DATA
            authedUserToken: localStorage.getItem("saudi_marche_user_token"),
            // END:: AUTHED USER TOKEN DATA
        };
    },

    methods: {
        // START:: TOGGLE WALLET
        toggleWallet() {
            this.$emit("toggleWalletDrawer");
        },
        // END:: TOGGLE WALLET

        // START:: TOGGLE WITHDRAW
        toggleWithdraw() {
            this.$emit("toggleWithdrawDrawer");
        },
        // END:: TOGGLE WITHDRAW

        // START:: GET WALLET DATA
        getWalletData() {
            this.$axios({
                method: "GET",
                url: `wallet`,
            })
                .then((res) => {
                    this.walletData = res.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        },
        // END:: GET WALLET DATA
    },

    created() {
        // START:: FIRE METHODS
        if(this.authedUserToken != null){
            this.getWalletData();
        }
        // END:: FIRE METHODS
    },
};
</script>
