<template>
    <div v-if="!getCartStatus">
      <h2>Your Cart</h2>
      <OrderSummary :items="cart" :total="totalPrice" @removeItem="removeFromCart" />
      <button @click="checkout">Checkout</button>
    </div>
    <div v-else>
      <p>Your Cart is empty</p>
    </div>
  </template>
  
  <script>
  import { useCartStore } from "@/stores/cartStore";
  import OrderSummary from "../components/OrderSummary.vue";
  import { mapState, mapActions } from "pinia";

  export default {
    name: "CartView",
    components: { OrderSummary },
    computed: {
      ...mapState(useCartStore, ['cart', 'totalPrice', 'getCartStatus']),
    },
    methods: {
      ...mapActions(useCartStore, ['removeFromCart', 'fetchCart']),
      checkout() {
        alert('You have successfully checked out with a subtotal of $' + this.totalPrice); // This is a placeholder for a real checkout process
      },
    },
    created() {
      this.fetchCart();
    },
  };
  </script>
  