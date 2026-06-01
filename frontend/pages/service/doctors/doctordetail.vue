<template>
  <view class="doctor-detail-page">
    <!-- 顶部导航栏 -->
    <nav-bar title="医生详情" :show-back="true" />
    
    <!-- 医生基本信息卡片 -->
    <view class="doctor-card">
      <view class="doctor-header">
        <image class="doctor-avatar" :src="doctor.avatar || '/static/images/doctors/default-avatar.png'" mode="aspectFill" />
        <view class="doctor-meta">
          <text class="doctor-name">{{ doctor.name }}</text>
          <text class="doctor-title">{{ doctor.title }}</text>
          <text class="doctor-department">{{ doctor.department }}</text>
          <view class="doctor-tags">
            <text class="tag">专家门诊</text>
            <text class="tag">15年经验</text>
            <text class="tag">好评率98%</text>
          </view>
        </view>
      </view>
      
      <view class="doctor-stats">
        <view class="stat-item">
          <text class="stat-value">1,258</text>
          <text class="stat-label">服务患者</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">96%</text>
          <text class="stat-label">满意度</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">15</text>
          <text class="stat-label">从业年限</text>
        </view>
      </view>
    </view>
    
    <!-- 医生介绍 -->
    <view class="section">
      <view class="section-header">
        <uni-icons type="info" size="20" color="#537BFF"></uni-icons>
        <text class="section-title">医生简介</text>
      </view>
      <view class="section-content">
        <text class="doctor-introduction">{{ doctor.introduction }}</text>
      </view>
    </view>
    
    <!-- 专业擅长 -->
    <view class="section">
      <view class="section-header">
        <uni-icons type="star" size="20" color="#537BFF"></uni-icons>
        <text class="section-title">专业擅长</text>
      </view>
      <view class="section-content">
        <view class="expertise-item" v-for="(item, index) in expertise" :key="index">
          <uni-icons type="checkmarkempty" size="16" color="#537BFF"></uni-icons>
          <text>{{ item }}</text>
        </view>
      </view>
    </view>
    
    <!-- 出诊信息 -->
    <view class="section">
      <view class="section-header">
        <uni-icons type="calendar" size="20" color="#537BFF"></uni-icons>
        <text class="section-title">出诊信息</text>
      </view>
      <view class="schedule">
        <view class="schedule-day" v-for="day in schedule" :key="day.day">
          <text class="day-name">{{ day.day }}</text>
          <text class="day-time">{{ day.time }}</text>
          <text class="day-status" :class="{available: day.available}">
            {{ day.available ? '可预约' : '已满' }}
          </text>
        </view>
      </view>
    </view>
    
    <!-- 患者评价 -->
    <view class="section">
      <view class="section-header">
        <uni-icons type="chat" size="20" color="#537BFF"></uni-icons>
        <text class="section-title">患者评价(128)</text>
        <text class="section-more" @click="viewAllReviews">查看全部 ></text>
      </view>
      <view class="reviews">
        <view class="review-item" v-for="review in reviews" :key="review.id">
          <image class="review-avatar" :src="review.avatar" mode="aspectFill" />
          <view class="review-content">
            <view class="review-header">
              <text class="review-name">{{ review.name }}</text>
              <view class="review-rating">
                <uni-icons v-for="i in 5" :key="i" 
                  type="star-filled" 
                  size="16" 
                  :color="i <= review.rating ? '#FFC107' : '#E0E0E0'">
                </uni-icons>
              </view>
            </view>
            <text class="review-text">{{ review.comment }}</text>
            <text class="review-time">{{ review.time }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="action-bar">
      <view class="action-btn follow-btn" @click="toggleFollow">
        <uni-icons :type="isFollowing ? 'heart-filled' : 'heart'" size="20" :color="isFollowing ? '#FF4081' : '#666'"></uni-icons>
        <text>{{ isFollowing ? '已关注' : '关注' }}</text>
      </view>
      <view class="action-btn consult-btn" @click="startConsult">
        <text>立即咨询</text>
      </view>
      <view class="action-btn appoint-btn" @click="makeAppointment">
        <text>预约挂号</text>
      </view>
    </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
import doctorsData from '@/pages/common/doctorsData';
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';

export default {
  components: { 
    NavBar,
    uniIcons
  },
  data() {
    return {
      doctor: null,
      isFollowing: false,
      expertise: [
        '高血压、冠心病等心血管疾病诊治',
        '心脏介入手术治疗',
        '心血管疾病预防与康复',
        '疑难心血管病例会诊'
      ],
      schedule: [
        { day: '周一', time: '上午 8:00-12:00', available: true },
        { day: '周二', time: '下午 13:30-17:30', available: false },
        { day: '周三', time: '上午 8:00-12:00', available: true },
        { day: '周四', time: '全天 8:00-17:30', available: true },
        { day: '周五', time: '下午 13:30-17:30', available: true },
        { day: '周六', time: '上午 8:00-12:00', available: false },
        { day: '周日', time: '休息', available: false }
      ],
      reviews: [
        {
          id: 1,
          name: '张先生',
          avatar: '/static/images/doctors/user4.png',
          rating: 5,
          comment: '赵医生医术精湛，耐心解答我的问题，治疗效果很好！',
          time: '2023-05-15'
        },
        {
          id: 2,
          name: '李女士',
          avatar: '/static/images/doctors/user3.png',
          rating: 4,
          comment: '医生很专业，就是等待时间有点长，总体体验不错。',
          time: '2023-04-28'
        }
      ]
    };
  },
  onLoad(options) {
    const doctorId = parseInt(options.id);
    this.doctor = doctorsData.find(doctor => doctor.id === doctorId) || {};
  },
  methods: {
    toggleFollow() {
      this.isFollowing = !this.isFollowing;
      uni.showToast({
        title: this.isFollowing ? '已关注该医生' : '已取消关注',
        icon: 'none'
      });
    },
    startConsult() {
      uni.showToast({
        title: '开始咨询医生',
        icon: 'none'
      });
      // 实际项目中这里应该跳转到咨询页面
    },
    makeAppointment() {
      uni.navigateTo({
        url: `/pages/appointment/create?doctorId=${this.doctor.id}`
      });
    },
    viewAllReviews() {
      uni.navigateTo({
        url: `/pages/doctor/reviews?doctorId=${this.doctor.id}`
      });
    }
  }
};
</script>

<style scoped>
.doctor-detail-page {
  padding-top: calc(120rpx + var(--status-bar-height)); /* 增加这一行 */
  padding-bottom: 120rpx;
  background-color: #f5f7fa;
  min-height: 100vh;
  box-sizing: border-box;
}
.common-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 120rpx;
  padding-top: var(--status-bar-height);
  background-color: #537BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 医生卡片样式 */
.doctor-card {
  background-color: white;
  padding: 40rpx 30rpx;
  margin-bottom: 20rpx;
  border-radius: 20rpx; /* 修改圆角 */
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  margin-top: 0; /* 确保没有额外的上边距 */
}

.doctor-header {
  display: flex;
  margin-bottom: 30rpx;
}

.doctor-avatar {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  border: 4rpx solid #f1f1f1;
  margin-right: 30rpx;
}

.doctor-meta {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.doctor-name {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.doctor-title,
.doctor-department {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 8rpx;
}

.doctor-tags {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15rpx;
}

.tag {
  font-size: 22rpx;
  color: #537BFF;
  background-color: #e6f0ff;
  padding: 6rpx 15rpx;
  border-radius: 30rpx;
  margin-right: 10rpx;
  margin-bottom: 10rpx;
}

/* 医生统计数据 */
.doctor-stats {
  display: flex;
  justify-content: space-around;
  padding: 20rpx 0;
  border-top: 1rpx solid #f1f1f1;
  border-bottom: 1rpx solid #f1f1f1;
  margin: 20rpx 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 32rpx;
  font-weight: bold;
  color: #537BFF;
}

.stat-label {
  font-size: 24rpx;
  color: #999;
  margin-top: 5rpx;
}

/* 区块样式 */
.section {
  background-color: white;
  margin-bottom: 20rpx;
  padding: 30rpx;
  border-radius: 12rpx;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 25rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-left: 10rpx;
}

.section-more {
  font-size: 24rpx;
  color: #537BFF;
  margin-left: auto;
}

.section-content {
  padding-left: 30rpx;
}

.doctor-introduction {
  font-size: 28rpx;
  line-height: 1.6;
  color: #333;
}

/* 专业擅长 */
.expertise-item {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  font-size: 28rpx;
}

.expertise-item text {
  margin-left: 10rpx;
}

/* 出诊信息 */
.schedule {
  display: flex;
  flex-wrap: wrap;
}

.schedule-day {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25rpx;
}

.day-name {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 5rpx;
}

.day-time {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 5rpx;
}

.day-status {
  font-size: 22rpx;
  padding: 4rpx 12rpx;
  border-radius: 30rpx;
  background-color: #f1f1f1;
  color: #999;
}

.day-status.available {
  background-color: #e6f7e6;
  color: #52c41a;
}

/* 评价样式 */
.reviews {
  margin-top: 20rpx;
}

.review-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f1f1f1;
}

.review-item:last-child {
  border-bottom: none;
}

.review-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.review-content {
  flex: 1;
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.review-name {
  font-size: 28rpx;
  font-weight: bold;
  margin-right: 20rpx;
}

.review-rating {
  display: flex;
}

.review-text {
  font-size: 26rpx;
  line-height: 1.5;
  margin-bottom: 10rpx;
}

.review-time {
  font-size: 22rpx;
  color: #999;
}

/* 底部操作栏 */
.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  display: flex;
  background-color: white;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
}

.follow-btn {
  width: 180rpx;
  color: #666;
  border-right: 1rpx solid #f1f1f1;
}

.consult-btn {
  flex: 1;
  background-color: #FF9500;
  color: white;
}

.appoint-btn {
  flex: 1;
  background-color: #537BFF;
  color: white;
}
</style>