<template>
  <div>
    <app-navigation />
    <nuxt/>
  </div>
</template>

<script>
import AppNavigation from './../components/AppNavigation.vue'

export default {
  components: {
    AppNavigation
  }
}
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
  background: #e6eefb;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

#app {
  font-family: 'Barlow', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

h1,
h2,
h3 {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
}

p,
li {
  font-family: 'Barlow', sans-serif;
}

/* Reset `button` and button-style `input` default styles */
input[type='submit'],
input[type='reset'],
input[type='button'],
button {
  background: none;
  border: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  overflow: visible;
  padding: 0;
  -webkit-appearance: button; /* for input */
  -webkit-user-select: none; /* for button */
  -moz-user-select: none;
  -ms-user-select: none;
}

input::-moz-focus-inner,
button::-moz-focus-inner {
  border: 0;
  padding: 0;
}

button {
  padding: 10px 30px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 1000px;
  cursor: pointer;
  background: #ff2211;
  color: white;
  font-family: 'Barlow', sans-serif;
  text-transform: uppercase;
  margin: 10px;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>