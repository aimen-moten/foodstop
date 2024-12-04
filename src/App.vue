<template>
  <div id="app">
    <nav>
      <router-link to="/"><img src="./assets/logo.svg" width="40px" height="40px"></router-link>
      <router-link to="/">Home</router-link>
      <router-link to="/allrestaurants">Restaurants</router-link>
      <router-link to="/cart">Cart</router-link>
      <router-link to="/reviews">Add Your Review!</router-link>
      <router-link to="/sign" v-show="!user" id="SignIn">Sign In</router-link>
      <button v-if="user" @click="signOut">Logout</button>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { mapState, mapActions } from 'pinia';

export default {
  name: "App",
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  methods: {
    ...mapActions(useUserStore, ['signOut', 'monitorAuthState']),
  },
  created() {
    this.monitorAuthState();
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  gap: 15px;
  background-color: #007bff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

nav a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
}

nav a.router-link-active {
  color: #ffeb3b;
}

button {
  background-color: red ;
  border: none;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  color: #ffeb3b;
}

main {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1, h2, h3 {
  color: #333;
}

p {
  color: #666;
}
</style>
