<template>
    <div>
      <h2>{{ restaurant.name }}</h2>
      <MenuItems :items="menuItems" @addToCart="addToCart" />
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from "vue";
  import { useCartStore } from "@/stores/cartStore";
  import MenuItems from "../components/MenuItems.vue";
  import { db } from "@/firebase/init";
  import { doc, getDoc } from "firebase/firestore";
  
  export default {
    name: "RestaurantView",
    components: { MenuItems },
    setup() {
      const menuItems = ref([]);
      const restaurant = ref({});
      const store = useCartStore();
  
      const fetchRestaurantData = async (id) => {
        const docRef = doc(db, "restaurants", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          restaurant.value = docSnap.data();
          menuItems.value = docSnap.data().menu;
        }
      };
  
      const addToCart = (item) => {
        store.addToCart(item);
      };
  
      onMounted(() => {
        const id = "sample-restaurant-id"; // Replace with dynamic route param
        fetchRestaurantData(id);
      });
  
      return { menuItems, restaurant, addToCart };
    },
  };
  </script>
  