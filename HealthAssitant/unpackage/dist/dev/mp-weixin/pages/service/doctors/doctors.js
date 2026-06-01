"use strict";
const common_vendor = require("../../../common/vendor.js");
const pages_common_doctorsData = require("../../common/doctorsData.js");
const NavBar = () => "../../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  data() {
    return {
      doctors: pages_common_doctorsData.doctorsData
    };
  },
  methods: {
    navigateTo(page) {
      common_vendor.index.navigateTo({ url: page });
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
      title: "医生列表"
    }),
    b: common_vendor.f($data.doctors, (doctor, index, i0) => {
      return {
        a: doctor.avatar,
        b: common_vendor.t(doctor.name),
        c: common_vendor.t(doctor.title),
        d: common_vendor.t(doctor.department),
        e: index,
        f: common_vendor.o(($event) => $options.navigateTo(`/pages/service/doctors/doctordetail?id=${doctor.id}`), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-afbbd8d8"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/service/doctors/doctors.js.map
