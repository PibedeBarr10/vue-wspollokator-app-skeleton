import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "../pages/dashboard.vue";
import MyProfile from "../pages/my-profile.vue";
import Login from "../pages/login.vue";
import Logout from "../pages/logout.vue";
import Register from "../pages/register.vue";
import LandingPage from "../pages/landing-page.vue";
import Chat from "../pages/chat.vue";

const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
    {
        path: "/my-profile",
        name: "Mój profil",
        component: MyProfile,
    },
    {
        path: "/login",
        name: "Logowanie",
        component: Login,
    },
    {
        path: "/register",
        name: "Rejestracja",
        component: Register,
    },
    {
        path: "/logout",
        name: "Wylogowano",
        component: Logout,
    },
    {
        path: "/",
        name: "Współlokator - witamy!",
        component: LandingPage,
    },
    {
        path: "/chat",
        name: "Wiadomości",
        component: Chat,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
