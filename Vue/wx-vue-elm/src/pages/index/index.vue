<template>
  <div class="container">

  </div>
</template>

<script>
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
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
  }
}
</script>

<style scoped>

</style>
