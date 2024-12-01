// index.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RestaurantView from "../views/RestaurantView.vue";
import CartView from "../views/CartView.vue";
import ReviewView from "../views/ReviewView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/restaurant/:id", name: "Restaurant", component: RestaurantView },
  { path: "/cart", name: "Cart", component: CartView },
  { path: "/reviews", name: "Reviews", component: ReviewView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
