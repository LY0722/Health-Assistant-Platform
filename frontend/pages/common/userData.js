// userData.js - 前端模拟用户数据存储
let users = [
  {
    id: 1,
    phone: '13800138000',
    username: 'healthuser',
    password: '123456',
    nickname: '健康达人',
    healthData: {
      bmi: 22.5,
      score: 92,
      lastCheckup: '2023-05-15',
      bloodPressure: '120/80',
      bloodSugar: 5.2
    }
  },
  {
    id: 2,
    phone: '13900139000',
    username: 'fitnesslover',
    password: '123456',
    nickname: '运动爱好者',
    healthData: {
      bmi: 20.8,
      score: 88,
      lastCheckup: '2023-06-10',
      bloodPressure: '118/78',
      bloodSugar: 5.0
    }
  },
  {
    id: 3,
    phone: '13700137000',
    username: 'newuser',
    password: '123456',
    nickname: '新用户',
    healthData: {
      bmi: null,
      score: null,
      lastCheckup: null,
      bloodPressure: null,
      bloodSugar: null
    }
  }
];

export default {
  // 获取所有用户
  getUsers() {
    return users;
  },
  
  // 通过ID查找用户
  findUserById(id) {
    return users.find(user => user.id === id);
  },
  
  // 通过手机号查找用户
  findUserByPhone(phone) {
    return users.find(user => user.phone === phone);
  },
  
  // 添加新用户
  addUser(user) {
    const newUser = {
      id: users.length + 1,
      healthData: {
        bmi: null,
        score: null,
        lastCheckup: null,
        bloodPressure: null,
        bloodSugar: null
      },
      ...user
    };
    users.push(newUser);
    return newUser;
  },
  
  // 更新用户健康数据
  updateHealthData(userId, data) {
    const user = this.findUserById(userId);
    if (user) {
      user.healthData = {...user.healthData, ...data};
      return user;
    }
    return null;
  },
  
  // 验证用户登录
  validateLogin(phone, password) {
    const user = this.findUserByPhone(phone);
    if (!user) return null;
    if (user.password === password) {
      return user;
    }
    return null;
  },
  
  // 检查用户名是否存在
  isUsernameExist(username) {
    return users.some(user => user.username === username);
  },
  
  // 检查手机号是否存在
  isPhoneExist(phone) {
    return users.some(user => user.phone === phone);
  }
};