<template>
    <div class="auth">
        <component :is="currentView"></component>
    </div>
</template>

<script>
  import AuthLogin from '@/views/auth/AuthLogin'
  import AuthSignUp from '@/views/auth/AuthSignUp'

  export default {
    name: 'auth',
    components: {
      AuthLogin,
      AuthSignUp
    },
    computed: {
      currentView() {
        const mapViews = {
          login: 'auth-login',
          signup: 'auth-sign-up'
        };
        return mapViews[this.$route.params.route]
      }
    }
  }
</script>

<style scoped>

</style>
