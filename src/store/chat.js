
export default {
  actions: {
    sendNewMessage({ commit }, { ref, owner, pseudo, message }) {
      if (message.trim() !== '') {
        //
        const messagesRef = ref;
        const newPostKey = messagesRef.push().key;
        messagesRef.push({
          owner,
          pseudo,
          text: message,
          id: newPostKey
        })
      }
    },
    updateMessage({ commit }, { ref, messageId, updateObj }) {
      const child = ref.child(messageId);
      child.update(updateObj);
    },
    deleteMessage({ commit }, { ref, messageId }) {
      const childRef = ref;
      childRef.child(messageId).remove()
    }
  }
}
