<template>
    <div>
      <h1>Welcome to FoodStop!</h1>
      <p>FoodStop is a convenient app that helps users discover and explore a variety of restaurants. It provides detailed information about featured restaurants, including their menus, locations, and user reviews. Whether you're looking for a quick bite or a fine dining experience, FoodStop has got you covered!</p>
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
  