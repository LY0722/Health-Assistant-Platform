"use strict";
const healthModel = {
  // 健康数据存储
  data: {
    bloodPressure: "120/80",
    bloodSugar: 5.2,
    weight: 65,
    height: 170,
    steps: 8560,
    lastUpdate: "2023-06-15 08:30",
    weightStatus: "normal",
    bmi: 22.5
    // 新增BMI字段
  },
  // 获取健康数据
  getHealthData() {
    return this.data;
  },
  // 更新体重和身高数据
  updateHealthMetrics({ weight, height }) {
    if (weight)
      this.data.weight = weight;
    if (height)
      this.data.height = height;
    this.data.lastUpdate = (/* @__PURE__ */ new Date()).toLocaleString();
    this.calculateBMI();
  },
  // 计算BMI并更新状态
  calculateBMI() {
    const { weight, height } = this.data;
    if (!weight || !height)
      return;
    this.data.bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);
    if (this.data.bmi < 18.5)
      this.data.weightStatus = "underweight";
    else if (this.data.bmi < 24)
      this.data.weightStatus = "normal";
    else if (this.data.bmi < 28)
      this.data.weightStatus = "overweight";
    else
      this.data.weightStatus = "obese";
  },
  // 更新步数数据
  updateSteps(newSteps) {
    this.data.steps = newSteps;
    this.data.lastUpdate = (/* @__PURE__ */ new Date()).toLocaleDateString();
  },
  // 血压参考值
  bloodPressureRanges: {
    systolic: { low: "<90", normal: "90-140" },
    diastolic: { low: "<60", normal: "60-90" }
  },
  // 血糖参考值 (corrected to match component expectations)
  bloodSugarRanges: {
    fasting: { normal: "3.9-6.1" },
    postprandial: { normal: "<7.8" }
  },
  // 步数目标
  stepGoal: 1e4
};
exports.healthModel = healthModel;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/common/healthModel.js.map
