// cartStore.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
    userPreferences: {},
  }),
  getters: {
    totalPrice(state) {
      return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  actions: {
    addToCart(item) {
      const existingItem = this.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart(itemId) {
      this.cart = this.cart.filter((item) => item.id !== itemId);
    },
  },
});
