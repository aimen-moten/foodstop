// cartStore.js
import { defineStore } from "pinia";
import { db } from "@/firebase/init";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useUserStore } from "@/stores/userStore"; // Import the user store
export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
    userPreferences: {},
    isCartEmpty: true,
  }),
  getters: {
    totalPrice(state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    getCartStatus(state) {
      return state.cart.length === 0;
    }
  },
  actions: {
    async addToCart(item) {
      const userStore = useUserStore();
      const user = userStore.user;

      // Check if user is signed in
      if (!user) {
        // Redirect to sign-in page or show sign-in prompt
        alert("Please sign in to add items to your cart.");
        return;
      }

      // Check if item is already in cart
      // if so, increment quantity and update cart within the database
      const existingItem = this.cart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        console.log("Item already in cart. Incrementing quantity.");
        existingItem.quantity += 1;
        this.updateCartItem(existingItem.id, existingItem);
      } else {
        try{
        // Add item to cart in database
          const cartRef = collection(db, "Cart");
          const docRef= await addDoc(cartRef, { ...item, quantity: 1, addedBy: user.email});
          // the old Id and the new Id are the different so we need to update the id in the cart so that we can delete the item from the cart properly
          this.updateCartItem(docRef.id, { ...item, quantity: 1, addedBy: user.email, id: docRef.id });
          console.log("Item added to cart in database");
        }
        catch (error) {
          console.error("Error adding item to cart in database: ", error);
        }
      }
    },
    // Remove item from cart
    async removeFromCart(itemId) {
      this.cart = this.cart.filter((item) => item.id !== itemId);
      // Remove item from cart in database
      try{
        const itemRef = doc(db, "Cart", itemId); 
        await deleteDoc(itemRef);
        console.log("Document successfully deleted!");
      }
      catch (error) {
        console.error("Error removing document: ", error);
      }
    },
    async fetchCart() {
      const userStore = useUserStore();
      const user = userStore.user;

      if (!user) {
        // Redirect to sign-in page or show sign-in prompt
        alert("Please sign in to view your cart.");
        return;
      }

      try {
        const cartRef = collection(db, "Cart");
        const cartSnap = await getDocs(cartRef);
        this.cart = cartSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        this.cart = this.cart.filter((item) => item.addedBy === user.email);
        this.isCartEmpty = this.cart.length === 0;
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    },
    async updateCartItem(itemId, updatedData) {
      this.cart = this.cart.map((item) => (item.id === itemId ? updatedData : item));
      // Update item in cart in database
      try {
        const itemRef = doc(db, "Cart", itemId);
        await updateDoc(itemRef, updatedData);
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  },
});
