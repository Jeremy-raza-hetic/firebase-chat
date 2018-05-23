<template>
    <div class="chat-list">
        <div v-for="message in messages" :key="message.id">
            <chat-item :message="message"></chat-item>
        </div>
        <chat-form></chat-form>
    </div>
</template>

<script>
  import ChatItem from './ChatItem';
  import ChatForm from './ChatForm';

  export default {
    components: {
      ChatForm,
      ChatItem
    },
    name: 'chat-list',
    props: {
      messages: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
