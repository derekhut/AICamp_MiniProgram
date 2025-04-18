// tools.js
Page({
  data: {
    activeTab: 'all',
    categories: [
      { id: 'all', name: '全部' },
      { id: 'smart_classroom', name: '智慧课堂' },
      { id: 'knowledge_encyclopedia', name: '百科大全' },
      { id: 'creativity_lab', name: '创意工坊' },
      { id: 'mindful_growth', name: '心灵成长' }
    ],
    popularTools: [
      {
        id: 'quiz',
        title: '设计选择题',
        description: '创建一个AI学科的选择题测验，基于任何主题。排版整洁！',
        category: 'smart_classroom',
        isPick: true,
        image: '/images/placeholder-tool.png',
        url: '/pages/tool-detail/sentence/index?id=quiz'
      }
    ],
    allTools: [
      {
        id: 'quiz',
        title: '设计选择题',
        description: '创建一个AI学科的选择题测验，基于任何主题。排版整洁！',
        category: 'smart_classroom',
        isPick: true,
        image: '/images/placeholder-tool.png',
        url: '/pages/tool-detail/sentence/index?id=quiz'
      },
      {
        id: 'professional-email',
        title: '撰写专业邮件',
        description: '根据需求生成专业邮件，得体的商务和学术交流',
        category: 'creativity_lab',
        isPick: false,
        image: '/images/placeholder-tool.png',
        url: '/pages/tool-detail/sentence/index?id=professional-email'
      },
      {
        id: 'lesson-plan',
        title: '课程计划生成器',
        description: '快速生成课程计划，包括教学目标、活动和评估方法',
        category: 'smart_classroom',
        isPick: false,
        image: '/images/placeholder-tool.png',
        url: '/pages/tool-detail/sentence/index?id=lesson-plan'
      },
      {
        id: 'concept-background',
        title: '概念背景',
        description: '为抽象概念或复杂话题提供简明扼要的背景介绍',
        category: 'knowledge_encyclopedia',
        isPick: false,
        image: '/images/placeholder-tool.png',
        url: '/pages/tool-detail/sentence/index?id=concept-background'
      },
      {
        id: 'teaching-material',
        title: '教学课件',
        description: '根据知识点生成结构清晰、逻辑严谨的教学课件',
        category: 'smart_classroom',
        isPick: false,
        image: '/images/placeholder-tool.png',
        url: '/pages/tool-detail/sentence/index?id=teaching-material'
      },
      {
        id: 'sentence-expansion',
        title: '句子扩写',
        description: '根据提供的关键句子，扩展生成更丰富的表达',
        category: 'creativity_lab',
        isPick: false,
        image: '/images/placeholder-tool.png',
        url: '/pages/tool-detail/sentence/index?id=sentence-expansion'
      },
      {
        id: 'daily-quote',
        title: '每日金句',
        description: '生成富有哲理的金句，启发思考，激励成长',
        category: 'mindful_growth',
        isPick: false,
        image: '/images/placeholder-tool.png',
        url: '/pages/tool-detail/sentence/index?id=daily-quote'
      },
      {
        id: 'mind-mirror',
        title: '心灵镜像',
        description: '引导自我反思，促进个人成长和心理健康',
        category: 'mindful_growth',
        isPick: false,
        image: '/images/placeholder-tool.png',
        url: '/pages/tool-detail/sentence/index?id=mind-mirror'
      },
      {
        id: 'effective-communication',
        title: '有效沟通',
        description: '提供沟通技巧和策略，帮助更有效地表达想法',
        category: 'creativity_lab',
        isPick: false,
        image: '/images/placeholder-tool.png',
        url: '/pages/tool-detail/sentence/index?id=effective-communication'
      }
    ],
    filteredTools: [] // 将根据选择的分类进行过滤
  },
  
  onLoad: function() {
    // 初始化时设置filteredTools为所有工具
    this.setData({
      filteredTools: this.data.allTools
    });
  },
  
  // 切换标签页
  switchTab: function(e) {
    const tabId = e.currentTarget.dataset.id;
    let filteredTools;
    
    if (tabId === 'all') {
      filteredTools = this.data.allTools;
    } else {
      filteredTools = this.data.allTools.filter(tool => tool.category === tabId);
    }
    
    this.setData({
      activeTab: tabId,
      filteredTools: filteredTools
    });
  },
  
  // 点击工具卡片，跳转到详情页
  navigateToToolDetail: function(e) {
    const toolId = e.currentTarget.dataset.id;
    const tool = this.data.allTools.find(t => t.id === toolId);
    
    if (tool && tool.url) {
      wx.navigateTo({
        url: tool.url,
      });
    } else {
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      });
    }
  },
  
  // 分享小程序
  onShareAppMessage: function() {
    return {
      title: 'AI Camp - AI教育工具创新平台',
      path: '/pages/index/index'
    };
  }
})
