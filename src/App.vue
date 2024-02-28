<template>
    <v-app>
        <transition name="fadeInUp" mode="out-in">
            <router-view :key="$route.path" />
        </transition>
    </v-app>
</template>

<script>
export default {
    name: "App",
    head: {
        link: [
            {
                rel: "icon",
                href: require("../public/favicon.svg"),
            },
        ],
    },
};
</script>
