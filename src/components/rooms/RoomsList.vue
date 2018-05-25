<template>
    <div class="rooms-list">
        <div class="rooms-list__loop" v-for="room in rooms" :key="room.id">
            <div class="rooms-list__item" @click="goToRoom(room.id)">
                <p>{{ room.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'rooms-list',
    created() {
      this.setRooms();
    },
    data() {
      return {
        rooms: [],
        roomsRef: this.$db.ref('rooms'),
      }
    },
    methods: {
      setRooms() {
        this.roomsRef.on('child_added', snapshot => {
          this.rooms.push({ ...snapshot.val(), id: snapshot.key })
        })
      },
      goToRoom(id) {
        this.$router.push({
          path: `/home/${id}`
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
    .rooms-list {
        display: flex;
        flex-wrap: wrap;
        &__item {
            height: 10em;
            width: 10em;
            background-color: pink;
            padding: 1em;
            margin: 1em;
            &:hover {
                cursor: pointer;
            }
        }
    }
</style>
