<template>
  <header>
    <div class="row">
      <div id="address">{{address}}</div>
      <div id="weather">sunny</div>
    </div>
    <div class="row"></div>
  </header>
</template>

<script>
import { qqmapsdk } from '@/utils/qqmapsdk.js'

export default {
  name: 'head_top',
  data () {
    return {
      address: ''
    }
  },
  created () {
    wx.getLocation({
      success: (res) => {
        const { latitude, longitude } = res
        qqmapsdk.reverseGeocoder({
          location: {
            latitude,
            longitude
          },
          success: (res) => {
            this.address = res.result.formatted_addresses.recommend
          }
        })
      }
    })
  }
}
</script>

<style scoped>
  header {
    width: 100%;
  }
  header .row {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    font-size: 14px;
    padding: 0 10px;
  }
</style>
