<script>
import NavBar from '@/pages/components/nav-bar'
export default {
  components: { NavBar },
  onLaunch: function() {
    console.log('App Launch')
  }
}
</script>

<style>
/* 重置页面边距 */
page {
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
  height: 100%;
}

/* 增强版全局导航栏样式 */
.common-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  height: 120rpx;
  padding-top: var(--status-bar-height);
  background-color: #537bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.common-navbar .title {
  font-size: 36rpx;
  font-weight: 500;
  text-align: center;
}

.common-navbar .back-icon {
  position: absolute;
  left: 30rpx;
  width: 44rpx;
  height: 44rpx;
  z-index: 10;
  filter: brightness(0) invert(1);
}

/* 自动处理页面内容间距 */
.common-page {
  padding-top: calc(120rpx + var(--status-bar-height));
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #f9f9f9;
}

/* 副标题统一样式 */
.page-subtitle {
  font-size: 28rpx;
  color: #666;
  text-align: center;
  display: block;
  margin: 20rpx 0 40rpx;
}

/* 确保内容充满整个屏幕 */
.container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>