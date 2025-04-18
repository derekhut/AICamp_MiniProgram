# AI Camp 教育工具微信小程序

## 项目概述

AI Camp教育工具微信小程序是一个为教师和学生提供智能AI教学工具的平台，旨在提升教学效率与学习体验。本项目是基于MP2教育工具系统开发的微信小程序版本，保留了原系统的核心功能，并针对小程序环境进行了优化。

## 功能特点

本小程序提供多种教育辅助工具，分为四大类：

### 智慧课堂(SMART_CLASSROOM)
- **设计选择题**：创建学科选择题测验，基于任何主题
- **教案设计**：快速生成课程计划，包括教学目标、活动和评估方法
- **教学课件**：根据知识点生成结构清晰、逻辑严谨的教学课件

### 百科大全(KNOWLEDGE_ENCYCLOPEDIA)
- **概念背景**：为抽象概念或复杂话题提供简明扼要的背景介绍
- **句子扩写**：根据提供的关键句子，扩展生成更丰富的表达

### 创意工坊(CREATIVITY_LAB)
- **撰写专业邮件**：生成得体的商务和学术交流邮件
- **每日金句**：生成富有哲理的金句，启发思考
- **有效沟通**：提供沟通技巧和策略，帮助更有效地表达想法

### 心灵成长(MINDFUL_GROWTH)
- **心灵镜像**：引导自我反思，促进个人成长和心理健康

## 项目结构

```
mp2-miniprogram/
├── app.js                   // 小程序入口文件
├── app.json                 // 小程序全局配置
├── app.wxss                 // 小程序全局样式
├── components/              // 自定义组件
│   └── tool-card/           // 工具卡片组件
├── config/
│   └── tools.js             // 工具配置和分类
├── cloudfunctions/          // 云函数
│   └── genText/             // 文本生成云函数
├── images/                  // 图片资源
├── pages/                   // 页面文件
│   ├── index/               // 首页
│   ├── tools/               // 工具列表页
│   ├── tool-detail/         // 工具详情页
│   │   ├── common/          // 通用工具详情页组件
│   │   └── sentence/        // 句子扩写工具页
│   └── result/              // 结果展示页面
└── utils/                   // 工具函数
    └── mock-service.js      // 本地模拟服务
```

## 技术架构

- **前端**：原生微信小程序开发（WXML/WXSS/JS）
- **AI服务**：支持本地模拟模式和云函数调用
- **数据存储**：小程序本地存储 + 云数据库
- **组件化设计**：通用表单组件、结果展示组件

## 安装与使用

### 开发环境
1. 克隆仓库到本地
   ```
   git clone git@github.com:derekhut/AICamp_MiniProgram.git
   ```
2. 使用微信开发者工具导入项目
3. 在app.js中配置云环境ID（如需使用云开发功能）

### 本地模拟模式
- 项目默认使用本地模拟模式，无需配置云环境即可测试所有功能
- 模拟响应在`utils/mock-service.js`中配置

## 开发指南

### 添加新工具
1. 在`config/tools.js`中添加工具定义
2. 确保工具包含正确的分类和表单字段
3. 在`utils/mock-service.js`中添加对应的模拟响应

### 自定义样式
- 工具卡片样式：修改`components/tool-card`
- 表单样式：修改`pages/tool-detail/common/index.wxss`
- 结果页样式：修改`pages/result/result.wxss`

## 后续开发计划

- 实现各工具的详情页和生成功能
- 添加生成结果保存和分享功能
- 优化UI和用户体验
- 增加微信特色功能（订阅消息等）
- 集成真实AI服务API，替换模拟响应

## 贡献指南

欢迎提交Issue和Pull Request，一起改进这个教育工具平台：
1. Fork本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m '添加某功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个Pull Request

## 注意事项

- 本项目目前使用本地模拟数据，无需云环境即可运行
- 如需使用云功能，需在微信开发者工具中创建云开发环境，并在小程序管理后台开通云开发服务

## 许可证

[MIT License](LICENSE)
