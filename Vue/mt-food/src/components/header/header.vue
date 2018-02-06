<template>
  <header class="header-list">
    <ul>
      <router-link tag="li" to="/food">Food</router-link>
      <router-link tag="li" to="/comment">Comment</router-link>
      <router-link tag="li" to="/restaurant">Restaurant</router-link>
    </ul>
  </header>
</template>

<script>
import fetch from '../../config/fetch'

export default {
  name: 'Header',
  created () {
    console.log('Header Created')
    const result = fetch('/v1/cities', {type: 'hot'})
    result.then(res => {
      console.log('result: ', res)
    })
  }
}
</script>

<style>
.header-list {
  width: 100%;
  height: 100px;
}

.header-list ul {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
}

.header-list ul li {
  flex: 1;
}
</style>
