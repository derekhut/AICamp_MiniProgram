// app.js
App({
  onLaunch: function () {
    // 使用本地模拟模式，不初始化云开发环境
    console.log('小程序启动成功（本地模拟模式）');
    
    // 云环境初始化代码（当前禁用）
    /*
    if (wx.cloud) {
      wx.cloud.init({
        env: 'your-env-id', // 替换为您的云开发环境ID
        traceUser: false    // 不跟踪用户身份
      });
      console.log('云开发初始化成功');
    } else {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    }
    */
  },
  globalData: {
    // 全局数据
    isLocalMode: true, // 本地模拟模式标志
    mockData: {}
  }
})
