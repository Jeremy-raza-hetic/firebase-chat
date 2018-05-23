<template>
    <div class="chats">
        <p>Chat</p>
        <chat-list :messages="messages"></chat-list>
    </div>
</template>

<script>
  import ChatList from '../components/chat/ChatList';

  export default {
    components: { ChatList },
    name: 'chat',
    created() {
      this.setMessages()
    },
    data() {
      return {
        messages: [],
        messagesRef: this.$db.ref('messages')
      }
    },
    methods: {
      setMessages() {
        this.messagesRef.on('child_added', snapshot => {
          this.messages.push({ ...snapshot.val(), id: snapshot.key })
        });
        this.messagesRef.on('child_removed', snapshot => {
          const index = this.messages.findIndex(message => message.id === snapshot.key);
          this.messages.splice(index, 1);
        })
        this.messagesRef.on('child_changed', snapshot => {
          const index = this.messages.findIndex(message => message.id === snapshot.key);
          this.messages[index].text = snapshot.val().text
        })
      }
    }
  }
</script>

<style scoped>

</style>
