<template>
  <view class="common-page">
<nav-bar title="医生列表" />
    <view class="doctor-cards">
      <view 
        class="doctor-card" 
        v-for="(doctor, index) in doctors" 
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
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
import doctorsData from '@/pages/common/doctorsData';

export default {
components: { NavBar },
  data() {
    return {
      doctors: doctorsData
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

.doctor-cards {
  padding: 20rpx 30rpx;
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

.doctor-title {
  font-size: 24rpx;
  color: #666;
}

.doctor-department {
  font-size: 24rpx;
  color: #666;
}
</style>