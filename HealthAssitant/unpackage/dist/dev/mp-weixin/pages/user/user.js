"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_common_userData = require("../common/userData.js");
const _sfc_main = {
  data() {
    return {
      primaryColor: "#00B4D8",
      secondaryColor: "#0083B0",
      userInfo: {},
      isLoggedIn: false
    };
  },
  filters: {
    formatPhone(phone) {
      if (!phone)
        return "";
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    }
  },
  onLoad() {
    common_vendor.index.__f__("log", "at pages/user/user.vue:137", "onLoad - 页面加载时检查登录状态");
    this.checkLoginStatus();
  },
  onTabItemTap() {
    common_vendor.index.__f__("log", "at pages/user/user.vue:141", "onTabItemTap - 点击底部 tab 时检查登录状态");
    this.checkLoginStatus();
  },
  onShow() {
    common_vendor.index.__f__("log", "at pages/user/user.vue:145", "onShow - 页面显示时检查登录状态");
    this.checkLoginStatus();
  },
  methods: {
    async checkLoginStatus() {
      const userId = common_vendor.index.getStorageSync("user_id");
      common_vendor.index.__f__("log", "at pages/user/user.vue:151", "checkLoginStatus - userId:", userId);
      if (!userId || !await pages_common_userData.userData.findUserById(userId)) {
        this.isLoggedIn = false;
        common_vendor.index.removeStorageSync("user_id");
        setTimeout(() => {
          common_vendor.index.redirectTo({ url: "/pages/user/login" });
        }, 0);
      } else {
        this.userInfo = await pages_common_userData.userData.findUserById(userId);
        this.isLoggedIn = true;
      }
    },
    navigateTo(page) {
      common_vendor.index.navigateTo({ url: page });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f;
  return common_vendor.e({
    a: $data.isLoggedIn
  }, $data.isLoggedIn ? {
    b: common_vendor.t(((_a = $data.userInfo.nickname) == null ? void 0 : _a.charAt(0)) || "👤"),
    c: common_vendor.t($data.userInfo.nickname || "未登录"),
    d: common_vendor.t($data.userInfo.phone | _ctx.formatPhone),
    e: common_vendor.t(((_b = $data.userInfo.healthData) == null ? void 0 : _b.score) || "--"),
    f: "linear-gradient(135deg, " + $data.primaryColor + ", " + $data.secondaryColor + ")"
  } : {}, {
    g: !$data.isLoggedIn
  }, !$data.isLoggedIn ? {
    h: common_vendor.o(($event) => $options.navigateTo("/pages/user/login")),
    i: common_vendor.o(($event) => $options.navigateTo("/pages/user/register"))
  } : {}, {
    j: $data.isLoggedIn
  }, $data.isLoggedIn ? {
    k: common_vendor.t(((_c = $data.userInfo.healthData) == null ? void 0 : _c.bmi) || "未记录"),
    l: common_vendor.o(($event) => $options.navigateTo("/pages/health/bmi")),
    m: common_vendor.t(((_d = $data.userInfo.healthData) == null ? void 0 : _d.bloodPressure) || "未记录"),
    n: common_vendor.o(($event) => $options.navigateTo("/pages/health/blood-pressure")),
    o: common_vendor.t(((_e = $data.userInfo.healthData) == null ? void 0 : _e.bloodSugar) ? $data.userInfo.healthData.bloodSugar + "mmol/L" : "未记录"),
    p: common_vendor.o(($event) => $options.navigateTo("/pages/health/blood-sugar")),
    q: common_vendor.t(((_f = $data.userInfo.healthData) == null ? void 0 : _f.lastCheckup) || "未记录"),
    r: common_vendor.o(($event) => $options.navigateTo("/pages/health/checkup"))
  } : {}, {
    s: $data.isLoggedIn
  }, $data.isLoggedIn ? {
    t: common_vendor.o(($event) => $options.navigateTo("/pages/health/record")),
    v: common_vendor.o(($event) => $options.navigateTo("/pages/health/reminder")),
    w: common_vendor.o(($event) => $options.navigateTo("/pages/health/report"))
  } : {}, {
    x: $data.isLoggedIn
  }, $data.isLoggedIn ? {
    y: common_vendor.o(($event) => $options.navigateTo("/pages/user/profile")),
    z: common_vendor.o(($event) => $options.navigateTo("/pages/user/family")),
    A: common_vendor.o(($event) => $options.navigateTo("/pages/user/settings/settings"))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0f7520f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/user.js.map
