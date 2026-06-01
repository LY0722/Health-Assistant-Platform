"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const NavBar = () => "../../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  data() {
    return {
      commonDiseases: [
        { name: "湿疹", image: "/static/image/dermatology/eczema.jpg" },
        { name: "痤疮", image: "/static/image/dermatology/acne.jpg" },
        { name: "皮炎", image: "/static/image/dermatology/dermatitis.jpg" },
        { name: "荨麻疹", image: "/static/image/dermatology/hives.jpg" },
        { name: "银屑病", image: "/static/image/dermatology/psoriasis.jpg" },
        { name: "白癜风", image: "/static/image/dermatology/vitiligo.jpg" }
      ],
      preventionTips: [
        { content: "保持皮肤清洁，使用温和的清洁产品" },
        { content: "避免长时间暴露在阳光下，使用防晒霜" },
        { content: "保持健康饮食，多吃蔬菜水果，减少辛辣刺激性食物" },
        { content: "保持充足睡眠，避免熬夜和过度疲劳" },
        { content: "选择适合自己肤质的护肤品，避免使用刺激性产品" },
        { content: "保持心情舒畅，减少压力和焦虑" }
      ],
      treatmentTabs: [
        { id: 1, name: "药物治疗" },
        { id: 2, name: "物理治疗" },
        { id: 3, name: "中医治疗" },
        { id: 4, name: "生活调理" }
      ],
      activeTab: 1,
      treatmentData: {
        1: {
          desc: "药物治疗是皮肤病治疗的主要方法，根据不同的病情和病因，医生会开具不同类型的药物。",
          steps: [
            "外用药物：如激素类药膏、抗生素药膏、抗真菌药膏等",
            "口服药物：如抗组胺药、抗生素、免疫抑制剂等",
            "注射药物：如皮质类固醇、生物制剂等",
            "注意事项：遵医嘱用药，不要自行增减药量或停药"
          ]
        },
        2: {
          desc: "物理治疗是利用各种物理因子作用于人体，以达到治疗疾病的目的。",
          steps: [
            "光疗：如紫外线疗法、激光疗法等",
            "冷冻治疗：利用低温破坏病变组织",
            "电疗：如电离子透入疗法、射频治疗等",
            "注意事项：治疗前需清洁皮肤，治疗后注意护理"
          ]
        },
        3: {
          desc: "中医治疗皮肤病有着悠久的历史和丰富的经验，采用辨证论治的方法。",
          steps: [
            "中药内服：根据辨证结果开具中药方剂",
            "中药外用：如中药熏洗、中药敷贴等",
            "针灸推拿：通过刺激穴位调节身体机能",
            "注意事项：饮食禁忌，避免食用发物"
          ]
        },
        4: {
          desc: "生活调理对于皮肤病的康复非常重要，良好的生活习惯可以促进皮肤的恢复。",
          steps: [
            "饮食调理：避免食用辛辣、油腻、刺激性食物",
            "作息规律：保持充足的睡眠，避免熬夜",
            "皮肤护理：保持皮肤清洁和湿润，避免搔抓",
            "心理调节：保持心情舒畅，避免焦虑和压力"
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
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "皮肤病康复中心"
    }),
    b: common_vendor.f($data.commonDiseases, (disease, index, i0) => {
      return {
        a: disease.image,
        b: common_vendor.t(disease.name),
        c: index
      };
    }),
    c: common_vendor.f($data.preventionTips, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item.content),
        c: index
      };
    }),
    d: common_vendor.f($data.treatmentTabs, (tab, k0, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: $data.activeTab === tab.id ? 1 : "",
        c: tab.id,
        d: common_vendor.o(($event) => $data.activeTab = tab.id, tab.id)
      };
    }),
    e: common_vendor.t($options.currentTreatmentDesc),
    f: common_vendor.f($options.currentTreatmentSteps, (step, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(step),
        c: index
      };
    }),
    g: common_assets._imports_0$5
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-332b2acd"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/service/diseases/dermatology.js.map
