<template>
    <div class="select_auth_content_wrapper">
        <h1>{{ $t("TITLES.welcome") }}</h1>

        <h3>{{ $t("TITLES.welcomeSubtitle") }}</h3>

        <div class="register_route_wrapper">
            <router-link to="/auth/register">
                {{ $t("BUTTONS.register") }}
            </router-link>
        </div>

        <!-- START:: LOGIN ROUTE WRAPPER -->
        <router-link to="/auth/login" class="login_route_wrapper mt-0">
            <span>{{ $t("BUTTONS.have_account") }}</span>
            <span> {{ $t("BUTTONS.login") }}</span>
        </router-link>
        <!-- END:: LOGIN ROUTE WRAPPER -->
    </div>
</template>

<script>
export default {
    name: "SelectAuth",
};
</script>
