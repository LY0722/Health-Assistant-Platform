<template>
  <view class="common-page">
<nav-bar title="文章列表" />
    
    <!-- 文章列表 -->
    <view class="article-list">
      <view 
        class="article-item" 
        v-for="article in articles" 
        :key="article.id"
        @click="navigateToDetail(article.id)"
      >
        <view class="article-category">{{ article.category }}</view>
        <text class="article-title">{{ article.title }}</text>
        <view class="article-footer">
          <text class="article-author">{{ article.author }}</text>
          <text class="article-more">阅读更多 →</text>
        </view>
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
      articles: articleData
    };
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    navigateToDetail(id) {
      uni.navigateTo({ url: `/pages/service/all-services/article/articledetail?id=${id}` });
    }
  }
};
</script>

<style scoped>

/* 文章列表样式 */
.article-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20rpx;
}

.article-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.article-item:hover {
  transform: translateY(-5rpx);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);
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
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20rpx;
}

.article-author {
  font-size: 24rpx;
  color: #666;
}

.article-more {
  font-size: 24rpx;
  color: #1890ff;
  font-weight: 500;
}
</style>