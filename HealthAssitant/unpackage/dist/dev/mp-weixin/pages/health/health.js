"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_common_healthModel = require("../common/healthModel.js");
const common_assets = require("../../common/assets.js");
const NavBar = () => "../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  data() {
    return {
      currentTab: "bp",
      inputWeight: null,
      inputHeight: null,
      featureCards: [
        {
          id: 1,
          title: "健康测评",
          desc: "全面健康评估",
          icon: "/static/icon/servi/assessment.png",
          path: "/pages/service/all-services/assessment/assessment"
        },
        {
          id: 2,
          title: "健康百科",
          desc: "健康知识查询",
          icon: "/static/icon/servi/encyclopedia.png",
          path: "/pages/service/all-services/article/article"
        },
        {
          id: 3,
          title: "健康资讯",
          desc: "专业保健知识",
          icon: "/static/icon/servi/news.png",
          path: "/pages/service/all-services/news/news"
        }
      ],
      healthMetrics: [
        { id: "bp", name: "血压", icon: "/static/icon/hea/blood-pressure.png" },
        { id: "bs", name: "血糖", icon: "/static/icon/hea/blood-sugar.png" },
        { id: "weight", name: "体重", icon: "/static/icon/hea/weight.png" },
        { id: "steps", name: "步数", icon: "/static/icon/hea/steps.png" }
      ],
      bmiRanges: [
        { label: "偏瘦", range: "<18.5", status: "underweight", class: "underweight" },
        { label: "正常", range: "18.5 - 24", status: "normal", class: "normal" },
        { label: "超重", range: "24 - 28", status: "overweight", class: "overweight" },
        { label: "肥胖", range: "≥28", status: "obese", class: "obese" }
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
      stepGoal: 1e4
    };
  },
  computed: {
    stepProgress() {
      const progress = this.healthData.steps / this.stepGoal * 100;
      return Math.min(Math.round(progress), 100);
    }
  },
  methods: {
    switchTab(tab) {
      this.currentTab = tab;
    },
    updateHealthMetrics() {
      if (this.inputWeight && this.inputWeight > 0) {
        const updateData = {
          weight: this.inputWeight,
          height: this.inputHeight || this.healthData.height
          // 使用新输入的身高或保持原身高
        };
        pages_common_healthModel.healthModel.updateHealthMetrics(updateData);
        this.healthData = { ...pages_common_healthModel.healthModel.data };
        common_vendor.index.showToast({ title: "数据更新成功", icon: "success" });
        this.inputWeight = null;
        this.inputHeight = null;
      } else {
        common_vendor.index.showToast({ title: "请输入有效的体重", icon: "none" });
      }
    },
    calculateBMI() {
      const { weight, height } = this.healthData;
      if (!weight || !height)
        return 0;
      return (weight / Math.pow(height / 100, 2)).toFixed(1);
    },
    getWeightStatusText() {
      const statusMap = {
        underweight: "偏瘦",
        normal: "正常",
        overweight: "超重",
        obese: "肥胖"
      };
      return statusMap[this.healthData.weightStatus] || "";
    },
    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    navigateTo(path) {
      common_vendor.index.__f__("log", "at pages/health/health.vue:323", "尝试跳转到路径:", path);
      common_vendor.index.navigateTo({
        url: path
      });
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
      title: "啄木鸟健康服务中心",
      ["show-back"]: false
    }),
    b: common_vendor.t($data.featureCards[0].title),
    c: common_vendor.t($data.featureCards[0].desc),
    d: common_assets._imports_0$6,
    e: common_vendor.o(($event) => $options.navigateTo($data.featureCards[0].path)),
    f: common_vendor.t($data.featureCards[1].title),
    g: common_vendor.t($data.featureCards[1].desc),
    h: common_vendor.o(($event) => $options.navigateTo($data.featureCards[1].path)),
    i: common_vendor.t($data.featureCards[2].title),
    j: common_vendor.t($data.featureCards[2].desc),
    k: common_vendor.o(($event) => $options.navigateTo($data.featureCards[2].path)),
    l: common_vendor.f($data.healthMetrics, (item, k0, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.name),
        c: item.id,
        d: $data.currentTab === item.id ? 1 : "",
        e: common_vendor.o(($event) => $options.switchTab(item.id), item.id)
      };
    }),
    m: $data.currentTab === "bp"
  }, $data.currentTab === "bp" ? {
    n: common_vendor.t($data.healthData.bloodPressure),
    o: common_vendor.t($data.healthData.lastUpdate),
    p: common_vendor.t($data.bloodPressureRanges.systolic.low),
    q: common_vendor.t($data.bloodPressureRanges.systolic.normal),
    r: common_vendor.t($data.bloodPressureRanges.diastolic.low),
    s: common_vendor.t($data.bloodPressureRanges.diastolic.normal)
  } : $data.currentTab === "bs" ? {
    v: common_vendor.t($data.healthData.bloodSugar),
    w: common_vendor.t($data.healthData.lastUpdate),
    x: common_vendor.t($data.bloodSugarRanges.fasting.normal),
    y: common_vendor.t($data.bloodSugarRanges.postprandial.normal)
  } : $data.currentTab === "weight" ? {
    A: $data.inputWeight,
    B: common_vendor.o(($event) => $data.inputWeight = $event.detail.value),
    C: $data.inputHeight,
    D: common_vendor.o(($event) => $data.inputHeight = $event.detail.value),
    E: common_vendor.o((...args) => $options.updateHealthMetrics && $options.updateHealthMetrics(...args)),
    F: common_vendor.t($data.healthData.lastUpdate),
    G: common_vendor.t($data.healthData.bmi || $options.calculateBMI()),
    H: common_vendor.t($data.healthData.height),
    I: common_vendor.t($data.healthData.weight),
    J: common_vendor.t($options.getWeightStatusText()),
    K: common_vendor.f($data.bmiRanges, (range, k0, i0) => {
      return {
        a: common_vendor.t(range.label),
        b: common_vendor.t(range.range),
        c: range.label,
        d: common_vendor.n(range.class),
        e: common_vendor.n({
          "current-range": $data.healthData.weightStatus === range.status
        })
      };
    })
  } : $data.currentTab === "steps" ? {
    M: common_vendor.t($options.formatNumber($data.healthData.steps)),
    N: common_vendor.t($options.formatNumber($data.stepGoal)),
    O: $options.stepProgress + "%",
    P: common_vendor.t($options.stepProgress)
  } : {}, {
    t: $data.currentTab === "bs",
    z: $data.currentTab === "weight",
    L: $data.currentTab === "steps"
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-04910d43"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/health/health.js.map
