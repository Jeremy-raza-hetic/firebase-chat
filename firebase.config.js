import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCLblCoSsxB5zIxHsAo8qNdkSi8tZNCWZU',
  authDomain: 'vue-chat-286cf.firebaseapp.com',
  databaseURL: 'https://vue-chat-286cf.firebaseio.com',
  projectId: 'vue-chat-286cf',
  storageBucket: 'vue-chat-286cf.appspot.com',
  messagingSenderId: '314914363168'
};

export const $firebase = firebase.initializeApp(config);
export const $db = firebase.database();
export const $storage = firebase.storage();
