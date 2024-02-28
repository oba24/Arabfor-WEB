<template>
    <div class="edit_lesson_modal_wrapper">
        <BaseModal
            :show="modalApperanceData"
            @controleModalApperance="controleModalApperance"
        >
            <template #modal>
                <div class="edit_lesson_card">
                    <h3>{{ $t("TITLES.edit") }}</h3>

                    <!-- START:: FORM -->
                    <form @submit.prevent="validateEditLessonForm">
                        <div class="cards_wrapper my-5">
                            <div class="day_card">
                                <!-- START:: COURSE TIME INPUT -->
                                <div class="my-3 input_wrapper">
                                    <input
                                        type="number"
                                        class="form-control"
                                        :placeholder="
                                            $t('PLACEHOLDERS.course_time')
                                        "
                                        v-model.trim="lessonData.course_time"
                                    />
                                </div>
                                <!-- END:: COURSE TIME INPUT -->

                                <!-- START:: COURSE NAME -->
                                <div class="my-3 input_wrapper">
                                    <input
                                        type="text"
                                        class="form-control"
                                        :placeholder="
                                            $t('PLACEHOLDERS.course_name')
                                        "
                                        v-model.trim="lessonData.name"
                                    />
                                </div>
                                <!-- END:: COURSE NAME -->

                                <!-- START:: COURSE LINK -->
                                <div class="my-3 input_wrapper">
                                    <input
                                        type="text"
                                        class="form-control"
                                        :placeholder="
                                            $t('PLACEHOLDERS.course_link')
                                        "
                                        v-model.trim="lessonData.link"
                                    />
                                </div>
                                <!-- END:: COURSE LINK -->

                                <!-- START:: DATEPICKER INPUT GROUP -->
                                <div class="my-3" v-if="courseType == 'online'">
                                    <a-date-picker
                                        @change="onChange"
                                        :placeholder="
                                            $t('PLACEHOLDERS.start_date_course')
                                        "
                                        format="YYYY-MM-DD"
                                        valueFormat="YYYY-MM-DD"
                                        v-model="lessonData.start_date"
                                    />
                                </div>
                                <!-- END:: DATEPICKER INPUT GROUP -->

                                <!-- START:: TIMEPICKER INPUT GROUP -->
                                <div class="my-3" v-if="courseType == 'online'">
                                    <a-time-picker
                                        class="w-100"
                                        :placeholder="
                                            $t('PLACEHOLDERS.course_start_time')
                                        "
                                        format="HH:mm"
                                        valueFormat="HH:mm"
                                        v-model="lessonData.start_time"
                                    />
                                </div>
                                <!-- END:: TIMEPICKER INPUT GROUP -->
                            </div>

                            <!-- START:: SUBMIT BUTTON WRAPPER -->
                            <div class="btn_wrapper">
                                <button>
                                    {{ $t("BUTTONS.edit") }}
                                    <span
                                        class="btn_loader"
                                        v-if="isWaitingRequest"
                                    ></span>
                                </button>
                            </div>
                            <!-- END:: SUBMIT BUTTON WRAPPER -->
                        </div>
                    </form>
                    <!-- END:: FORM -->
                </div>
            </template>
        </BaseModal>
    </div>
</template>

<script>
// START:: IMPORTING BASE MODAL
import BaseModal from "../ui/BaseModal.vue";
// END:: IMPORTING BASE MODAL

export default {
    name: "EditLessonModal",

    components: {
        BaseModal,
    },

    props: ["courseType", "selectedLesson", "modalApperanceData"],

    emits: ["controleModalApperance", "getDetailsAfterEdit"],

    watch: {
        modalApperanceData(newVal) {
            if (newVal == true) {
                this.lessonData.name = this.selectedLesson.name;
                this.lessonData.link = this.selectedLesson.link;
                this.lessonData.duration = this.selectedLesson.duration;
                this.lessonData.start_date = this.selectedLesson.start_date;
                this.lessonData.start_time = this.selectedLesson.start_time;
            }
        },
    },

    data() {
        return {
            // START:: LOADER WAIT
            isWaitingRequest: false,
            // END:: LOADER WAIT

            // START:: LESSON DATA
            lessonData: [
                {
                    name: null,
                    link: null,
                    duration: null,
                    start_date: null,
                    start_time: null,
                },
            ],
            // END:: LESSON DATA
        };
    },

    methods: {
        // START:: CONTROLE MODAL APPERANCE
        controleModalApperance() {
            this.$emit("controleModalApperance");
        },
        // END:: CONTROLE MODAL APPERANCE

        // START:: GET DETAILS AFTER EDIT
        getDetailsAfterEdit() {
            this.$emit("getDetailsAfterEdit");
        },
        // END:: GET DETAILS AFTER EDIT

        // START:: VALIDATE EDIT LESSON FORM
        validateEditLessonForm() {
            this.submitEditLessonForm();
        },
        // END:: VALIDATE EDIT LESSON FORM

        // START:: SUBMIT EDIT LESSON FORM
        submitEditLessonForm() {
            this.isWaitingRequest = true;

            const theData = new FormData();
            // START:: APPEND EDIT LESSON DATA
            theData.append("name", this.lessonData.name);
            theData.append("link", this.lessonData.link);
            theData.append("duration", this.lessonData.duration);
            if (this.courseType == "online") {
                theData.append("start_date", this.lessonData.start_date);
                theData.append("start_time", this.lessonData.start_time);
            }
            // END:: APPEND EDIT LESSON DATA

            // START:: SEND REQUEST
            this.$axios
                .post(
                    `teacher/subject/listen/${this.selectedLesson.id}`,
                    theData,
                    {
                        headers: {
                            Authorization:
                                "Bearer " +
                                localStorage.getItem("saudi_marche_user_token"),
                            lang: localStorage.getItem("saudi_marche_language"),
                            "cache-control": "no-cache",
                            Accept: "application/json",
                        },
                    }
                )
                .then(() => {
                    this.isWaitingRequest = false;
                    this.$iziToast.success({
                        timeout: 2000,
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                        message: this.$t("MESSAGES.edited_successfully"),
                        messageSize: "22",
                    });
                    this.controleModalApperance();
                    this.getDetailsAfterEdit();
                    return;
                })
                .catch((err) => {
                    this.isWaitingRequest = false;
                    this.$iziToast.error({
                        timeout: 2000,
                        position: this.$t("iziToastConfigs.position"),
                        rtl: this.$t("iziToastConfigs.dir"),
                        message: err.response.data.message,
                        messageSize: "22",
                    });
                    return;
                });
            // END:: SEND REQUEST
        },
        // END:: SUBMIT EDIT LESSON FORM
    },
};
</script>
