"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_common_doctorsData = require("../common/doctorsData.js");
const common_assets = require("../../common/assets.js");
const NavBar = () => "../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  data() {
    const getRandomDoctors = () => {
      const shuffled = [...pages_common_doctorsData.doctorsData].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    };
    return {
      // 轮播图数据
      banners: [
        "/static/images/banner/banner1.png",
        "/static/images/banner/banner2.png",
        "/static/images/banner/banner3.png",
        "/static/images/banner/banner4.png",
        "/static/images/banner/banner5.png",
        "/static/images/banner/banner6.png"
      ],
      // 功能入口数据
      features: [
        {
          title: "医学百科",
          icon: "/static/icon/servi/encyclopedia.png",
          path: "/pages/service/all-services/article/article"
        },
        {
          title: "健康评测",
          icon: "/static/icon/servi/assessment.png",
          path: "/pages/service/all-services/assessment/assessment"
        },
        {
          title: "我的权益",
          icon: "/static/icon/servi/rights.png",
          path: "/pages/service/all-services/rights/rights"
        },
        {
          title: "全部服务",
          icon: "/static/icon/servi/services.png",
          path: "/pages/service/all-services/all-services"
        }
      ],
      // 健康生活卡片数据
      healthCards: [
        {
          title: "儿科健康",
          subtitle: "专业儿童健康管理",
          color: "#5181ff",
          path: "/pages/service/diseases/pediatrics"
        },
        {
          title: "高血压康复",
          subtitle: "专业康复指导方案",
          color: "#2cc0e8",
          path: "/pages/service/diseases/hypertension"
        },
        {
          title: "糖尿病康复",
          subtitle: "血糖管理专家",
          color: "#24d1a6",
          path: "/pages/service/diseases/diabetes"
        },
        {
          title: "皮肤病康复",
          subtitle: "皮肤健康守护",
          color: "#f3c343",
          path: "/pages/service/diseases/dermatology"
        },
        {
          title: "心理健康",
          subtitle: "心灵关怀服务",
          color: "#e265a0",
          path: "/pages/service/diseases/mental"
        }
      ],
      // 医生数据
      randomDoctors: getRandomDoctors()
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
      title: "啄木鸟健康助手",
      ["show-back"]: false
    }),
    b: common_vendor.f($data.banners, (item, index, i0) => {
      return {
        a: item,
        b: index
      };
    }),
    c: common_vendor.f($data.features, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.title),
        c: index,
        d: common_vendor.o(($event) => $options.navigateTo(item.path), index)
      };
    }),
    d: common_vendor.o(($event) => $options.navigateTo("/pages/health/health")),
    e: common_vendor.t($data.healthCards[0].title),
    f: common_vendor.t($data.healthCards[0].subtitle),
    g: common_assets._imports_0$1,
    h: $data.healthCards[0].color,
    i: common_vendor.o(($event) => $options.navigateTo($data.healthCards[0].path)),
    j: common_vendor.t($data.healthCards[1].title),
    k: common_vendor.t($data.healthCards[1].subtitle),
    l: common_assets._imports_1,
    m: $data.healthCards[1].color,
    n: common_vendor.o(($event) => $options.navigateTo($data.healthCards[1].path)),
    o: common_vendor.f($data.healthCards.slice(2), (card, index, i0) => {
      return {
        a: common_vendor.t(card.title),
        b: common_vendor.t(card.subtitle),
        c: index + 2,
        d: card.color,
        e: common_vendor.o(($event) => $options.navigateTo(card.path), index + 2)
      };
    }),
    p: common_vendor.o(($event) => $options.navigateTo("/pages/service/doctors/doctors")),
    q: common_vendor.f($data.randomDoctors, (doctor, index, i0) => {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cb2df937"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/service/service.js.map
