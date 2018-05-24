<template>
    <div class="home">
        <h1>Home</h1>
        <button-action :button-value="'Se déconnecter'" :button-function="signOut"></button-action>
        <chats></chats>
        <router-view></router-view>
    </div>
</template>

<script>
  import ButtonAction from '../uikit/button/ButtonAction';
  import Chats from './Chats';

  export default {
    components: {
      Chats,
      ButtonAction
    },
    name: 'home',
    methods: {
      signOut() {
        this.$firebase.auth().signOut()
        .then(() => {
          this.$store.commit('setIsLogged', false);
          this.$router.push('/auth')
        })
      }
    }
  }
</script>
