// 导航栏逻辑复用
export default {
  methods: {
    navigateBack() {
      uni.navigateBack()
    },
    navigateTo(url) {
      uni.navigateTo({ url })
    }
  }
}