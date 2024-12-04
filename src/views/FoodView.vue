<template>
  <div>
    <h2>{{ food.name }}</h2>
    <p>{{ food.description }}</p>
    <p>Price: ${{ food.price }}</p>
    <button @click="addToCart(food)">Add to Cart</button>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cartStore";
import { useRoute } from "vue-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/init";

export default {
  name: "FoodView",
  data() {
    return {
      food: {},
    };
  },
  methods: {
    async fetchFoodData(restaurantId, foodId) {
      const docRef = doc(db, "Restaurant", restaurantId, "Food", foodId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.food = docSnap.data();
      } else {
        console.error("Food item not found!");
      }
    },
    addToCart(item) {
      const store = useCartStore();
      store.addToCart(item);
    },
  },
  created() {
    const route = useRoute();
    const { restaurantId, foodId } = route.params;
    this.fetchFoodData(restaurantId, foodId);
  },
};
</script>