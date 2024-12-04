// index.js
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RestaurantView from "../views/RestaurantView.vue";
import CartView from "../views/CartView.vue";
import ReviewView from "../views/ReviewView.vue";
import FoodView from "@/views/FoodView.vue";
import SignInorUp from "@/views/SignInorUp.vue";
import AllRestaurantsView from "@/views/AllRestaurantsView.vue";
const routes = [
  { path: "/", 
    name: "Home", 
    component: HomeView },
  { path: "/restaurant/:id",
    name: "Restaurant", 
    component: RestaurantView },
  { path: "/cart", 
    name: "Cart", 
    component: CartView },
  { path: "/reviews", 
    name: "Reviews", 
    component: ReviewView },
  {
    path: "/restaurant/:restaurantId/food/:foodId", 
    name: "Food", 
    component: FoodView
  },
  {
    path: "/sign",
    name: "Sign",
    component: SignInorUp,
  },
  {
    path: "/allrestaurants",
    name: "AllRestaurants",
    component: AllRestaurantsView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
