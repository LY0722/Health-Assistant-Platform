// /pages/store/mockData.js
export const categories = [
  { id: 0, name: '全部' },
  { id: 1, name: '医疗器械' },
  { id: 2, name: '保健食品' },
  { id: 3, name: '康复护理' },
  { id: 4, name: '中医养生' },
  { id: 5, name: '个人防护' }
]

export const products = [
  {
    id: 1,
    name: '电子血压计',
    desc: '鱼跃血压计电子血压计血压测量仪家用老人全自动高准确语音血压仪',
    price: 199.00,
    originalPrice: 249.00,
    discount: 50.00,
    sales: 1254,
    stock: 89,
    favorites: 567,
    category: 1,
    images: [
      '/static/images/products/blood_pressure_meter.jpg'
    ],
    detail: `<div style="padding:20rpx;color:#333;">
      <h3>产品参数：</h3>
      <p>• 产品名称：电子血压计</p>
      <p>• 品牌：鱼跃</p>
      <p>• 型号：YE680A</p>
      <h3>产品特点：</h3>
      <p>• 智能加压技术，测量更舒适</p>
      <p>• 大屏幕高清显示，读数清晰</p>
      <p>• 语音播报功能，适合老年人使用</p>
    </div>`
  },
  {
    id: 2,
    name: '血糖仪',
    desc: '鱼跃血糖测量仪医用精准血糖仪试纸家用仪器全自动免调精准',
    price: 159.00,
    originalPrice: 199.00,
    discount: 40.00,
    sales: 892,
    stock: 56,
    favorites: 342,
    category: 1,
    images: [
      '/static/images/products/glucometer.jpg'
    ],
    detail: `<div style="padding:20rpx;color:#333;">
      <h3>产品参数：</h3>
      <p>• 产品名称：血糖仪</p>
      <p>• 测量范围：1.1-33.3mmol/L</p>
      <h3>产品特点：</h3>
      <p>• 0痛感采血技术</p>
      <p>• 5秒快速出结果</p>
    </div>`
  },
  {
    id: 3,
    name: '鱼油软胶囊',
    desc: '黄金搭档深海鱼油软胶囊60粒DHA高纯度Omega3无糖型中老年成人EPA',
    price: 89.00,
    originalPrice: 129.00,
    discount: 40.00,
    sales: 3562,
    stock: 230,
    favorites: 1245,
    category: 2,
    images: [
      '/static/images/products/fish_oil.jpg'
    ],
    detail: `<div style="padding:20rpx;color:#333;">
      <h3>产品参数：</h3>
      <p>• 产品名称：深海鱼油软胶囊</p>
      <p>• 规格：60粒/瓶</p>
      <h3>功效：</h3>
      <p>• 辅助降血脂</p>
      <p>• 改善记忆功能</p>
    </div>`
  },
  {
    id: 4,
    name: '颈椎按摩仪',
    desc: '联想颈椎按摩器按摩枕腰部背部多功能腰椎脖子肩颈揉捏家用按摩仪',
    price: 259.00,
    originalPrice: 299.00,
    discount: 40.00,
    sales: 1568,
    stock: 78,
    favorites: 876,
    category: 3,
    images: [
      '/static/images/products/massager.jpg'
    ],
    detail: `<div style="padding:20rpx;color:#333;">
      <h3>产品参数：</h3>
      <p>• 产品名称：颈椎按摩仪</p>
      <p>• 按摩方式：脉冲按摩</p>
      <h3>功能特点：</h3>
      <p>• 3D立体揉捏</p>
      <p>• 恒温热敷功能</p>
    </div>`
  },
  {
    id: 5,
    name: '医用口罩',
    desc: '鸿亮升口罩正规医用级口罩一次性口罩夏季薄款独立包装不勒耳三层',
    price: 19.90,
    originalPrice: 29.90,
    discount: 10.00,
    sales: 9856,
    stock: 450,
    favorites: 2345,
    category: 5,
    images: [
      '/static/images/products/mask.jpg',
      '/static/images/products/mask_1.jpg'
    ],
    detail: `<div style="padding:20rpx;color:#333;">
      <h3>产品参数：</h3>
      <p>• 产品名称：医用外科口罩</p>
      <p>• 规格：50只/盒</p>
      <h3>特点：</h3>
      <p>• 三层防护结构</p>
      <p>• 独立包装，卫生方便</p>
    </div>`
  },
  {
    id: 6,
    name: '智能体脂秤',
    desc: '匹克高精准电子秤体重秤家用小型充电体脂秤家庭减肥称重计人体称',
    price: 129.00,
    originalPrice: 159.00,
    discount: 30.00,
    sales: 2345,
    stock: 120,
    favorites: 765,
    category: 1,
    images: [
      '/static/images/products/scale.jpg',
      '/static/images/products/scale_1.jpg'
    ],
    detail: `<div style="padding:20rpx;color:#333;">
      <h3>产品参数：</h3>
      <p>• 产品名称：智能体脂秤</p>
      <p>• 测量指标：体重、体脂率等10项数据</p>
      <h3>特点：</h3>
      <p>• APP数据同步</p>
      <p>• 高精度传感器</p>
    </div>`
  },
  {
    id: 7,
    name: '艾灸盒',
    desc: '好艾哥艾灸盒腰腹部暖宫艾灸仪艾灸器具宫寒新款随身灸盒便携式',
    price: 69.00,
    originalPrice: 89.00,
    discount: 20.00,
    sales: 1234,
    stock: 56,
    favorites: 432,
    category: 4,
    images: [
      '/static/images/products/moxibustion.jpg'
    ],
    detail: `<div style="padding:20rpx;color:#333;">
      <h3>产品参数：</h3>
      <p>• 产品名称：艾灸盒</p>
      <p>• 材质：环保竹制</p>
      <h3>功效：</h3>
      <p>• 温经通络</p>
      <p>• 祛寒除湿</p>
    </div>`
  },
  {
    id: 8,
    name: '维生素C',
    desc: '诺特兰德维生素CE烟酰胺咀嚼片b族vc片烟酰胺vc美高光白青少年',
    price: 39.00,
    originalPrice: 59.00,
    discount: 20.00,
    sales: 4567,
    stock: 120,
    favorites: 890,
    category: 2,
    images: [
      '/static/images/products/vitamin_c.jpg'
    ],
    detail: `<div style="padding:20rpx;color:#333;">
      <h3>产品参数：</h3>
      <p>• 产品名称：维生素C咀嚼片</p>
      <p>• 规格：60片/瓶</p>
      <h3>功效：</h3>
      <p>• 增强免疫力</p>
      <p>• 抗氧化美白</p>
    </div>`
  }
]