<template>
    <div class="checkout_step_one_wrapper">
        <div class="payment_form_wrapper">
            <div class="container">
                <!-- START:: FORM -->
                <div class="form_wrapper">
                    <form class="mt-4" @submit.prevent="validateFormInputs">
                        <!-- START:: GROUP TITLE -->
                        <h4 class="group_title">
                            {{ $t("TITLES.clientData") }}
                        </h4>
                        <!-- END:: GROUP TITLE -->

                        <!-- START:: NAME INPUT GROUP -->
                        <div class="input_wrapper">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="إسم العميل"
                                v-model.trim="data.name"
                            />
                        </div>
                        <!-- END:: NAME INPUT GROUP -->

                        <!-- START:: PHONE INPUT GROUP -->
                        <div class="input_wrapper">
                            <input
                                type="tel"
                                class="form-control"
                                placeholder="رقم الجوال"
                                v-model.trim="data.phone"
                            />
                        </div>
                        <!-- END:: PHONE INPUT GROUP -->

                        <!-- START:: PAYMENT WAY INPUT GROUP -->
                        <div class="input_wrapper select_wrapper">
                            <multiselect
                                v-model="data.paymentWay"
                                :options="payTypes"
                                label="name"
                                track-by="id"
                                placeholder="طريقة الدفع"
                                :searchable="true"
                                :allow-empty="false"
                                :show-labels="false"
                                :open-direction="'bottom'"
                            >
                            </multiselect>
                        </div>
                        <!-- END:: PAYMENT WAY INPUT GROUP -->

                        <!-- START:: TRANSACTION ID INPUT GROUP -->
                        <!-- <div class="input_wrapper" v-if="data.paymentWay.id == 'credit'">
              <input
                type="text"
                class="form-control"
                placeholder="رقم العملية"
                v-model.trim="data.transactionId"
              />
            </div> -->
                        <!-- END:: TRANSACTION ID INPUT GROUP -->

                        <!-- START:: SHIPPING WAY INPUT GROUP -->
                        <div
                            class="input_wrapper select_wrapper"
                            v-if="shippingTypes"
                        >
                            <multiselect
                                v-model="data.shippingWay"
                                :options="shippingTypes"
                                label="name"
                                track-by="id"
                                placeholder="طريقة الشحن"
                                :searchable="true"
                                :allow-empty="false"
                                :show-labels="false"
                                :open-direction="'bottom'"
                            >
                            </multiselect>
                        </div>
                        <!-- END:: SHIPPING WAY INPUT GROUP -->

                        <!-- START:: GROUP TITLE -->
                        <h4 class="group_title">
                            {{ $t("TITLES.currentAddresses") }}
                        </h4>
                        <!-- END:: GROUP TITLE -->

                        <!-- START:: CURRENT ADDRESSES GROUP -->
                        <div
                            class="input_wrapper checkbox_input"
                            v-for="item in currentAddresses"
                            :key="item.id"
                        >
                            <div class="form-check">
                                <label class="form-check-label">
                                    <div class="text-check">
                                        <span class="label_text">
                                            {{ item.name }}
                                        </span>
                                        <input
                                            class="form-check-input"
                                            type="radio"
                                            name="currentAddresses"
                                            :value="item.id"
                                            v-model="data.addresses"
                                        />
                                    </div>

                                    <span class="label_desc">
                                        {{ item.address }}
                                    </span>
                                </label>
                            </div>
                        </div>
                        <!-- END:: CURRENT ADDRESSES GROUP -->

                        <!-- START:: SUBMIT BUTTON WRAPPER -->
                        <div class="btn_wrapper">
                            <button>
                                {{ $t("BUTTONS.pay") }}
                                <span
                                    class="btn_loader"
                                    v-if="isWaitingRequest"
                                ></span>
                            </button>
                        </div>
                        <!-- END:: SUBMIT BUTTON WRAPPER -->
                    </form>
                </div>
                <!-- END:: FORM -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CheckoutStepOne",

    data() {
        return {
            // START:: DUMMY SELECT DATA
            dummyOptions: [
                {
                    id: 1,
                    name: "Options 1",
                },
                {
                    id: 2,
                    name: "Options 2",
                },
                {
                    id: 3,
                    name: "Options 3",
                },
            ],
            // END:: DUMMY SELECT DATA

            // START:: LOADER APPERANCE DATA
            isWaitingRequest: false,
            // END:: LOADER APPERANCE DATA

            // START:: PAYMENT TYPES
            payTypes: [
                {
                    id: "credit",
                    name: "بطاقة إئتمانية",
                },
                {
                    id: "wallet",
                    name: "محفظة",
                },
            ],
            // END:: PAYMENT TYPES

            // START:: SHIPPING TYPES
            shippingTypes: null,
            // END:: SHIPPING TYPES

            // START:: CURRENT ADDRESSES DATA
            currentAddresses: null,
            // END:: CURRENT ADDRESSES DATA

            // START:: FORM DATA
            data: {
                name: null,
                phone: null,
                paymentWay: "",
                // transactionId: null,
                shippingWay: null,
                addresses: null,
            },
            // END:: FORM DATA

            theData: new FormData(),
        };
    },

    methods: {
        // START:: GET ADDRESSES
        getMyAddresses() {
            // START:: SEND REQUEST
            this.$axios({
                method: "GET",
                url: `client/address`,
            })
                .then((res) => {
                    this.currentAddresses = res.data.data;
                })
                .catch((error) => {
                    this.isWaitingRequest = false;
                    console.log(error.response.data.message);
                });
            // END:: SEND REQUEST
        },
        // END:: GET ADDRESSES

        // START:: GET SHIPPING TYPES
        getShippingTypes() {
            // START:: SEND REQUEST
            this.$axios({
                method: "GET",
                url: `shipping_type`,
            })
                .then((res) => {
                    this.shippingTypes = res.data.data;
                })
                .catch((error) => {
                    this.isWaitingRequest = false;
                    console.log(error.response.data.message);
                });
            // END:: SEND REQUEST
        },
        // END:: GET SHIPPING TYPES

        // START:: VALIDATE FORM INPUTS
        validateFormInputs() {
            this.isWaitingRequest = true;

            if (!this.data.name) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: "حقل إسم العميل لايمكن ان يكون فارغ",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.data.phone) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: "حقل رقم الجوال لايمكن ان يكون فارغ",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.data.paymentWay) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: "يجب اختيار طريقة الدفع",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.data.shippingWay) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: "يجب اختيار طريقة الشحن",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.data.addresses) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: "يجب اختيار عنوان التوصيل",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else {
                this.submitForm();
            }
        },
        // END:: VALIDATE FORM INPUTS

        // START:: SUBMIT FORM
        submitForm() {
            this.isWaitingRequest = true;

            // START:: APPEND DATA
            this.theData.append("client_name", this.data.name);
            this.theData.append("phone", this.data.phone);
            this.theData.append("pay_type", this.data.paymentWay.id);
            //   if (this.data.paymentWay.id == "credit") {
            //     theData.append("transaction_id", this.data.transactionId);
            //   }
            this.theData.append("shipping_type_id", this.data.shippingWay.id);
            this.theData.append("address_id", this.data.addresses);
            // END:: APPEND DATA

            // STORE THE FORM DATA IN LOCALSTORAGE
            localStorage.setItem("client_name", this.data.name);
            localStorage.setItem("phone", this.data.phone);
            localStorage.setItem("pay_type", this.data.paymentWay.id);
            localStorage.setItem("shipping_type_id", this.data.shippingWay.id);
            localStorage.setItem("address_id", this.data.addresses);
            //END:: STORE IN LOCALSTORAGE

            if (this.data.paymentWay.id == "wallet") {
                // START:: SEND REQUEST
                this.$axios({
                    method: "POST",
                    url: `client/client_order`,
                    data: this.theData,
                })
                    .then((res) => {
                        this.isWaitingRequest = false;
                        // console.log(res);
                        // this.$iziToast.success({
                        //   timeout: 2000,
                        //   // message: res.data.message,
                        //   message: this.$t("iziToastConfigs.is_paid"),
                        //   position: this.$t("iziToastConfigs.position"),
                        //   rtl: this.$t("iziToastConfigs.dir"),
                        // });
                        var order_id = res.data.data.order_id;
                        localStorage.setItem("order_id", order_id);
                        this.$router.push("/checkout/payment-result");
                    })
                    .catch((error) => {
                        this.isWaitingRequest = false;
                        this.$iziToast.error({
                            timeout: 2000,
                            message: error.response.data.message,
                            position: this.$t("iziToastConfigs.position"),
                            rtl: this.$t("iziToastConfigs.dir"),
                        });
                    });
                // END:: SEND REQUEST
            } else if (this.data.paymentWay.id == "credit") {
                // START:: SEND REQUEST
                this.$axios;
                this.$axios({
                    method: "POST",
                    url: `client/pay`,
                    data: this.theData,
                })
                    .then((res) => {
                        this.isWaitingRequest = false;
                        // this.$iziToast.success({
                        //   timeout: 2000,
                        //   message: res.data.message,
                        //   position: this.$t("iziToastConfigs.position"),
                        //   rtl: this.$t("iziToastConfigs.dir"),
                        // });
                        console.log(res.data.message);
                        window.location.replace(res.data.message);
                        //   this.$router.push("/checkout/payment-result");
                    })
                    .catch((error) => {
                        // console.log(error);
                        this.isWaitingRequest = false;
                        this.$iziToast.error({
                            timeout: 2000,
                            message: error.response.data.message,
                            position: this.$t("iziToastConfigs.position"),
                            rtl: this.$t("iziToastConfigs.dir"),
                        });
                    });
                // END:: SEND REQUEST
            }
        },
        // END:: SUBMIT FORM
    },

    created() {
        // START:: FIRE METHODS
        this.getShippingTypes();
        this.getMyAddresses();
        // END:: FIRE METHODS
    },
};
</script>
