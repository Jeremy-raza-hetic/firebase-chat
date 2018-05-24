<template>
    <div class="users-list">
        <div class="users-list__loop" v-for="user in users" :key="user.id">
            <ul class="users-list__items">
                <div class="users-list__item">
                    <li>{{ user.pseudo }}</li>
                    <div :class="{'users-list__pellet--logged': user.isLogged}" class="users-list__pellet"></div>
                </div>

            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'users-list',
        created() {
            this.setUsers()
        },
        data() {
            return {
                users: [],
                usersRef: this.$db.ref('users')
            }
        },
        methods: {
            setUsers() {
                this.usersRef.on('child_added', snapshot => {
                    this.users.push({...snapshot.val()})
                });
                this.usersRef.on('child_changed', snapshot => {
                    const index = this.users.findIndex(user => user.uid === snapshot.key);
                    this.users[index].isLogged = snapshot.val().isLogged
                });
                this.usersRef.on('child_removed', snapshot => {
                    const index = this.users.findIndex(user => user.id === snapshot.key);
                    this.users.splice(index, 1);
                })
            }
        }
    }
</script>

<style scoped lang="scss">

    .users-list {
        width: 10em;
        height: 20em;
        background-color: palegoldenrod;
        &__item {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        &__pellet {
            height: 5px;
            width: 5px;
            border-radius: 50%;
            background-color: red;
            &--logged {
                background-color: green;
            }
        }
    }

</style>
