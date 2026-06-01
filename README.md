# 医疗助手平台 (Health Assistant Platform)

## 系统简介
本系统是一个综合性的医疗健康管理助手，提供在线问诊咨询、健康指标监测（体重、血压、血糖）、健康知识科普以及医疗用品商城等功能。

## 项目结构
- `backend/`: 基于 Node.js + Express 的后端服务
- `frontend/`: 基于 uni-app 的跨平台前端应用

## 技术栈
- **后端**: Node.js, Express, MySQL, Sequelize (ORM)
- **前端**: Vue.js, uni-app, SCSS

## 系统要求
- Node.js 14+
- MySQL 8.0+
- HBuilderX（用于运行前端）

## 安装与运行

### 1. 后端配置
```bash
cd backend

# 安装依赖
npm install

# 数据库配置
# 1. 创建名为 healthassitant 的数据库
# 2. 修改 config/db/config.js 中的数据库连接信息

# 启动服务
node server.js
```

### 2. 前端配置
```bash
cd frontend

# 安装依赖
npm install

# 使用 HBuilderX 打开并运行
```

## 主要功能
- **在线服务**: 涵盖皮肤科、糖尿病、高血压、心理健康、儿科等专业领域。
- **健康管理**: 记录和追踪体重等健康数据。
- **医疗商城**: 提供血压计、血糖仪、营养品等医疗用品。
- **资讯中心**: 提供最新的健康资讯和医学科普文章。

## 注意事项
- 确保本地 MySQL 服务已启动。
- 前后端默认通过 RESTful API 进行交互。
