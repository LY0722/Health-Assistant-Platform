"use strict";
const common_vendor = require("../../../common/vendor.js");
const NavBar = () => "../../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  data() {
    return {
      soundEnabled: true,
      notificationEnabled: true
    };
  },
  methods: {
    // 新增返回方法
    goBack() {
      common_vendor.index.navigateBack();
    },
    toggleSound(e) {
      this.soundEnabled = e.detail.value;
      common_vendor.index.__f__("log", "at pages/user/settings/settings.vue:39", "声音开关状态:", this.soundEnabled);
    },
    toggleNotification(e) {
      this.notificationEnabled = e.detail.value;
      common_vendor.index.__f__("log", "at pages/user/settings/settings.vue:43", "通知开关状态:", this.notificationEnabled);
    },
    clearCache() {
      common_vendor.index.__f__("log", "at pages/user/settings/settings.vue:46", "清除缓存操作已触发");
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
      title: "设置页面"
    }),
    b: $data.soundEnabled,
    c: common_vendor.o((...args) => $options.toggleSound && $options.toggleSound(...args)),
    d: $data.notificationEnabled,
    e: common_vendor.o((...args) => $options.toggleNotification && $options.toggleNotification(...args)),
    f: common_vendor.o((...args) => $options.clearCache && $options.clearCache(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8ada08f1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/user/settings/settings.js.map
