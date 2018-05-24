<template>
    <div class="modal">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'modal'
  }
</script>

<style scoped lang="scss">
    .modal {
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 3px;
    }
</style>
