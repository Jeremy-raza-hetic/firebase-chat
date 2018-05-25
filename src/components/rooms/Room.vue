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
    created() {
      // set room
      this.linkRoom();
      this.linkRoomMessages();
    },
    computed: {
      ...mapState({
        room: state => state.room.room
      }),
      ...mapGetters([
        'emptyRoomMessages',
        'lol'
      ]),
    },
    methods: {
      // set room if params.id
      // store
      linkRoom() {
        const ref = this.$db.ref(`rooms/${this.$route.params.id}`);
        ref.once('value', snapshot => {
          if (snapshot.val() !== null) {
            this.$store.dispatch('setRoom', snapshot.val())
          }
        })
      },
      linkRoomMessages() {
        const refMsg = this.$db.ref(`rooms/${this.$route.params.id}/messages`);
        refMsg.on('child_added', snapshot => {
          this.$store.commit('setRoomMessages', { ...snapshot.val(), id: snapshot.key });
        });
        refMsg.on('child_removed', snapshot => {
          this.$store.dispatch('deleteRoomMessage', snapshot.val());
          this.lol(0);
          console.log(this.lol);
        });
        refMsg.on('child_changed', snapshot => {
          this.$store.commit('updateRoomMessage', snapshot.val());
        })
      }
    },
    watch: {
      $route() {
        this.linkRoom();
        this.linkRoomMessages();
      }
    }
  }
</script>

<style lang="scss" scoped>
    .room {
        background-color: aquamarine;
        width: 30em;
        min-height: 70vh;
        overflow: scroll;
    }
</style>
