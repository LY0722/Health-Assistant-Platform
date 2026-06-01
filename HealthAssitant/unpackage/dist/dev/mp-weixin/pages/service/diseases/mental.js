"use strict";
const common_vendor = require("../../../common/vendor.js");
const NavBar = () => "../../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  data() {
    return {
      knowledgeList: [
        {
          title: "如何应对压力和焦虑",
          description: "了解压力和焦虑的来源，学习有效的应对策略和放松技巧..."
        },
        {
          title: "改善睡眠质量的方法",
          description: "睡眠不足会影响心理健康，掌握科学的睡眠方法和习惯..."
        },
        {
          title: "建立积极心态的5个技巧",
          description: "培养乐观的思维方式，增强心理韧性和抗压能力..."
        }
      ]
    };
  },
  methods: {
    handleServiceClick(type) {
      common_vendor.index.__f__("log", "at pages/service/diseases/mental.vue:94", `用户点击了${type}服务`);
      common_vendor.index.showToast({
        title: `即将进入${type === "online" ? "在线咨询" : type === "phone" ? "电话咨询" : type === "chat" ? "心理聊天室" : "心理测试"}`,
        icon: "none"
      });
    },
    handleRelaxClick(id) {
      common_vendor.index.__f__("log", "at pages/service/diseases/mental.vue:101", `用户点击了放松技巧${id}`);
      common_vendor.index.showToast({
        title: `即将查看放松技巧详情`,
        icon: "none"
      });
    },
    getColor(index) {
      const colors = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA"];
      return colors[index % colors.length];
    },
    getIcon(index) {
      const icons = ["📌", "📖", "💡", "🔍", "🧠", "❤️"];
      return icons[index % icons.length];
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
      title: "心理健康服务"
    }),
    b: common_vendor.o(($event) => $options.handleServiceClick("online")),
    c: common_vendor.o(($event) => $options.handleServiceClick("phone")),
    d: common_vendor.o(($event) => $options.handleServiceClick("chat")),
    e: common_vendor.o(($event) => $options.handleServiceClick("test")),
    f: common_vendor.o(($event) => $options.handleRelaxClick(1)),
    g: common_vendor.o(($event) => $options.handleRelaxClick(2)),
    h: common_vendor.o(($event) => $options.handleRelaxClick(3)),
    i: common_vendor.f($data.knowledgeList, (item, index, i0) => {
      return {
        a: common_vendor.t($options.getIcon(index)),
        b: $options.getColor(index),
        c: common_vendor.t(item.title),
        d: common_vendor.t(item.description),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0b222b59"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/service/diseases/mental.js.map
