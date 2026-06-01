<template>
  <view class="common-page">
<nav-bar title="文章详情" />
    
    <!-- 文章详情 -->
    <view class="article-container">
      <view class="article-header">
        <view class="article-category">{{ article.category }}</view>
        <text class="article-title">{{ article.title }}</text>
        <view class="article-meta">
          <text class="article-author">{{ article.author }}</text>
          <text class="article-date">发布于 {{ formatDate() }}</text>
        </view>
      </view>
      
      <view class="article-content">
        <text>{{ article.content }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
import articleData from '@/pages/common/articlesData';

export default {
components: { NavBar },
  data() {
    return {
      article: {}
    };
  },
  onLoad(options) {
    const id = parseInt(options.id);
    this.article = articleData.find(item => item.id === id);
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    formatDate() {
      const date = new Date();
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }
  }
};
</script>

<style scoped>

/* 文章容器 */
.article-container {
  background-color: #fff;
  border-radius: 16rpx;
  margin: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

/* 文章头部 */
.article-header {
  margin-bottom: 40rpx;
  border-bottom: 1rpx solid #f0f0f0;
  padding-bottom: 30rpx;
}

.article-category {
  display: inline-block;
  padding: 6rpx 16rpx;
  background-color: #e6f7ff;
  color: #1890ff;
  border-radius: 20rpx;
  font-size: 22rpx;
  margin-bottom: 20rpx;
}

.article-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20rpx;
}

.article-author {
  font-size: 26rpx;
  color: #666;
}

.article-date {
  font-size: 24rpx;
  color: #999;
}

/* 文章内容 */
.article-content {
  font-size: 28rpx;
  line-height: 1.8;
  color: #333;
}

.article-content text {
  display: block;
  margin-bottom: 30rpx;
}
</style>