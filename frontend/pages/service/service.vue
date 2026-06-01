<template>
  <view class="common-page">
<nav-bar title="啄木鸟健康助手" :show-back="false" />
    <view class="page-content">
    <!-- 轮播图 -->
    <view class="banner-container">
      <swiper class="banner" :autoplay="true" :interval="3000" :duration="500">
        <swiper-item v-for="(item, index) in banners" :key="index">
          <image class="banner-image" :src="item" mode="aspectFill" />
        </swiper-item>
      </swiper>
    </view>
    
    <!-- 功能入口 -->
    <view class="feature-grid">
      <view 
        class="feature-item" 
        v-for="(item, index) in features" 
        :key="index"
        @click="navigateTo(item.path)"
      >
        <image class="feature-icon" :src="item.icon" mode="aspectFit" />
        <text class="feature-text">{{ item.title }}</text>
      </view>
    </view>
    
  <!-- 健康生活模块 -->
  <view class="module-section">
    <view class="module-header">
      <text class="module-title">健康生活</text>
      <text class="module-more" @click="navigateTo('/pages/health/health')">更多 ></text>
    </view>
    
   <view class="health-cards">
      <!-- 第一行：两列布局 -->
      <view class="health-card-row">
        <!-- 儿科健康卡片（带图片） -->
        <view 
          class="health-card with-image" 
          :style="{ backgroundColor: healthCards[0].color }"
          @click="navigateTo(healthCards[0].path)"
        >
          <view class="card-text-content">
            <text class="card-title">{{ healthCards[0].title }}</text>
            <text class="card-subtitle">{{ healthCards[0].subtitle }}</text>
          </view>
          <image class="card-image" src="/static/images/service/another3.webp" mode="aspectFill" />
        </view>
        
        <!-- 高血压康复卡片 -->
        <view 
          class="health-card with-image" 
          :style="{ backgroundColor: healthCards[1].color }"
          @click="navigateTo(healthCards[1].path)"
        >
          <view class="card-text-content">
            <text class="card-title">{{ healthCards[1].title }}</text>
            <text class="card-subtitle">{{ healthCards[1].subtitle }}</text>
          </view>
          <image class="card-image" src="/static/images/service/another2.webp" mode="aspectFill" />
        </view>
      </view>

      <!-- 第二行：三列布局 -->
      <view class="health-card-row">
        <view 
          class="health-card small" 
          v-for="(card, index) in healthCards.slice(2)" 
          :key="index + 2"
          :style="{ backgroundColor: card.color }"
          @click="navigateTo(card.path)"
        >
          <text class="card-title">{{ card.title }}</text>
          <text class="card-subtitle">{{ card.subtitle }}</text>
        </view>
      </view>
    </view>
  </view>

    <!-- 医生信息模块 -->
    <view class="module-section">
      <view class="module-header">
        <text class="module-title">医生信息</text>
        <text class="module-more" @click="navigateTo('/pages/service/doctors/doctors')">更多 ></text>
      </view>
      
      <view class="doctor-cards">
        <view 
          class="doctor-card" 
          v-for="(doctor, index) in randomDoctors" 
          :key="index"
          @click="navigateTo(`/pages/service/doctors/doctordetail?id=${doctor.id}`)"
        >
          <image class="doctor-avatar" :src="doctor.avatar" mode="aspectFill" />
          <view class="doctor-content">
            <text class="doctor-name">{{ doctor.name }}</text>
            <text class="doctor-title">{{ doctor.title }}</text>
            <text class="doctor-department">{{ doctor.department }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
import articleData from '@/pages/common/articlesData';
import doctorsData from '@/pages/common/doctorsData';

export default {
components: { NavBar },
    data() {
    const getRandomDoctors = () => {
      const shuffled = [...doctorsData].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    };
    return {
      // 轮播图数据
      banners: [
        '/static/images/banner/banner1.png',
        '/static/images/banner/banner2.png',
        '/static/images/banner/banner3.png',
        '/static/images/banner/banner4.png',
        '/static/images/banner/banner5.png',
        '/static/images/banner/banner6.png',
      ],
      
      // 功能入口数据
      features: [
        {
          title: '医学百科',
          icon: '/static/icon/servi/encyclopedia.png',
          path: '/pages/service/all-services/article/article'
        },
        {
          title: '健康评测',
          icon: '/static/icon/servi/assessment.png',
          path: '/pages/service/all-services/assessment/assessment'
        },
        {
          title: '我的权益',
          icon: '/static/icon/servi/rights.png',
          path: '/pages/service/all-services/rights/rights'
        },
        {
          title: '全部服务',
          icon: '/static/icon/servi/services.png',
          path: '/pages/service/all-services/all-services'
        }
      ],
      
      // 健康生活卡片数据
      healthCards: [
        {
          title: '儿科健康',
          subtitle: '专业儿童健康管理',
          color: '#5181ff',
          path: '/pages/service/diseases/pediatrics'
        },
        {
          title: '高血压康复',
          subtitle: '专业康复指导方案',
          color: '#2cc0e8',
          path: '/pages/service/diseases/hypertension'
        },
        {
          title: '糖尿病康复',
          subtitle: '血糖管理专家',
          color: '#24d1a6',
          path: '/pages/service/diseases/diabetes'
        },
        {
          title: '皮肤病康复',
          subtitle: '皮肤健康守护',
          color: '#f3c343',
          path: '/pages/service/diseases/dermatology'
        },
        {
          title: '心理健康',
          subtitle: '心灵关怀服务',
          color: '#e265a0',
          path: '/pages/service/diseases/mental'
        }
      ],
      
      // 医生数据
      randomDoctors: getRandomDoctors()
    };
  },
  methods: {
    navigateTo(page) {
      uni.navigateTo({ url: page });
    }
  }
};
</script>

<style scoped>
:root {
  --primary-color: #007AFF;
  --card-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  --border-radius-base: 16rpx;
  --border-radius-sm: 8rpx;
}

/* 通用样式 */
.page-content {
  background-color: #f9f9f9;
}

.app-name {
  font-size: 36rpx;
  font-weight: bold;
  color: var(--primary-color);
}

/* 轮播图样式 */
.banner-container {
  padding: 20rpx 30rpx;
  background-color: white;
}

.banner {
  height: 300rpx;
  border-radius: var(--border-radius-base);
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
}

/* 功能入口样式 */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 20rpx 30rpx;
  background-color: white;
  box-shadow: var(--card-shadow);
  margin-top: 20rpx;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx 0;
}

.feature-icon {
  width: 60rpx;
  height: 60rpx;
  margin-bottom: 10rpx;
}

.feature-text {
  font-size: 26rpx;
  color: #333;
}

/* 模块标题样式 */
.module-section {
  margin-top: 30rpx;
  padding: 0 30rpx;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.module-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.module-more {
  font-size: 26rpx;
  color: var(--primary-color);
}

/* 健康卡片样式 */
.health-cards {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-bottom: 40rpx;
}

.health-card-row {
  display: flex;
  gap: 20rpx;
}

/* 第一行卡片样式 */
.health-card-row:first-child .health-card {
  flex: 1;
  height: 200rpx;
  border-radius: var(--border-radius-base);
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.health-card.with-image {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
}

.card-text-content {
  flex: 1;
  z-index: 2;
  position: relative;
  padding-right: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-image {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 40%; /* 固定宽度 */
  object-fit: cover;
  z-index: 1;
  opacity: 0.8;
}

/* 第二行卡片样式 */
.health-card-row:last-child .health-card {
  flex: 1;
  height: 150rpx;
  border-radius: var(--border-radius-base);
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 卡片文字样式 */
.card-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  color: white;
}

.card-subtitle {
  font-size: 24rpx;
  color: white;
}

/* 文字对齐方式 */
.health-card.with-image .card-title,
.health-card.with-image .card-subtitle {
  text-align: left;
}

.health-card:not(.with-image) .card-title,
.health-card:not(.with-image) .card-subtitle,
.health-card.small .card-title,
.health-card.small .card-subtitle {
  text-align: center;
}

/* 悬停效果 */
.health-card:hover {
  transform: translateY(-5rpx);
}

/* 医生卡片样式 */
.doctor-cards {
  margin-bottom: 100rpx;
}

.doctor-card {
  background-color: white;
  border-radius: 16rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.08);
  display: flex;
  margin-bottom: 20rpx;
  transition: transform 0.3s ease;
}

.doctor-card:hover {
  transform: translateX(10rpx);
}

.doctor-avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.doctor-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.doctor-name {
  font-size: 28rpx;
  font-weight: bold;
}

.doctor-title,
.doctor-department {
  font-size: 24rpx;
  color: #666;
}
</style>