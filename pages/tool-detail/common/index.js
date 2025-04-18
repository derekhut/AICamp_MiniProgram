// pages/tool-detail/common/index.js
// 通用工具详情页，用于动态加载工具信息并生成对应表单

const toolsConfig = require('../../../config/tools');
const mockService = require('../../../utils/mock-service');

Page({
  data: {
    toolId: '',
    tool: null,
    formData: {},
    loading: false,
    error: '',
    showResult: false
  },
  
  onLoad: function(options) {
    // 获取工具ID
    const { id } = options;
    
    if (!id) {
      this.setData({
        error: '工具ID不能为空'
      });
      return;
    }
    
    // 从配置中获取工具信息
    const tool = toolsConfig.getToolById(id);
    
    if (!tool) {
      this.setData({
        error: `未找到ID为${id}的工具`
      });
      return;
    }
    
    // 初始化表单数据
    const formData = {};
    tool.formFields.forEach(field => {
      formData[field.id] = field.default || '';
    });
    
    this.setData({
      toolId: id,
      tool: tool,
      formData: formData
    });
  },
  
  // 处理表单项变化
  handleFieldChange: function(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    
    this.setData({
      [`formData.${field}`]: value
    });
  },
  
  // 表单提交
  handleSubmit: function() {
    // 表单验证
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
  },
  
  // 返回工具列表
  navigateBack: function() {
    wx.navigateBack();
  }
});
