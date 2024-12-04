<template>
    <div>
        <h1>All Restaurants</h1>
        <ul>
            <li v-for="restaurant in restaurants" :key="restaurant.id">
                <RouterLink :to="{ name: 'Restaurant', params: { id: restaurant.id } }">
                    {{ restaurant.name }}
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<script>
import { useRestaurantStore } from '@/stores/RestaurantStore';
import { mapState, mapActions } from 'pinia';
import { RouterLink } from 'vue-router';

export default {
    name: "AllRestaurantsView",
    components: { RouterLink },
    computed: {
        ...mapState(useRestaurantStore, ['restaurants']),
    },
    methods: {
        ...mapActions(useRestaurantStore, ['fetchRestaurants']),
    },
    created() {
        this.fetchRestaurants();
    }
};
</script>