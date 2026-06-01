<template>
  <view class="register-container">
    <nav-bar title="注册" :show-back="true"></nav-bar>
    <!-- 顶部背景 -->
    <view class="register-header">
      <text class="welcome-text">创建账号</text>
      <text class="sub-text">加入健康管理社区</text>
    </view>

    <!-- 注册表单 -->
    <view class="register-form">
      <view class="form-item">
        <text class="form-icon">📱</text>
        <input class="form-input" type="number" v-model="phone" placeholder="请输入手机号" maxlength="11" />
      </view>

      <view class="form-item">
        <text class="form-icon">👤</text>
        <input class="form-input" v-model="username" placeholder="请输入昵称" maxlength="20" />
      </view>

      <view class="form-item">
        <text class="form-icon">🔒</text>
        <input class="form-input" :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="请输入密码(6-20位)" />
        <text class="form-icon eye-icon" @click="togglePasswordVisibility">{{ showPassword ? '👁️' : '👁️‍🗨️' }}</text>
      </view>

      <view class="form-item">
        <text class="form-icon">🔐</text>
        <input class="form-input" :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="请再次输入密码" />
        <text class="form-icon eye-icon" @click="toggleConfirmPasswordVisibility">{{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}</text>
      </view>

      <view class="agreement">
        <checkbox-group @change="handleAgreementChange">
          <label>
            <checkbox :checked="agreed" color="#00B4D8" style="transform:scale(0.7)"/>
            <text>我已阅读并同意</text>
            <text class="agreement-link" @click="navigateTo('/pages/login/userAgreement')">《用户协议》</text>
            <text>和</text>
            <text class="agreement-link" @click="navigateTo('/pages/login/privacyPolicy')">《隐私政策》</text>
          </label>
        </checkbox-group>
      </view>

      <button class="register-btn" @click="handleRegister" :disabled="!canRegister">注册</button>

      <view class="login-link">
        <text>已有账号?</text>
        <text class="login-text" @click="navigateTo('/pages/login/login')">立即登录</text>
      </view>
    </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
import userData from '@/pages/common/userData.js';

export default {
    components: {
    NavBar,
    uniIcons
  },
  data() {
    return {
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      agreed: false
    }
  },
  computed: {
    canRegister() {
      return this.phone && this.username && this.password && this.confirmPassword && this.agreed;
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    handleAgreementChange(e) {
      this.agreed = e.detail.value.length > 0;
    },
    async handleRegister() {
      if (!this.phone) {
        uni.showToast({ title: '请输入手机号', icon: 'none' }); return;
      }
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        uni.showToast({ title: '请输入正确的手机号', icon: 'none' }); return;
      }
      if (!this.username) {
        uni.showToast({ title: '请输入昵称', icon: 'none' }); return;
      }
      if (!this.password) {
        uni.showToast({ title: '请输入密码', icon: 'none' }); return;
      }
      if (this.password.length < 6 || this.password.length > 20) {
        uni.showToast({ title: '密码长度应为6-20位', icon: 'none' }); return;
      }
      if (this.password !== this.confirmPassword) {
        uni.showToast({ title: '两次输入的密码不一致', icon: 'none' }); return;
      }
      if (!this.agreed) {
        uni.showToast({ title: '请先同意用户协议和隐私政策', icon: 'none' }); return;
      }
      
      // 检查手机号是否已存在
      if (userData.isPhoneExist(this.phone)) {
        uni.showToast({ title: '该手机号已注册', icon: 'none' });
        return;
      }
      
      // 检查用户名是否已存在
      if (userData.isUsernameExist(this.username)) {
        uni.showToast({ title: '该用户名已存在', icon: 'none' });
        return;
      }

      uni.showLoading({ title: '注册中...' });
      
      try {
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 添加新用户到前端存储
        const newUser = userData.addUser({
          username: this.username,
          password: this.password,
          nickname: this.username,
          phone: this.phone,
          healthData: {
            bmi: null,
            score: null,
            lastCheckup: null,
            bloodPressure: null,
            bloodSugar: null
          }
        });
        
        uni.hideLoading();
        uni.showToast({ title: '注册成功', icon: 'success' });
        
        // 存储用户ID到本地
        uni.setStorageSync('user_id', newUser.id);
        uni.setStorageSync('user_info', newUser);
        
        setTimeout(() => {
          uni.switchTab({ url: '/pages/user/user' });
        }, 1200);
      } catch (error) {
        uni.hideLoading();
        console.log('注册异常:', error);
        uni.showToast({ title: '注册失败: ' + (error.message || '未知错误'), icon: 'none' });
      }
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
.register-container {
  min-height: 100vh;
  background-color: #F5F7FA;
}

.register-header {
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

.register-form {
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

.agreement {
  margin-top: 40rpx;
  font-size: 24rpx;
  color: #666;
  display: flex;
  align-items: center;
}

.agreement-link {
  color: #00B4D8;
}

.register-btn {
  background-color: #00B4D8;
  color: #fff;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 45rpx;
  font-size: 32rpx;
  margin-top: 60rpx;
}

.register-btn[disabled] {
  background-color: #CCCCCC;
  color: #fff;
}

button::after {
  border: none;
}

.login-link {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40rpx;
  font-size: 26rpx;
  color: #666;
}

.login-text {
  color: #00B4D8;
  margin-left: 10rpx;
}
</style>