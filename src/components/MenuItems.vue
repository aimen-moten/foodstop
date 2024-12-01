<template>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} - ${{ item.price }}
        <button @click="$emit('addToCart', item)">Add to Cart</button>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    name: "MenuItems",
    props: ["items"],
  };
  </script>
  