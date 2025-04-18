// pages/result/result.js
// 结果展示页面

Page({
  data: {
    result: null,
    toolName: '',
    content: '',
    timestamp: 0,
    copied: false
  },
  
  onLoad: function() {
    // 页面加载时，设置导航栏标题
    wx.setNavigationBarTitle({
      title: '生成结果'
    });
    
    // 从缓存获取最近一次结果
    try {
      const resultData = wx.getStorageSync('latest_result');
      if (resultData) {
        this.setData({
          result: resultData,
          toolName: resultData.toolName || '工具结果',
          content: resultData.content || '',
          timestamp: resultData.timestamp || Date.now()
        });
      } else {
        this.showError('未找到结果数据');
      }
    } catch (e) {
      console.error('获取结果失败:', e);
      this.showError('获取结果失败');
    }
  },
  
  // 复制内容到剪贴板
  copyContent: function() {
    const { content } = this.data;
    
    wx.setClipboardData({
      data: content,
      success: () => {
        this.setData({ copied: true });
        
        setTimeout(() => {
          this.setData({ copied: false });
        }, 2000);
      },
      fail: () => {
        wx.showToast({
          title: '复制失败',
          icon: 'none'
        });
      }
    });
  },
  
  // 分享结果
  onShareAppMessage: function() {
    return {
      title: `【${this.data.toolName}】我用AI Camp生成了这个内容`,
      path: '/pages/index/index',
      imageUrl: '/images/share-image.png'
    };
  },
  
  // 返回工具页面
  goBackToTool: function() {
    wx.navigateBack();
  },
  
  // 返回工具列表
  goToTools: function() {
    wx.switchTab({
      url: '/pages/tools/tools'
    });
  },
  
  // 显示错误信息
  showError: function(message) {
    wx.showToast({
      title: message,
      icon: 'none',
      duration: 2000
    });
  }
});
