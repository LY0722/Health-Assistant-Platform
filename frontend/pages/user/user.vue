<template>
  <view class="user-page">
    <!-- 用户信息卡片 -->
        <view class="user-card" v-if="isLoggedIn" :style="{background: 'linear-gradient(135deg, '+ primaryColor +', '+ secondaryColor +')'}">
      <view class="user-info">
        <view class="avatar">{{ userInfo.nickname?.charAt(0) || '👤' }}</view>
        <view class="user-meta">
          <text class="nickname">{{ userInfo.nickname || '未登录' }}</text>
          <text class="phone">{{ userInfo.phone | formatPhone }}</text>
        </view>
      </view>
      <view class="health-score">
        <text class="score-label">健康评分</text>
        <text class="score-value">{{ userInfo.healthData?.score || '--' }}</text>
        <text class="score-unit">分</text>
      </view>
    </view>


    <!-- 未登录状态显示 -->
    <view class="auth-section" v-if="!isLoggedIn">
      <view class="auth-title">请登录以使用健康管理功能</view>
      <view class="auth-btn-group">
        <button class="auth-btn login-btn" @click="navigateTo('/pages/user/login')">登录</button>
        <button class="auth-btn register-btn" @click="navigateTo('/pages/user/register')">注册</button>
      </view>
    </view>

    <!-- 健康数据概览 -->
    <view class="health-overview" v-if="isLoggedIn">
      <view class="section-title">
        <text>🏥 健康概览</text>
      </view>
      <view class="health-grid">
        <view class="health-item" @click="navigateTo('/pages/health/bmi')">
          <view class="health-icon" style="background-color: #FF9AA2;">📏</view>
          <text class="health-label">BMI</text>
          <text class="health-value">{{ userInfo.healthData?.bmi || '未记录' }}</text>
        </view>
        <view class="health-item" @click="navigateTo('/pages/health/blood-pressure')">
          <view class="health-icon" style="background-color: #A18CD1;">💓</view>
          <text class="health-label">血压</text>
          <text class="health-value">{{ userInfo.healthData?.bloodPressure || '未记录' }}</text>
        </view>
        <view class="health-item" @click="navigateTo('/pages/health/blood-sugar')">
          <view class="health-icon" style="background-color: #FBC2EB;">🩸</view>
          <text class="health-label">血糖</text>
          <text class="health-value">{{ userInfo.healthData?.bloodSugar ? userInfo.healthData.bloodSugar + 'mmol/L' : '未记录' }}</text>
        </view>
        <view class="health-item" @click="navigateTo('/pages/health/checkup')">
          <view class="health-icon" style="background-color: #84FAB0;">🩺</view>
          <text class="health-label">上次体检</text>
          <text class="health-value">{{ userInfo.healthData?.lastCheckup || '未记录' }}</text>
        </view>
      </view>
    </view>

    <!-- 功能入口 -->
    <view class="feature-section" v-if="isLoggedIn">
      <view class="section-title">
        <text>⚙️ 健康管理</text>
      </view>
      <view class="feature-list">
        <view class="feature-item" @click="navigateTo('/pages/health/record')">
          <view class="feature-left">
            <text class="feature-emoji">📋</text>
            <text class="feature-text">健康档案</text>
          </view>
          <text class="feature-arrow">→</text>
        </view>
        <view class="feature-item" @click="navigateTo('/pages/health/reminder')">
          <view class="feature-left">
            <text class="feature-emoji">⏰</text>
            <text class="feature-text">健康提醒</text>
          </view>
          <text class="feature-arrow">→</text>
        </view>
        <view class="feature-item" @click="navigateTo('/pages/health/report')">
          <view class="feature-left">
            <text class="feature-emoji">📊</text>
            <text class="feature-text">健康报告</text>
          </view>
          <text class="feature-arrow">→</text>
        </view>
      </view>
    </view>

    <view class="feature-section" v-if="isLoggedIn">
      <view class="section-title">
        <text>👤 账户设置</text>
      </view>
      <view class="feature-list">
        <view class="feature-item" @click="navigateTo('/pages/user/profile')">
          <view class="feature-left">
            <text class="feature-emoji">ℹ️</text>
            <text class="feature-text">个人信息</text>
          </view>
          <text class="feature-arrow">→</text>
        </view>
        <view class="feature-item" @click="navigateTo('/pages/user/family')">
          <view class="feature-left">
            <text class="feature-emoji">👨‍👩‍👧</text>
            <text class="feature-text">家庭成员</text>
          </view>
          <text class="feature-arrow">→</text>
        </view>
        <view class="feature-item" @click="navigateTo('/pages/user/settings/settings')">
          <view class="feature-left">
            <text class="feature-emoji">⚙️</text>
            <text class="feature-text">系统设置</text>
          </view>
          <text class="feature-arrow">→</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import userData from '@/pages/common/userData.js';
export default {
  data() {
    return {
      primaryColor: '#00B4D8',
      secondaryColor: '#0083B0',
      userInfo: {},
      isLoggedIn: false
    };
  },
  filters: {
    formatPhone(phone) {
      if (!phone) return '';
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
  },
  onLoad() {
    console.log('onLoad - 页面加载时检查登录状态');
    this.checkLoginStatus();
  },
  onTabItemTap() {
    console.log('onTabItemTap - 点击底部 tab 时检查登录状态');
    this.checkLoginStatus();
  },
  onShow() {
    console.log('onShow - 页面显示时检查登录状态');
    this.checkLoginStatus();
  },
  methods: {
async checkLoginStatus() {
  const userId = uni.getStorageSync('user_id');
  console.log('checkLoginStatus - userId:', userId);

  // 检查 userId 是否有效（非空、非假值、且能匹配真实用户）
  if (!userId || !(await userData.findUserById(userId))) {
    this.isLoggedIn = false;
    uni.removeStorageSync('user_id'); // 清除无效的 user_id
    setTimeout(() => {
      uni.redirectTo({ url: '/pages/user/login' });
    }, 0);
  } else {
    this.userInfo = await userData.findUserById(userId);
    this.isLoggedIn = true;
  }
},
    navigateTo(page) {
      uni.navigateTo({ url: page });
    }
  }
};
</script>

<style scoped>
.user-page {
  padding: 20rpx;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.user-card {
  padding: 40rpx 30rpx;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10rpx 30rpx rgba(0, 180, 216, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50rpx;
  margin-right: 20rpx;
  border: 4rpx solid rgba(255,255,255,0.5);
}

.user-meta {
  display: flex;
  flex-direction: column;
}

.nickname {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.phone {
  font-size: 24rpx;
  opacity: 0.8;
}

.health-score {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.score-label {
  font-size: 24rpx;
  margin-bottom: 10rpx;
}

.score-value {
  font-size: 48rpx;
  font-weight: bold;
}

.score-unit {
  font-size: 24rpx;
  opacity: 0.8;
}

.auth-section {
  background-color: white;
  padding: 40rpx;
  margin: 30rpx;
  border-radius: 16rpx;
  text-align: center;
}

.auth-title {
  font-size: 32rpx;
  color: #666;
  margin-bottom: 40rpx;
}

.auth-btn-group {
  display: flex;
  justify-content: center;
  gap: 30rpx;
}

.auth-btn {
  width: 200rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  font-size: 30rpx;
}

.login-btn {
  background-color: #00B4D8;
  color: white;
}

.register-btn {
  background-color: white;
  color: #00B4D8;
  border: 1rpx solid #00B4D8;
}

.section-title {
  font-size: 28rpx;
  color: #666;
  margin: 30rpx 0 20rpx 0;
  display: flex;
  align-items: center;
}

.section-title text {
  margin-left: 10rpx;
}

.health-overview {
  background-color: white;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.health-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30rpx;
}

.health-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.health-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15rpx;
  font-size: 40rpx;
}

.health-label {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 5rpx;
}

.health-value {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.feature-section {
  background-color: white;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
}

.feature-list {
  border-radius: 12rpx;
  overflow: hidden;
}

.feature-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f1f1f1;
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-left {
  display: flex;
  align-items: center;
}

.feature-emoji {
  font-size: 36rpx;
  margin-right: 20rpx;
}

.feature-text {
  font-size: 28rpx;
  color: #333;
}

.feature-arrow {
  font-size: 28rpx;
  color: #999;
}
</style>