<template>
  <view class="common-navbar">
    <image 
      v-if="showBack"
      class="back-icon" 
      src="/static/icon/reback.png" 
      @click="handleBack"
    />
    <text class="title">{{ title }}</text>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
    showBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleBack() {
      const pages = getCurrentPages()
      if (pages.length > 1) {
        uni.navigateBack()
      } else {
        // 如果是第一个页面，则跳转到首页
        uni.switchTab({
          url: '/pages/service/service'
        })
      }
    }
  }
}
</script>

<style scoped>
.common-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 120rpx;
  padding-top: var(--status-bar-height);
  background-color: #537bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.common-navbar .title {
  font-size: 36rpx;
  font-weight: 500;
  text-align: center;
}

.common-navbar .back-icon {
  position: absolute;
  left: 30rpx;
  width: 44rpx;
  height: 44rpx;
  z-index: 10;
  filter: brightness(0) invert(1);
}
</style>