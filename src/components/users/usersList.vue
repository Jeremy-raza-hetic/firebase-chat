<template>
    <div class="users-list">
        <div class="users_list" v-for="user in users" :key="user.id">
            <ul>
                <li>{{ user.pseudo }}</li>
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
                    this.users.push({ ...snapshot.val()})
                })
            }
        }
    }
</script>

<style scoped>

    .users-list {
        position: absolute;
        left: 1em;
        top: 1em;
        width: 10em;
        height: 20em;
        background-color: palegoldenrod;
    }

</style>
