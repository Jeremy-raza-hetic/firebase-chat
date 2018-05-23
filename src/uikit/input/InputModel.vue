<template>
    <input :type="inputType" v-model="value" :placeholder="inputPlaceholder">
</template>

<script>
  export default {
    name: 'input-model',
    data() {
      return {
        value: ''
      }
    },
    props: {
      inputType: {
        type: String,
        default: 'text'
      },
      inputValue: {
        type: String,
        default: '',
        required: true
      },
      inputPlaceholder: {
        type: String,
        default: ''
      }
    },
    watch: {
      value(v) {
        this.$emit('update:inputValue', v)
      },
      inputValue() {
        if (this.inputValue === '') {
          this.value = ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
