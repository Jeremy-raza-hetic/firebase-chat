<template>
    <div class="profile">
        <div @click.self="closeModal" class="profile__overlay">
            <modal class="profile__modal">
                <div class="profile__photo">
                    <img v-if="!profile.pictureUrl" class="photo" src="../assets/logo.png">
                    <img v-else :src="profile.pictureUrl" class="photo">
                </div>
                <div class="profile__upload">
                    <input
                            class="input-upload"
                            type="file"
                            accept="image/x-png,image/gif,image/jpeg"
                            @change="uploadFile"
                            :ref="'uploadPicture'">
                    <button-action :button-value="'Upload picture'"
                                   :button-function="triggerUploadButton"></button-action>
                </div>
                <div class="profile__main">
                    <i @click="closeModal" class="profile__close fas fa-times"></i>
                    <h3>Profile</h3>
                    <p>Pseudo: {{ profile.pseudo }}</p>
                    <p>Email : {{ profile.email }}</p>
                </div>

            </modal>
        </div>

    </div>
</template>

<script>
  import { mapState } from 'vuex';
  import Modal from '../uikit/modal/Modal';
  import InputModel from '../uikit/input/InputModel';
  import ButtonAction from '../uikit/button/ButtonAction';

  export default {
    components: {
      ButtonAction,
      InputModel,
      Modal
    },
    data() {
      return {
        uploadedImg: '',
        file: {},
        picturesRef: this.$storage.ref('pictures')
      }
    },
    name: 'profile',
    computed: {
      ...mapState({
        profile: state => state.auth.profile
      })
    },
    methods: {
      closeModal() {
        this.$router.push({
          path: '/home'
        })
      },
      uploadFile(e) {
        this.file = e.target.files[0];
        const childRef = this.picturesRef.child(this.file.name);
        const dataSending = childRef.put(this.file);
        childRef.put(this.file).then(snapshot => {
          console.log(snapshot)
        });
        dataSending.on('state_changed', snapshot => {
          // in progress
        }, error => {
          console.log(error)
        }, () => {
          dataSending.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.setPictureProfile(downloadURL)
          });
        })
      },
      triggerUploadButton() {
        this.$refs.uploadPicture.click()
      },
      setPictureProfile(url) {
        this.$store.commit('setProfile', { ...this.profile, pictureUrl: url });
        this.$db.ref(`users/${this.profile.uid}`).set({ ...this.profile, pictureUrl: url });
      }
    }
  }
</script>

<style scoped lang="scss">
    .profile {
        position: fixed;
        top: 0;
        left: 0;
        &__overlay {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.3);
        }
        &__modal {
            position: relative;
            padding: 15px;
            width: 500px;
            height: 500px;
        }
        &__photo {
            margin-bottom: 10px;
        }
        &__close {
            position: absolute;
            top: 10px;
            left: 10px;
            color: black;
            &:hover {
                cursor: pointer;
            }
        }
    }

    .photo {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 1px solid lightgray;
    }

    .input-upload {
        visibility: hidden;
    }
</style>
