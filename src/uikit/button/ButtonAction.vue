<template>
    <button @click="buttonFunction"> {{ buttonValue }}</button>
</template>

<script>
  export default {
    name: 'button-action',
    props: {
      buttonValue: {
        type: String
      },
      buttonFunction: {
        type: Function,
        default: () => ({})
      }
    }
  }
</script>

<style scoped>

</style>
