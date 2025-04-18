// 云函数入口文件
const cloud = require('wx-server-sdk');
const axios = require('axios');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // 使用当前云环境
});

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  
  try {
    const { toolId, formData, prompt } = event;
    
    // 记录日志
    console.log('生成请求:', { toolId, formData });
    
    // TODO: 在生产环境中，这里应该替换为您实际使用的AI服务API
    // 这里使用了模拟数据，实际应用中应替换为真实的API调用
    
    // 可以使用以下代码连接您的AI服务:
    /*
    const response = await axios.post('你的AI服务API地址', {
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
      // 其他参数...
    }, {
      headers: {
        'Authorization': 'Bearer 你的API密钥',
        'Content-Type': 'application/json'
      }
    });
    
    const generatedText = response.data.choices[0].text;
    */
    
    // 模拟AI生成响应（仅用于开发测试）
    const generateMockResponse = (toolId, formData) => {
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
    };
    
    const mockText = generateMockResponse(toolId, formData);
    
    // 记录用户历史（可选）
    try {
      await db.collection('userHistory').add({
        data: {
          openid,
          toolId,
          formData,
          result: mockText,
          createTime: db.serverDate()
        }
      });
    } catch (historyError) {
      console.error('保存历史记录失败:', historyError);
      // 继续执行，不影响主流程
    }
    
    return {
      success: true,
      text: mockText
    };
  } catch (error) {
    console.error('生成文本失败:', error);
    return {
      success: false,
      error: error.message || '生成失败，请重试'
    };
  }
};
