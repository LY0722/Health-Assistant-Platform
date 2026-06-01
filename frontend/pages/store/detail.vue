<template>
  <view class="common-page">
    <!-- 页面头部 -->
    <nav-bar title="商品详情" />
    
    <!-- 轮播图 - 移除margin-top -->
    <swiper class="swiper" :autoplay="true" interval="3000" duration="500">
      <swiper-item v-for="(img, index) in product.images" :key="index">
        <image class="swiper-image" :src="img" mode="aspectFill"></image>
      </swiper-item>
    </swiper>
    
    <!-- 商品信息 -->
    <view class="product-info">
      <text class="name">{{ product.name }}</text>
      <text class="desc">{{ product.desc }}</text>
      <view class="price-row">
        <text class="price">¥{{ product.price }}</text>
        <text class="original-price" v-if="product.originalPrice">¥{{ product.originalPrice }}</text>
      </view>
      <view class="meta">
        <text>已售 {{ product.sales }}</text>
        <text>库存 {{ product.stock }}</text>
      </view>
    </view>
    
    <!-- 商品详情 - 添加底部padding防止被操作栏遮挡 -->
    <view class="detail-content">
      <view class="title">商品详情</view>
      <rich-text :nodes="product.detail"></rich-text>
    </view>
    
    <!-- 操作栏 -->
    <view class="action-bar">
      <view class="btn add-cart" @click="addToCart">加入购物车</view>
      <view class="btn buy-now" @click="buyNow">立即购买</view>
    </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
import { products } from '@/pages/common/mockData.js'

export default {
  components: { NavBar },
  data() {
    return {
      product: {
        id: 0,
        name: '',
        desc: '',
        price: 0,
        originalPrice: 0,
        sales: 0,
        stock: 0,
        images: [],
        detail: ''
      }
    }
  },
  onLoad(options) {
    if (options.id) {
      const found = products.find(p => p.id == options.id)
      if (found) this.product = found
    }
  },
  methods: {
    goBack() {
      uni.navigateBack()
    },
    addToCart() {
      uni.showToast({ title: '加入购物车成功', icon: 'success' })
    },
    buyNow() {
      uni.navigateTo({ url: '/pages/order/confirm?productId=' + this.product.id })
    }
  }
}
</script>

<style scoped>
/* 轮播图 - 移除margin-top */
.swiper {
  height: 750rpx;
}

.swiper-image {
  width: 100%;
  height: 100%;
}

/* 商品信息 */
.product-info {
  padding: 30rpx;
  background-color: #fff;
  margin-bottom: 20rpx;
}

.name {
  font-size: 34rpx;
  color: #333;
  font-weight: bold;
  line-height: 48rpx;
  margin-bottom: 20rpx;
}

.desc {
  font-size: 28rpx;
  color: #666;
  line-height: 40rpx;
  margin-bottom: 20rpx;
}

.price-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 20rpx;
}

.price {
  font-size: 40rpx;
  color: #f23030;
  font-weight: bold;
}

.original-price {
  font-size: 28rpx;
  color: #999;
  text-decoration: line-through;
  margin-left: 20rpx;
}

.meta {
  display: flex;
  font-size: 24rpx;
  color: #999;
}

.meta text:first-child {
  margin-right: 40rpx;
}

/* 商品详情内容 - 添加底部padding防止被操作栏遮挡 */
.detail-content {
  background-color: #fff;
  padding: 30rpx;
  padding-bottom: 120rpx; /* 操作栏高度 + 额外间距 */
}

.detail-content .title {
  text-align: left;
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
  padding-bottom: 20rpx;
  border-bottom: 2rpx solid #eee;
  margin-bottom: 30rpx;
}

/* 操作栏 */
.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  display: flex;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.1);
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  color: #fff;
  font-weight: bold;
}

.add-cart {
  background-color: #ff9500;
}

.buy-now {
  background-color: #f23030;
}
</style>