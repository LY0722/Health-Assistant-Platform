"use strict";
const common_vendor = require("../../../../common/vendor.js");
const pages_common_newsData = require("../../../common/newsData.js");
const NavBar = () => "../../../components/nav-bar.js";
const uniIcons = () => "../../../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _sfc_main = {
  components: {
    NavBar,
    uniIcons
  },
  data() {
    return {
      newsList: pages_common_newsData.newsData,
      currentCategory: "all",
      categories: [
        { id: "all", name: "全部" },
        { id: "慢性病", name: "慢性病" },
        { id: "糖尿病", name: "糖尿病" },
        { id: "骨骼健康", name: "骨骼健康" },
        { id: "心理健康", name: "心理健康" }
      ]
    };
  },
  computed: {
    filteredNews() {
      if (this.currentCategory === "all") {
        return this.newsList;
      }
      return this.newsList.filter((item) => item.category === this.currentCategory);
    }
  },
  methods: {
    changeCategory(categoryId) {
      this.currentCategory = categoryId;
    },
    viewDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/service/all-services/news/newsDetail?id=${id}`
      });
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_nav_bar + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "健康资讯"
    }),
    b: common_vendor.f($data.categories, (category, k0, i0) => {
      return {
        a: common_vendor.t(category.name),
        b: category.id,
        c: $data.currentCategory === category.id ? 1 : "",
        d: common_vendor.o(($event) => $options.changeCategory(category.id), category.id)
      };
    }),
    c: common_vendor.f($options.filteredNews, (item, k0, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.summary),
        d: common_vendor.t(item.category),
        e: common_vendor.t(item.date),
        f: "560a4739-1-" + i0,
        g: common_vendor.t(item.views),
        h: "560a4739-2-" + i0,
        i: common_vendor.t(item.likes),
        j: item.id,
        k: common_vendor.o(($event) => $options.viewDetail(item.id), item.id)
      };
    }),
    d: common_vendor.p({
      type: "eye",
      size: "14",
      color: "#999"
    }),
    e: common_vendor.p({
      type: "hand-thumbsup",
      size: "14",
      color: "#999"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-560a4739"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/service/all-services/news/news.js.map
