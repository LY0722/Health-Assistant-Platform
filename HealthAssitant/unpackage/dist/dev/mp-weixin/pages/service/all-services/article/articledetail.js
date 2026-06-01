"use strict";
const common_vendor = require("../../../../common/vendor.js");
const pages_common_articlesData = require("../../../common/articlesData.js");
const NavBar = () => "../../../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  data() {
    return {
      article: {}
    };
  },
  onLoad(options) {
    const id = parseInt(options.id);
    this.article = pages_common_articlesData.articleData.find((item) => item.id === id);
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    },
    formatDate() {
      const date = /* @__PURE__ */ new Date();
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
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
      title: "文章详情"
    }),
    b: common_vendor.t($data.article.category),
    c: common_vendor.t($data.article.title),
    d: common_vendor.t($data.article.author),
    e: common_vendor.t($options.formatDate()),
    f: common_vendor.t($data.article.content)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2f0cb08d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/service/all-services/article/articledetail.js.map
