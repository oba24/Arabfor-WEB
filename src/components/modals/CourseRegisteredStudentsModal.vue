<template>
    <!-- <Teleport to="body">
    </Teleport> -->
    <div class="all_registered_students_wrapper">
        <BaseModal :show="modalApperanceData" @controleModalApperance="controleModalApperance">
        <template #modal>
            <div class="registered_students_wrapper">
                <h3 class="title mb-2">
                    <p>
                        {{ $t("TITLES.registered_students") }}
                        <span class="students_count">
                            ({{ students.length }} {{ $t("TITLES.student") }})
                        </span>
                    </p>
                </h3>

                <!-- START:: STUDENTS CARDS -->
                <div class="students_cards_wrapper">
                    <div class="container">
                        <div class="row">
                            <!-- START:: STUDENT CARD -->
                            <div
                                v-for="student in students"
                                :key="student.id"
                                class="col-lg-6 my-3"
                            >
                                <div class="student_card">
                                    <!-- START:: IMAGE -->
                                    <div class="image_wrapper">
                                        <img
                                            :src="student.user.image"
                                            :alt="student.user.fullname"
                                            width="60"
                                            height="60"
                                        />
                                    </div>
                                    <!-- END:: IMAGE -->

                                    <!-- START:: NAME -->
                                    <h3 class="name">
                                        {{ student.user.fullname }}
                                    </h3>
                                    <!-- END:: NAME -->

                                    <!-- START:: CHAT ROUTE WRAPPER -->
                                    <router-link
                                        :to="`/chat/${student.id}`"
                                        class="chat_route"
                                    >
                                        <i class="fal fa-comment-lines"></i>
                                    </router-link>
                                    <!-- END:: CHAT ROUTE WRAPPER -->
                                </div>
                            </div>
                            <!-- END:: STUDENT CARD -->
                        </div>
                    </div>
                </div>
                <!-- END:: STUDENTS CARDS -->
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
    name: "CourseRegisteredStudentsModal",

        data() {
        return {
            // START:: MODAL DATA
            // END:: MODAL DATA
        };
    },

    components: {
        BaseModal,
    },

    props: ["modalApperanceData", "students"],

    emits: ["controleModalApperance"],

    methods: {
        // START:: CONTROLE MODAL APPERANCE
        controleModalApperance() {
            this.$emit("controleModalApperance");
        },
        // END:: CONTROLE MODAL APPERANCE
    },
}
</script>