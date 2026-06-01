<template>
  <view class="common-page">
<nav-bar title="啄木鸟健康助手 - 用户权益" />
    <!-- 权益列表 -->
    <view class="rights-list">
      <view 
        class="right-item" 
        v-for="(item, index) in rights" 
        :key="index"
      >
        <image class="right-icon" :src="item.icon" mode="aspectFit" />
        <view class="right-content">
          <text class="right-title">{{ item.title }}</text>
          <text class="right-description">{{ item.description }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
import { rightsData } from '@/pages/common/rightsData'; // 根据实际路径调整

export default {
components: { NavBar },
    methods: {
    goBack() {
      uni.navigateBack();
    }
  },
  data() {
    return {
      rights: rightsData
    };
  }
};
</script>

<style scoped>
.rights-page {
  background-color: #f9f9f9;
}

.header {
  padding: 20rpx 30rpx;
  background-color: white;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.app-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #007AFF;
}

.rights-list {
  padding: 20rpx 30rpx;
}

.right-item {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 16rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
  margin-bottom: 20rpx;
  transition: transform 0.3s ease;
}

.right-item:hover {
  transform: translateY(-5rpx);
}

.right-icon {
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
}

.right-content {
  flex: 1;
}

.right-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.right-description {
  font-size: 24rpx;
  color: #666;
}
.nav-bar {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  background-color: white;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}
</style>