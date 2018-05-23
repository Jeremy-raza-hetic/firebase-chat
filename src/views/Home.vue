<template>
    <div class="home">
        <h1>Home</h1>
        <button-action :button-value="'Se déconnecter'" :button-function="signOut"></button-action>
        <chats></chats>
    </div>
</template>

<script>
  import { mapState } from 'vuex';
  import ButtonAction from '../uikit/button/ButtonAction';
  import Chats from './Chats';

  export default {
    components: {
      Chats,
      ButtonAction
    },
    name: 'home',
    computed: {
      ...mapState({
        isLogged: state => state.auth.isLogged
      })
    },
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
