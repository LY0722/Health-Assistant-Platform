<template>
  <view class="common-page">
    <nav-bar :title="newsDetail.title" :show-back="true" />
    
    <scroll-view class="detail-container" scroll-y>
      <!-- 资讯头部 -->
      <view class="detail-header">
        <text class="detail-title">{{ newsDetail.title }}</text>
        <view class="detail-meta">
          <text class="meta-item">{{ newsDetail.author }} {{ newsDetail.authorTitle }}</text>
          <text class="meta-item">{{ newsDetail.date }}</text>
          <view class="meta-right">
            <uni-icons type="eye" size="14" color="#999"></uni-icons>
            <text class="meta-text">{{ newsDetail.views }}</text>
            <uni-icons type="hand-thumbsup" size="14" color="#999"></uni-icons>
            <text class="meta-text">{{ newsDetail.likes }}</text>
          </view>
        </view>
      </view>
      
      <!-- 资讯内容 -->
      <view class="detail-content">
        <image class="content-image" :src="newsDetail.image" mode="widthFix" />
        <rich-text class="content-text" :nodes="formatContent(newsDetail.content)" />
      </view>
      
      <!-- 相关资讯 -->
      <view class="related-news" v-if="relatedNews.length > 0">
        <text class="section-title">相关推荐</text>
        <view 
          class="related-item" 
          v-for="item in relatedNews" 
          :key="item.id"
          @click="viewDetail(item.id)"
        >
          <text class="related-title">{{ item.title }}</text>
        </view>
      </view>
    </scroll-view>
    
    <!-- 底部操作栏 -->
    <view class="action-bar">
      <view class="action-btn" @click="toggleLike">
        <uni-icons :type="isLiked ? 'hand-thumbsup-filled' : 'hand-thumbsup'" size="20" :color="isLiked ? '#FF4081' : '#666'"></uni-icons>
        <text>{{ isLiked ? '已点赞' : '点赞' }}</text>
      </view>
      <view class="action-btn" @click="shareNews">
        <uni-icons type="redo" size="20" color="#666"></uni-icons>
        <text>分享</text>
      </view>
      <view class="action-btn" @click="collectNews">
        <uni-icons :type="isCollected ? 'star-filled' : 'star'" size="20" :color="isCollected ? '#FFC107' : '#666'"></uni-icons>
        <text>{{ isCollected ? '已收藏' : '收藏' }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
import newsData from '@/pages/common/newsData';
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';

export default {
  components: {
    NavBar,
    uniIcons
  },
  data() {
    return {
      newsId: null,
      newsDetail: {},
      isLiked: false,
      isCollected: false,
      relatedNews: []
    };
  },
  onLoad(options) {
    this.newsId = parseInt(options.id);
    this.loadNewsDetail();
  },
  methods: {
    loadNewsDetail() {
      const news = newsData.find(item => item.id === this.newsId);
      if (news) {
        this.newsDetail = news;
        this.loadRelatedNews(news.category);
      }
    },
    loadRelatedNews(category) {
      this.relatedNews = newsData
        .filter(item => item.category === category && item.id !== this.newsId)
        .slice(0, 3);
    },
    formatContent(content) {
      // 简单处理内容格式，实际项目中可能需要更复杂的处理
      return content.replace(/\n/g, '<br/>');
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
      uni.showToast({
        title: this.isLiked ? '点赞成功' : '已取消点赞',
        icon: 'none'
      });
    },
    collectNews() {
      this.isCollected = !this.isCollected;
      uni.showToast({
        title: this.isCollected ? '收藏成功' : '已取消收藏',
        icon: 'none'
      });
    },
    shareNews() {
      uni.share({
        title: this.newsDetail.title,
        summary: this.newsDetail.summary,
        href: 'https://yourdomain.com/news/' + this.newsId,
        success: () => {
          uni.showToast({ title: '分享成功', icon: 'success' });
        }
      });
    },
    viewDetail(id) {
      uni.navigateTo({
        url: `/pages/service/all-services/news/newsDetail?id=${id}`
      });
    }
  }
};
</script>

<style scoped>
.detail-container {
  height: calc(100vh - 120rpx - 100rpx);
  padding: 20rpx;
  background-color: #f5f7fa;
}

.detail-header {
  background-color: #fff;
  padding: 30rpx;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
}

.detail-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.detail-meta {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #666;
}

.meta-item {
  margin-right: 20rpx;
}

.meta-right {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.meta-text {
  margin: 0 15rpx 0 5rpx;
}

.detail-content {
  background-color: #fff;
  padding: 30rpx;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
}

.content-image {
  width: 100%;
  border-radius: 8rpx;
  margin-bottom: 30rpx;
}

.content-text {
  font-size: 28rpx;
  line-height: 1.8;
  color: #333;
}

.related-news {
  background-color: #fff;
  padding: 30rpx;
  border-radius: 12rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.related-item {
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f1f1f1;
}

.related-item:last-child {
  border-bottom: none;
}

.related-title {
  font-size: 28rpx;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  display: flex;
  background-color: #fff;
  border-top: 1rpx solid #f1f1f1;
}

.action-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #666;
}
</style>