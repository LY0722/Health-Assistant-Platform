"use strict";
const common_vendor = require("./common/vendor.js");
const common_assets = require("./common/assets.js");
if (!Math) {
  "./pages/service/service.js";
  "./pages/service/all-services/article/article.js";
  "./pages/service/all-services/article/articledetail.js";
  "./pages/service/all-services/assessment/assessment.js";
  "./pages/service/all-services/rights/rights.js";
  "./pages/service/all-services/news/news.js";
  "./pages/service/all-services/news/newsDetail.js";
  "./pages/service/diseases/pediatrics.js";
  "./pages/service/diseases/hypertension.js";
  "./pages/service/diseases/diabetes.js";
  "./pages/service/diseases/dermatology.js";
  "./pages/service/diseases/mental.js";
  "./pages/service/doctors/doctors.js";
  "./pages/service/doctors/doctordetail.js";
  "./pages/health/health.js";
  "./pages/store/store.js";
  "./pages/store/detail.js";
  "./pages/user/user.js";
  "./pages/user/settings/settings.js";
  "./pages/user/register.js";
  "./pages/user/login.js";
}
const _sfc_main$1 = {
  props: {
    title: String,
    showBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleBack() {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.switchTab({
          url: "/pages/service/service"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.showBack
  }, $props.showBack ? {
    b: common_assets._imports_0,
    c: common_vendor.o((...args) => $options.handleBack && $options.handleBack(...args))
  } : {}, {
    d: common_vendor.t($props.title)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-d877ba5c"]]);
const _sfc_main = {
  components: { NavBar: Component },
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:6", "App Launch");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.Component = Component;
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/main.js.map
