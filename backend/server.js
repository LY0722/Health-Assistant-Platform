const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3000;

// 测试数据库连接并启动服务器
sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功');
    app.listen(PORT, () => {
      console.log(`服务器运行在端口 ${PORT}`);
    });
  })
  .catch(err => {
    console.error('数据库连接失败:', err);
  });