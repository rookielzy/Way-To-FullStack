<template>
  <header>
    <div class="row">
      <div id="address" @click="changeAddress">{{address}}</div>
      <div id="weather">
        <span>{{temperature}}</span>
        <span>{{weather}}</span>
      </div>
    </div>
    <div class="row"></div>
  </header>
</template>

<script>
import { qqmapsdk } from '@/utils/qqmapsdk.js'
import { weather } from '@/api/weather'

export default {
  name: 'head_top',
  data () {
    return {
      address: '',
      temperature: '',
      weather: ''
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

        weather(`${longitude},${latitude}`).then((res) => {
          const weatherData = res.results[0].weather_data[0]
          this.temperature = weatherData.temperature
          this.weather = weatherData.weather
        })
      }
    })
  },
  methods: {
    changeAddress () {
      console.log('change address')
      wx.navigateTo({
        url: '/pages/address/address'
      })
    }
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
