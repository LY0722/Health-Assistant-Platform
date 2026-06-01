<template>
  <view class="common-page">
    <nav-bar title="糖尿病康复" />
    
    <!-- 康复信息部分 -->
    <view class="info-section">
      <!-- 饮食建议 -->
      <view class="info-card" @click="showDetail('diet')">
        <view class="card-header">
          <text class="card-emoji">🍎</text>
          <text class="info-title">饮食建议</text>
        </view>
        <text class="info-content">
          糖尿病患者应遵循低糖、高纤维的饮食原则。增加蔬菜、水果、全谷物的摄入，减少精制碳水化合物和糖分的摄取。
        </text>
        <text class="read-more">点击查看更多 →</text>
      </view>

      <!-- 运动建议 -->
      <view class="info-card" @click="showDetail('exercise')">
        <view class="card-header">
          <text class="card-emoji">🏃</text>
          <text class="info-title">运动建议</text>
        </view>
        <text class="info-content">
          适度的运动有助于控制血糖水平。建议每周进行至少150分钟的中等强度有氧运动，如快走、慢跑、游泳等。
        </text>
        <text class="read-more">点击查看更多 →</text>
      </view>

      <!-- 药物治疗 -->
      <view class="info-card" @click="showDetail('medicine')">
        <view class="card-header">
          <text class="card-emoji">💊</text>
          <text class="info-title">药物治疗</text>
        </view>
        <text class="info-content">
          按照医生的建议按时服用降糖药物或注射胰岛素。定期监测血糖，根据血糖水平调整药物剂量。
        </text>
        <text class="read-more">点击查看更多 →</text>
      </view>

      <!-- 血糖监测 -->
      <view class="info-card" @click="showDetail('monitor')">
        <view class="card-header">
          <text class="card-emoji">📊</text>
          <text class="info-title">血糖监测</text>
        </view>
        <text class="info-content">
          定期监测血糖是糖尿病康复的重要环节。建议每天测量空腹血糖和餐后血糖，记录血糖值并反馈给医生。
        </text>
        <text class="read-more">点击查看更多 →</text>
      </view>
    </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
export default {
  components: { NavBar },
  methods: {
    showDetail(type) {
      const titles = {
        diet: '饮食建议',
        exercise: '运动建议',
        medicine: '药物治疗',
        monitor: '血糖监测'
      };
      uni.showToast({
        title: `查看${titles[type]}详情`,
        icon: 'none'
      });
    }
  }
};
</script>

<style scoped>
.common-page {
  padding: 30rpx;
  background-color: #f5f7fa;
}

.info-section {
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.info-card {
  background-color: white;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.info-card:active {
  transform: scale(0.98);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.card-emoji {
  font-size: 40rpx;
  margin-right: 20rpx;
}

.info-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #2c3e50;
}

.info-content {
  font-size: 26rpx;
  color: #555;
  line-height: 1.6;
  margin-bottom: 15rpx;
}

.read-more {
  font-size: 24rpx;
  color: #3498db;
  text-align: right;
  display: block;
}

/* 为不同卡片添加左侧边框颜色 */
.info-card:nth-child(1) {
  border-left: 8rpx solid #e74c3c;
}
.info-card:nth-child(2) {
  border-left: 8rpx solid #3498db;
}
.info-card:nth-child(3) {
  border-left: 8rpx solid #2ecc71;
}
.info-card:nth-child(4) {
  border-left: 8rpx solid #f39c12;
}
</style>