<template>
  <view class="common-page">
    <nav-bar title="健康资讯" />
    
    <!-- 分类筛选 -->
    <view class="category-filter">
      <scroll-view scroll-x class="filter-scroll">
        <view 
          v-for="category in categories" 
          :key="category.id"
          class="filter-item"
          :class="{ active: currentCategory === category.id }"
          @click="changeCategory(category.id)"
        >
          {{ category.name }}
        </view>
      </scroll-view>
    </view>
    
    <!-- 资讯列表 -->
    <view class="news-list">
      <view 
        class="news-item" 
        v-for="item in filteredNews" 
        :key="item.id"
        @click="viewDetail(item.id)"
      >
        <image class="news-image" :src="item.image" mode="aspectFill" />
        <view class="news-content">
          <text class="news-title">{{ item.title }}</text>
          <text class="news-summary">{{ item.summary }}</text>
          <view class="news-meta">
            <text class="meta-item">{{ item.category }}</text>
            <text class="meta-item">{{ item.date }}</text>
            <view class="meta-right">
              <uni-icons type="eye" size="14" color="#999"></uni-icons>
              <text class="meta-text">{{ item.views }}</text>
              <uni-icons type="hand-thumbsup" size="14" color="#999"></uni-icons>
              <text class="meta-text">{{ item.likes }}</text>
            </view>
          </view>
        </view>
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
      newsList: newsData,
      currentCategory: 'all',
      categories: [
        { id: 'all', name: '全部' },
        { id: '慢性病', name: '慢性病' },
        { id: '糖尿病', name: '糖尿病' },
        { id: '骨骼健康', name: '骨骼健康' },
        { id: '心理健康', name: '心理健康' }
      ]
    };
  },
  computed: {
    filteredNews() {
      if (this.currentCategory === 'all') {
        return this.newsList;
      }
      return this.newsList.filter(item => item.category === this.currentCategory);
    }
  },
  methods: {
    changeCategory(categoryId) {
      this.currentCategory = categoryId;
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
.category-filter {
  padding: 20rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f1f1f1;
}

.filter-scroll {
  white-space: nowrap;
  width: 100%;
}

.filter-item {
  display: inline-block;
  padding: 10rpx 25rpx;
  margin-right: 20rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
  color: #666;
  background-color: #f5f7fa;
}

.filter-item.active {
  background-color: #537bff;
  color: #fff;
}

.news-list {
  padding: 20rpx;
}

.news-item {
  display: flex;
  margin-bottom: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.news-image {
  width: 220rpx;
  height: 160rpx;
}

.news-content {
  flex: 1;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
}

.news-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.news-summary {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 15rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.news-meta {
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #999;
  margin-top: auto;
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
</style>