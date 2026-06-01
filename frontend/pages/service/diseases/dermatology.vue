<template>
  <view class="common-page">
    <!-- 页面头部 -->
  <nav-bar title="皮肤病康复中心" />
  <text class="page-subtitle">专业呵护，重拾健康肌肤</text>
    <!-- 常见皮肤病 -->
    <view class="common-diseases">
      <text class="section-title">常见皮肤病</text>
      <view class="disease-grid">
        <view class="disease-card" v-for="(disease, index) in commonDiseases" :key="index">
          <image class="disease-image" :src="disease.image" mode="aspectFill" />
          <text class="disease-name">{{ disease.name }}</text>
        </view>
      </view>
    </view>
    
    <!-- 预防措施 -->
    <view class="prevention-section">
      <text class="section-title">预防措施</text>
      <view class="prevention-list">
        <view class="prevention-item" v-for="(item, index) in preventionTips" :key="index">
          <text class="item-number">{{ index + 1 }}</text>
          <text class="item-content">{{ item.content }}</text>
        </view>
      </view>
    </view>
    
    <!-- 治疗方案 -->
    <view class="treatment-section">
      <text class="section-title">治疗方案</text>
      <view class="treatment-tabs">
        <view 
          class="treatment-tab" 
          :class="{ active: activeTab === tab.id }" 
          v-for="tab in treatmentTabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </view>
      </view>
      
      <view class="treatment-content">
        <text class="treatment-desc">{{ currentTreatmentDesc }}</text>
        <view class="treatment-steps">
          <view class="step-item" v-for="(step, index) in currentTreatmentSteps" :key="index">
            <text class="step-number">{{ index + 1 }}</text>
            <text class="step-content">{{ step }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 专家建议 -->
    <view class="expert-section">
      <text class="section-title">专家建议</text>
      <view class="expert-card">
        <image class="expert-avatar" src="/static/image/dermatology/expert.jpg" mode="aspectFill" />
        <view class="expert-info">
          <text class="expert-name">张医生</text>
          <text class="expert-title">皮肤科主任医师</text>
          <text class="expert-advice">
            "保持皮肤清洁和湿润是预防皮肤病的关键。同时，避免过度使用刺激性化妆品和护肤品，保持健康的生活方式也对皮肤健康非常重要。"
          </text>
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
      commonDiseases: [
        { name: '湿疹', image: '/static/image/dermatology/eczema.jpg' },
        { name: '痤疮', image: '/static/image/dermatology/acne.jpg' },
        { name: '皮炎', image: '/static/image/dermatology/dermatitis.jpg' },
        { name: '荨麻疹', image: '/static/image/dermatology/hives.jpg' },
        { name: '银屑病', image: '/static/image/dermatology/psoriasis.jpg' },
        { name: '白癜风', image: '/static/image/dermatology/vitiligo.jpg' }
      ],
      preventionTips: [
        { content: '保持皮肤清洁，使用温和的清洁产品' },
        { content: '避免长时间暴露在阳光下，使用防晒霜' },
        { content: '保持健康饮食，多吃蔬菜水果，减少辛辣刺激性食物' },
        { content: '保持充足睡眠，避免熬夜和过度疲劳' },
        { content: '选择适合自己肤质的护肤品，避免使用刺激性产品' },
        { content: '保持心情舒畅，减少压力和焦虑' }
      ],
      treatmentTabs: [
        { id: 1, name: '药物治疗' },
        { id: 2, name: '物理治疗' },
        { id: 3, name: '中医治疗' },
        { id: 4, name: '生活调理' }
      ],
      activeTab: 1,
      treatmentData: {
        1: {
          desc: '药物治疗是皮肤病治疗的主要方法，根据不同的病情和病因，医生会开具不同类型的药物。',
          steps: [
            '外用药物：如激素类药膏、抗生素药膏、抗真菌药膏等',
            '口服药物：如抗组胺药、抗生素、免疫抑制剂等',
            '注射药物：如皮质类固醇、生物制剂等',
            '注意事项：遵医嘱用药，不要自行增减药量或停药'
          ]
        },
        2: {
          desc: '物理治疗是利用各种物理因子作用于人体，以达到治疗疾病的目的。',
          steps: [
            '光疗：如紫外线疗法、激光疗法等',
            '冷冻治疗：利用低温破坏病变组织',
            '电疗：如电离子透入疗法、射频治疗等',
            '注意事项：治疗前需清洁皮肤，治疗后注意护理'
          ]
        },
        3: {
          desc: '中医治疗皮肤病有着悠久的历史和丰富的经验，采用辨证论治的方法。',
          steps: [
            '中药内服：根据辨证结果开具中药方剂',
            '中药外用：如中药熏洗、中药敷贴等',
            '针灸推拿：通过刺激穴位调节身体机能',
            '注意事项：饮食禁忌，避免食用发物'
          ]
        },
        4: {
          desc: '生活调理对于皮肤病的康复非常重要，良好的生活习惯可以促进皮肤的恢复。',
          steps: [
            '饮食调理：避免食用辛辣、油腻、刺激性食物',
            '作息规律：保持充足的睡眠，避免熬夜',
            '皮肤护理：保持皮肤清洁和湿润，避免搔抓',
            '心理调节：保持心情舒畅，避免焦虑和压力'
          ]
        }
      }
    };
  },
  computed: {
    currentTreatmentDesc() {
      return this.treatmentData[this.activeTab].desc;
    },
    currentTreatmentSteps() {
      return this.treatmentData[this.activeTab].steps;
    }
  }
};
</script>

<style scoped>


.common-diseases {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.disease-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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
  height: 180rpx;
}

.disease-name {
  display: block;
  text-align: center;
  padding: 10rpx 0;
  font-size: 26rpx;
  color: #333;
}

.prevention-section {
  margin-bottom: 40rpx;
}

.prevention-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.prevention-item {
  display: flex;
  align-items: flex-start;
  background-color: white;
  border-radius: 16rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.item-number {
  width: 40rpx;
  height: 40rpx;
  background-color: #f3c343;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 40rpx;
  font-size: 24rpx;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.item-content {
  font-size: 26rpx;
  color: #333;
  line-height: 1.4;
}

.treatment-section {
  margin-bottom: 40rpx;
}

.treatment-tabs {
  display: flex;
  margin-bottom: 20rpx;
}

.treatment-tab {
  flex: 1;
  text-align: center;
  padding: 15rpx 0;
  font-size: 26rpx;
  border-bottom: 4rpx solid #eee;
  color: #666;
}

.treatment-tab.active {
  color: #f3c343;
  border-bottom-color: #f3c343;
}

.treatment-content {
  background-color: white;
  border-radius: 16rpx;
  padding: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.treatment-desc {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 20rpx;
  display: block;
}

.treatment-steps {
  display: flex;
  flex-direction: column;
  gap: 15rpx;
}

.step-item {
  display: flex;
  align-items: flex-start;
}

.step-number {
  width: 36rpx;
  height: 36rpx;
  background-color: #f3c343;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 36rpx;
  font-size: 22rpx;
  margin-right: 15rpx;
  flex-shrink: 0;
}

.step-content {
  font-size: 26rpx;
  color: #333;
  line-height: 1.4;
}

.expert-section {
  margin-bottom: 60rpx;
}

.expert-card {
  display: flex;
  background-color: white;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.expert-avatar {
  width: 200rpx;
  height: 200rpx;
}

.expert-info {
  flex: 1;
  padding: 20rpx;
}

.expert-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}

.expert-title {
  font-size: 26rpx;
  color: #666;
  display: block;
  margin-bottom: 15rpx;
}

.expert-advice {
  font-size: 26rpx;
  color: #333;
  line-height: 1.4;
  display: block;
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