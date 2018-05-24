<template>
    <div @click="closeModal" class="profile">
        <modal class="profile__modal">
            <i @click="closeModal" class="profile__close fas fa-times"></i>
            <h3>Profile</h3>
            <p>Pseudo: {{ profile.pseudo }}</p>
            <p>Email : {{ profile.email }}</p>
        </modal>
    </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Modal from '../uikit/modal/Modal';

  export default {
    components: { Modal },
    name: 'profile',
    computed: {
      ...mapState({
        profile: state => state.auth.profile
      })
    },
    methods: {
      closeModal() {
        this.$router.push({
          path: '/home'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .profile {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        &__modal {
            position: relative;
            padding: 15px;
            width: 500px;
            height: 500px;
        }
        &__close {
            position: absolute;
            top: 10px;
            left: 10px;
            color: black;
            &:hover {
                cursor: pointer;
            }
        }
    }
</style>
