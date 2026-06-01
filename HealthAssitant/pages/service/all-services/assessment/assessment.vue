<template>
  <view class="common-page">
    <nav-bar title="健康评测" />
    
    <!-- 评测选择 -->
    <view class="assessment-selector" v-if="!currentAssessment">
      <view 
        class="type-card"
        v-for="(type, index) in assessmentTypes"
        :key="index"
        @click="startAssessment(type.id)"
      >
        <image class="card-image" :src="type.bgImage" mode="aspectFill" />
        <view class="card-content">
          <text class="type-title">{{ type.title }}</text>
          <text class="type-desc">{{ type.desc }}</text>
          <view class="start-btn">开始评测</view>
        </view>
      </view>
    </view>

    <!-- 评测问卷 -->
    <view class="assessment-container" v-if="currentAssessment && !showResult">
      <view class="progress-container">
        <text class="progress-text">第{{ currentQuestion + 1 }}题/共{{ currentAssessment.questions.length }}题</text>
        <progress 
          :percent="(currentQuestion / currentAssessment.questions.length) * 100" 
          activeColor="#537bff" 
          stroke-width="6"
          backgroundColor="#eee"
        />
      </view>
      
      <view class="question-card">
        <text class="question-text">{{ currentAssessment.questions[currentQuestion].text }}</text>
      </view>
      
      <view class="options">
        <view 
          class="option" 
          v-for="(option, index) in currentAssessment.questions[currentQuestion].options" 
          :key="index"
          @click="selectOption(option.value)"
          :style="{ 
            borderColor: selectedOption === option.value ? '#537bff' : '#eee',
            backgroundColor: selectedOption === option.value ? '#f0f5ff' : '#fff'
          }"
        >
          <text>{{ option.text }}</text>
        </view>
      </view>
    </view>

    <!-- 评测结果 -->
    <view class="result-container" v-if="showResult">
      <view class="result-header">
        <text class="result-title">{{ currentAssessment.title }}评测结果</text>
        <view class="score-circle" :style="{ borderColor: getHealthColor() }">
          <text class="score-text">{{ Math.round(totalScore) }}</text>
          <text class="score-label">分</text>
        </view>
        <text class="result-status" :style="{ color: getHealthColor() }">{{ getHealthStatus() }}</text>
      </view>
      
      <view class="result-content">
        <view class="result-section">
          <view class="section-header">
            <image src="/static/icon/health-status.png" class="section-icon" />
            <text class="section-title">健康状况</text>
          </view>
          <text class="section-desc">{{ getHealthDescription() }}</text>
        </view>
        
        <view class="result-section">
          <view class="section-header">
            <image src="/static/icon/assessment-desc.png" class="section-icon" />
            <text class="section-title">评估说明</text>
          </view>
          <text class="section-desc">{{ currentAssessment.resultDesc }}</text>
        </view>
        
        <view class="result-section" v-if="currentAssessment.recommendations">
          <view class="section-header">
            <image src="/static/icon/recommendation.png" class="section-icon" />
            <text class="section-title">改善建议</text>
          </view>
          <view class="recommendation-list">
            <view class="recommendation-item" v-for="(item, index) in currentAssessment.recommendations" :key="index">
              <view class="recommendation-number">{{ index + 1 }}</view>
              <text class="recommendation-text">{{ item }}</text>
            </view>
          </view>
        </view>
      </view>
      
      <button class="restart-btn" @click="resetAssessment">重新评测</button>
      <button class="back-btn" @click="resetAssessment">返回首页</button>
    </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'

export default {
  components: { NavBar },
  data() {
    return {
      assessmentTypes: [
        {
          id: 'sleep',
          title: '睡眠质量评估',
          desc: '评估您的睡眠健康状况',
          bgImage: '/static/images/health/sleep.png'
        },
        {
          id: 'mental',
          title: '心理健康评估',
          desc: '评估您的心理状态',
          bgImage: '/static/images/health/mental.png'
        }
      ],
      assessments: {
        sleep: {
          title: '睡眠质量',
          questions: [
            {
              text: '您通常需要多长时间才能入睡？',
              options: [
                { text: '15分钟以内', value: 3 },
                { text: '15-30分钟', value: 2 },
                { text: '30-60分钟', value: 1 },
                { text: '60分钟以上', value: 0 }
              ]
            },
            {
              text: '您每晚的实际睡眠时间大约是？',
              options: [
                { text: '7小时以上', value: 3 },
                { text: '6-7小时', value: 2 },
                { text: '5-6小时', value: 1 },
                { text: '不足5小时', value: 0 }
              ]
            },
            {
              text: '您夜间醒来的频率如何？',
              options: [
                { text: '从不', value: 3 },
                { text: '1-2次', value: 2 },
                { text: '3-4次', value: 1 },
                { text: '5次以上', value: 0 }
              ]
            }
          ],
          resultDesc: '良好的睡眠是健康的基础，您的睡眠质量直接影响白天的精神状态和工作效率。',
          recommendations: [
            '保持规律的睡眠时间，每天同一时间上床和起床',
            '睡前1小时避免使用电子设备',
            '保持卧室安静、黑暗和凉爽',
            '避免睡前摄入咖啡因和酒精'
          ]
        },
        mental: {
          title: '心理健康',
          questions: [
            {
              text: '您最近感到情绪低落的频率如何？',
              options: [
                { text: '几乎没有', value: 3 },
                { text: '偶尔', value: 2 },
                { text: '经常', value: 1 },
                { text: '几乎总是', value: 0 }
              ]
            },
            {
              text: '您对日常活动失去兴趣的程度？',
              options: [
                { text: '完全没有', value: 3 },
                { text: '有时', value: 2 },
                { text: '明显', value: 1 },
                { text: '完全失去兴趣', value: 0 }
              ]
            },
            {
              text: '您感到焦虑或紧张的频率？',
              options: [
                { text: '几乎没有', value: 3 },
                { text: '偶尔', value: 2 },
                { text: '经常', value: 1 },
                { text: '几乎总是', value: 0 }
              ]
            }
          ],
          resultDesc: '心理健康与身体健康同样重要，定期关注自己的心理状态有助于全面提升生活质量。',
          recommendations: [
            '每天进行30分钟中等强度运动',
            '练习正念冥想或深呼吸',
            '保持规律的社交活动',
            '必要时寻求专业心理咨询'
          ]
        }
      },
      currentAssessment: null,
      currentQuestion: 0,
      answers: [],
      totalScore: 0,
      showResult: false,
      selectedOption: null
    }
  },
  methods: {
    startAssessment(type) {
      this.currentAssessment = this.assessments[type];
      this.currentQuestion = 0;
      this.answers = [];
      this.showResult = false;
      this.selectedOption = null;
    },
    selectOption(value) {
      this.selectedOption = value;
      setTimeout(() => {
        this.answers.push(value);
        this.selectedOption = null;
        
        if (this.currentQuestion < this.currentAssessment.questions.length - 1) {
          this.currentQuestion++;
        } else {
          this.calculateResult();
        }
      }, 300);
    },
    calculateResult() {
      this.totalScore = this.answers.reduce((sum, value) => sum + value, 0) * 
                       (100 / (this.currentAssessment.questions.length * 3));
      this.showResult = true;
    },
    getHealthStatus() {
      if (this.totalScore >= 80) return '优秀';
      if (this.totalScore >= 60) return '良好';
      if (this.totalScore >= 40) return '一般';
      return '需要改善';
    },
    getHealthColor() {
      if (this.totalScore >= 80) return '#07C160';
      if (this.totalScore >= 60) return '#FF9C00';
      return '#FF5151';
    },
    getHealthDescription() {
      if (this.totalScore >= 80) return '您的健康状况非常优秀，继续保持当前的生活习惯！';
      if (this.totalScore >= 60) return '您的健康状况良好，但仍有提升空间。';
      if (this.totalScore >= 40) return '您的健康状况一般，建议关注并改善。';
      return '您的健康状况需要特别关注，建议采取改善措施。';
    },
    resetAssessment() {
      this.currentAssessment = null;
      this.currentQuestion = 0;
      this.answers = [];
      this.totalScore = 0;
      this.showResult = false;
    }
  }
}
</script>

<style scoped>
.common-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* 评测选择样式 - 修改后的卡片样式 */
.assessment-selector {
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.type-card {
  height: 350rpx;
  border-radius: 24rpx;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.type-card:active {
  transform: scale(0.98);
}

.card-image {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.card-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40rpx;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
}

.type-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 15rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
}

.type-desc {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
}

.start-btn {
  background-color: rgba(255, 255, 255, 0.9);
  color: #537bff;
  padding: 16rpx 40rpx;
  border-radius: 50rpx;
  font-size: 28rpx;
  font-weight: bold;
  align-self: flex-start;
  transition: all 0.3s ease;
}

.type-card:active .start-btn {
  background-color: #fff;
}


/* 问卷样式 */
.assessment-container {
  padding: 30rpx;
}

.progress-container {
  margin-bottom: 40rpx;
  background-color: #fff;
  padding: 30rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.progress-text {
  font-size: 28rpx;
  color: #666;
  display: block;
  margin-bottom: 20rpx;
}

progress {
  width: 100%;
}

.question-card {
  background-color: #fff;
  padding: 40rpx 30rpx;
  border-radius: 16rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.question-text {
  font-size: 34rpx;
  font-weight: bold;
  color: #333;
  line-height: 1.5;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.option {
  background-color: #fff;
  padding: 30rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #eee;
  transition: all 0.3s ease;
  font-size: 28rpx;
}

.option:active {
  transform: translateY(5rpx);
}

/* 结果样式 */
.result-container {
  padding: 30rpx;
}

.result-header {
  margin-bottom: 40rpx;
  text-align: center;
  background-color: #fff;
  padding: 40rpx 30rpx;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.result-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 30rpx;
}

.score-circle {
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  border: 8rpx solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20rpx;
}

.score-text {
  font-size: 48rpx;
  font-weight: bold;
}

.score-label {
  font-size: 24rpx;
  color: #666;
}

.result-status {
  font-size: 32rpx;
  font-weight: bold;
  display: block;
  margin-top: 20rpx;
}

.result-content {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  margin-bottom: 30rpx;
}

.result-section {
  margin-bottom: 40rpx;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 15rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.section-desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  display: block;
}

.recommendation-list {
  margin-top: 20rpx;
}

.recommendation-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20rpx;
}

.recommendation-number {
  background-color: #537bff;
  color: #fff;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15rpx;
  flex-shrink: 0;
  font-size: 24rpx;
}

.recommendation-text {
  font-size: 28rpx;
  color: #666;
  flex: 1;
  line-height: 1.5;
}

.restart-btn {
  margin-top: 30rpx;
  background-color: #537bff;
  color: #fff;
  border-radius: 50rpx;
  font-size: 30rpx;
  height: 90rpx;
  line-height: 90rpx;
}

.back-btn {
  margin-top: 20rpx;
  background-color: #fff;
  color: #537bff;
  border: 2rpx solid #537bff;
  border-radius: 50rpx;
  font-size: 30rpx;
  height: 90rpx;
  line-height: 90rpx;
}
</style>