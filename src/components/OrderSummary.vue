<template>
    <div>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }} x {{ item.quantity }}
          <button @click="$emit('removeItem', item.id)">Remove</button>
        </li>
      </ul>
      <h3>Total: ${{ total }}</h3>
    </div>
  </template>
  
  <script>
  export default {
    name: "OrderSummary",
    props: ["items", "total"],
  };
  </script>
  