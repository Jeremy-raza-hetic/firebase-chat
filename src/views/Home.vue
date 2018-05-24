<template>
    <div class="home">
        <h1>Home</h1>
        <button-action :button-value="'Se déconnecter'" :button-function="signOut"></button-action>
        <!--<chats></chats>-->
        <div class="home__container">
            <users-list class="home__usersList"></users-list>
            <rooms-list></rooms-list>
            <room class="home__room"></room>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
    import ButtonAction from '../uikit/button/ButtonAction';
    import Chats from './Chats';
    import {mapState} from 'vuex';
    import UsersList from '../components/users/UsersList';
    import RoomsList from "../components/rooms/RoomsList";
    import Room from "../components/rooms/Room";

    export default {
        components: {
            Room,
            RoomsList,
            Chats,
            UsersList,
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
                this.$store.commit('setProfile', {});
                this.$router.push('/auth');
            }
        }
    }
</script>

<style scoped lang="scss">
    .home {
        &__container {
            display: flex;
            justify-content: space-around;
            &__usersList {
                width: 20%;
            }
            &__room {
                width: 60%;
            }
        }
    }

</style>
