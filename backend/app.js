const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./middlewares/errorHandler');

// 路由
const indexRouter = require('./routes/index');

const app = express();

// 中间件
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/api/v1', indexRouter);

// 404处理
app.all('*', (req, res, next) => {
  next(new AppError(`找不到 ${req.originalUrl} 这个路由`, 404));
});

// 全局错误处理
app.use(globalErrorHandler);

module.exports = app;