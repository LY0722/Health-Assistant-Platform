woodpecker-health-backend/
├── config/                # 配置文件
│   └── db.config.js       # 数据库配置
├── controllers/           # 控制器
│   ├── auth.controller.js # 认证相关
│   ├── health.controller.js # 健康数据
│   ├── product.controller.js # 商城
│   ├── service.controller.js # 医疗服务
│   └── user.controller.js # 用户相关
├── middlewares/           # 中间件
│   ├── auth.js            # 认证中间件
│   └── errorHandler.js    # 错误处理
├── models/                # 数据模型
│   ├── health.model.js    # 健康数据模型
│   ├── index.js           # 模型初始化
│   ├── order.model.js     # 订单模型
│   ├── product.model.js   # 商品模型
│   ├── service.model.js   # 服务模型
│   └── user.model.js      # 用户模型
├── routes/                # 路由
│   ├── health.routes.js   # 健康数据路由
│   ├── index.js           # 主路由
│   ├── product.routes.js  # 商品路由
│   ├── service.routes.js  # 服务路由
│   └── user.routes.js     # 用户路由
├── services/              # 业务逻辑
│   ├── auth.service.js    # 认证服务
│   ├── health.service.js  # 健康数据服务
│   ├── product.service.js # 商品服务
│   ├── service.service.js # 医疗服务
│   └── user.service.js    # 用户服务
├── utils/                 # 工具函数
│   ├── apiFeatures.js     # API特性
│   ├── appError.js        # 自定义错误
│   └── jwt.js             # JWT工具
├── app.js                 # 主应用文件
├── package.json           # 项目配置
└── server.js              # 服务器入口