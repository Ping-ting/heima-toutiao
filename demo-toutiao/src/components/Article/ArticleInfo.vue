<template>
  <div>
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ title}}</span>
          <!-- 单张图片 -->
          <img v-if="cover.type === 1" :src="cover.images[0]" alt="" class="thumb">
        </div>
        <!-- 三张图片 -->
        <div class="thumb-box" v-if="cover.type === 3">
          <img :src="item" alt="" class="thumb" v-for="(item,i) in cover.images" :key="i">
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <span>{{author}} &nbsp;&nbsp;
            {{commentCnt}} 评论 &nbsp;&nbsp;
            发布日期 {{time}}
          </span>
          <!-- 关闭按钮 -->
          <van-icon name="cross" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleInfo',
  // 自定义类型
  props: {
    // 文章标题
    title: {
      type: String,
      default: ''
    },
    // 作者
    author: {
      type: String,
      default: ''
    },
    // 评论数
    commentCnt: {
      // 可以是多个可能的类型
      type: [Number, String],
      default: 0
    },
    // 发布日期
    time: {
      type: String,
      default: ''
    },
    // 文章封面
    cover: {
      type: Object,
      default() {
        return {
          type: 0,
          images: ''
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  // 矩形黄金比例：0.618
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
