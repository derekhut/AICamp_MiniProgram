// pages/tool-detail/sentence/index.js
// 通用工具详情页面

const toolsConfig = require('../../../config/tools');

Page({
  data: {
    toolId: 'sentence-expansion',
    toolTitle: '工具详情',
    tool: null,
    formData: {},
    loading: false,
    error: ''
  },
  
  onLoad: function(options) {
    // 从参数中获取工具ID
    let toolId = 'sentence-expansion'; // 默认工具
    
    if (options && options.id) {
      toolId = options.id;
    }
    
    // 获取工具信息
    const tool = toolsConfig.getToolById(toolId);
    
    if (tool) {
      // 初始化表单数据
      const formData = {};
      if (tool.formFields) {
        tool.formFields.forEach(field => {
          formData[field.id] = field.default || '';
        });
      }
      
      // 设置页面数据
      this.setData({
        toolId: toolId,
        toolTitle: tool.title,
        tool: tool,
        formData: formData
      });
      
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: tool.title
      });
    } else {
      console.error('未找到工具:', toolId);
      this.setData({
        error: `未找到ID为${toolId}的工具`
      });
      
      wx.showToast({
        title: '未找到工具',
        icon: 'none'
      });
    }
  },
  
  // 这些方法直接转发到通用页面的同名方法
  handleFieldChange: function(e) {
    const commonPage = this.selectComponent('#common-page');
    if (commonPage && commonPage.handleFieldChange) {
      commonPage.handleFieldChange(e);
    } else {
      // 直接在当前页面处理
      const { field } = e.currentTarget.dataset;
      const { value } = e.detail;
      
      this.setData({
        [`formData.${field}`]: value
      });
    }
  },
  
  handleSubmit: function() {
    const commonPage = this.selectComponent('#common-page');
    if (commonPage && commonPage.handleSubmit) {
      commonPage.handleSubmit();
    } else {
      // 直接在当前页面处理
      // 首先验证表单
      const { tool, formData } = this.data;
      let isValid = true;
      let firstInvalidField = '';
      
      // 检查必填字段
      for (const field of tool.formFields) {
        if (field.required && !formData[field.id]) {
          isValid = false;
          firstInvalidField = field.label;
          break;
        }
      }
      
      if (!isValid) {
        wx.showToast({
          title: `请填写${firstInvalidField}`,
          icon: 'none'
        });
        return;
      }
      
      // 显示加载状态
      this.setData({ loading: true });
      
      // 替换提示词模板中的占位符
      let prompt = tool.promptTemplate;
      for (const key in formData) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        prompt = prompt.replace(regex, formData[key]);
      }
      
      // 获取全局应用实例
      const app = getApp();
      
      // 检查是否为本地模拟模式
      if (app.globalData.isLocalMode) {
        console.log('使用本地模拟模式生成内容');
        
        // 加载本地模拟服务
        const mockService = require('../../../utils/mock-service');
        
        // 调用本地模拟服务
        mockService.mockGenText({
          toolId: this.data.toolId,
          formData: this.data.formData,
          prompt: prompt
        }).then(result => {
          console.log('AI生成结果(模拟):', result);
          
          if (result && result.success) {
            // 保存结果并跳转到结果页
            const resultData = {
              toolId: this.data.toolId,
              toolName: this.data.tool.title,
              content: result.text,
              timestamp: new Date().getTime()
            };
            
            // 保存最近一次结果
            wx.setStorageSync('latest_result', resultData);
            
            // 跳转到结果页
            wx.navigateTo({
              url: '/pages/result/result',
              success: () => {
                // 重置加载状态
                this.setData({ loading: false });
              }
            });
          } else {
            this.setData({ 
              loading: false,
              error: result.error || '生成失败，请重试'
            });
            
            wx.showToast({
              title: '生成失败，请重试',
              icon: 'none'
            });
          }
        }).catch(err => {
          console.error('模拟服务失败:', err);
          this.setData({ 
            loading: false,
            error: '处理错误，请重试'
          });
          
          wx.showToast({
            title: '处理错误，请重试',
            icon: 'none'
          });
        });
      } else {
        // 云函数调用代码（当前未使用）
        wx.showToast({
          title: '本地模拟模式下不支持云函数',
          icon: 'none'
        });
        
        this.setData({ loading: false });
      }
    }
  },
  
  navigateBack: function() {
    wx.navigateBack();
  }
});
