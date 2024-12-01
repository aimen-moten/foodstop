<template>
    <div>
      <h2>Your Cart</h2>
      <OrderSummary :items="cart" :total="totalPrice" @removeItem="removeFromCart" />
    </div>
  </template>
  
  <script>
  import { useCartStore } from "@/stores/cartStore";
  import OrderSummary from "../components/OrderSummary.vue";
  
  export default {
    name: "CartView",
    components: { OrderSummary },
    setup() {
      const store = useCartStore();
      return { cart: store.cart, totalPrice: store.totalPrice, removeFromCart: store.removeFromCart };
    },
  };
  </script>
  