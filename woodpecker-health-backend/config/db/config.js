require('dotenv').config();

module.exports = {
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USER || 'root',
  PASSWORD: process.env.DB_PASSWORD || '032915',
  DB: process.env.DB_NAME || 'healthassitant',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
    underscored: true, // 使用下划线命名风格
    freezeTableName: true // 防止 Sequelize 自动将表名变为复数
  }
};