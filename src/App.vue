<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/cart">Cart</router-link>
      <router-link to="/review">Review</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
nav {
  display: flex;
  gap: 15px;
  background-color: #f8f9fa;
  padding: 10px;
}
nav a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
nav a.router-link-active {
  color: #007bff;
}
</style>
