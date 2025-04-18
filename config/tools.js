// 工具配置文件
// 这个文件包含所有AI教育工具的定义，用于生成工具列表和表单

// 工具分类
const categories = [
  { id: 'all', name: '全部' },
  { id: 'smart_classroom', name: '智慧课堂' },
  { id: 'knowledge_encyclopedia', name: '百科大全' },
  { id: 'creativity_lab', name: '创意工坊' },
  { id: 'mindful_growth', name: '心灵成长' }
];

// 工具定义
const tools = [
  {
    id: 'quiz',
    title: '设计选择题',
    description: '创建一个AI学科的选择题测验，基于任何主题。排版整洁！',
    category: 'smart_classroom',
    isPick: true,
    image: '/images/placeholder-tool.png',
    formFields: [
      { 
        id: 'topic', 
        label: '主题', 
        type: 'text', 
        placeholder: '例如：光合作用、古代文明、数学函数...',
        required: true 
      },
      { 
        id: 'count', 
        label: '题目数量', 
        type: 'number', 
        min: 1, 
        max: 10, 
        default: 3 
      }
    ],
    promptTemplate: '请根据主题{{topic}}创建{{count}}道选择题，每题包含4个选项，并标明正确答案。确保题目清晰简洁，难度适中。'
  },
  {
    id: 'professional-email',
    title: '撰写专业邮件',
    description: '根据需求生成专业邮件，得体的商务和学术交流',
    category: 'creativity_lab',
    isPick: false,
    image: '/images/placeholder-tool.png',
    formFields: [
      { 
        id: 'purpose', 
        label: '邮件目的', 
        type: 'text', 
        placeholder: '例如：申请实习机会、会议邀请、项目合作建议...',
        required: true 
      },
      { 
        id: 'recipient', 
        label: '收件人', 
        type: 'text',
        placeholder: '例如：教授、公司HR、合作伙伴...',
        required: true 
      },
      { 
        id: 'tone', 
        label: '语气风格', 
        type: 'radio', 
        options: [
          { label: '正式', value: 'formal' },
          { label: '专业友好', value: 'professional' },
          { label: '诚恳', value: 'sincere' }
        ],
        default: 'professional'
      }
    ],
    promptTemplate: '请撰写一封目的为{{purpose}}的专业邮件，收件人是{{recipient}}，语气风格为{{tone}}。邮件应包含适当的开头称呼、正文内容、结束语和落款。'
  },
  {
    id: 'sentence-expansion',
    title: '句子扩写',
    description: '根据提供的关键句子，扩展生成更丰富的表达',
    category: 'knowledge_encyclopedia',
    isPick: false,
    image: '/images/placeholder-tool.png',
    formFields: [
      { 
        id: 'sentence', 
        label: '原始句子', 
        type: 'textarea', 
        placeholder: '请输入需要扩写的简短句子',
        required: true 
      },
      { 
        id: 'targetLength', 
        label: '目标字数', 
        type: 'number', 
        min: 20, 
        max: 500, 
        default: 100 
      }
    ],
    promptTemplate: '请将以下句子扩写到{{targetLength}}字左右，保持原意的同时增加修饰和细节：{{sentence}}\n\n请按以下格式输出：\n原句: {{sentence}} (原字数)\n扩写后: (完整句子，精确字数)\n使用技巧:\n1. 使用的修饰词和细节\n2. 使用的修辞手法类型\n3. 感官或情境扩展'
  },
  {
    id: 'mind-mirror',
    title: '心灵镜像',
    description: '引导自我反思，促进个人成长和心理健康',
    category: 'mindful_growth',
    isPick: false,
    image: '/images/placeholder-tool.png',
    formFields: [
      { 
        id: 'thoughts', 
        label: '你现在在想什么？', 
        type: 'textarea', 
        placeholder: '分享你当前的想法、感受或困扰...',
        required: true 
      }
    ],
    promptTemplate: '用户分享了以下想法：{{thoughts}}\n\n请分析用户的表达方式、语气、标点符号使用、情绪词汇和emoji等，判断可能的心理状态（如焦虑/压力大、孤独/需要陪伴、愤怒/不满、悲伤/沮丧、开心/兴奋等）。然后生成一个最适合的自然、温和的回应，提供适当的安慰、鼓励或建议。直接给出回应，不要输出分析过程。'
  }
];

// 导出配置
module.exports = {
  categories,
  tools,
  
  // 通过ID获取工具
  getToolById: function(id) {
    return tools.find(tool => tool.id === id) || null;
  },
  
  // 根据分类获取工具
  getToolsByCategory: function(category) {
    if (category === 'all') {
      return tools;
    }
    return tools.filter(tool => tool.category === category);
  },
  
  // 获取推荐工具
  getPopularTools: function() {
    return tools.filter(tool => tool.isPick);
  },
  
  // 获取分类名称
  getCategoryName: function(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  }
};
