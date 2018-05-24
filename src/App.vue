<template>
    <div id="app">
        <topbar v-if="isLogged"></topbar>
        <router-view id="router-view"/>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Topbar from '@/components/topbar/Topbar'

  export default {
    components: {
      Topbar
    },
    computed: {
      ...mapState({
        isLogged: state => state.auth.isLogged
      })
    }
  }
</script>

<style lang="scss">

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100vh;
        background: #FDFBFE;
    }
    #router-view {
        margin-top: 50px;
    }
</style>
