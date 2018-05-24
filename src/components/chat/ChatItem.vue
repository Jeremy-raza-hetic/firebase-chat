<template>
    <div class="chat-item">
        <div class="message" :class="{'message--reverse': hasMessage}">
            <div class="message__container" :class="{'message__container--reverse': hasMessage}">
                <img class="message__avatar" :class="{'message__avatar--reverse': hasMessage}" v-if="hasMessage" :src="profile.pictureUrl">
                <img class="message__avatar" :class="{'message__avatar--reverse': hasMessage}" v-else src="../../assets/logo.png">
                <p class="message__item">{{ message.text }}</p>
            </div>
        </div>
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
      }),
      hasMessage() {
        return this.message.owner === this.profile.email
      }
    },
    props: {
      message: {
        type: Object
      }
    },
    methods: {
      deleteMessage() {
        const messagesRef = this.$db.ref('messages');
        messagesRef.child(this.message.id).remove()
      },
      updateMessage() {
        if (this.updatedMessage.trim() !== '') {
          const messagesRef = this.$db.ref('messages');
          const newVal = {
            owner: this.message.owner,
            pseuo: this.message.pseudo,
            text: this.updatedMessage
          };
          messagesRef.child(this.message.id).update(newVal);
          this.updatedMessage = '';
          this.isInputDisplayed = false;
        }
      },
      toggleInput() {
        this.isInputDisplayed = !this.isInputDisplayed;
      }
    }
  }
</script>

<style scoped lang="scss">
    .message {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        &--reverse {
            align-items: flex-end;
        }
        &__container {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 5px;
            height: 40px;
            &--reverse {
                flex-direction: row-reverse;
                align-items: center;
            }
        }
        &__item {
            font-size: 16px;
            margin-bottom: 5px;
        }
        &__avatar {
            height: 20px;
            width: 20px;
            margin-right: 15px;
            border-radius: 50%;
            &--reverse {
                margin-right: 0;
                margin-left: 15px;
            }
        }
    }

</style>
