<template>
    <div class="room">
        <h1 v-if="emptyRoomMessages">Pas de room ouverte</h1>
        <h1>{{ room.name }}</h1>
        <chat-list :messages="room.messages"></chat-list>
        <chat-form v-if="$route.params.id"></chat-form>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import ChatList from '../chat/ChatList';
  import ChatForm from '../chat/ChatForm';

  export default {
    name: 'room',
    components: { ChatList, ChatForm },
    async created() {
      await this.$store.dispatch('getRoom', this.$route.params.id);
    },
    computed: {
      ...mapState({
        room: state => state.room.room
      }),
      ...mapGetters([
        'emptyRoomMessages'
      ])
    },
    watch: {
      $route() {
        this.$store.dispatch('getRoom', this.$route.params.id)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .room {
        background-color: aquamarine;
        width: 30em;
    }
</style>
