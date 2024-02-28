import Vue from "vue";
import VueRouter from "vue-router";

// START:: IMPORTING MIDDLEWARE
// import auth from "../middleware/auth.js";
// END:: IMPORTING MIDDLEWARE

// START:: IMPORTING ROUTER COMPONENTS
import Authentication from "../pages/Authentication.vue";
import SelectAuth from "../components/authentication/SelectAuth.vue";
import LoginForm from "../components/authentication/LoginForm.vue";
import ResetPasswordPhoneNumberForm from "../components/authentication/ResetPasswordPhoneNumberForm.vue";
import PhoneVerification from "../components/authentication/PhoneVerificationForm.vue";
import ChangePhoneNumberForm from "../components/authentication/ChangePhoneNumber.vue";
import ResetPasswordForm from "../components/authentication/ResetPasswordForm.vue";
import RegisterForm from "../components/authentication/RegisterForm.vue";

import AppContentWrapper from "../pages/AppContentWrapper.vue";

// ============== START:: HOME PAGE ROUTE
import HomePage from "../pages/HomePage.vue";
// ============== END:: HOME PAGE ROUTE

// ============== START:: SEARCH RESULT ROUTE
import SearchResult from "../views/search/SearchResult.vue";
// ============== END:: SEARCH RESULT ROUTE

// ============== START:: CHECKOUT ROUTES
import CheckoutHome from "../views/checkout/CheckoutHome.vue";
import CheckoutStepOne from "../views/checkout/CheckoutStepOne.vue";
import CheckoutStepTwo from "../views/checkout/CheckoutStepTwo.vue";
// ============== END:: CHECKOUT ROUTES

// ============== START:: ADDRESSES ROUTES
import AddressesHome from "../views/addresses/AddressesHome.vue";
import AllAddresses from "../views/addresses/AllAddresses.vue";
import CreateAddress from "../views/addresses/CreateAddress.vue";
import EditAddress from "../views/addresses/EditAddress.vue";
// ============== END:: ADDRESSES ROUTES

// ============== START:: COMPETITIONS ROUTES
import Competitions from "../views/competitions/Competitions.vue";
import AllWinners from "../views/competitions/AllWinners.vue";
// ============== END:: COMPETITIONS ROUTES

// ============== START:: PRODUCT DETAILS ROUTES
import ProductDetails from "../views/product/ProductDetails.vue";
// ============== END:: PRODUCT DETAILS ROUTES

// ============== START:: CATEGORY ROUTE
import CategoryDetails from "../views/categories/CategoryDetails.vue";
// ============== END:: CATEGORY ROUTE

// ============== START:: ADVERTISEMENT ROUTES
import CreateAdvertisement from "../views/advertisement/CreateAdvertisement.vue";
// ============== END:: ADVERTISEMENT ROUTE S

// ============== START:: STATIC PAGES ROUTES
import Offers from "../pages/staticPages/Offers.vue";
import Faqs from "../pages/staticPages/Faqs.vue";
import AboutUsPage from "../pages/staticPages/AboutUsPage.vue";
import ContactUsPage from "../pages/staticPages/ContactUsPage.vue";
import ContactUsSec from "../pages/staticPages/ContactUsSec.vue";
import PrivacyPolicyPage from "../pages/staticPages/PrivacyPolicyPage.vue";
import TermsAndConditionsPage from "../pages/staticPages/TermsAndConditionsPage.vue";
// ============== END:: STATIC PAGES ROUTES

// ============== START:: NOT FOUND PAGE ROUTE
import NotFoundPage from "../pages/staticPages/NotFound.vue";
// ============== END:: NOT FOUND PAGE ROUTE

// ============== START:: EDIT PROFILE ROUTE
import EditProfile from "../views/profile/EditProfile.vue";
// ============== END:: EDIT PROFILE ROUTE

// ============== START:: WISHLIST ROUTE
import Wishlist from "../views/wishlist/Wishlist.vue";
// ============== END:: WISHLIST ROUTE

// END:: IMPORTING ROUTER COMPONENTS

Vue.use(VueRouter);
const routes = [
    // ***************** START:: AUTH ROUTES CONFIG
    {
        path: "/auth",
        component: Authentication,
        children: [
            {
                path: "",
                component: SelectAuth,
            },
            {
                path: "login",
                name: "LoginForm",
                component: LoginForm,
            },
            {
                path: "reset-password-phone-number",
                name: "ResetPasswordPhoneNumberForm",
                component: ResetPasswordPhoneNumberForm,
            },
            {
                path: "phone-verification/:verificationType",
                name: "PhoneVerification",
                component: PhoneVerification,
                props: true,
            },
            {
                path: "chang-phone-number",
                name: "ChangePhoneNumberForm",
                component: ChangePhoneNumberForm,
            },
            {
                path: "reset-password",
                name: "ResetPasswordForm",
                component: ResetPasswordForm,
            },
            {
                path: "register",
                name: "RegisterForm",
                component: RegisterForm,
            },
        ],
    },
    // ***************** END:: AUTH ROUTES CONFIG

    // ***************** START:: CONTENT ROUTES CONFIG
    {
        path: "/",
        component: AppContentWrapper,
        children: [
            // ***************** START:: HOME ROUTE CONFIG
            {
                path: "/",
                component: HomePage,
            },
            // ***************** END:: HOME ROUTE CONFIG

            // ***************** END:: SEARCH RESULT ROUTE CONFIG
            {
                path: "/search-result",
                name: "SearchResult",
                component: SearchResult,
            },
            // ***************** END:: SEARCH RESULT ROUTE CONFIG

            // ***************** START:: CHECKOUT ROUTE CONFIG
            {
                path: "/checkout",
                component: CheckoutHome,
                children: [
                    {
                        path: "",
                        component: CheckoutStepOne,
                    },
                    {
                        path: "payment-result",
                        name: "CheckoutStepTwo",
                        component: CheckoutStepTwo,
                    },
                ],
            },
            // ***************** END:: CHECKOUT ROUTE CONFIG

            // ***************** START:: ADDRESSES ROUTE CONFIG
            {
                path: "/addresses",
                component: AddressesHome,
                children: [
                    {
                        path: "",
                        component: AllAddresses,
                    },
                    {
                        path: "create",
                        name: "CreateAddress",
                        component: CreateAddress,
                    },
                    {
                        path: "edit/:id",
                        name: "EditAddress",
                        component: EditAddress,
                        props: true,
                    },
                ],
            },
            // ***************** END:: ADDRESSES ROUTE CONFIG

            // ***************** START:: COMPETITIONS ROUTE CONFIG
            {
                path: "/competitions",
                name: "Competitions",
                component: Competitions,
            },
            {
                path: "/all-winners",
                name: "AllWinners",
                component: AllWinners,
            },
            // ***************** END:: COMPETITIONS ROUTE CONFIG

            // ***************** START:: CATEGORY ROUTE CONFIG
            {
                path: "/categories/:id",
                name: "CategoryDetails",
                component: CategoryDetails,
                props: true,
            },
            // ***************** END:: CATEGORY ROUTE CONFIG

            // ***************** START:: ADVERTISEMENT ROUTE CONFIG
            {
                path: "/create-advertisement",
                name: "CreateAdvertisement",
                component: CreateAdvertisement,
            },
            // ***************** END:: ADVERTISEMENT ROUTE CONFIG

            // ***************** START:: EDIT PROFILE ROUTE CONFIG
            {
                path: "/edit-profile",
                name: "EditProfile",
                component: EditProfile,
            },
            // ***************** END:: EDIT PROFILE ROUTE CONFIG

            // ***************** START:: WISHLIST ROUTE CONFIG
            {
                path: "/wishlist",
                name: "Wishlist",
                component: Wishlist,
            },
            // ***************** END:: WISHLIST ROUTE CONFIG

            // ***************** START:: PRODUCT DETAILS ROUTE CONFIG
            {
                path: "/product-details/:id",
                name: "ProductDetails",
                component: ProductDetails,
            },
            // ***************** END:: PRODUCT DETAILS ROUTE CONFIG

            // ***************** START:: STATIC PAGES ROUTES CONFIG
            {
                path: "/offers",
                name: "Offers",
                component: Offers,
            },
            {
                path: "/about-us",
                name: "AboutUsPage",
                component: AboutUsPage,
            },
            {
                path: "/FAQS",
                name: "Faqs",
                component: Faqs,
            },
            {
                path: "/contact-us",
                name: "ContactUsPage",
                component: ContactUsPage,
            },
            {
                path: "/privacy-policy",
                name: "PrivacyPolicy",
                component: PrivacyPolicyPage,
            },
            {
                path: "/terms",
                name: "TermsAndConditions",
                component: TermsAndConditionsPage,
            },
            {
                path: "/send-message",
                name: "ContactUsSec",
                component: ContactUsSec,
            },
            // ***************** END:: STATIC PAGES ROUTES CONFIG
        ],
    },
    // ***************** END:: CONTENT ROUTES CONFIG

    // ***************** START:: NOT FOUND ROUTE CONFIG
    {
        path: "/:notFound(.*)",
        name: "NotFoundPage",
        component: NotFoundPage,
    },
    // ***************** END:: NOT FOUND ROUTE CONFIG
];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    scrollBehavior(to) {
        document.getElementById("app").scrollIntoView({ behavior: "smooth" });
        if (to.hash) {
            return {
                selector: to.hash,
            };
        }
    },
    routes,
});

// START:: MIDDLEWARE AND ROUTER GUARDS
// function nextFactory(context, middleware, index) {
//     const subsequentMiddleware = middleware[index];
//     if (!subsequentMiddleware) return context.next;

//     return (...parameters) => {
//         context.next(...parameters);
//         const nextMiddleware = nextFactory(context, middleware, index + 1);
//         subsequentMiddleware({ ...context, next: nextMiddleware });
//     };
// }

// router.beforeEach((to, from, next) => {
//     if (to.meta.middleware) {
//         const middleware = Array.isArray(to.meta.middleware)
//             ? to.meta.middleware
//             : [to.meta.middleware];

//         const context = {
//             from,
//             next,
//             router,
//             to,
//         };
//         const nextMiddleware = nextFactory(context, middleware, 1);
//         return middleware[0]({ ...context, next: nextMiddleware });
//     } else if (localStorage.getItem("saudi_marche_user_token")) {
//         if (
//             to.name == "LoginForm" ||
//             to.name == "ResetPasswordPhoneNumberForm" ||
//             to.name == "PhoneVerification" ||
//             to.name == "ChangePhoneNumberForm" ||
//             to.name == "ResetPasswordForm" ||
//             to.name == "SelectRegisterationType" ||
//             to.name == "RegisterFirstStepForm"
//         ) {
//             return next("/");
//         } else {
//             return next();
//         }
//     }
//     return next();
// });
// END:: MIDDLEWARE AND ROUTER GUARDS

export default router;
