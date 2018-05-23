import { $firebase, $db } from '../../firebase.config';

export default {
  state: {
    profile: {},
    isLogged: false
  },
  actions: {
    getProfile({ commit }) {
      $firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const currentUser = $db.ref('users').child(user.uid);
          currentUser.on('value', snapshot => {
            commit('setProfile', snapshot.val())
          });
        } else {
          console.log('no user')
        }
      });
    },
  },
  mutations: {
    setProfile(state, val) {
      state.profile = val;
    },
    setIsLogged(state, val) {
      state.isLogged = val
    }
  }
}
