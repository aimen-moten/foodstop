<template>
    <div>
        <h2>Sign In</h2>
        <form @submit.prevent="signInUser">
            <label for="email">Email</label>
            <input type="email" v-model="email" required />
            <label for="password">Password</label>
            <input type="password" v-model="password" required />
            <button type="submit" :disabled="!isFormValid">Sign In</button>
        </form>
    </div>
</template>


<script>
import { useUserStore } from '@/stores/userStore';
import { mapState, mapActions } from 'pinia';
export default {
    name: "SignInComponent",
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        ...mapActions(useUserStore, ['signIn']),
        async signInUser() {
            await this.signIn(this.email, this.password);
            this.$router.push('/cart');
        },
        isFormValid(){
            if(this.email!=="" && this.password!=="" ){
                return true;
            } else {
                return false;
            }
        }
    },
    computed: {
        ...mapState(useUserStore, ['getUser']),
    },
};
</script>