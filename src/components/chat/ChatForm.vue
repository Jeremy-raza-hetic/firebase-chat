<template>
    <div class="chat-form">
        <input-model :input-placeholder="'Taper votre nouveau message'"
                     :input-type="'text'"
                     :input-value.sync="newMessage">
        </input-model>
        <button-action
                :button-value="'Envoyer'"
                :button-function="sendNewMessage">
        </button-action>
    </div>
</template>

<script>
  import { mapState } from 'vuex';
  import InputModel from '../../uikit/input/InputModel';
  import ButtonAction from '../../uikit/button/ButtonAction';

  export default {
    components: {
      ButtonAction,
      InputModel
    },
    name: 'chat-form',
    data() {
      return {
        newMessage: '',
        user: this.$firebase.auth().currentUser.email
      }
    },
    computed: {
      ...mapState({
        profile: state => state.auth.profile
      })
    },
    methods: {
      sendNewMessage() {
        this.$store.dispatch('sendNewMessage', {
          ref: this.$db.ref(`rooms/${this.$route.params.id}/messages`),
          owner: this.user,
          pseudo: this.profile.pseudo,
          message: this.newMessage
        })
        .then(() => {
          this.newMessage = ''
        })
      }
    }
  }
</script>

<style scoped>

</style>
