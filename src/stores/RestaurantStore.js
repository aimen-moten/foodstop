import { defineStore } from "pinia";
import { db } from "@/firebase/init";
import { doc, getDoc, collection, getDocs, addDoc } from "firebase/firestore";

export const useRestaurantStore = defineStore("restaurant", {
    state: () => ({
        restaurants: [],
        foodItems: [],
        reviews: [],
        FeaturedRestaurant: [],
        restaurant: {},
        RestaurantImg: "",
    }),
    getters: {
        getReviews: state => state.reviews,
        getFoodItems: state => state.foodItems,
        getRestaurants: state => state.restaurants,
        getFeaturedRestaurants: state => state.FeaturedRestaurant,
        getRestaurant: state => state.restaurant,
        getImg: state => state.RestaurantImg,
    },
    actions: {
        async fetchRestaurantData(restaurantId) {
            try {
                // Fetch restaurant document
                this.restaurant = {};
                this.reviews = [];
                this.foodItems = [];
                const restaurantRef = doc(db, "Restaurant", restaurantId);
                const restaurantSnap = await getDoc(restaurantRef);
                if (restaurantSnap.exists()) {
                    this.restaurant = restaurantSnap.data();
                    this.RestaurantImg = this.restaurant.Img;
                    // Fetch food items
                    const foodItemsRef = collection(db, "Restaurant", restaurantId, "Food");
                    const foodItemsSnap = await getDocs(foodItemsRef);
                    this.foodItems = foodItemsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                    // Fetch reviews
                    const reviewsRef = collection(db, "Restaurant", restaurantId, "Reviews");
                    const reviewsSnap = await getDocs(reviewsRef);
                    this.reviews = reviewsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                } else {
                    console.error("Restaurant not found!");
                }
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
            }
        },
        async fetchRestaurants() {
            this.restaurants = [];
            try {
                const restaurantsRef = collection(db, "Restaurant");
                const restaurantsSnap = await getDocs(restaurantsRef);
                this.restaurants = restaurantsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        },
        async fetchFeaturedRestaurants() {
            try {
                const restaurantsRef = collection(db, "FeaturedRestaurants");
                const restaurantsSnap = await getDocs(restaurantsRef);
                this.FeaturedRestaurant = restaurantsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error("Error fetching featured restaurants:", error);
            }
        },
        async addReview(review, restaurantId) {
            try {
                const reviewsRef = collection(db, "Restaurant", restaurantId, "Reviews");
                await addDoc(reviewsRef, review);
            } catch (error) {
                console.error("Error adding review:", error);
            }
        },
        async fetchReviews(restaurantId) {
            this.reviews = [];
            try {
                const reviewsRef = collection(db, "Restaurant", restaurantId, "Reviews");
                const reviewsSnap = await getDocs(reviewsRef);
                this.reviews = reviewsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        },
        async getRestaurantById(restaurantId) {
            try {
                const restaurantRef = doc(db, "Restaurant", restaurantId);
                const restaurantSnap = await getDoc(restaurantRef);
                if (restaurantSnap.exists()) {
                    this.restaurant = restaurantSnap.data();
                    return this.restaurant;
                } else {
                    console.error("Restaurant not found!");
                    return null;
                }
            } catch (error) {
                console.error("Error fetching restaurant data:", error);
                return null;
            }
        }
    }
});