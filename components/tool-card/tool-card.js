// components/tool-card/tool-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tool: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 分类名称映射
    categoryNames: {
      'smart_classroom': '智慧课堂',
      'knowledge_encyclopedia': '百科大全',
      'creativity_lab': '创意工坊',
      'mindful_growth': '心灵成长'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function() {
      const tool = this.properties.tool;
      this.triggerEvent('cardtap', { id: tool.id });
    }
  }
})
