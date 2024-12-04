<template>
    <div>
      <h3>Our Featured Restaurants</h3>
      <ul>
        <li v-for="restaurant in getFeaturedRestaurants" :key="restaurant.id">
          <RouterLink :to="{name:'Restaurant', params: {id:restaurant.id}}" ><strong> {{ restaurant.name }} </strong></RouterLink> : <p>{{ restaurant.Description }}</p> <br/>
          <img :src="restaurant.Img" alt="restaurant image" width="100" height="100" />
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import {RouterLink} from 'vue-router';
  import { useRestaurantStore } from '@/stores/RestaurantStore';
  import { mapState, mapActions } from 'pinia';
  export default {
    name: "FeaturedRestaurants",
    components: {
      RouterLink,
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
  