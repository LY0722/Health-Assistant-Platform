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
      newsId: null,
      newsDetail: {},
      isLiked: false,
      isCollected: false,
      relatedNews: []
    };
  },
  onLoad(options) {
    this.newsId = parseInt(options.id);
    this.loadNewsDetail();
  },
  methods: {
    loadNewsDetail() {
      const news = pages_common_newsData.newsData.find((item) => item.id === this.newsId);
      if (news) {
        this.newsDetail = news;
        this.loadRelatedNews(news.category);
      }
    },
    loadRelatedNews(category) {
      this.relatedNews = pages_common_newsData.newsData.filter((item) => item.category === category && item.id !== this.newsId).slice(0, 3);
    },
    formatContent(content) {
      return content.replace(/\n/g, "<br/>");
    },
    toggleLike() {
      this.isLiked = !this.isLiked;
      common_vendor.index.showToast({
        title: this.isLiked ? "点赞成功" : "已取消点赞",
        icon: "none"
      });
    },
    collectNews() {
      this.isCollected = !this.isCollected;
      common_vendor.index.showToast({
        title: this.isCollected ? "收藏成功" : "已取消收藏",
        icon: "none"
      });
    },
    shareNews() {
      common_vendor.index.share({
        title: this.newsDetail.title,
        summary: this.newsDetail.summary,
        href: "https://yourdomain.com/news/" + this.newsId,
        success: () => {
          common_vendor.index.showToast({ title: "分享成功", icon: "success" });
        }
      });
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
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.newsDetail.title,
      ["show-back"]: true
    }),
    b: common_vendor.t($data.newsDetail.title),
    c: common_vendor.t($data.newsDetail.author),
    d: common_vendor.t($data.newsDetail.authorTitle),
    e: common_vendor.t($data.newsDetail.date),
    f: common_vendor.p({
      type: "eye",
      size: "14",
      color: "#999"
    }),
    g: common_vendor.t($data.newsDetail.views),
    h: common_vendor.p({
      type: "hand-thumbsup",
      size: "14",
      color: "#999"
    }),
    i: common_vendor.t($data.newsDetail.likes),
    j: $data.newsDetail.image,
    k: $options.formatContent($data.newsDetail.content),
    l: $data.relatedNews.length > 0
  }, $data.relatedNews.length > 0 ? {
    m: common_vendor.f($data.relatedNews, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: item.id,
        c: common_vendor.o(($event) => $options.viewDetail(item.id), item.id)
      };
    })
  } : {}, {
    n: common_vendor.p({
      type: $data.isLiked ? "hand-thumbsup-filled" : "hand-thumbsup",
      size: "20",
      color: $data.isLiked ? "#FF4081" : "#666"
    }),
    o: common_vendor.t($data.isLiked ? "已点赞" : "点赞"),
    p: common_vendor.o((...args) => $options.toggleLike && $options.toggleLike(...args)),
    q: common_vendor.p({
      type: "redo",
      size: "20",
      color: "#666"
    }),
    r: common_vendor.o((...args) => $options.shareNews && $options.shareNews(...args)),
    s: common_vendor.p({
      type: $data.isCollected ? "star-filled" : "star",
      size: "20",
      color: $data.isCollected ? "#FFC107" : "#666"
    }),
    t: common_vendor.t($data.isCollected ? "已收藏" : "收藏"),
    v: common_vendor.o((...args) => $options.collectNews && $options.collectNews(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-65a5d6f7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/service/all-services/news/newsDetail.js.map
