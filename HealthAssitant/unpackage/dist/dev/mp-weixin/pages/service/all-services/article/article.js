"use strict";
const common_vendor = require("../../../../common/vendor.js");
const pages_common_articlesData = require("../../../common/articlesData.js");
const NavBar = () => "../../../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  data() {
    return {
      articles: pages_common_articlesData.articleData
    };
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    navigateToDetail(id) {
      common_vendor.index.navigateTo({ url: `/pages/service/all-services/article/articledetail?id=${id}` });
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
      title: "文章列表"
    }),
    b: common_vendor.f($data.articles, (article, k0, i0) => {
      return {
        a: common_vendor.t(article.category),
        b: common_vendor.t(article.title),
        c: common_vendor.t(article.author),
        d: article.id,
        e: common_vendor.o(($event) => $options.navigateToDetail(article.id), article.id)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e2e814d1"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/service/all-services/article/article.js.map
