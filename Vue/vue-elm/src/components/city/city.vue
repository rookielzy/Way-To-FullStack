<template>
  <ul>
    <router-link tag="li" to="home">Home</router-link>
    <router-link tag="li" to="city">City</router-link>
    <router-link tag="li" to="msite">Msite</router-link>
  </ul>
</template>

<script>
export default {
  name: 'City',
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('getData2')
  }
}
</script>

<style lang="scss" scoped>

</style>
