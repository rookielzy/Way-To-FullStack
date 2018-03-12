<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import fetch from './config/fetch'
fetch('GET', 'https://api.github.com/search/repositories', {
  q: 'vue',
  sort: 'stars',
  order: 'desc'
})

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
