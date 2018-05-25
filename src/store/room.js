export default {
  state: {
    room: {
      name: '',
      messages: []
    }
  },
  actions: {
    setRoom({ commit }, obj) {
      commit('setRoom', obj)
    },
    deleteRoomMessage({ state, getters }, val) {
      //
    },
  },
  mutations: {
    setRoom(state, val) {
      state.room.name = val.name;
    },
    setRoomMessages(state, val) {
      state.room.messages.push(val);
    },
    updateRoomMessage(state, val) {
      const index = state.room.messages.find(msg => msg.id === val.id);
      state.room.messages[index].text = val.text;
    }
  },
  getters: {
    emptyRoomMessages: state => {
      return state.room.messages.length === 0;
    },
    lol: (state) => (id) => {
      console.log(id);
      return state.room.messages.findIndex(x => x.id === id);
    }
  }

}
