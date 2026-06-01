<template>
  <view class="record-page">
    <view class="form-group">
      <text class="label">当前体重(kg)：</text>
      <view class="input-wrapper">
        <input v-model.number="weight" type="number" placeholder="输入体重" />
        <text class="unit">kg</text>
      </view>
    </view>
    
    <view class="suggestion-section">
      <text class="suggestion-title">健康建议：</text>
      <text class="suggestion-content">成人健康体重范围：BMI 18.5-23.9</text>
    </view>
    
    <button @click="saveWeight" class="submit-btn">保存记录</button>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
import healthModel from '@/pages/common/healthModel.js';

export default {
components: { NavBar },
  data() {
    return {
      weight: null
    };
  },
  methods: {
    saveWeight() {
      if (this.weight <= 0 || this.weight > 300) {
        uni.showToast({ title: '请输入有效的体重值', icon: 'none' });
        return;
      }
      
      healthModel.updateWeight(this.weight);
      uni.showToast({ title: '保存成功' });
      uni.navigateBack();
    }
  }
};
</script>

<style scoped>
/* 定义CSS变量 */
:root {
  --primary-color: #007AFF;       /* 主色调 - 蓝色 */
  --secondary-color: #52C41A;      /* 次要色调 - 绿色 */
  --border-radius-lg: 12rpx;       /* 大圆角 */
  --border-radius-base: 8rpx;      /* 基础圆角 */
  --card-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);  /* 卡片阴影 */
}

.record-page {
  padding: 40rpx 30rpx;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 40rpx;
}

.label {
  font-size: 30rpx;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.input-wrapper {
  position: relative;
  background-color: #ffffff;
  border-radius: var(--border-radius-lg); /* 替换为CSS变量 */
  padding: 20rpx 30rpx;
  box-shadow: var(--card-shadow); /* 替换为CSS变量 */
  display: flex;
  align-items: center;
}

.input-wrapper input {
  flex: 1;
  font-size: 40rpx;
  color: var(--primary-color); /* 替换为CSS变量 */
  padding-right: 80rpx;
}

.unit {
  position: absolute;
  right: 30rpx;
  color: #999;
  font-size: 28rpx;
}

.suggestion-section {
  margin-bottom: 50rpx;
  padding: 20rpx;
  /* 线性渐变中的变量替换 */
  background: linear-gradient(135deg, rgba(var(--primary-color), 0.05), rgba(var(--secondary-color), 0.05));
  border-radius: var(--border-radius-base); /* 替换为CSS变量 */
}

.suggestion-title {
  font-weight: bold;
  color: #555;
  margin-right: 10rpx;
}

.suggestion-content {
  color: #777;
  font-size: 26rpx;
}

.submit-btn {
  background-color: var(--primary-color); /* 替换为CSS变量 */
  color: white;
  font-size: 32rpx;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 45rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 122, 255, 0.3);
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2rpx);
  box-shadow: 0 6rpx 16rpx rgba(0, 122, 255, 0.4);
}
</style>