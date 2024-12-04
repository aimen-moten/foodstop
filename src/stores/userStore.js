import { defineStore } from "pinia";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/init.js";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: null,
        signInSuccess: false,
        signUpSuccess: false,
        signInError: "",
        signUpError: "",
        userName: "",
    }),
    getters: {
        getUser: state => state.user,
        getSignInSuccess: state => state.signInSuccess,
        getSignUpSuccess: state => state.signUpSuccess,
        getSignInError: state => state.signInError,
        getSignUpError: state => state.signUpError,
        getUserName: state => state.userName,
    },
    actions: {
        async signIn(email, password) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                this.user = userCredential.user;
                this.signInSuccess = true;
                this.signInError = "";
                alert("Successfully signed in as " + this.user.email);
            } catch (err) {
                console.error("Error signing in:", err);
                this.signInError = err.message;
                this.signInSuccess = false;
                alert("Error signing in: " + this.signInError); 
            }
        },
        async signUp(email, password) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                this.user = userCredential.user;
                this.signUpSuccess = true;
                this.signUpError = "";
                alert("Successfully signed up!");
            } catch (err) {
                console.error("Error signing up:", err);
                this.signUpError = err.message;
                this.signUpSuccess = false;
                alert("Error signing up: " + this.signUpError);
            }
        },
        async signOut() {
            try {
                await signOut(auth);
                this.user = null;
                alert("Successfully signed out!");
            } catch (err) {
                console.error("Error signing out:", err);
                alert("Error signing out: " + err.message);
            }
        },
        monitorAuthState() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user = user;
                } else {
                    this.user = null;
                }
            });
        }
    }
});