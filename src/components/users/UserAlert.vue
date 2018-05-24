<template>
    <div class="user-alert">

    </div>
</template>

<script>
    export default {
        name: 'user-alert',
        data() {
            return {
                users: [],
                usersRef: this.$db.ref('users')
            }
        },
        methods: {
            test() {

            }
        }
    }
</script>

<style scoped lang="scss">


</style>
