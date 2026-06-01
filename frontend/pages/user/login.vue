<template>
  <view class="login-container">
    <nav-bar title="登录" :show-back="true"></nav-bar>
    <!-- 顶部背景 -->
    <view class="login-header">
      <text class="welcome-text">欢迎回来</text>
      <text class="sub-text">请登录您的账号</text>
    </view>

    <!-- 登录表单 -->
    <view class="login-form">
      <view class="form-item">
        <text class="form-icon">📱</text>
        <input class="form-input" type="number" v-model="phone" placeholder="请输入手机号" maxlength="11" />
      </view>
      <view class="form-item">
        <text class="form-icon">🔒</text>
        <input class="form-input" :password="!showPassword" v-model="password" placeholder="请输入密码" />
        <text class="form-icon eye-icon" @click="togglePasswordVisibility">{{ showPassword ? '👁️' : '👁️‍🗨️' }}</text>
      </view>

      <view class="forgot-password" @click="navigateTo('/pages/login/forgotPassword')">
        <text>忘记密码?</text>
      </view>

      <button class="login-btn" @click="handleLogin">登录</button>

      <view class="register-link">
        <text>还没有账号?</text>
        <text class="register-text" @click="navigateTo('/pages/user/register')">立即注册</text>
      </view>
    </view>

    <!-- 其他登录方式 -->
    <view class="other-login-methods">
      <view class="divider">
        <view class="divider-line"></view>
        <text class="divider-text">其他登录方式</text>
        <view class="divider-line"></view>
      </view>

      <view class="methods">
        <view class="method-item" @click="loginWithWeChat">
          <text class="method-icon">💚</text>
          <text class="method-text">微信</text>
        </view>
        <view class="method-item" @click="loginWithQQ">
          <text class="method-icon">💙</text>
          <text class="method-text">QQ</text>
        </view>
        <view class="method-item" @click="loginWithWeibo">
          <text class="method-icon">❤️</text>
          <text class="method-text">微博</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
import userData from '@/pages/common/userData.js';
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
export default {
    components: {
    NavBar,
    uniIcons
  },
  data() {
    return {
      phone: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleLogin() {
      if (!this.phone) {
        uni.showToast({ title: '请输入手机号', icon: 'none' });
        return;
      }
      
      if (!this.password) {
        uni.showToast({ title: '请输入密码', icon: 'none' });
        return;
      }
      
      uni.showLoading({ title: '登录中...' });
      
      try {
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 验证用户登录
        const user = userData.validateLogin(this.phone, this.password);
        
        if (user) {
          uni.hideLoading();
          uni.showToast({ title: '登录成功', icon: 'success' });
          
          // 存储用户信息到本地
          uni.setStorageSync('user_id', user.id);
          uni.setStorageSync('user_info', user);
          
          setTimeout(() => {
            uni.switchTab({ url: '/pages/user/user' });
          }, 1200);
        } else {
          uni.hideLoading();
          uni.showToast({ title: '手机号或密码错误', icon: 'none' });
        }
      } catch (error) {
        uni.hideLoading();
        console.log('登录异常:', error);
        uni.showToast({ title: '登录失败: ' + (error.message || '未知错误'), icon: 'none' });
      }
    },
    loginWithWeChat() {
      uni.showToast({ title: '微信登录(模拟)', icon: 'none' });
    },
    loginWithQQ() {
      uni.showToast({ title: 'QQ登录(模拟)', icon: 'none' });
    },
    loginWithWeibo() {
      uni.showToast({ title: '微博登录(模拟)', icon: 'none' });
    },
    navigateTo(url) {
      uni.navigateTo({
        url: url
      });
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background-color: #F5F7FA;
}

.login-header {
  padding: 60rpx 40rpx;
  padding-top: 160rpx; /* 增加顶部间距 */
  border-bottom-left-radius: 40rpx;
  border-bottom-right-radius: 40rpx;
  color: #fff;
  background: linear-gradient(135deg, #00B4D8, #0083B0);
}

.welcome-text {
  font-size: 48rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.sub-text {
  font-size: 28rpx;
  opacity: 0.9;
}

.login-form {
  padding: 60rpx 40rpx;
  margin: 40rpx;
  margin-top: -40rpx;
  background-color: #fff;
  border-radius: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
}

.form-item {
  display: flex;
  align-items: center;
  padding: 30rpx 0;
  border-bottom: 1rpx solid #f1f1f1;
}

.form-icon {
  font-size: 36rpx;
  margin-right: 20rpx;
}

.eye-icon {
  margin-left: 20rpx;
  margin-right: 0;
}

.form-input {
  flex: 1;
  font-size: 28rpx;
  height: 40rpx;
  line-height: 40rpx;
}

.forgot-password {
  margin-top: 20rpx;
  text-align: right;
  font-size: 24rpx;
  color: #999;
}

.login-btn {
  background-color: #00B4D8;
  color: #fff;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 45rpx;
  font-size: 32rpx;
  margin-top: 60rpx;
}

.register-link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40rpx;
  font-size: 26rpx;
  color: #666;
}

.register-text {
  color: #00B4D8;
  margin-left: 10rpx;
}

.other-login-methods {
  margin: 60rpx 40rpx 0;
}

.divider {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}

.divider-line {
  flex: 1;
  height: 1rpx;
  background-color: #e5e5e5;
}

.divider-text {
  padding: 0 20rpx;
  font-size: 24rpx;
  color: #999;
}

.methods {
  display: flex;
  justify-content: space-around;
}

.method-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.method-icon {
  font-size: 50rpx;
}

.method-text {
  font-size: 24rpx;
  color: #666;
  margin-top: 10rpx;
}
</style>