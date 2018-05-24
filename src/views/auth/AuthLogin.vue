<template>
    <div class="auth-login">
        <form @submit.prevent="signIn">
            <input-model :input-value.sync="email" :input-type="'email'" :input-placeholder="'text'"></input-model>
            <input-model :input-value.sync="password" :input-type="'password'"
                         :input-placeholder="'mot de passe'"></input-model>
            <button-action :button-function="signIn" :button-value="'Se connecter'"></button-action>
        </form>
        <router-link :to="{ path: '/auth/signup'}">
            <button-action :button-value="'S\'inscrire'"></button-action>
        </router-link>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import InputModel from '../../uikit/input/InputModel';
    import ButtonAction from '../../uikit/button/ButtonAction';

    export default {
        components: {
            ButtonAction,
            InputModel
        },
        name: 'auth-login',
        data() {
            return {
                email: '',
                password: '',
            }
        },
        computed: {
            ...mapState({
                profile: state => state.auth.profile,
                isLogged: state => state.auth.isLogged
            })
        },
        methods: {
            signIn() {
                this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        this.$store.commit('setIsLogged', true);
                        this.$router.push('/home');
                        this.setIsLogged();
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            setIsLogged() {
                const usersRef = this.$db.ref('users').child(this.profile.uid);
                usersRef.set({ ...this.profile, isLogged: this.isLogged })
            }
        }
    }
</script>

<style scoped>

</style>
