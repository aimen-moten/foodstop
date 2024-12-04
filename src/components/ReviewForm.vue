<template>
    <div>
        <h3>Leave a Review</h3>
        <select v-model="selectedRestaurant">
            <option v-for="restaurant in restaurants" :key="restaurant.id" :value="restaurant.id">
                {{ restaurant.name }}
            </option>
        </select>
        <input v-model="ReviewerName" placeholder="Your Name" />
        <textarea v-model="reviewText" placeholder="Write your review here..."></textarea>
        <input v-model="rating" type="number" placeholder="Rating (0-5)" min="0" max="5" />
        <button @click="submitReview">Submit Review</button>
    </div>
</template>

<script>
import { useRestaurantStore } from '@/stores/RestaurantStore';
import { mapState, mapActions } from 'pinia';

export default {
    name: "ReviewForm",
    data() {
        return {
            selectedRestaurant: '',
            reviewText: '',
            ReviewerName: '',
            rating: 0,
        };
    },
    computed: {
        ...mapState(useRestaurantStore, ['restaurants']),
    },
    methods: {
        ...mapActions(useRestaurantStore, ['fetchRestaurants', 'addReview']),
        async submitReview() {
            if (this.selectedRestaurant && this.reviewText && this.rating >= 0 && this.rating <= 5) {
                const review = {
                    Review: this.reviewText,
                    Rating: this.rating,
                    name: this.ReviewerName,
                    timestamp: new Date()
                };
                await this.addReview(review, this.selectedRestaurant);
                this.reviewText = '';
                this.ReviewerName = '';
                this.rating = 0;
                this.$emit('restaurant-selected', this.selectedRestaurant);
                alert('Review submitted successfully!');
            } else {
                alert('Please select a restaurant, write a review, and provide a rating between 0 and 5.');
            }
        }
    },
    async created() {
        await this.fetchRestaurants();
    }
};
</script>