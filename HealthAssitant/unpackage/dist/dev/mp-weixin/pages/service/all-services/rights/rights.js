"use strict";
const common_vendor = require("../../../../common/vendor.js");
const pages_common_rightsData = require("../../../common/rightsData.js");
const NavBar = () => "../../../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    }
  },
  data() {
    return {
      rights: pages_common_rightsData.rightsData
    };
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "啄木鸟健康助手 - 用户权益"
    }),
    b: common_vendor.f($data.rights, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.description),
        d: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6db2d585"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/service/all-services/rights/rights.js.map
