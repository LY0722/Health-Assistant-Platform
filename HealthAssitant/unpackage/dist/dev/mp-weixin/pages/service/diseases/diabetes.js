"use strict";
const common_vendor = require("../../../common/vendor.js");
const NavBar = () => "../../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  methods: {
    showDetail(type) {
      const titles = {
        diet: "饮食建议",
        exercise: "运动建议",
        medicine: "药物治疗",
        monitor: "血糖监测"
      };
      common_vendor.index.showToast({
        title: `查看${titles[type]}详情`,
        icon: "none"
      });
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
      title: "糖尿病康复"
    }),
    b: common_vendor.o(($event) => $options.showDetail("diet")),
    c: common_vendor.o(($event) => $options.showDetail("exercise")),
    d: common_vendor.o(($event) => $options.showDetail("medicine")),
    e: common_vendor.o(($event) => $options.showDetail("monitor"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bd36e079"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/service/diseases/diabetes.js.map
