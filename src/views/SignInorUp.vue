<template>
    <div>
        <div>
            <button @click="toggleSignIn">Sign In</button>
            <button @click="toggleSignUp">Sign Up</button>
        </div>
        <div v-if="showSignIn">
            <SignInComponent />
        </div>
        <div v-if="showSignUp">
            <SignUpComponent />
        </div>
    </div>
</template>
<script>
import SignInComponent from '@/components/SignInComponent.vue';
import SignUpComponent from '@/components/SignUpComponent.vue';
export default {
    name: "SignInorUp",
    components: {
        SignInComponent,
        SignUpComponent
    },
    data() {
        return {
            showSignIn: true,
            showSignUp: false,
        };
    },
    methods: {
        toggleSignIn() {
            this.showSignIn = true;
            this.showSignUp = false;
        },
        toggleSignUp() {
            this.showSignIn = false;
            this.showSignUp = true;
        },
    },
};
</script>