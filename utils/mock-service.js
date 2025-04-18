// utils/mock-service.js
// 本地模拟数据处理模块，用于替代云函数调用

/**
 * 模拟生成AI文本
 * @param {Object} params - 请求参数
 * @param {string} params.toolId - 工具ID
 * @param {Object} params.formData - 表单数据
 * @param {string} params.prompt - 替换后的提示词
 * @returns {Promise} - 返回Promise对象，成功时返回模拟响应
 */
function mockGenText(params) {
  return new Promise((resolve, reject) => {
    // 模拟网络延迟
    setTimeout(() => {
      try {
        const { toolId, formData } = params;
        const mockText = generateMockResponse(toolId, formData);
        
        // 保存到本地历史记录
        try {
          const historyKey = `tool_history_${toolId}`;
          const history = wx.getStorageSync(historyKey) || [];
          
          const resultData = {
            toolId: toolId,
            formData: formData,
            content: mockText,
            timestamp: Date.now()
          };
          
          history.unshift(resultData);
          wx.setStorageSync(historyKey, history.slice(0, 10)); // 只保留最近10条
        } catch (e) {
          console.error('保存历史记录失败:', e);
        }
        
        resolve({
          success: true,
          text: mockText
        });
      } catch (err) {
        reject({
          success: false,
          error: err.message || '生成失败，请重试'
        });
      }
    }, 1500); // 1.5秒延迟，模拟网络请求
  });
}

/**
 * 根据工具ID和表单数据生成模拟响应
 */
function generateMockResponse(toolId, formData) {
  if (toolId === 'sentence-expansion') {
    const originalSentence = formData.sentence || '春天来了';
    const targetLength = formData.targetLength || 100;
    
    return `原句: ${originalSentence} (${originalSentence.length}字)
扩写后: ${originalSentence}，美丽的花朵竞相绽放，鸟儿在枝头欢快地歌唱，轻柔的微风拂过脸庞，带来泥土和花香的气息，整个世界仿佛都焕发出了新的生机。阳光变得温暖起来，照耀着刚刚萌发的嫩绿，小溪欢快地流淌，仿佛在述说着冬去春来的故事。 (约${targetLength}字)
使用技巧:
1. 使用的修饰词和细节：美丽的花朵、欢快的鸟儿、轻柔的微风、泥土和花香、温暖的阳光、嫩绿、欢快的小溪
2. 使用的修辞手法类型：拟人、比喻、排比
3. 感官或情境扩展：视觉（花朵、嫩绿）、听觉（鸟儿歌唱）、触觉（微风拂过）、嗅觉（花香）`;
  } else if (toolId === 'mind-mirror') {
    const thoughts = formData.thoughts || '我最近工作压力很大，感觉很疲惫';
    
    return `我能感受到你现在面临的工作压力和疲惫感。这种感受是完全正常和普遍的，尤其是在高强度工作环境中。

请记住，照顾好自己和自己的情绪健康与完成工作同样重要。尝试每天留出一些时间给自己放松和恢复能量 - 哪怕只是短暂的散步、深呼吸或做些你喜欢的活动。

考虑一下是否可以重新评估你的工作负荷，或者寻求同事的支持。有时候，简单地与信任的人分享你的感受也能减轻心理负担。

最重要的是，对自己温和一些。疲惫是身体发出的信号，提醒我们需要休息和自我关爱。你正在尽力而为，这已经很棒了。`;
  } else if (toolId === 'quiz') {
    const topic = formData.topic || '光合作用';
    const count = formData.count || 3;
    
    return `以下是关于"${topic}"的${count}道选择题：

1. 光合作用主要发生在植物的哪个部位？
   A. 根部
   B. 茎部
   C. 叶肉细胞
   D. 花朵
   正确答案: C

2. 光合作用的主要原料是什么？
   A. 水和氧气
   B. 二氧化碳和水
   C. 氧气和糖类
   D. 氮气和水
   正确答案: B

3. 光合作用的过程中产生了什么气体？
   A. 二氧化碳
   B. 氮气
   C. 氧气
   D. 氢气
   正确答案: C`;
  } else {
    return `这是来自${toolId}工具的模拟响应。在实际应用中，将连接到真实的AI服务生成内容。`;
  }
}

module.exports = {
  mockGenText
};
