import { createRouter, createWebHistory } from 'vue-router';
import type { Router } from 'vue-router';
import HomeView from "@/router/pages/HomeView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            title: "Kanban nástěnka"
        }
    },
]

const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})


router.beforeEach(async (to, from, next): Promise<void> => {
    document.title = to.meta.title + " test | ";
    next();

});

export default router;