import { $db } from '../../firebase.config';

export default {
  state: {
    defaultRoom: {
      name: '',
      messages: []
    },
    room: {
      name: '',
      messages: []
    }
  },
  actions: {
    async getRoom({ state, commit }, id) {
      const roomRef = $db.ref('rooms/' + id);

      await roomRef.on('value', snapshot => {
        if (snapshot.val() !== null) {
          commit('setRoom', snapshot.val());
        } else {
          commit('setRoom', state.defaultRoom);
        }
      })
    },
  },
  mutations: {
    setRoom(state, value) {
      state.room.name = value.name;
      state.room.messages = value.messages;
    }
  },
  getters: {
    emptyRoomMessages: state => {
      return state.room.messages.length === 0;
    }
  }
}
