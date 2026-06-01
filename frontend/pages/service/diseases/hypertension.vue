<template>
  <view class="common-page">
     <nav-bar title="高血压康复管理" />
     <text class="page-subtitle">科学管理血压，远离心血管疾病</text>
    <!-- 血压监测卡片 -->
    <view class="bp-monitor-card">
      <text class="card-title">血压监测</text>
      <view class="bp-values">
        <text class="bp-value">{{ currentBP.systolic }}<text class="bp-unit">mmHg</text></text>
        <text class="bp-separator">/</text>
        <text class="bp-value">{{ currentBP.diastolic }}<text class="bp-unit">mmHg</text></text>
      </view>
      <text class="bp-status">{{ currentBP.status }}</text>
      <view class="bp-history">
        <text class="history-title">最近测量</text>
        <view class="history-list">
          <view class="history-item" v-for="(record, index) in bpHistory" :key="index">
            <text class="history-date">{{ record.date }}</text>
            <text class="history-value">{{ record.systolic }}/{{ record.diastolic }}</text>
          </view>
        </view>
      </view>
      <button class="record-button" type="primary">记录血压</button>
    </view>
    
    <!-- 康复指南 -->
    <view class="guide-section">
      <text class="section-title">康复指南</text>
      <view class="guide-tabs">
        <view 
          class="guide-tab" 
          :class="{ active: activeGuideTab === tab.id }" 
          v-for="tab in guideTabs" 
          :key="tab.id"
          @click="activeGuideTab = tab.id"
        >
          {{ tab.name }}
        </view>
      </view>
      
      <view class="guide-content">
        <view class="guide-item" v-for="(item, index) in currentGuideItems" :key="index">
          <text class="guide-item-title">{{ item.title }}</text>
          <text class="guide-item-desc">{{ item.description }}</text>
        </view>
      </view>
    </view>
    
    <!-- 饮食建议 -->
    <view class="diet-section">
      <text class="section-title">饮食建议</text>
      <view class="diet-tips">
        <view class="diet-tip" v-for="(tip, index) in dietTips" :key="index">
          <image class="diet-icon" :src="tip.icon" mode="aspectFit" />
          <text class="diet-text">{{ tip.text }}</text>
        </view>
      </view>
    </view>
    
    <!-- 药物提醒 -->
    <view class="medication-section">
      <text class="section-title">药物提醒</text>
      <view class="medication-list">
        <view class="medication-item" v-for="(med, index) in medications" :key="index">
          <image class="med-icon" src="/static/images/health/pill.png" mode="aspectFit" />
          <view class="med-info">
            <text class="med-name">{{ med.name }}</text>
            <text class="med-dosage">{{ med.dosage }}</text>
          </view>
          <view class="med-time">
            <text class="time-text">{{ med.time }}</text>
            <switch class="med-switch" :checked="med.checked" @change="toggleMed(med.id)" />
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
      currentBP: {
        systolic: 130,
        diastolic: 85,
        status: '正常'
      },
      bpHistory: [
        { date: '6月14日', systolic: 132, diastolic: 84 },
        { date: '6月13日', systolic: 135, diastolic: 86 },
        { date: '6月12日', systolic: 138, diastolic: 88 },
        { date: '6月11日', systolic: 140, diastolic: 90 },
        { date: '6月10日', systolic: 136, diastolic: 87 }
      ],
      guideTabs: [
        { id: 1, name: '饮食控制' },
        { id: 2, name: '运动指导' },
        { id: 3, name: '心理调节' },
        { id: 4, name: '戒烟限酒' }
      ],
      activeGuideTab: 1,
      guideData: {
        1: [
          {
            title: '减少钠盐摄入',
            description: '每日食盐摄入量不超过5克，减少酱油、酱菜等高盐食品摄入。'
          },
          {
            title: '增加钾摄入',
            description: '多吃含钾丰富的食物，如香蕉、土豆、菠菜等。'
          },
          {
            title: '低脂饮食',
            description: '减少饱和脂肪和胆固醇的摄入，选择瘦肉、鱼类、豆类等优质蛋白质。'
          }
        ],
        2: [
          {
            title: '有氧运动',
            description: '每周进行至少150分钟的中等强度有氧运动，如快走、慢跑、游泳等。'
          },
          {
            title: '力量训练',
            description: '每周进行2-3次力量训练，如举重、俯卧撑等，每次20-30分钟。'
          },
          {
            title: '运动频率',
            description: '每周运动3-5天，避免连续两天不运动。'
          }
        ],
        3: [
          {
            title: '减轻压力',
            description: '学习放松技巧，如深呼吸、冥想、瑜伽等，减轻工作和生活压力。'
          },
          {
            title: '充足睡眠',
            description: '保证每天7-8小时的高质量睡眠，避免熬夜和过度疲劳。'
          },
          {
            title: '心理调节',
            description: '保持乐观积极的心态，避免情绪波动过大。'
          }
        ],
        4: [
          {
            title: '戒烟',
            description: '吸烟是高血压的重要危险因素，戒烟可显著降低心血管疾病风险。'
          },
          {
            title: '限酒',
            description: '男性每日饮酒不超过25克酒精，女性不超过15克酒精。'
          },
          {
            title: '远离二手烟',
            description: '避免被动吸烟，减少烟雾对心血管系统的损害。'
          }
        ]
      },
      dietTips: [
        {
          icon: '/static/icon/hypertension/fruit.png',
          text: '多吃新鲜水果和蔬菜'
        },
        {
          icon: '/static/icon/hypertension/whole-grain.png',
          text: '选择全谷物食品'
        },
        {
          icon: '/static/icon/hypertension/fish.png',
          text: '每周吃2-3次鱼类'
        },
        {
          icon: '/static/icon/hypertension/nuts.png',
          text: '适量食用坚果和种子'
        },
        {
          icon: '/static/icon/hypertension/oil.png',
          text: '使用橄榄油等健康油脂'
        },
        {
          icon: '/static/icon/hypertension/dairy.png',
          text: '选择低脂乳制品'
        }
      ],
      medications: [
        { id: 1, name: '硝苯地平缓释片', dosage: '10mg，每日2次', time: '08:00, 20:00', checked: true },
        { id: 2, name: '缬沙坦胶囊', dosage: '80mg，每日1次', time: '08:00', checked: true },
        { id: 3, name: '阿司匹林肠溶片', dosage: '100mg，每日1次', time: '20:00', checked: false }
      ]
    };
  },
  computed: {
    currentGuideItems() {
      return this.guideData[this.activeGuideTab];
    }
  },
  methods: {
    toggleMed(id) {
      const med = this.medications.find(item => item.id === id);
      if (med) {
        med.checked = !med.checked;
      }
    }
  }
};
</script>

<style scoped>

.bp-monitor-card {
  background-color: white;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  margin-bottom: 40rpx;
}

.card-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.bp-values {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10rpx;
}

.bp-value {
  font-size: 60rpx;
  font-weight: bold;
  color: #2cc0e8;
}

.bp-separator {
  font-size: 40rpx;
  color: #333;
  margin: 0 20rpx;
}

.bp-unit {
  font-size: 28rpx;
  font-weight: normal;
  margin-left: 10rpx;
}

.bp-status {
  display: block;
  text-align: center;
  font-size: 28rpx;
  color: #24d1a6;
  margin-bottom: 20rpx;
}

.bp-history {
  margin-bottom: 20rpx;
}

.history-title {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 10rpx;
  display: block;
}

.history-list {
  display: flex;
  justify-content: space-between;
}

.history-item {
  text-align: center;
}

.history-date {
  font-size: 22rpx;
  color: #999;
  display: block;
  margin-bottom: 5rpx;
}

.history-value {
  font-size: 24rpx;
  color: #333;
}

.record-button {
  background-color: #2cc0e8;
  color: white;
  border-radius: 10rpx;
  font-size: 28rpx;
  padding: 15rpx 0;
  width: 100%;
}

.guide-section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.guide-tabs {
  display: flex;
  margin-bottom: 20rpx;
}

.guide-tab {
  flex: 1;
  text-align: center;
  padding: 15rpx 0;
  font-size: 26rpx;
  border-bottom: 4rpx solid #eee;
  color: #666;
}

.guide-tab.active {
  color: #2cc0e8;
  border-bottom-color: #2cc0e8;
}

.guide-content {
  background-color: white;
  border-radius: 16rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.guide-item {
  margin-bottom: 20rpx;
}

.guide-item:last-child {
  margin-bottom: 0;
}

.guide-item-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.guide-item-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.4;
  display: block;
}

.diet-section {
  margin-bottom: 40rpx;
}

.diet-tips {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
}

.diet-tip {
  background-color: white;
  border-radius: 16rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
}

.diet-icon {
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
}

.diet-text {
  font-size: 26rpx;
  color: #333;
}

.medication-section {
  margin-bottom: 60rpx;
}

.medication-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.medication-item {
  background-color: white;
  border-radius: 16rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.med-icon {
  width: 60rpx;
  height: 60rpx;
  margin-right: 20rpx;
}

.med-info {
  flex: 1;
}

.med-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
}

.med-dosage {
  font-size: 24rpx;
  color: #666;
  display: block;
}

.med-time {
  display: flex;
  align-items: center;
}

.time-text {
  font-size: 24rpx;
  color: #666;
  margin-right: 20rpx;
}

.med-switch {
  transform: scale(0.8);
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