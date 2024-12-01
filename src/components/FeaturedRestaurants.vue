<template>
    <div>
      <h3>Featured Restaurants</h3>
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          {{ restaurant.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: "FeaturedRestaurants",
    data() {
      return {
        restaurants: [
          { id: 1, name: "Restaurant A" },
          { id: 2, name: "Restaurant B" },
        ],
      };
    },
  };
  </script>
  