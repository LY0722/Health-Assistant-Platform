"use strict";
const common_vendor = require("../../../common/vendor.js");
const pages_common_doctorsData = require("../../common/doctorsData.js");
const NavBar = () => "../../components/nav-bar.js";
const uniIcons = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
const _sfc_main = {
  components: {
    NavBar,
    uniIcons
  },
  data() {
    return {
      doctor: null,
      isFollowing: false,
      expertise: [
        "高血压、冠心病等心血管疾病诊治",
        "心脏介入手术治疗",
        "心血管疾病预防与康复",
        "疑难心血管病例会诊"
      ],
      schedule: [
        { day: "周一", time: "上午 8:00-12:00", available: true },
        { day: "周二", time: "下午 13:30-17:30", available: false },
        { day: "周三", time: "上午 8:00-12:00", available: true },
        { day: "周四", time: "全天 8:00-17:30", available: true },
        { day: "周五", time: "下午 13:30-17:30", available: true },
        { day: "周六", time: "上午 8:00-12:00", available: false },
        { day: "周日", time: "休息", available: false }
      ],
      reviews: [
        {
          id: 1,
          name: "张先生",
          avatar: "/static/images/doctors/user4.png",
          rating: 5,
          comment: "赵医生医术精湛，耐心解答我的问题，治疗效果很好！",
          time: "2023-05-15"
        },
        {
          id: 2,
          name: "李女士",
          avatar: "/static/images/doctors/user3.png",
          rating: 4,
          comment: "医生很专业，就是等待时间有点长，总体体验不错。",
          time: "2023-04-28"
        }
      ]
    };
  },
  onLoad(options) {
    const doctorId = parseInt(options.id);
    this.doctor = pages_common_doctorsData.doctorsData.find((doctor) => doctor.id === doctorId) || {};
  },
  methods: {
    toggleFollow() {
      this.isFollowing = !this.isFollowing;
      common_vendor.index.showToast({
        title: this.isFollowing ? "已关注该医生" : "已取消关注",
        icon: "none"
      });
    },
    startConsult() {
      common_vendor.index.showToast({
        title: "开始咨询医生",
        icon: "none"
      });
    },
    makeAppointment() {
      common_vendor.index.navigateTo({
        url: `/pages/appointment/create?doctorId=${this.doctor.id}`
      });
    },
    viewAllReviews() {
      common_vendor.index.navigateTo({
        url: `/pages/doctor/reviews?doctorId=${this.doctor.id}`
      });
    }
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_nav_bar + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../../node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "医生详情",
      ["show-back"]: true
    }),
    b: $data.doctor.avatar || "/static/images/doctors/default-avatar.png",
    c: common_vendor.t($data.doctor.name),
    d: common_vendor.t($data.doctor.title),
    e: common_vendor.t($data.doctor.department),
    f: common_vendor.p({
      type: "info",
      size: "20",
      color: "#537BFF"
    }),
    g: common_vendor.t($data.doctor.introduction),
    h: common_vendor.p({
      type: "star",
      size: "20",
      color: "#537BFF"
    }),
    i: common_vendor.f($data.expertise, (item, index, i0) => {
      return {
        a: "da61c4d7-3-" + i0,
        b: common_vendor.t(item),
        c: index
      };
    }),
    j: common_vendor.p({
      type: "checkmarkempty",
      size: "16",
      color: "#537BFF"
    }),
    k: common_vendor.p({
      type: "calendar",
      size: "20",
      color: "#537BFF"
    }),
    l: common_vendor.f($data.schedule, (day, k0, i0) => {
      return {
        a: common_vendor.t(day.day),
        b: common_vendor.t(day.time),
        c: common_vendor.t(day.available ? "可预约" : "已满"),
        d: day.available ? 1 : "",
        e: day.day
      };
    }),
    m: common_vendor.p({
      type: "chat",
      size: "20",
      color: "#537BFF"
    }),
    n: common_vendor.o((...args) => $options.viewAllReviews && $options.viewAllReviews(...args)),
    o: common_vendor.f($data.reviews, (review, k0, i0) => {
      return {
        a: review.avatar,
        b: common_vendor.t(review.name),
        c: common_vendor.f(5, (i, k1, i1) => {
          return {
            a: i,
            b: "da61c4d7-6-" + i0 + "-" + i1,
            c: common_vendor.p({
              type: "star-filled",
              size: "16",
              color: i <= review.rating ? "#FFC107" : "#E0E0E0"
            })
          };
        }),
        d: common_vendor.t(review.comment),
        e: common_vendor.t(review.time),
        f: review.id
      };
    }),
    p: common_vendor.p({
      type: $data.isFollowing ? "heart-filled" : "heart",
      size: "20",
      color: $data.isFollowing ? "#FF4081" : "#666"
    }),
    q: common_vendor.t($data.isFollowing ? "已关注" : "关注"),
    r: common_vendor.o((...args) => $options.toggleFollow && $options.toggleFollow(...args)),
    s: common_vendor.o((...args) => $options.startConsult && $options.startConsult(...args)),
    t: common_vendor.o((...args) => $options.makeAppointment && $options.makeAppointment(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-da61c4d7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/service/doctors/doctordetail.js.map
