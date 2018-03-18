<template>
  <div class="container">
    <headTop></headTop>  
  </div>
</template>

<script>
import { restaurants } from '@/api/getData'
import headTop from '@/components/header/head'

export default {
  components: {
    headTop
  },

  data () {
    return {}
  },

  methods: {

  },

  created () {
    // 调用应用实例的方法获取全局数据
    wx.login({
      success: (res) => {
        wx.getUserInfo({
          success: (res) => {
            this.userInfo = res.userInfo
          }
        })
      }
    })

    restaurants().then(res => {
      let data = res
      console.log(data)
    })
  }
}
</script>

<style scoped>

</style>
