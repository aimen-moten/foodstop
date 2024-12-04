<template>
    <div>
        <h2>Sign Up</h2>
        <input type="email" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Password" />
        <button @click="signUpUser" :disabled="!isFormValid">Sign Up</button>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import { mapState, mapActions } from 'pinia';

export default {
    name: "SignUpComponent",
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        ...mapActions(useUserStore, ['signUp']),
        async signUpUser() {
            await this.signUp(this.email, this.password);
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