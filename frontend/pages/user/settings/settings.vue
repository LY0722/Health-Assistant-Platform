<template>
  <view class="common-page">
    <!-- 页面头部 -->
  <nav-bar title="设置页面" />
    
    <!-- 原有设置项保持不变 -->
    <view class="setting-item">
      <text>声音开关</text>
      <switch :checked="soundEnabled" @change="toggleSound"></switch>
    </view>
    <view class="setting-item">
      <text>通知开关</text>
      <switch :checked="notificationEnabled" @change="toggleNotification"></switch>
    </view>
    <view class="setting-item">
      <text>清除缓存</text>
      <button @click="clearCache">清除</button>
    </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
export default {
components: { NavBar },
  data() {
    return {
      soundEnabled: true,
      notificationEnabled: true
    };
  },
  methods: {
    // 新增返回方法
    goBack() {
      uni.navigateBack();
    },
    toggleSound(e) {
      this.soundEnabled = e.detail.value;
      console.log('声音开关状态:', this.soundEnabled);
    },
    toggleNotification(e) {
      this.notificationEnabled = e.detail.value;
      console.log('通知开关状态:', this.notificationEnabled);
    },
    clearCache() {
      console.log('清除缓存操作已触发');
    }
  }
};
</script>

<style scoped>
/* 原有样式保持不变 */
.settings-page {
  padding: 30rpx;
}
.title {
  font-size: 36rpx;
  font-weight: bold;
}
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}
button {
  padding: 10rpx 20rpx;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 10rpx;
}
</style>