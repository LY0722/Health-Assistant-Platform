"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_common_mockData = require("../common/mockData.js");
const NavBar = () => "../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  data() {
    return {
      product: {
        id: 0,
        name: "",
        desc: "",
        price: 0,
        originalPrice: 0,
        sales: 0,
        stock: 0,
        images: [],
        detail: ""
      }
    };
  },
  onLoad(options) {
    if (options.id) {
      const found = pages_common_mockData.products.find((p) => p.id == options.id);
      if (found)
        this.product = found;
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    addToCart() {
      common_vendor.index.showToast({ title: "加入购物车成功", icon: "success" });
    },
    buyNow() {
      common_vendor.index.navigateTo({ url: "/pages/order/confirm?productId=" + this.product.id });
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "商品详情"
    }),
    b: common_vendor.f($data.product.images, (img, index, i0) => {
      return {
        a: img,
        b: index
      };
    }),
    c: common_vendor.t($data.product.name),
    d: common_vendor.t($data.product.desc),
    e: common_vendor.t($data.product.price),
    f: $data.product.originalPrice
  }, $data.product.originalPrice ? {
    g: common_vendor.t($data.product.originalPrice)
  } : {}, {
    h: common_vendor.t($data.product.sales),
    i: common_vendor.t($data.product.stock),
    j: $data.product.detail,
    k: common_vendor.o((...args) => $options.addToCart && $options.addToCart(...args)),
    l: common_vendor.o((...args) => $options.buyNow && $options.buyNow(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-926049a3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/store/detail.js.map
