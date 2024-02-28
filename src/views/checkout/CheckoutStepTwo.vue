<template>
    <div class="checkout_step_two_wrapper">
        <div class="payment_form_wrapper">
            <div class="container">
                <!-- START:: FORM -->
                <form @submit.prevent="submitForm">
                    <!-- START:: NAME ON CARD INPUT GROUP -->
                    <!-- <div class="input_wrapper">
            <input
              type="text"
              class="form-control"
              placeholder="الإسم علي البطاقة"
              v-model.trim="data.nameOnCard"
            />
          </div> -->
                    <!-- END:: NAME ON CARD INPUT GROUP -->

                    <!-- START:: NUMBER ON CARD INPUT GROUP -->
                    <!-- <div class="input_wrapper">
            <input
              type="number"
              class="form-control"
              placeholder="الرقم علي البطاقة"
              v-model.trim="data.numberOnCard"
            />
          </div> -->
                    <!-- END:: NUMBER ON CARD INPUT GROUP -->

                    <!-- START:: EXPIRE DATE DATE INPUT GROUP -->
                    <!-- <div class="input_wrapper">
            <a-date-picker
              placeholder="تاريخ الإنتهاء"
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
              :disabled-date="disabledDate"
              v-model="data.expireDate"
            />
          </div> -->
                    <!-- END:: EXPIRE DATE DATE INPUT GROUP -->

                    <!-- START:: CVV NUMBER INPUT GROUP -->
                    <!-- <div class="input_wrapper">
            <input
              type="number"
              class="form-control"
              placeholder="CVV"
              v-model.trim="data.cvv"
            />
          </div> -->
                    <!-- END:: CVV NUMBER INPUT GROUP -->

                    <!-- START:: SUBMIT BUTTON WRAPPER -->
                    <!-- <div class="btn_wrapper">
            <button style="width: 200px">
              إنشاء النظام
              <span class="btn_loader" v-if="isWaitingRequest"></span>
            </button>
          </div> -->
                    <!-- END:: SUBMIT BUTTON WRAPPER -->
                </form>
                <!-- END:: FORM -->
            </div>
        </div>

        <!-- START:: SUCCESS MODAL -->
        <v-dialog persistent v-model="modalSuccess">
            <v-card>
                <!-- START:: MODAL IMAGE -->
                <div class="modal_image_wrapper">
                    <img
                        src="@/assets/media/images/box.svg"
                        alt="Box Image"
                        width="200"
                        height="200"
                    />
                </div>
                <!-- END:: MODAL IMAGE -->

                <!-- START:: MODAL TEXT -->
                <div class="modal_text_wrapper">
                    <h5 class="modal_title">لقد تم دفع طلبك بنجاح</h5>
                    <h6 class="order_number">
                        <span> رقم الطلب </span>
                        <span> {{ orderId }} </span>
                    </h6>
                </div>
                <!-- END:: MODAL TEXT -->

                <!-- START:: MODAL BUTTONS -->
                <v-card-actions>
                    <v-btn class="main_modal_btn" @click="toggleSuccessModal"
                        >استمرار التسوق</v-btn
                    >
                </v-card-actions>
                <!-- END:: MODAL BUTTONS -->
            </v-card>
        </v-dialog>
        <!-- END:: SUCCESS MODAL -->
    </div>
</template>

<script>
// START:: IMPORTING MOMENT
import moment from "moment";
// END:: IMPORTING MOMENT
// import axios from "axios";
export default {
    name: "CheckoutStepTwo",

    data() {
        return {
            // START:: LOADER HANDLING DATA
            isWaitingRequest: false,
            // END:: LOADER HANDLING DATA

            // START:: MODALS STATUS
            modalSuccess: false,
            // END:: MODALS STATUS

            // START:: DATA
            // data: {
            //   nameOnCard: null,
            //   numberOnCard: null,
            //   expireDate: null,
            //   cvv: null,
            // },
            // END:: DATA
            paymentType: undefined,
            orderId: undefined,
        };
    },
    created() {
        var paymentId = this.$route.query.paymentId;
        var Id = this.$route.query.Id;

        this.paymentType = localStorage.getItem("pay_type");
        // console.log(paymentId, "sdf", Id);
        // console.log(this.paymentType);

        if (this.paymentType == "credit") {
            this.$axios({
                method: "get",
                url: `client/paymentCallback?paymentId=${paymentId}&Id=${Id}`,
            })
                .then((res) => {
                    // console.log(res);
                    // console.log(res.data.Data["InvoiceStatus"]);
                    if (res.data.IsSuccess) {
                        // this.$iziToast.success({
                        //   timeout: 2000,
                        //   message: res.data.Message,
                        //   position: this.$t("iziToastConfigs.position"),
                        //   rtl: this.$t("iziToastConfigs.dir"),
                        // });
                        if (res.data.Data["InvoiceStatus"] == "Paid") {
                            this.submitForm();
                        } else {
                            this.$iziToast.error({
                                timeout: 2000,
                                message: res.data.Message,
                                position: this.$t("iziToastConfigs.position"),
                                rtl: this.$t("iziToastConfigs.dir"),
                            });
                            this.$router.push("/checkout");
                        }
                    }
                })
                .catch((error) => {
                    // console.log("error", error.response.data);
                    this.$iziToast.error({
                        timeout: 2000,
                        message: error.response.data.message,
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    // console.log(error);
                });
        } else if (this.paymentType == "wallet") {
            this.orderId = localStorage.getItem("order_id");
            localStorage.removeItem("order_id");
            this.$iziToast.success({
                timeout: 2000,
                // message: res.data.message,
                message: this.$t("iziToastConfigs.order_created"),
                position: this.$t("iziToastConfigs.position"),
                rtl: this.$t("iziToastConfigs.dir"),
            });
            this.toggleSuccessModal();
        }
    },

    methods: {
        // START:: DATEPICKER DISABLE PREVIOUS DAYS METHOD
        disabledDate(current) {
            return current && current < moment().startOf("day");
        },
        // END:: DATEPICKER DISABLE PREVIOUS DAYS METHOD

        // START:: VALIDATE FORM INPUTS
        // validateFormInputs() {
        //   this.isWaitingRequest = true;

        //   if (!this.data.nameOnCard) {
        //     this.isWaitingRequest = false;
        //     this.$iziToast.error({
        //       timeout: 2000,
        //       message: this.$t("VALIDATION.nameOnCard"),
        //       position: this.$t("iziToastConfigs.position"),
        //       rtl: this.$t("iziToastConfigs.dir"),
        //     });
        //     return;
        //   } else if (!this.data.numberOnCard) {
        //     this.isWaitingRequest = false;
        //     this.$iziToast.error({
        //       timeout: 2000,
        //       message: this.$t("VALIDATION.numberOnCard"),
        //       position: this.$t("iziToastConfigs.position"),
        //       rtl: this.$t("iziToastConfigs.dir"),
        //     });
        //     return;
        //   } else if (!this.data.expireDate) {
        //     this.isWaitingRequest = false;
        //     this.$iziToast.error({
        //       timeout: 2000,
        //       message: this.$t("VALIDATION.expireDate"),
        //       position: this.$t("iziToastConfigs.position"),
        //       rtl: this.$t("iziToastConfigs.dir"),
        //     });
        //     return;
        //   } else if (!this.data.cvv) {
        //     this.isWaitingRequest = false;
        //     this.$iziToast.error({
        //       timeout: 2000,
        //       message: this.$t("VALIDATION.cvv"),
        //       position: this.$t("iziToastConfigs.position"),
        //       rtl: this.$t("iziToastConfigs.dir"),
        //     });
        //     return;
        //   } else {
        //     this.submitForm();
        //   }
        // },
        // END:: VALIDATE FORM INPUTS

        // START:: SUBMIT FORM
        submitForm() {
            var theData = new FormData();

            const name = localStorage.getItem("client_name");
            const phone = localStorage.getItem("phone");
            const shipping_type_id = localStorage.getItem("shipping_type_id");
            const address_id = localStorage.getItem("address_id");

            localStorage.removeItem("client_name");
            localStorage.removeItem("phone");
            localStorage.removeItem("pay_type");
            localStorage.removeItem("shipping_type_id");
            localStorage.removeItem("address_id");

            theData.append("client_name", name);
            theData.append("phone", phone);
            theData.append("pay_type", this.paymentType);
            theData.append("shipping_type_id", shipping_type_id);
            theData.append("address_id", address_id);

            this.isWaitingRequest = false;

            this.$axios({
                method: "POST",
                url: `client/client_order`,
                data: theData,
            })
                .then((res) => {
                    this.$iziToast.success({
                        timeout: 2000,
                        message: res.data.message,
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    // console.log(res.data);
                    this.orderId = res.data.data.order_id;
                    this.toggleSuccessModal();
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
            //   this.toggleSuccessModal();
        },
        // END:: SUBMIT FORM

        // START:: TOGGLE SUCCESS MODAL
        toggleSuccessModal() {
            this.modalSuccess = !this.modalSuccess;
            if (!this.modalSuccess) {
                this.$router.replace("/");
            }
        },
        // END:: TOGGLE SUCCESS MODAL
    },
};
</script>
