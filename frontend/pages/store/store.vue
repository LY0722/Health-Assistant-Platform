<template>
  <view class="common-page">
  <nav-bar :title="'啄木鸟健康商城'" :statusBarHeight="statusBarHeight" />
  <!-- 搜索栏 -->
  <view class="search-container">
    <view class="search-bar">
      <image class="search-icon" src="/static/icon/shop/search.webp" />
      <input 
        class="search-input" 
        placeholder="搜索医疗商品" 
        v-model="searchKeyword"
        @confirm="handleSearch"
        confirm-type="search"
        placeholder-class="placeholder-style"
      />
<text 
  v-if="searchKeyword" 
  class="clear-icon" 
  @click="clearSearch"
>×</text>
    </view>
  </view>
    
    <!-- 分类+商品 -->
    <view class="main-container">
      <!-- 左侧分类 -->
      <scroll-view class="category-nav" scroll-y>
        <view v-for="item in categories" :key="item.id" 
              class="category-item" 
              :class="{active: activeCategory === item.id}"
              @click="activeCategory = item.id">
          {{ item.name }}
        </view>
      </scroll-view>
      
      <!-- 右侧商品 -->
      <scroll-view class="product-list" scroll-y>
        <view v-for="product in filteredProducts" :key="product.id" 
              class="product-card"
              @click="viewProductDetail(product)">
          <!-- 添加选择圆圈 -->
          <view class="select-circle" @click.stop="toggleSelect(product)">
            <view class="inner-circle" v-if="selectedProducts.includes(product.id)"></view>
          </view>
          <image class="product-image" :src="product.images[0]" mode="aspectFill"/>
          <view class="product-info">
            <text class="product-name">{{ product.name }}</text>
            <text class="product-desc">{{ product.desc }}</text>
            <view class="price-section">
              <text class="current-price">¥{{ product.price }}</text>
              <text class="sales">已售{{ product.sales }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    
    <!-- 购物车 -->
    <view class="cart-bar">
      <view class="cart-info" @click="showCart">
        <view class="cart-icon-wrapper">
          <image class="cart-icon" src="/static/icon/shop/cart.png"/>
          <text v-if="cartTotal.count > 0" class="cart-badge">{{ cartTotal.count }}</text>
        </view>
        <view class="cart-text">
          <text>购物车</text>
          <text v-if="cartTotal.count > 0" class="cart-amount">¥{{ cartTotal.amount }}</text>
        </view>
      </view>
      <view class="checkout-btn" @click="goToCheckout" :class="{disabled: cartTotal.count === 0}">
        去结算
      </view>
    </view>
  </view>
</template>

<script>
import NavBar from '@/pages/components/nav-bar'
import { products, categories } from '@/pages/common/mockData.js'

export default {
  components: { NavBar },
  data() {
    return {
      statusBarHeight: 0,
      activeCategory: 0,
      cartItems: [],
      products: products,
      categories: categories,
      selectedProducts: [],
      searchKeyword: '' // 新增搜索关键词
    }
  },
  onLoad() {
    const { statusBarHeight } = uni.getSystemInfoSync()
    this.statusBarHeight = statusBarHeight
  },
  computed: {
filteredProducts() {
  let filtered = this.activeCategory === 0 
    ? this.products 
    : this.products.filter(p => p.category === this.activeCategory)
  
  // 添加搜索过滤
  if (this.searchKeyword) {
    const keyword = this.searchKeyword.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(keyword) || 
      p.desc.toLowerCase().includes(keyword)
    )
  }
  
  return filtered
},
    cartTotal() {
      return {
        count: this.cartItems.reduce((sum, item) => sum + item.quantity, 0),
        amount: this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
      }
    }
  },

  methods: {
    handleSearch() {
      // 搜索逻辑已经在computed中实现
      uni.hideKeyboard()
    },
    clearSearch() {
      this.searchKeyword = ''
    },
    viewProductDetail(product) {
      uni.navigateTo({ url: `/pages/store/detail?id=${product.id}` })
    },
    addToCart(product) {
      const exist = this.cartItems.find(item => item.id === product.id)
      if (exist) {
        exist.quantity++
      } else {
        this.cartItems.push({...product, quantity: 1})
      }
      uni.showToast({ title: '已加入购物车', icon: 'success' })
    },
    toggleSelect(product) {
      const index = this.selectedProducts.indexOf(product.id)
      if (index === -1) {
        this.selectedProducts.push(product.id)
        this.addToCart(product)
      } else {
        this.selectedProducts.splice(index, 1)
        this.removeFromCart(product.id)
      }
    },
    removeFromCart(productId) {
      const index = this.cartItems.findIndex(item => item.id === productId)
      if (index !== -1) {
        this.cartItems.splice(index, 1)
      }
    },
    showCart() {
      if (this.cartItems.length === 0) {
        uni.showToast({ title: '购物车是空的', icon: 'none' })
        return
      }
      
      const content = this.cartItems.map(item => 
        `${item.name} x${item.quantity} ¥${(item.price * item.quantity).toFixed(2)}`
      ).join('\n')
      
      uni.showModal({
        title: `购物车 (${this.cartTotal.count}件)`,
        content: `${content}\n\n总计: ¥${this.cartTotal.amount}`,
        confirmText: '去结算',
        success: (res) => {
          if (res.confirm) {
            this.goToCheckout()
          }
        }
      })
    },
    goToCheckout() {
      if (this.cartItems.length === 0) {
        uni.showToast({ title: '请先添加商品到购物车', icon: 'none' })
        return
      }
      uni.navigateTo({ url: '/pages/order/confirm' })
    }
  }
}
</script>

<style scoped>
/* 搜索栏样式 */
.search-container {
  padding: 20rpx;
  background: #fff;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 40rpx;
  padding: 10rpx 20rpx;
  height: 70rpx;
}

.search-icon {
  width: 32rpx;
  height: 32rpx;
  margin-right: 10rpx;
}

.search-input {
  flex: 1;
  height: 100%;
  font-size: 28rpx;
  color: #333;
}

.clear-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: 10rpx;
  font-size: 32rpx;
  color: #999;
  text-align: center;
  line-height: 32rpx;
}

.placeholder-style {
  color: #999;
  font-size: 28rpx;
}
/* 左右布局 */
.main-container {
  display: flex;
  height: calc(100vh - 200rpx);
}

.category-nav {
  width: 180rpx;
  background: #f8f8f8;
}

.category-item {
  padding: 25rpx 10rpx;
  text-align: center;
  border-bottom: 1rpx solid #eee;
}

.category-item.active {
  background: #e6f2ff;
  color: #537bff;
  font-weight: bold;
}

.product-list {
  flex: 1;
  padding: 20rpx;
}

.select-circle {
  width: 40rpx;
  height: 40rpx;
  border: 2rpx solid #ccc;
  border-radius: 50%;
  margin-right: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner-circle {
  width: 24rpx;
  height: 24rpx;
  background-color: #537bff;
  border-radius: 50%;
}

.product-card {
  display: flex;
  align-items: center;
  padding: 20rpx;
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}

.product-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 8rpx;
}

.product-info {
  flex: 1;
  padding: 0 20rpx;
}

.product-name {
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}

.product-desc {
  font-size: 24rpx;
  color: #666;
  margin: 10rpx 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.current-price {
  color: #f40;
  font-weight: bold;
  font-size: 32rpx;
}

.sales {
  color: #999;
  font-size: 24rpx;
}

/* 购物车样式 - 全新设计 */
.cart-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100rpx;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.1);
  z-index: 100;
}

.cart-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.cart-icon-wrapper {
  position: relative;
  margin-right: 20rpx;
}

.cart-icon {
  width: 48rpx;
  height: 48rpx;
}

.cart-badge {
  position: absolute;
  right: -10rpx;
  top: -10rpx;
  background: #f23030;
  min-width: 36rpx;
  height: 36rpx;
  border-radius: 18rpx;
  text-align: center;
  line-height: 36rpx;
  font-size: 22rpx;
  color: #fff;
  padding: 0 6rpx;
}

.cart-text {
  display: flex;
  flex-direction: column;
}

.cart-amount {
  color: #f23030;
  font-size: 26rpx;
  font-weight: bold;
  margin-top: 4rpx;
}

.checkout-btn {
  background: #537bff;
  color: #fff;
  height: 72rpx;
  line-height: 72rpx;
  padding: 0 40rpx;
  border-radius: 36rpx;
  font-size: 30rpx;
  font-weight: bold;
}

.checkout-btn.disabled {
  background: #ccc;
  color: #999;
}
</style>