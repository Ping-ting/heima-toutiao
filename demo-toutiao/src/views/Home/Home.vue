<template>
  <div class="home-container">
    <van-nav-bar
      title="头条"
      :fixed="true"
    />
    <!-- 导入注册 ArticleInfo 组件 -->
    <van-pull-refresh
    v-model="isLoading"
    @refresh="onRefresh"
    :disabled="finished">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleInfo
        v-for="item in artList"
        :key="item.id"
        :title="item.title"
        :author="item.aut_name"
        :comment-cnt="item.comm_count"
        :time="item.pubdate"
        :cover="item.cover"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 按需导入 API 接口
import { getArticleListAPI } from '@/api/articleAPI.js'
// 导入组件
import ArticleInfo from '@/components/Article/ArticleInfo.vue'
import _ from 'lodash'
let fn = null

export default {
  name: 'Home',
  components: {
    ArticleInfo
  },
  data() {
    return {
      page: 1,
      limit: 10,
      artList: [],
      // loading 是否正在加载下一页数据
      // 如果 loading true则不会反复触发load事件
      // 下一页数据请求结束后  要改为 false
      loading: true,
      // finished 所有数据是否加载完毕
      // 如果没有更多数据就要改成 true
      finished: false,
      // 是否正在下拉刷新
      isLoading: false
    }
  },
  methods: {
    // 封装获取文章列表数据的方法
    async initArticleList(isRefresh) {
      // 发起 GET 请求 获取文章列表数据
      const { data: res } = await getArticleListAPI(this.page, this.limit)
      if (isRefresh) {
        // 下拉刷新
        // [...新数据, ...旧数据]
        this.artList = [...res, ...this.artList]
        this.isLoading = false
      } else {
        // 上拉加载更多
        // [...旧数据, ...新数据]
        this.artList = [...this.artList, ...res]
        this.loading = false
      }
      // 如果返回的 res 为空数组 没有数据了,数据加载完了
      if (res.length === 0) {
        this.finished = true
      }
    },
    // 上拉加载更多 在尾部追加数据
    onLoad() {
      console.log('触发了 load 事件')
      // 1. page + 1
      this.page++
      // 2. 重新请求接口获取数据
      this.initArticleList()
    },
    // 下拉刷新 在头部追加数据
    onRefresh() {
      console.log('触发了 onRefresh')
      // 1. page + 1
      this.page++
      // 2. 重新请求接口获取数据
      this.initArticleList(true)
    },
    // fn 函数用来记录滚动条的位置
    recordTopHandler() {
      return _.debounce(
        () => {
          // 将当前的 scrollY 给 top
          this.$route.meta.top = window.scrollY
        },
        50,
        { trailing: true }
      )
    }
  },
  created() {
    this.initArticleList()
  },
  // 当组件第一次被创建的时候 先触发 created 再触发 activated
  // 之后被激活的时候 触发 activated
  activated() {
    fn = this.recordTopHandler()
    // 添加滚动的事件监听
    window.addEventListener('scroll', fn)
  },
  // 当组件被缓存的时候 触发 deactivated
  deactivated() {
    // 移除事件监听
    window.removeEventListener('scroll', fn)
  }
}
</script>

<style lang="less" scoped>
.home-container{
  padding:46px 0 50px 0;
}
// .van-nav-bar{
//   background-color: #84a6ca;
// }
// /deep/ .van-nav-bar__title{
//   color: #fff;
// }
</style>
