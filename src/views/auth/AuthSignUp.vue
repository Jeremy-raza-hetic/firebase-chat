<template>
    <div class="auth-sign-up">
        <form @submit.prevent="signUp">
            <input-model
                    :input-value.sync="pseudo"
                    :input-type="'text'"
                    :input-placeholder="'pseudo'">
            </input-model>
            <input-model
                    :input-value.sync="email"
                    :input-type="'email'"
                    :input-placeholder="'text'">
            </input-model>
            <input-model
                    :input-value.sync="password"
                    :input-type="'password'"
                    :input-placeholder="'mot de passe'">
            </input-model>
            <button-action
                    :button-function="signUp"
                    :button-value="buttonValue">
            </button-action>
        </form>
        <router-link :to="{ path: '/auth/login'}">
            <button-action :button-value="'Se connecter'"></button-action>
        </router-link>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import InputModel from '../../uikit/input/InputModel';
    import ButtonAction from '../../uikit/button/ButtonAction';

    export default {
        components: {
            InputModel,
            ButtonAction
        },
        name: 'auth-sign-up',
        data() {
            return {
                email: '',
                pseudo: '',
                password: '',
                buttonValue: 'S\'inscrire'
            }
        },
        computed: {
            ...mapState({
                isLogged: state => state.auth.isLogged
            })
        },
        methods: {
            signUp() {
                this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        this.$store.commit('setIsLogged', true);
                        this.createUser();
                        this.$store.dispatch('getProfile');
                        this.$router.push('/home');
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            createUser() {
                const user = this.$firebase.auth().currentUser;
                this.$db.ref('users/' + user.uid).set({
                    pseudo: this.pseudo,
                    email: this.email,
                    uid: user.uid,
                    isLogged: this.isLogged
                })
            }
        }
    }
</script>

<style scoped>

</style>
