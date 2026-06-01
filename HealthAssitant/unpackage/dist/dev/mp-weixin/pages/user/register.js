"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_common_userData = require("../common/userData.js");
const NavBar = () => "../components/nav-bar.js";
const _sfc_main = {
  components: {
    NavBar,
    uniIcons
  },
  data() {
    return {
      phone: "",
      username: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      agreed: false
    };
  },
  computed: {
    canRegister() {
      return this.phone && this.username && this.password && this.confirmPassword && this.agreed;
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    handleAgreementChange(e) {
      this.agreed = e.detail.value.length > 0;
    },
    async handleRegister() {
      if (!this.phone) {
        common_vendor.index.showToast({ title: "请输入手机号", icon: "none" });
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        common_vendor.index.showToast({ title: "请输入正确的手机号", icon: "none" });
        return;
      }
      if (!this.username) {
        common_vendor.index.showToast({ title: "请输入昵称", icon: "none" });
        return;
      }
      if (!this.password) {
        common_vendor.index.showToast({ title: "请输入密码", icon: "none" });
        return;
      }
      if (this.password.length < 6 || this.password.length > 20) {
        common_vendor.index.showToast({ title: "密码长度应为6-20位", icon: "none" });
        return;
      }
      if (this.password !== this.confirmPassword) {
        common_vendor.index.showToast({ title: "两次输入的密码不一致", icon: "none" });
        return;
      }
      if (!this.agreed) {
        common_vendor.index.showToast({ title: "请先同意用户协议和隐私政策", icon: "none" });
        return;
      }
      if (pages_common_userData.userData.isPhoneExist(this.phone)) {
        common_vendor.index.showToast({ title: "该手机号已注册", icon: "none" });
        return;
      }
      if (pages_common_userData.userData.isUsernameExist(this.username)) {
        common_vendor.index.showToast({ title: "该用户名已存在", icon: "none" });
        return;
      }
      common_vendor.index.showLoading({ title: "注册中..." });
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        const newUser = pages_common_userData.userData.addUser({
          username: this.username,
          password: this.password,
          nickname: this.username,
          phone: this.phone,
          healthData: {
            bmi: null,
            score: null,
            lastCheckup: null,
            bloodPressure: null,
            bloodSugar: null
          }
        });
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({ title: "注册成功", icon: "success" });
        common_vendor.index.setStorageSync("user_id", newUser.id);
        common_vendor.index.setStorageSync("user_info", newUser);
        setTimeout(() => {
          common_vendor.index.switchTab({ url: "/pages/user/user" });
        }, 1200);
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.__f__("log", "at pages/user/register.vue:159", "注册异常:", error);
        common_vendor.index.showToast({ title: "注册失败: " + (error.message || "未知错误"), icon: "none" });
      }
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
      title: "注册",
      ["show-back"]: true
    }),
    b: $data.phone,
    c: common_vendor.o(($event) => $data.phone = $event.detail.value),
    d: $data.username,
    e: common_vendor.o(($event) => $data.username = $event.detail.value),
    f: $data.showPassword ? "text" : "password",
    g: $data.password,
    h: common_vendor.o(($event) => $data.password = $event.detail.value),
    i: common_vendor.t($data.showPassword ? "👁️" : "👁️‍🗨️"),
    j: common_vendor.o((...args) => $options.togglePasswordVisibility && $options.togglePasswordVisibility(...args)),
    k: $data.showConfirmPassword ? "text" : "password",
    l: $data.confirmPassword,
    m: common_vendor.o(($event) => $data.confirmPassword = $event.detail.value),
    n: common_vendor.t($data.showConfirmPassword ? "👁️" : "👁️‍🗨️"),
    o: common_vendor.o((...args) => $options.toggleConfirmPasswordVisibility && $options.toggleConfirmPasswordVisibility(...args)),
    p: $data.agreed,
    q: common_vendor.o(($event) => $options.navigateTo("/pages/login/userAgreement")),
    r: common_vendor.o(($event) => $options.navigateTo("/pages/login/privacyPolicy")),
    s: common_vendor.o((...args) => $options.handleAgreementChange && $options.handleAgreementChange(...args)),
    t: common_vendor.o((...args) => $options.handleRegister && $options.handleRegister(...args)),
    v: !$options.canRegister,
    w: common_vendor.o(($event) => $options.navigateTo("/pages/login/login"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fd534bf9"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/user/register.js.map
