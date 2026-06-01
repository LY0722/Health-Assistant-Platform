"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_common_userData = require("../common/userData.js");
const NavBar = () => "../components/nav-bar.js";
const uniIcons = () => "../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _sfc_main = {
  components: {
    NavBar,
    uniIcons
  },
  data() {
    return {
      phone: "",
      password: "",
      showPassword: false
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleLogin() {
      if (!this.phone) {
        common_vendor.index.showToast({ title: "请输入手机号", icon: "none" });
        return;
      }
      if (!this.password) {
        common_vendor.index.showToast({ title: "请输入密码", icon: "none" });
        return;
      }
      common_vendor.index.showLoading({ title: "登录中..." });
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        const user = pages_common_userData.userData.validateLogin(this.phone, this.password);
        if (user) {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({ title: "登录成功", icon: "success" });
          common_vendor.index.setStorageSync("user_id", user.id);
          common_vendor.index.setStorageSync("user_info", user);
          setTimeout(() => {
            common_vendor.index.switchTab({ url: "/pages/user/user" });
          }, 1200);
        } else {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({ title: "手机号或密码错误", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.__f__("log", "at pages/user/login.vue:117", "登录异常:", error);
        common_vendor.index.showToast({ title: "登录失败: " + (error.message || "未知错误"), icon: "none" });
      }
    },
    loginWithWeChat() {
      common_vendor.index.showToast({ title: "微信登录(模拟)", icon: "none" });
    },
    loginWithQQ() {
      common_vendor.index.showToast({ title: "QQ登录(模拟)", icon: "none" });
    },
    loginWithWeibo() {
      common_vendor.index.showToast({ title: "微博登录(模拟)", icon: "none" });
    },
    navigateTo(url) {
      common_vendor.index.navigateTo({
        url
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
      title: "登录",
      ["show-back"]: true
    }),
    b: $data.phone,
    c: common_vendor.o(($event) => $data.phone = $event.detail.value),
    d: !$data.showPassword,
    e: $data.password,
    f: common_vendor.o(($event) => $data.password = $event.detail.value),
    g: common_vendor.t($data.showPassword ? "👁️" : "👁️‍🗨️"),
    h: common_vendor.o((...args) => $options.togglePasswordVisibility && $options.togglePasswordVisibility(...args)),
    i: common_vendor.o(($event) => $options.navigateTo("/pages/login/forgotPassword")),
    j: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args)),
    k: common_vendor.o(($event) => $options.navigateTo("/pages/user/register")),
    l: common_vendor.o((...args) => $options.loginWithWeChat && $options.loginWithWeChat(...args)),
    m: common_vendor.o((...args) => $options.loginWithQQ && $options.loginWithQQ(...args)),
    n: common_vendor.o((...args) => $options.loginWithWeibo && $options.loginWithWeibo(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6163e5ce"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/login.js.map
