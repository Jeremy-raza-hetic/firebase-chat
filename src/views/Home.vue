<template>
    <div class="home">
        <h1>Home</h1>
        <button-action :button-value="'Se déconnecter'" :button-function="signOut"></button-action>
        <chats></chats>
        <users-list></users-list>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import ButtonAction from '../uikit/button/ButtonAction';
    import Chats from './Chats';
    import UsersList from "../components/users/usersList";

    export default {
        components: {
            UsersList,
            Chats,
            ButtonAction
        },
        name: 'home',
        computed: {
            ...mapState({
                profile: state => state.auth.profile,
                isLogged: state => state.auth.isLogged
            })
        },
        methods: {
            signOut() {
                this.$firebase.auth().signOut()
                    .then(() => {
                        this.$store.commit('setIsLogged', false);
                        this.$router.push('/auth');
                        this.setIsLogged();
                    });
            },
            setIsLogged() {
                const usersRef = this.$db.ref('users').child(this.profile.uid);
                usersRef.set({...this.profile, isLogged: this.isLogged})
            }
        }
    }
</script>
