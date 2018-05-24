<template>
    <div class="room">
        <h1>{{ room.name }}</h1>
        <chat-list :messages="room.messages"></chat-list>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import ChatList from "../chat/ChatList";

    export default {
        name: 'room',
        components: {ChatList},
        computed: {
            ...mapState({
                room: state => state.room.roomMessages
            })
        }

    }
</script>

<style lang="scss" scoped>
    .room {
        background-color: aquamarine;
        width: 30em;
    }
</style>
