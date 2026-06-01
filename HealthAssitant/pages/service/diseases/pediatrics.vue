<template>
  <view class="common-page">
        <nav-bar title="儿科健康服务" />
     <text class="page-subtitle">守护儿童健康，陪伴快乐成长</text>
    <!-- 儿童成长里程碑 -->
    <view class="milestones-section">
      <text class="section-title">成长里程碑</text>
      <view class="milestones-slider">
        <view class="milestone-item" v-for="(milestone, index) in milestones" :key="index">
          <view class="milestone-age">{{ milestone.age }}</view>
          <view class="milestone-content">
            <text class="milestone-title">{{ milestone.title }}</text>
            <text class="milestone-desc">{{ milestone.description }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 疫苗接种提醒 -->
    <view class="vaccine-section">
      <text class="section-title">疫苗接种提醒</text>
      <view class="vaccine-card">
        <view class="vaccine-header">
          <text class="vaccine-name">下一次接种</text>
          <text class="vaccine-date">{{ nextVaccine.date }}</text>
        </view>
        <view class="vaccine-body">
          <image class="vaccine-image" src="/static/images/service/pediatrics/vaccine.png" mode="aspectFit" />
          <view class="vaccine-info">
            <text class="vaccine-title">{{ nextVaccine.name }}</text>
            <text class="vaccine-desc">{{ nextVaccine.description }}</text>
          </view>
        </view>
        <button class="vaccine-button" type="primary">查看接种记录</button>
      </view>
    </view>
    
    <!-- 常见疾病预防 -->
    <view class="diseases-section">
      <text class="section-title">常见疾病预防</text>
      <view class="disease-cards">
        <view class="disease-card" v-for="(disease, index) in commonDiseases" :key="index">
          <image class="disease-image" :src="disease.image" mode="aspectFill" />
          <text class="disease-name">{{ disease.name }}</text>
          <text class="disease-desc">{{ disease.description }}</text>
        </view>
      </view>
    </view>
    
    <!-- 专家咨询 -->
    <view class="experts-section">
      <text class="section-title">专家咨询</text>
      <view class="experts-list">
        <view class="expert-item" v-for="(expert, index) in experts" :key="index">
          <image class="expert-avatar" :src="expert.avatar" mode="aspectFill" />
          <view class="expert-info">
            <text class="expert-name">{{ expert.name }}</text>
            <text class="expert-title">{{ expert.title }}</text>
            <text class="expert-department">{{ expert.department }}</text>
          </view>
          <button class="consult-button" type="primary">立即咨询</button>
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
      milestones: [
        {
          age: '0-3个月',
          title: '快速发育期',
          description: '婴儿在这个阶段会快速成长，开始学会抬头、微笑和发出声音。'
        },
        {
          age: '4-6个月',
          title: '感知世界',
          description: '婴儿开始伸手抓物、翻身，对周围环境表现出浓厚兴趣。'
        },
        {
          age: '7-12个月',
          title: '探索与学习',
          description: '婴儿开始爬行、站立，可能会说出第一个词语，认知能力快速发展。'
        },
        {
          age: '1-2岁',
          title: '语言与社交',
          description: '幼儿开始走路、说话，能够表达自己的需求，开始与他人互动。'
        },
        {
          age: '3-6岁',
          title: '创造力爆发',
          description: '儿童开始发展想象力和创造力，喜欢玩耍、绘画和讲故事。'
        }
      ],
      nextVaccine: {
        name: '百白破疫苗',
        date: '2025年7月15日',
        description: '第三针，预防百日咳、白喉和破伤风'
      },
      commonDiseases: [
        {
          name: '感冒',
          image: '/static/images/service/pediatrics/cold.png',
          description: '保持室内通风，避免接触感染源，及时增减衣物。'
        },
        {
          name: '发烧',
          image: '/static/images/service/pediatrics/fever.png',
          description: '注意观察体温变化，物理降温，必要时使用退烧药。'
        },
        {
          name: '腹泻',
          image: '/static/images/service/pediatrics/diarrhea.png',
          description: '多喝水，保持水分平衡，饮食清淡易消化。'
        },
        {
          name: '湿疹',
          image: '/static/images/service/pediatrics/eczema.png',
          description: '保持皮肤清洁干燥，避免刺激物，使用温和护肤品。'
        }
      ],
      experts: [
        {
          name: '李医生',
          title: '主任医师',
          department: '儿科',
          avatar: '/static/images/doctors/doctor2.png'
        },
        {
          name: '王医生',
          title: '副主任医师',
          department: '儿童保健科',
          avatar: '/static/images/doctors/user3.png'
        },
        {
          name: '张医生',
          title: '主治医师',
          department: '小儿神经内科',
          avatar: '/static/images/doctors/user4.png'
        }
      ]
    };
  }
};
</script>

<style scoped>

.milestones-section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.milestones-slider {
  display: flex;
  overflow-x: auto;
  gap: 20rpx;
  padding-bottom: 20rpx;
}

.milestone-item {
  background-color: white;
  border-radius: 16rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  min-width: 280rpx;
  flex-shrink: 0;
}

.milestone-age {
  font-size: 28rpx;
  font-weight: bold;
  color: #5181ff;
  margin-bottom: 10rpx;
}

.milestone-title {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.milestone-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.4;
}

.vaccine-section {
  margin-bottom: 40rpx;
}

.vaccine-card {
  background-color: white;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.vaccine-header {
  background-color: #5181ff;
  color: white;
  padding: 20rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vaccine-name {
  font-size: 30rpx;
  font-weight: bold;
}

.vaccine-date {
  font-size: 26rpx;
}

.vaccine-body {
  padding: 30rpx;
  display: flex;
  align-items: center;
}

.vaccine-image {
  width: 120rpx;
  height: 120rpx;
  margin-right: 30rpx;
}

.vaccine-info {
  flex: 1;
}

.vaccine-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.vaccine-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.4;
}

.vaccine-button {
  background-color: #5181ff;
  color: white;
  border-radius: 10rpx;
  font-size: 28rpx;
  padding: 15rpx 0;
  width: 100%;
  border: none;
}

.diseases-section {
  margin-bottom: 40rpx;
}

.disease-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.disease-card {
  background-color: white;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.disease-image {
  width: 100%;
  height: 200rpx;
}

.disease-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  padding: 15rpx 20rpx 0;
  display: block;
}

.disease-desc {
  font-size: 24rpx;
  color: #666;
  padding: 10rpx 20rpx 20rpx;
  line-height: 1.4;
  display: block;
}

.experts-section {
  margin-bottom: 60rpx;
}

.experts-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.expert-item {
  background-color: white;
  border-radius: 16rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.expert-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.expert-info {
  flex: 1;
}

.expert-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
}

.expert-title {
  font-size: 26rpx;
  color: #666;
  display: block;
}

.expert-department {
  font-size: 26rpx;
  color: #666;
  display: block;
}

.consult-button {
  background-color: #5181ff;
  color: white;
  border-radius: 10rpx;
  font-size: 26rpx;
  padding: 10rpx 20rpx;
  white-space: nowrap;
}
.nav-bar {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.back-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}
</style>