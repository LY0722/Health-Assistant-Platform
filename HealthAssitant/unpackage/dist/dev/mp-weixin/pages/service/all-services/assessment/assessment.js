"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
const NavBar = () => "../../../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  data() {
    return {
      assessmentTypes: [
        {
          id: "sleep",
          title: "睡眠质量评估",
          desc: "评估您的睡眠健康状况",
          bgImage: "/static/images/health/sleep.png"
        },
        {
          id: "mental",
          title: "心理健康评估",
          desc: "评估您的心理状态",
          bgImage: "/static/images/health/mental.png"
        }
      ],
      assessments: {
        sleep: {
          title: "睡眠质量",
          questions: [
            {
              text: "您通常需要多长时间才能入睡？",
              options: [
                { text: "15分钟以内", value: 3 },
                { text: "15-30分钟", value: 2 },
                { text: "30-60分钟", value: 1 },
                { text: "60分钟以上", value: 0 }
              ]
            },
            {
              text: "您每晚的实际睡眠时间大约是？",
              options: [
                { text: "7小时以上", value: 3 },
                { text: "6-7小时", value: 2 },
                { text: "5-6小时", value: 1 },
                { text: "不足5小时", value: 0 }
              ]
            },
            {
              text: "您夜间醒来的频率如何？",
              options: [
                { text: "从不", value: 3 },
                { text: "1-2次", value: 2 },
                { text: "3-4次", value: 1 },
                { text: "5次以上", value: 0 }
              ]
            }
          ],
          resultDesc: "良好的睡眠是健康的基础，您的睡眠质量直接影响白天的精神状态和工作效率。",
          recommendations: [
            "保持规律的睡眠时间，每天同一时间上床和起床",
            "睡前1小时避免使用电子设备",
            "保持卧室安静、黑暗和凉爽",
            "避免睡前摄入咖啡因和酒精"
          ]
        },
        mental: {
          title: "心理健康",
          questions: [
            {
              text: "您最近感到情绪低落的频率如何？",
              options: [
                { text: "几乎没有", value: 3 },
                { text: "偶尔", value: 2 },
                { text: "经常", value: 1 },
                { text: "几乎总是", value: 0 }
              ]
            },
            {
              text: "您对日常活动失去兴趣的程度？",
              options: [
                { text: "完全没有", value: 3 },
                { text: "有时", value: 2 },
                { text: "明显", value: 1 },
                { text: "完全失去兴趣", value: 0 }
              ]
            },
            {
              text: "您感到焦虑或紧张的频率？",
              options: [
                { text: "几乎没有", value: 3 },
                { text: "偶尔", value: 2 },
                { text: "经常", value: 1 },
                { text: "几乎总是", value: 0 }
              ]
            }
          ],
          resultDesc: "心理健康与身体健康同样重要，定期关注自己的心理状态有助于全面提升生活质量。",
          recommendations: [
            "每天进行30分钟中等强度运动",
            "练习正念冥想或深呼吸",
            "保持规律的社交活动",
            "必要时寻求专业心理咨询"
          ]
        }
      },
      currentAssessment: null,
      currentQuestion: 0,
      answers: [],
      totalScore: 0,
      showResult: false,
      selectedOption: null
    };
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
      this.totalScore = this.answers.reduce((sum, value) => sum + value, 0) * (100 / (this.currentAssessment.questions.length * 3));
      this.showResult = true;
    },
    getHealthStatus() {
      if (this.totalScore >= 80)
        return "优秀";
      if (this.totalScore >= 60)
        return "良好";
      if (this.totalScore >= 40)
        return "一般";
      return "需要改善";
    },
    getHealthColor() {
      if (this.totalScore >= 80)
        return "#07C160";
      if (this.totalScore >= 60)
        return "#FF9C00";
      return "#FF5151";
    },
    getHealthDescription() {
      if (this.totalScore >= 80)
        return "您的健康状况非常优秀，继续保持当前的生活习惯！";
      if (this.totalScore >= 60)
        return "您的健康状况良好，但仍有提升空间。";
      if (this.totalScore >= 40)
        return "您的健康状况一般，建议关注并改善。";
      return "您的健康状况需要特别关注，建议采取改善措施。";
    },
    resetAssessment() {
      this.currentAssessment = null;
      this.currentQuestion = 0;
      this.answers = [];
      this.totalScore = 0;
      this.showResult = false;
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "健康评测"
    }),
    b: !$data.currentAssessment
  }, !$data.currentAssessment ? {
    c: common_vendor.f($data.assessmentTypes, (type, index, i0) => {
      return {
        a: type.bgImage,
        b: common_vendor.t(type.title),
        c: common_vendor.t(type.desc),
        d: index,
        e: common_vendor.o(($event) => $options.startAssessment(type.id), index)
      };
    })
  } : {}, {
    d: $data.currentAssessment && !$data.showResult
  }, $data.currentAssessment && !$data.showResult ? {
    e: common_vendor.t($data.currentQuestion + 1),
    f: common_vendor.t($data.currentAssessment.questions.length),
    g: $data.currentQuestion / $data.currentAssessment.questions.length * 100,
    h: common_vendor.t($data.currentAssessment.questions[$data.currentQuestion].text),
    i: common_vendor.f($data.currentAssessment.questions[$data.currentQuestion].options, (option, index, i0) => {
      return {
        a: common_vendor.t(option.text),
        b: index,
        c: common_vendor.o(($event) => $options.selectOption(option.value), index),
        d: $data.selectedOption === option.value ? "#537bff" : "#eee",
        e: $data.selectedOption === option.value ? "#f0f5ff" : "#fff"
      };
    })
  } : {}, {
    j: $data.showResult
  }, $data.showResult ? common_vendor.e({
    k: common_vendor.t($data.currentAssessment.title),
    l: common_vendor.t(Math.round($data.totalScore)),
    m: $options.getHealthColor(),
    n: common_vendor.t($options.getHealthStatus()),
    o: $options.getHealthColor(),
    p: common_assets._imports_0$2,
    q: common_vendor.t($options.getHealthDescription()),
    r: common_assets._imports_1$1,
    s: common_vendor.t($data.currentAssessment.resultDesc),
    t: $data.currentAssessment.recommendations
  }, $data.currentAssessment.recommendations ? {
    v: common_assets._imports_2,
    w: common_vendor.f($data.currentAssessment.recommendations, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item),
        c: index
      };
    })
  } : {}, {
    x: common_vendor.o((...args) => $options.resetAssessment && $options.resetAssessment(...args)),
    y: common_vendor.o((...args) => $options.resetAssessment && $options.resetAssessment(...args))
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7aa7d5ae"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/service/all-services/assessment/assessment.js.map
