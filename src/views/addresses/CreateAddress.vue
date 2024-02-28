<template>
    <div class="address_form_wrapper">
        <form @submit.prevent="validateFormInputs">
            <div class="row">
                <!-- START:: ADDRESS GROUP -->
                <div class="col-lg-6 my-3">
                    <div class="input_wrapper">
                        <input
                            type="text"
                            class="form-control"
                            id="autocomplete_ar"
                            placeholder="إبحث هنا"
                            @click="getAddressAr"
                            v-model="data.address"
                        />
                    </div>
                </div>
                <!-- END:: ADDRESS GROUP -->

                <!-- START:: ADDRESS TYPE GROUP -->
                <div class="col-lg-6 my-3">
                    <div class="input_wrapper">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="نوع العنوان"
                            v-model="data.addressType"
                        />
                    </div>
                </div>
                <!-- END:: ADDRESS TYPE GROUP -->

                <!-- START:: G-MAP -->
                <div class="col-12 my-3">
                    <div class="map_wrapper">
                        <GmapMap
                            :center="{
                                lat: parseFloat(data.lat),
                                lng: parseFloat(data.lng),
                            }"
                            :zoom="12"
                            map-type-id="terrain"
                            style="width: 100%; height: 400px"
                        >
                        </GmapMap>
                    </div>
                </div>
                <!-- END:: G-MAP -->

                <!-- START:: SUBMIT BUTTON WRAPPER -->
                <div class="btn_wrapper my-4">
                    <button class="mt-0" style="width: 220px">
                        إضافة العنوان
                        <span class="btn_loader" v-if="isWaitingRequest"></span>
                    </button>
                </div>
                <!-- END:: SUBMIT BUTTON WRAPPER -->
            </div>
        </form>
    </div>
</template>

<script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyC2MTR_vRbsbQQRPt5f5ZLCvvaKOpzkzlA"></script>
<script>
export default {
    name: "CreateAddress",

    data() {
        return {
            // START:: LOADERS APPERANCE DATA
            isWaitingRequest: false,
            // END:: LOADERS APPERANCE DATA

            // START:: DATA
            data: {
                address: null,
                addressType: null,
                lat: 31.0409483,
                lng: 31.3784704,
            },
            // END:: DATA
        };
    },

    methods: {
        // START:: G-MAP GET ADDRESS
        getAddressAr() {
            var self = this;
            var input = document.getElementById("autocomplete_ar");
            var searchBox = new google.maps.places.SearchBox(input);
            searchBox.addListener("places_changed", function () {
                var places = searchBox.getPlaces();
                if (places.length == 0) {
                    return;
                }
                var bounds = new google.maps.LatLngBounds();
                places.forEach(function (place) {
                    bounds.extend(place.geometry.location);
                    place.geometry.location.lat();
                    place.geometry.location.lng();
                    place.formatted_address;

                    self.data.address = place.formatted_address;
                    self.data.lat = place.geometry.location.lat();
                    self.data.lng = place.geometry.location.lng();
                });
            });
        },
        // START:: G-MAP GET ADDRESS

        // START:: VALIDATE FORM INPUTS
        validateFormInputs() {
            this.isWaitingRequest = true;

            if (!this.data.address) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: "حقل العنوان لايمكن ان يكون فارغ",
                    position: this.$t("iziToastConfigs.position"),
                    rtl: this.$t("iziToastConfigs.dir"),
                });
                return;
            } else if (!this.data.addressType) {
                this.isWaitingRequest = false;
                this.$iziToast.error({
                    timeout: 2000,
                    message: "حقل نوع العنوان لايمكن ان يكون فارغ",
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

            const theData = new FormData();
            // START:: APPEND DATA
            theData.append("address", this.data.address);
            theData.append("name", this.data.addressType);
            theData.append("lat", this.data.lat);
            theData.append("lng", this.data.lng);
            theData.append("is_default", 0);
            // END:: APPEND DATA

            // START:: SEND REQUEST
            this.$axios({
                method: "POST",
                url: `client/address`,
                data: theData,
            })
                .then(() => {
                    this.isWaitingRequest = false;

                    this.$iziToast.success({
                        timeout: 2000,
                        message: this.$t("MESSAGES.added_successfully"),
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                    });
                    this.$router.push("/addresses");
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
        },
        // END:: SUBMIT FORM
    },
};
</script>
