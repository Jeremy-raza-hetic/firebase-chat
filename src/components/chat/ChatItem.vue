<template>
    <div class="chat-item">
        <p>{{ message.pseudo }} a dit :</p>
        <p>{{ message.text }}</p>
        <input v-if="isInputDisplayed" v-model="updatedMessage"/>
        <button-action v-if="isInputDisplayed" :button-value="'Valider'"
                       :button-function="updateMessage"></button-action>
        <button-action v-if="isInputDisplayed" :button-value="'Retour'" :button-function="toggleInput"></button-action>
        <button-action
                v-if="message.owner === profile.email"
                :button-function="deleteMessage"
                :button-value="'Supprimer'">
        </button-action>
        <button-action
                v-if="message.owner === profile.email && !isInputDisplayed"
                :button-function="toggleInput"
                :button-value="'Editer'">
        </button-action>
    </div>
</template>

<script>
  import { mapState } from 'vuex';
  import ButtonAction from '../../uikit/button/ButtonAction';

  export default {
    components: { ButtonAction },
    name: 'chat-item',
    data() {
      return {
        updatedMessage: '',
        isInputDisplayed: false
      }
    },
    computed: {
      ...mapState({
        profile: state => state.auth.profile
      })
    },
    props: {
      message: {
        type: Object
      }
    },
    methods: {
      deleteMessage() {
        this.$store.dispatch('deleteMessage', {
          ref: this.$db.ref(`rooms/${this.$route.params.id}/messages`),
          messageId: this.message.id
        })
      },
      updateMessage() {
        if (this.updatedMessage.trim() !== '') {
          const newVal = {
            owner: this.message.owner,
            pseudo: this.message.pseudo,
            text: this.updatedMessage
          };

          this.$store.dispatch('updateMessage', {
            ref: this.$db.ref(`rooms/${this.$route.params.id}/messages`),
            messageId: this.message.id,
            updateObj: newVal
          })
          .then(() => {
            this.updatedMessage = '';
            this.isInputDisplayed = false;
          })
        }
      },
      toggleInput() {
        this.isInputDisplayed = !this.isInputDisplayed;
      }
    }
  }
</script>

<style scoped>

</style>
