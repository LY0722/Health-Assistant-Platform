<template>
    <view class="common-page">
    <!-- 页面头部 -->
  <nav-bar title="啄木鸟健康服务中心"  :show-back="false"/>
  <view class="container">
    <!-- 顶部功能入口 -->
    <view class="feature-grid">
      <!-- 第一张卡片（左侧大卡片） -->
  <view 
    class="feature-card large-card purple" 
    @click="navigateTo(featureCards[0].path)"
  >
    <view class="card-content">
      <view class="card-title-wrapper">
        <text class="card-title">{{ featureCards[0].title }}</text>
        <text class="card-subtitle">{{ featureCards[0].desc }}</text>
      </view>
    </view>
    <image class="card-image" src="/static/images/service/another1.webp" mode="aspectFill" />
  </view>
      
      <!-- 第二张卡片（右上小卡片） -->
      <view 
        class="feature-card small-card orange" 
        @click="navigateTo(featureCards[1].path)"
      >
        <text class="card-title">{{ featureCards[1].title }}</text>
        <text class="card-subtitle">{{ featureCards[1].desc }}</text>
      </view>
      
      <!-- 第三张卡片（右下小卡片） -->
      <view 
        class="feature-card small-card blue" 
        @click="navigateTo(featureCards[2].path)"
      >
        <text class="card-title">{{ featureCards[2].title }}</text>
        <text class="card-subtitle">{{ featureCards[2].desc }}</text>
      </view>
    </view>

    <!-- 健康指标导航 -->
    <view class="health-nav">
      <view 
        class="nav-item" 
        v-for="item in healthMetrics" 
        :key="item.id"
        :class="{ active: currentTab === item.id }"
        @click="switchTab(item.id)"
      >
        <image class="nav-icon" :src="item.icon" />
        <text class="nav-text">{{ item.name }}</text>
      </view>
    </view>

    <!-- 动态内容区域 -->
    <view class="content-area">
      <!-- 血压监测 -->
      <view v-if="currentTab === 'bp'" class="metric-panel">
        <view class="current-value">
          <text class="label">当前血压:</text>
          <text class="value">{{ healthData.bloodPressure }}</text>
          <text class="update-time">更新于: {{ healthData.lastUpdate }}</text>
        </view>
        
        <view class="reference-ranges">
          <text class="section-title">正常范围参考</text>
          <view class="bp-range">
            <view class="range-title">收缩压 (mmHg)</view>
            <view class="range-visual">
              <view class="range low">
                <text>偏低</text>
                <text>{{ bloodPressureRanges.systolic.low }}</text>
              </view>
              <view class="range normal">
                <text>正常</text>
                <text>{{ bloodPressureRanges.systolic.normal }}</text>
              </view>
            </view>
          </view>
          
          <view class="bp-range">
            <view class="range-title">舒张压 (mmHg)</view>
            <view class="range-visual">
              <view class="range low">
                <text>偏低</text>
                <text>{{ bloodPressureRanges.diastolic.low }}</text>
              </view>
              <view class="range normal">
                <text>正常</text>
                <text>{{ bloodPressureRanges.diastolic.normal }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 血糖监测 -->
      <view v-else-if="currentTab === 'bs'" class="metric-panel">
        <view class="current-value">
          <text class="label">当前血糖:</text>
          <text class="value">{{ healthData.bloodSugar }} mmol/L</text>
          <text class="update-time">更新于: {{ healthData.lastUpdate }}</text>
        </view>
        
        <view class="reference-ranges">
          <text class="section-title">血糖参考值</text>
          <view class="glucose-ranges">
            <view class="glucose-range fasting">
              <text>空腹血糖</text>
              <text>{{ bloodSugarRanges.fasting.normal }} mmol/L</text>
            </view>
            <view class="glucose-range postprandial">
              <text>餐后2小时</text>
              <text>{{ bloodSugarRanges.postprandial.normal }} mmol/L</text>
            </view>
          </view>
          
          <view class="measurement-tips">
            <text class="tips-title">测量注意事项:</text>
            <text class="tip">• 空腹测量需禁食8小时以上</text>
            <text class="tip">• 餐后测量从第一口饭开始计时</text>
          </view>
        </view>
      </view>

      <!-- 体重/BMI -->
      <view v-else-if="currentTab === 'weight'" class="metric-panel">
        <view class="current-value">
          <text class="label">当前体重:</text>
          <view class="weight-input-group">
            <input 
              type="number" 
              v-model="inputWeight" 
              placeholder="输入体重(kg)" 
              class="weight-input"
            />
            <input
              type="number"
              v-model="inputHeight"
              placeholder="输入身高(cm)"
              class="weight-input"
            />
            <button @click="updateHealthMetrics" class="save-btn">保存</button>
          </view>
          <text class="update-time">上次更新: {{ healthData.lastUpdate }}</text>
        </view>
        
        <view class="bmi-section">
              <text class="section-title">BMI指数: {{ healthData.bmi || calculateBMI() }}</text>
          <text class="height-info">上次检测身高: {{ healthData.height }} cm</text>
          <text class="height-info">上次检测体重: {{ healthData.weight }} Kg</text>
          <text class="weight-status">状态: {{ getWeightStatusText() }}</text>
          
          <view class="bmi-chart">
            <view 
              v-for="range in bmiRanges" 
              :key="range.label"
              :class="[
                'bmi-range',
                range.class,
                {
                  'current-range': healthData.weightStatus === range.status
                }
              ]"
            >
              <text>{{ range.label }}</text>
              <text>{{ range.range }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 步数监测 -->
      <view v-else-if="currentTab === 'steps'" class="metric-panel">
        <view class="current-value">
          <text class="label">今日步数:</text>
          <text class="value">{{ formatNumber(healthData.steps) }}</text>
          <text class="step-goal">目标: {{ formatNumber(stepGoal) }}步</text>
        </view>
        
        <view class="progress-container">
          <view 
            class="progress-bar" 
            :style="{ width: stepProgress + '%' }"
          ></view>
          <text class="progress-text">{{ stepProgress }}%</text>
        </view>
        
        <view class="walking-tips">
          <text class="tips-title">步行建议:</text>
          <text class="tip">• 每日6000 - 10000步为佳</text>
          <text class="tip">• 每小时起身活动5分钟</text>
          <text class="tip">• 快走比慢走效果更好</text>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
import healthModel from '@/pages/common/healthModel.js'
export default {
components: { NavBar },
  data() {
    return {
      currentTab: 'bp',
      inputWeight: null,
      inputHeight: null,
      featureCards: [
      { 
        id: 1, 
        title: '健康测评', 
        desc: '全面健康评估', 
        icon: '/static/icon/servi/assessment.png',
        path: '/pages/service/all-services/assessment/assessment'
      },
      { 
        id: 2, 
        title: '健康百科', 
        desc: '健康知识查询', 
        icon: '/static/icon/servi/encyclopedia.png',
        path: '/pages/service/all-services/article/article' 
      },
      { 
        id: 3, 
        title: '健康资讯', 
        desc: '专业保健知识', 
        icon: '/static/icon/servi/news.png',
        path: '/pages/service/all-services/news/news' 
      }
    ],
      healthMetrics: [
        { id: 'bp', name: '血压', icon: '/static/icon/hea/blood-pressure.png' },
        { id: 'bs', name: '血糖', icon: '/static/icon/hea/blood-sugar.png' },
        { id: 'weight', name: '体重', icon: '/static/icon/hea/weight.png' },
        { id: 'steps', name: '步数', icon: '/static/icon/hea/steps.png' }
      ],
      bmiRanges: [
        { label: '偏瘦', range: '<18.5', status: 'underweight', class: 'underweight' },
        { label: '正常', range: '18.5 - 24', status: 'normal', class: 'normal' },
        { label: '超重', range: '24 - 28', status: 'overweight', class: 'overweight' },
        { label: '肥胖', range: '≥28', status: 'obese', class: 'obese' }
      ],
      healthData: {
        bloodPressure: "120/80",
        bloodSugar: 5.2,
        weight: 65,
        height: 170,
        steps: 8560,
        lastUpdate: "2023-06-15 08:30",
        weightStatus: "normal"
      },
      bloodPressureRanges: {
        systolic: { low: "<90", normal: "90-140" },
        diastolic: { low: "<60", normal: "60-90" }
      },
      bloodSugarRanges: {
        fasting: { normal: "3.9-6.1" },
        postprandial: { normal: "<7.8" }
      },
      stepGoal: 10000
    };
  },
  
  computed: {
    stepProgress() {
      const progress = (this.healthData.steps / this.stepGoal) * 100;
      return Math.min(Math.round(progress), 100);
    }
  },
  
  methods: {
    switchTab(tab) {
      this.currentTab = tab;
    },
    
updateHealthMetrics() {
  if (this.inputWeight && this.inputWeight > 0) {
    // 准备更新数据
    const updateData = {
      weight: this.inputWeight,
      height: this.inputHeight || this.healthData.height // 使用新输入的身高或保持原身高
    };
    
    // 更新healthModel中的数据
    healthModel.updateHealthMetrics(updateData);
    
    // 更新本地数据 - 直接从healthModel获取最新数据
    this.healthData = { ...healthModel.data };
    
    uni.showToast({ title: '数据更新成功', icon: 'success' });
    
    // 清空输入框
    this.inputWeight = null;
    this.inputHeight = null;
  } else {
    uni.showToast({ title: '请输入有效的体重', icon: 'none' });
  }
},
    
    calculateBMI() {
      const { weight, height } = this.healthData;
      if (!weight || !height) return 0;
      return (weight / Math.pow(height / 100, 2)).toFixed(1);
    },
    
    getWeightStatusText() {
      const statusMap = {
        underweight: '偏瘦',
        normal: '正常',
        overweight: '超重',
        obese: '肥胖'
      };
      return statusMap[this.healthData.weightStatus] || '';
    },
    
    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
      navigateTo(path) {
        console.log('尝试跳转到路径:', path);
    uni.navigateTo({
      url: path
    });
  }
  }
};
</script>

<style scoped>
/* 基础样式 */
.container {
  padding: 20rpx;
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* 顶部功能卡片 */
.feature-cards {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
  gap: 15rpx;
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 15rpx;
  margin-bottom: 20rpx;
  height: 350rpx; /* 设置固定高度确保卡片大小一致 */
}
.card-content {
  position: relative;
  z-index: 2;
  width: 60%;
  padding: 30rpx; /* 调整内边距 */
  padding-right: 0; /* 右侧不加内边距，让内容更靠左 */
}
.card-title-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  margin-top: 0; /* 移除上边距 */
  align-items: flex-start; /* 让文本左对齐 */
}

.feature-card {
  border-radius: 16rpx;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
}

/* 大卡片样式（占据左侧两行） */
.large-card {
  position: relative;
  overflow: hidden;
  grid-row: span 2;
  background: linear-gradient(135deg, #D6A3DC, #B28FCE);
  padding: 0; /* 移除内边距，让内容可以更靠边 */
}
.card-image {
  position: absolute;
  right: 0;
  bottom: 0; /* 图片底部对齐卡片底部 */
  height: 100%;
  width: 50%;
  object-fit: cover;
  z-index: 1;
  opacity: 0.8;
  top: auto; /* 覆盖默认的top:0 */
}

/* 小卡片样式 */
.small-card {
  background: #FFB88C; /* 马卡龙橙色 */
}


/* 第三张卡片特殊样式 */
.blue {
  background: linear-gradient(135deg, #89CFF0, #6BB9F0); /* 蓝色渐变 */
}

.card-icon {
  width: 60rpx;
  height: 60rpx;
  margin-bottom: 10rpx;
}

.card-title {
  font-size: 36rpx;
  font-weight: bold;
  color: white;
  text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.2);
  line-height: 1.2; /* 调整行高 */
}

.card-subtitle {
  font-size: 28rpx;
  color: rgba(255,255,255,0.9);
  text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.2);
  line-height: 1.2;
}

.card-desc {
  font-size: 24rpx;
  color: #666;
}

/* 健康指标导航 */
.health-nav {
  display: flex;
  background: white;
  border-radius: 12rpx;
  padding: 15rpx;
  margin-bottom: 20rpx;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rpx;
  border-radius: 8rpx;
}

.nav-item.active {
  background-color: #e6f7ff;
}

.nav-icon {
  width: 50rpx;
  height: 50rpx;
  margin-bottom: 8rpx;
}

.nav-text {
  font-size: 26rpx;
  color: #333;
}

/* 内容区域 */
.content-area {
  background: white;
  border-radius: 12rpx;
  padding: 25rpx;
}

.metric-panel {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.current-value {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.label {
  font-size: 28rpx;
  color: #666;
}

.value {
  font-size: 48rpx;
  font-weight: bold;
  color: #1890ff;
}

.update-time {
  font-size: 24rpx;
  color: #999;
}

/* 血压范围样式 */
.bp-range {
  margin-bottom: 20rpx;
}

.range-title {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.range-visual {
  display: flex;
  height: 80rpx;
  border-radius: 40rpx;
  overflow: hidden;
}

.range {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rpx;
}

.range.low {
  background-color: #e6f7ff;
  color: #1890ff;
}

.range.normal {
  background-color: #f6ffed;
  color: #52c41a;
}

/* 血糖范围样式 */
.glucose-ranges {
  display: flex;
  gap: 15rpx;
  margin: 20rpx 0;
}

.glucose-range {
  flex: 1;
  padding: 20rpx;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.glucose-range.fasting {
  background-color: #e6f7ff;
  color: #1890ff;
}

.glucose-range.postprandial {
  background-color: #f6ffed;
  color: #52c41a;
}

/* 体重输入样式 */
.weight-input-group {
  display: flex;
  gap: 15rpx;
  margin: 15rpx 0;
}

.weight-input {
  flex: 1;
  border: 1rpx solid #eee;
  padding: 15rpx;
  border-radius: 8rpx;
  font-size: 32rpx;
}

.save-btn {
  background-color: #1890ff;
  color: white;
  border-radius: 8rpx;
  padding: 0 30rpx;
  font-size: 28rpx;
}

/* BMI图表样式 */
.bmi-chart {
  display: flex;
  margin-top: 20rpx;
  border-radius: 8rpx;
  overflow: hidden;
  border: 1rpx solid #eee;
}

.bmi-range {
  flex: 1;
  padding: 15rpx;
  text-align: center;
  border-right: 1rpx solid #eee;
  display: flex;
  flex-direction: column;
}

.bmi-range:last-child {
  border-right: none;
}

.bmi-range.underweight {
  background-color: #e6f7ff;
}

.bmi-range.normal {
  background-color: #f6ffed;
}

.bmi-range.overweight {
  background-color: #fff7e6;
}

.bmi-range.obese {
  background-color: #fff2f0;
}

.bmi-range.current-range {
  background-color: #1890ff;
  color: white;
}

/* 步数进度条样式 */
.progress-container {
  position: relative;
  height: 60rpx;
  background-color: #f0f0f0;
  border-radius: 30rpx;
  margin: 25rpx 0;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #52c41a;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-weight: bold;
  text-shadow: 0 0 3px rgba(0,0,0,0.3);
}

/* 提示信息样式 */
.tips-title, .section-title {
  font-weight: bold;
  font-size: 28rpx;
  margin-bottom: 15rpx;
  display: block;
}

.tip {
  display: block;
  font-size: 26rpx;
  color: #666;
  margin-bottom: 8rpx;
}

.step-goal {
  font-size: 28rpx;
  color: #666;
}

.weight-status {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 15rpx;
  display: block;
}
</style>