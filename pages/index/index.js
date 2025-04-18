// index.js
Page({
  data: {
    // 页面数据
  },
  
  onLoad: function() {
    // 页面加载时执行
  },
  
  // 点击"开始使用"按钮，导航到工具页面
  navigateToTools: function() {
    wx.navigateTo({
      url: '/pages/tools/tools',
    })
  }
})
