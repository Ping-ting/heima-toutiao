<template>
  <div id="app">
    <!-- 路由占位符 -->
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
    <!-- 底部路由链接 -->
    <van-tabbar route>
      <van-tabbar-item replace icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item replace icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less" scoped>

</style>
