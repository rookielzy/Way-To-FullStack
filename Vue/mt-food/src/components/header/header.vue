<template>
  <header>
    <ul>
      <router-link tag="li" to="/food">Food</router-link>
      <router-link tag="li" to="/comment">Comment</router-link>
      <router-link tag="li" to="/restaurant">Restaurant</router-link>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>
