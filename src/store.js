import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/auth'
import room from '@/store/room'
import chat from '@/store/chat'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    room,
    chat
  }
})
