<template>
  <div>
    <h2>Reviews</h2>
    <ReviewForm @restaurant-selected="selectRestaurant" />
    <div v-if="selectedRestaurant">
      <h3>Reviews for {{ getRestaurant.name }}</h3>
      <ul>
        <li v-for="review in getReviews" :key="review.id">
          <p>Reviewer: {{ review.name }}</p>
          <p>Review: {{ review.Review }}</p>
          <p>Rating: {{ review.Rating }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ReviewForm from '@/components/ReviewForm.vue';
import { useRestaurantStore } from '@/stores/RestaurantStore';
import { mapState, mapActions } from 'pinia';

export default {
  name: "ReviewView",
  components: { ReviewForm },
  data() {
    return {
      selectedRestaurant: '',
    };
  },
  computed: {
    ...mapState(useRestaurantStore, ['getReviews', 'getRestaurant']),
  },
  methods: {
    ...mapActions(useRestaurantStore, ['fetchReviews','getRestaurantById']),
    selectRestaurant(id) {
      this.selectedRestaurant = id;
      this.fetchReviews(id);
      this.getRestaurantById(id);
    }
  },
  
};
</script>