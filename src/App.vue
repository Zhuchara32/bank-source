<template>
  <div id="app">
    <router-view to="home" />
  </div>
</template>

<script>
export default {
  created () {
    if (this.$workbox) {
      this.$workbox.addEventListener('waiting', () => {
        this.showUpdateUI = true
      })
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}
</style>
