import { createRouter, createWebHistory } from 'vue-router';
import type { Router } from 'vue-router';
import type { NavigationGuardNext } from 'vue-router';
import type { RouteLocationNormalizedGeneric } from 'vue-router';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import HomeView from "@/router/pages/HomeView.vue";
import TaskView from "@/router/pages/TaskView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            title: "Kanban nástěnka - domovská obrazovka"
        }
    },
    {
        path: '/ukol/:id',
        name: 'task',
        component: TaskView,
        meta: {
            title: "Kanban nástěnka - úkol"
        }
    },
]

const router: Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})


router.beforeEach(async (to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedLoadedGeneric, next: NavigationGuardNext): Promise<void> => {
    document.title = to.meta.title + " | ";
    next();

});

export default router;