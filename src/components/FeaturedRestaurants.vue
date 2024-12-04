<template>
    <div>
      <h3>Our Featured Restaurants</h3>
      <ul>
        <li v-for="restaurant in getFeaturedRestaurants" :key="restaurant.id">
          <a @click="pushToRestaurantView(restaurant.id)"> <strong>{{ restaurant.name }}</strong>: {{ restaurant.Description}}</a>
          <img :src="restaurant.Img" alt="restaurant image" width="100" height="100" />
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useRestaurantStore } from '@/stores/RestaurantStore';
  import { mapState, mapActions } from 'pinia';
  export default {
    name: "FeaturedRestaurants",
    data() {
      return {
        
      };
    },
    methods: {
      ...mapActions(useRestaurantStore, ['fetchFeaturedRestaurants']),
      pushToRestaurantView(restaurantId) {
        this.$router.push(`/restaurant/${restaurantId}`);
      },
    },
    computed: {
      ...mapState(useRestaurantStore, ['getFeaturedRestaurants']),
    },
  async created() {
    this.fetchFeaturedRestaurants();
  }
  };
  </script>
  