"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const NavBar = () => "../../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  data() {
    return {
      currentBP: {
        systolic: 130,
        diastolic: 85,
        status: "正常"
      },
      bpHistory: [
        { date: "6月14日", systolic: 132, diastolic: 84 },
        { date: "6月13日", systolic: 135, diastolic: 86 },
        { date: "6月12日", systolic: 138, diastolic: 88 },
        { date: "6月11日", systolic: 140, diastolic: 90 },
        { date: "6月10日", systolic: 136, diastolic: 87 }
      ],
      guideTabs: [
        { id: 1, name: "饮食控制" },
        { id: 2, name: "运动指导" },
        { id: 3, name: "心理调节" },
        { id: 4, name: "戒烟限酒" }
      ],
      activeGuideTab: 1,
      guideData: {
        1: [
          {
            title: "减少钠盐摄入",
            description: "每日食盐摄入量不超过5克，减少酱油、酱菜等高盐食品摄入。"
          },
          {
            title: "增加钾摄入",
            description: "多吃含钾丰富的食物，如香蕉、土豆、菠菜等。"
          },
          {
            title: "低脂饮食",
            description: "减少饱和脂肪和胆固醇的摄入，选择瘦肉、鱼类、豆类等优质蛋白质。"
          }
        ],
        2: [
          {
            title: "有氧运动",
            description: "每周进行至少150分钟的中等强度有氧运动，如快走、慢跑、游泳等。"
          },
          {
            title: "力量训练",
            description: "每周进行2-3次力量训练，如举重、俯卧撑等，每次20-30分钟。"
          },
          {
            title: "运动频率",
            description: "每周运动3-5天，避免连续两天不运动。"
          }
        ],
        3: [
          {
            title: "减轻压力",
            description: "学习放松技巧，如深呼吸、冥想、瑜伽等，减轻工作和生活压力。"
          },
          {
            title: "充足睡眠",
            description: "保证每天7-8小时的高质量睡眠，避免熬夜和过度疲劳。"
          },
          {
            title: "心理调节",
            description: "保持乐观积极的心态，避免情绪波动过大。"
          }
        ],
        4: [
          {
            title: "戒烟",
            description: "吸烟是高血压的重要危险因素，戒烟可显著降低心血管疾病风险。"
          },
          {
            title: "限酒",
            description: "男性每日饮酒不超过25克酒精，女性不超过15克酒精。"
          },
          {
            title: "远离二手烟",
            description: "避免被动吸烟，减少烟雾对心血管系统的损害。"
          }
        ]
      },
      dietTips: [
        {
          icon: "/static/icon/hypertension/fruit.png",
          text: "多吃新鲜水果和蔬菜"
        },
        {
          icon: "/static/icon/hypertension/whole-grain.png",
          text: "选择全谷物食品"
        },
        {
          icon: "/static/icon/hypertension/fish.png",
          text: "每周吃2-3次鱼类"
        },
        {
          icon: "/static/icon/hypertension/nuts.png",
          text: "适量食用坚果和种子"
        },
        {
          icon: "/static/icon/hypertension/oil.png",
          text: "使用橄榄油等健康油脂"
        },
        {
          icon: "/static/icon/hypertension/dairy.png",
          text: "选择低脂乳制品"
        }
      ],
      medications: [
        { id: 1, name: "硝苯地平缓释片", dosage: "10mg，每日2次", time: "08:00, 20:00", checked: true },
        { id: 2, name: "缬沙坦胶囊", dosage: "80mg，每日1次", time: "08:00", checked: true },
        { id: 3, name: "阿司匹林肠溶片", dosage: "100mg，每日1次", time: "20:00", checked: false }
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
      const med = this.medications.find((item) => item.id === id);
      if (med) {
        med.checked = !med.checked;
      }
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "高血压康复管理"
    }),
    b: common_vendor.t($data.currentBP.systolic),
    c: common_vendor.t($data.currentBP.diastolic),
    d: common_vendor.t($data.currentBP.status),
    e: common_vendor.f($data.bpHistory, (record, index, i0) => {
      return {
        a: common_vendor.t(record.date),
        b: common_vendor.t(record.systolic),
        c: common_vendor.t(record.diastolic),
        d: index
      };
    }),
    f: common_vendor.f($data.guideTabs, (tab, k0, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: $data.activeGuideTab === tab.id ? 1 : "",
        c: tab.id,
        d: common_vendor.o(($event) => $data.activeGuideTab = tab.id, tab.id)
      };
    }),
    g: common_vendor.f($options.currentGuideItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.description),
        c: index
      };
    }),
    h: common_vendor.f($data.dietTips, (tip, index, i0) => {
      return {
        a: tip.icon,
        b: common_vendor.t(tip.text),
        c: index
      };
    }),
    i: common_vendor.f($data.medications, (med, index, i0) => {
      return {
        a: common_vendor.t(med.name),
        b: common_vendor.t(med.dosage),
        c: common_vendor.t(med.time),
        d: med.checked,
        e: common_vendor.o(($event) => $options.toggleMed(med.id), index),
        f: index
      };
    }),
    j: common_assets._imports_0$4
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-28b6aa70"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/service/diseases/hypertension.js.map
