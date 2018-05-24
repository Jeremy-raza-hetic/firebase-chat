import { $firebase, $db } from '../../firebase.config';

export default {
    state: {
        roomMessages: {}
    },
    actions: {
        getRoomMessages({ commit }, id){
            const roomRef = $db.ref('rooms/' + id);

            roomRef.on('value', snapshot => {
                commit('setRoomMessages', snapshot.val());
            })
        }
    },
    mutations: {
        setRoomMessages(state, value) {
            state.roomMessages = value
        }
    }
}
