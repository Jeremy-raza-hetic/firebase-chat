export default {
  actions: {
    sendNewMessage({ commit }, { ref, owner, pseudo, message }) {
      if (message.trim() !== '') {
        //
        const messagesRef = ref;
        const newMessageObject = messagesRef.push();
        newMessageObject.set({
          owner,
          pseudo,
          text: message
        });
      }
    }
  }
}
