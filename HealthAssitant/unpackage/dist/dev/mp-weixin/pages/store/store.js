"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_common_mockData = require("../common/mockData.js");
const common_assets = require("../../common/assets.js");
const NavBar = () => "../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  data() {
    return {
      statusBarHeight: 0,
      activeCategory: 0,
      cartItems: [],
      products: pages_common_mockData.products,
      categories: pages_common_mockData.categories,
      selectedProducts: [],
      searchKeyword: ""
      // 新增搜索关键词
    };
  },
  onLoad() {
    const { statusBarHeight } = common_vendor.index.getSystemInfoSync();
    this.statusBarHeight = statusBarHeight;
  },
  computed: {
    filteredProducts() {
      let filtered = this.activeCategory === 0 ? this.products : this.products.filter((p) => p.category === this.activeCategory);
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase();
        filtered = filtered.filter(
          (p) => p.name.toLowerCase().includes(keyword) || p.desc.toLowerCase().includes(keyword)
        );
      }
      return filtered;
    },
    cartTotal() {
      return {
        count: this.cartItems.reduce((sum, item) => sum + item.quantity, 0),
        amount: this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
      };
    }
  },
  methods: {
    handleSearch() {
      common_vendor.index.hideKeyboard();
    },
    clearSearch() {
      this.searchKeyword = "";
    },
    viewProductDetail(product) {
      common_vendor.index.navigateTo({ url: `/pages/store/detail?id=${product.id}` });
    },
    addToCart(product) {
      const exist = this.cartItems.find((item) => item.id === product.id);
      if (exist) {
        exist.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
      common_vendor.index.showToast({ title: "已加入购物车", icon: "success" });
    },
    toggleSelect(product) {
      const index = this.selectedProducts.indexOf(product.id);
      if (index === -1) {
        this.selectedProducts.push(product.id);
        this.addToCart(product);
      } else {
        this.selectedProducts.splice(index, 1);
        this.removeFromCart(product.id);
      }
    },
    removeFromCart(productId) {
      const index = this.cartItems.findIndex((item) => item.id === productId);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
    },
    showCart() {
      if (this.cartItems.length === 0) {
        common_vendor.index.showToast({ title: "购物车是空的", icon: "none" });
        return;
      }
      const content = this.cartItems.map(
        (item) => `${item.name} x${item.quantity} ¥${(item.price * item.quantity).toFixed(2)}`
      ).join("\n");
      common_vendor.index.showModal({
        title: `购物车 (${this.cartTotal.count}件)`,
        content: `${content}

总计: ¥${this.cartTotal.amount}`,
        confirmText: "去结算",
        success: (res) => {
          if (res.confirm) {
            this.goToCheckout();
          }
        }
      });
    },
    goToCheckout() {
      if (this.cartItems.length === 0) {
        common_vendor.index.showToast({ title: "请先添加商品到购物车", icon: "none" });
        return;
      }
      common_vendor.index.navigateTo({ url: "/pages/order/confirm" });
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
      title: "啄木鸟健康商城",
      statusBarHeight: $data.statusBarHeight
    }),
    b: common_assets._imports_0$7,
    c: common_vendor.o((...args) => $options.handleSearch && $options.handleSearch(...args)),
    d: $data.searchKeyword,
    e: common_vendor.o(($event) => $data.searchKeyword = $event.detail.value),
    f: $data.searchKeyword
  }, $data.searchKeyword ? {
    g: common_vendor.o((...args) => $options.clearSearch && $options.clearSearch(...args))
  } : {}, {
    h: common_vendor.f($data.categories, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.id,
        c: $data.activeCategory === item.id ? 1 : "",
        d: common_vendor.o(($event) => $data.activeCategory = item.id, item.id)
      };
    }),
    i: common_vendor.f($options.filteredProducts, (product, k0, i0) => {
      return common_vendor.e({
        a: $data.selectedProducts.includes(product.id)
      }, $data.selectedProducts.includes(product.id) ? {} : {}, {
        b: common_vendor.o(($event) => $options.toggleSelect(product), product.id),
        c: product.images[0],
        d: common_vendor.t(product.name),
        e: common_vendor.t(product.desc),
        f: common_vendor.t(product.price),
        g: common_vendor.t(product.sales),
        h: product.id,
        i: common_vendor.o(($event) => $options.viewProductDetail(product), product.id)
      });
    }),
    j: common_assets._imports_1$2,
    k: $options.cartTotal.count > 0
  }, $options.cartTotal.count > 0 ? {
    l: common_vendor.t($options.cartTotal.count)
  } : {}, {
    m: $options.cartTotal.count > 0
  }, $options.cartTotal.count > 0 ? {
    n: common_vendor.t($options.cartTotal.amount)
  } : {}, {
    o: common_vendor.o((...args) => $options.showCart && $options.showCart(...args)),
    p: common_vendor.o((...args) => $options.goToCheckout && $options.goToCheckout(...args)),
    q: $options.cartTotal.count === 0 ? 1 : ""
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c1a2745a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/store/store.js.map
