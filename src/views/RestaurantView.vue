<template>
  <div class="restaurant-container">
    <div class="restaurant-information">
      <h2>{{ getRestaurant.name }}</h2>
      <img :src="getImg" alt="Restaurant Image" />
      <p>{{ getRestaurant.Description }}</p>
      <p>Rating: {{ getRestaurant.Rating }}</p>
      <p>Type: </p>
      <ul>
        <li v-for="category in getRestaurant.Type" :key="category">{{ category }}</li>
      </ul>
    </div>
    <h2>Menu</h2>
    <ul class="menu-items">
      <li v-for="item in foodItems" :key="item.id">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <p>Price: ${{ item.price }}</p>
        <button @click="addToCart(item)">Add to Cart</button>
      </li>
    </ul>
    <ul class="reviews">
      <li v-for="review in getRestaurant.Reviews" :key="review.id">
        <h3>{{ review.name }}</h3>
        <p>{{ review.review }}</p>
        <p>Rating: {{ review.rating }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { useRestaurantStore } from "@/stores/RestaurantStore";
import { useCartStore } from "@/stores/cartStore";
import { useRoute } from "vue-router";
import { mapState, mapActions } from "pinia";

export default {
  name: "RestaurantView",
  methods: {
    ...mapActions(useRestaurantStore, ['fetchRestaurantData']),
    addToCart(item) {
      const store = useCartStore();
      store.addToCart(item);
    },
  },
  computed: {
    ...mapState(useRestaurantStore, ['getRestaurant', 'foodItems', 'getImg']),
  },
  created() {
    const route = useRoute();
    const restaurantId = route.params.id;
    this.fetchRestaurantData(restaurantId);
  }
};
</script>