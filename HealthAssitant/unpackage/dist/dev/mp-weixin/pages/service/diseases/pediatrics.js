"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const NavBar = () => "../../components/nav-bar.js";
const _sfc_main = {
  components: { NavBar },
  data() {
    return {
      milestones: [
        {
          age: "0-3个月",
          title: "快速发育期",
          description: "婴儿在这个阶段会快速成长，开始学会抬头、微笑和发出声音。"
        },
        {
          age: "4-6个月",
          title: "感知世界",
          description: "婴儿开始伸手抓物、翻身，对周围环境表现出浓厚兴趣。"
        },
        {
          age: "7-12个月",
          title: "探索与学习",
          description: "婴儿开始爬行、站立，可能会说出第一个词语，认知能力快速发展。"
        },
        {
          age: "1-2岁",
          title: "语言与社交",
          description: "幼儿开始走路、说话，能够表达自己的需求，开始与他人互动。"
        },
        {
          age: "3-6岁",
          title: "创造力爆发",
          description: "儿童开始发展想象力和创造力，喜欢玩耍、绘画和讲故事。"
        }
      ],
      nextVaccine: {
        name: "百白破疫苗",
        date: "2025年7月15日",
        description: "第三针，预防百日咳、白喉和破伤风"
      },
      commonDiseases: [
        {
          name: "感冒",
          image: "/static/images/service/pediatrics/cold.png",
          description: "保持室内通风，避免接触感染源，及时增减衣物。"
        },
        {
          name: "发烧",
          image: "/static/images/service/pediatrics/fever.png",
          description: "注意观察体温变化，物理降温，必要时使用退烧药。"
        },
        {
          name: "腹泻",
          image: "/static/images/service/pediatrics/diarrhea.png",
          description: "多喝水，保持水分平衡，饮食清淡易消化。"
        },
        {
          name: "湿疹",
          image: "/static/images/service/pediatrics/eczema.png",
          description: "保持皮肤清洁干燥，避免刺激物，使用温和护肤品。"
        }
      ],
      experts: [
        {
          name: "李医生",
          title: "主任医师",
          department: "儿科",
          avatar: "/static/images/doctors/doctor2.png"
        },
        {
          name: "王医生",
          title: "副主任医师",
          department: "儿童保健科",
          avatar: "/static/images/doctors/user3.png"
        },
        {
          name: "张医生",
          title: "主治医师",
          department: "小儿神经内科",
          avatar: "/static/images/doctors/user4.png"
        }
      ]
    };
  }
};
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  _component_nav_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "儿科健康服务"
    }),
    b: common_vendor.f($data.milestones, (milestone, index, i0) => {
      return {
        a: common_vendor.t(milestone.age),
        b: common_vendor.t(milestone.title),
        c: common_vendor.t(milestone.description),
        d: index
      };
    }),
    c: common_vendor.t($data.nextVaccine.date),
    d: common_assets._imports_0$3,
    e: common_vendor.t($data.nextVaccine.name),
    f: common_vendor.t($data.nextVaccine.description),
    g: common_vendor.f($data.commonDiseases, (disease, index, i0) => {
      return {
        a: disease.image,
        b: common_vendor.t(disease.name),
        c: common_vendor.t(disease.description),
        d: index
      };
    }),
    h: common_vendor.f($data.experts, (expert, index, i0) => {
      return {
        a: expert.avatar,
        b: common_vendor.t(expert.name),
        c: common_vendor.t(expert.title),
        d: common_vendor.t(expert.department),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-772f9bf3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/service/diseases/pediatrics.js.map
