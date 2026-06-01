<template>
  <view class="common-page">
    <nav-bar title="心理健康服务" />
    <text class="page-subtitle">关注心灵健康，拥抱美好生活</text>
    
    <!-- 心理健康评估 -->
    <view class="assessment-card">
      <text class="card-title">心理健康评估</text>
      <text class="card-desc">快速了解自己的心理状态，获取专业建议</text>
      <button class="card-button" type="primary">开始评估</button>
    </view>
    
    <!-- 服务模块 -->
    <view class="service-grid">
      <view class="service-item" @click="handleServiceClick('online')">
        <view class="service-icon">💬</view>
        <text class="service-title">在线咨询</text>
      </view>
      <view class="service-item" @click="handleServiceClick('phone')">
        <view class="service-icon">📞</view>
        <text class="service-title">电话咨询</text>
      </view>
      <view class="service-item" @click="handleServiceClick('chat')">
        <view class="service-icon">👥</view>
        <text class="service-title">心理聊天室</text>
      </view>
      <view class="service-item" @click="handleServiceClick('test')">
        <view class="service-icon">📝</view>
        <text class="service-title">心理测试</text>
      </view>
    </view>
    
    <!-- 放松技巧 -->
    <view class="relax-section">
      <text class="section-title">放松技巧</text>
      <view class="relax-cards">
        <view class="relax-card" @click="handleRelaxClick(1)">
          <view class="relax-icon">🧘</view>
          <text class="relax-title">冥想练习</text>
        </view>
        <view class="relax-card" @click="handleRelaxClick(2)">
          <view class="relax-icon">🌬️</view>
          <text class="relax-title">深呼吸训练</text>
        </view>
        <view class="relax-card" @click="handleRelaxClick(3)">
          <view class="relax-icon">🧘‍♀️</view>
          <text class="relax-title">瑜伽放松</text>
        </view>
      </view>
    </view>
    
    <!-- 心理健康知识 -->
    <view class="knowledge-section">
      <text class="section-title">心理健康知识</text>
      <view class="knowledge-list">
        <view class="knowledge-item" v-for="(item, index) in knowledgeList" :key="index">
          <view class="knowledge-icon" :style="{backgroundColor: getColor(index)}">
            {{ getIcon(index) }}
          </view>
          <view class="knowledge-content">
            <text class="knowledge-title">{{ item.title }}</text>
            <text class="knowledge-desc">{{ item.description }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
export default {
  components: { NavBar },
  data() {
    return {
      knowledgeList: [
        {
          title: '如何应对压力和焦虑',
          description: '了解压力和焦虑的来源，学习有效的应对策略和放松技巧...',
        },
        {
          title: '改善睡眠质量的方法',
          description: '睡眠不足会影响心理健康，掌握科学的睡眠方法和习惯...',
        },
        {
          title: '建立积极心态的5个技巧',
          description: '培养乐观的思维方式，增强心理韧性和抗压能力...',
        }
      ]
    };
  },
  methods: {
    handleServiceClick(type) {
      console.log(`用户点击了${type}服务`);
      uni.showToast({
        title: `即将进入${type === 'online' ? '在线咨询' : type === 'phone' ? '电话咨询' : type === 'chat' ? '心理聊天室' : '心理测试'}`,
        icon: 'none'
      });
    },
    handleRelaxClick(id) {
      console.log(`用户点击了放松技巧${id}`);
      uni.showToast({
        title: `即将查看放松技巧详情`,
        icon: 'none'
      });
    },
    getColor(index) {
      const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
      return colors[index % colors.length];
    },
    getIcon(index) {
      const icons = ['📌', '📖', '💡', '🔍', '🧠', '❤️'];
      return icons[index % icons.length];
    }
  }
};
</script>

<style scoped>
.common-page {
  padding: 30rpx;
  background-color: #f8f9fa;
}

.page-subtitle {
  display: block;
  font-size: 28rpx;
  color: #666;
  margin-bottom: 40rpx;
  text-align: center;
}

.assessment-card {
  background-color: #e265a0;
  border-radius: 20rpx;
  padding: 30rpx;
  color: white;
  margin-bottom: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.card-desc {
  font-size: 26rpx;
  margin-bottom: 20rpx;
}

.card-button {
  background-color: white;
  color: #e265a0;
  border-radius: 10rpx;
  font-size: 28rpx;
  padding: 10rpx 20rpx;
  width: 100%;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin-bottom: 40rpx;
}

.service-item {
  background-color: white;
  border-radius: 20rpx;
  padding: 30rpx;
  text-align: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.service-item:active {
  transform: scale(0.98);
}

.service-icon {
  font-size: 50rpx;
  margin-bottom: 15rpx;
  display: block;
}

.service-title {
  font-size: 28rpx;
  color: #333;
}

.relax-section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.relax-cards {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
}

.relax-card {
  flex: 1;
  background-color: white;
  border-radius: 16rpx;
  padding: 20rpx;
  text-align: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.relax-icon {
  font-size: 50rpx;
  margin-bottom: 10rpx;
}

.relax-title {
  font-size: 24rpx;
  color: #333;
}

.knowledge-section {
  margin-bottom: 60rpx;
}

.knowledge-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.knowledge-item {
  background-color: white;
  border-radius: 16rpx;
  padding: 20rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.knowledge-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40rpx;
  margin-right: 20rpx;
  flex-shrink: 0;
  color: white;
}

.knowledge-content {
  flex: 1;
}

.knowledge-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.knowledge-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.4;
}
</style>