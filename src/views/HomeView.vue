<template>
    <div>
      <h1>Welcome to FoodStop</h1>
      <FeaturedRestaurants />
    </div>
  </template>
  
  <script>
  import FeaturedRestaurants from "../components/FeaturedRestaurants.vue";
  
  export default {
    name: "HomeView",
    components: { FeaturedRestaurants },
  };
  </script>
  