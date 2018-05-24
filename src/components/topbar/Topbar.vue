<template>
    <div class="topbar">
        <router-link :to="{ path: '/' }">
            <img class="topbar__logo" src="../../assets/logo.png">
        </router-link>
        <p class="topbar__title">Belynda & Jérémy Chat</p>
        <router-link class="topbar__pseudo" :to="{ path: '/home/profile'}">
            <p> {{ profile.pseudo }}</p>
        </router-link>
    </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'topbar',
    computed: {
      ...mapState({
        profile: state => state.auth.profile
      })
    }
  }
</script>

<style scoped lang="scss">
    .topbar {
        position: fixed;
        display: flex;
        align-items: center;
        top: 0;
        left: 0;
        width: 100%;
        background: #EFC94C;
        height: 50px;
        &__logo {
            width: 40px;
            height: 40px;
            margin-left: 20px;
            &:hover {
                cursor: pointer;
            }
        }
        &__title {
            margin-left: 20px;
        }
        &__pseudo {
            margin-left: auto;
            margin-right: 20px;
            text-decoration: none;
            &:hover {
                cursor: pointer;
            }
        }
    }
</style>
