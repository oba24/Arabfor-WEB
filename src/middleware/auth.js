export default function auth({ next, router }) {
    if (!localStorage.getItem("saudi_marche_user_token")) {
        return router.push("/");
    }
    return next();
}
