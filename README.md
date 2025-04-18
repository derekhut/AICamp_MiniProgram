# AI Camp 微信小程序

这是 AI Camp 教育平台的微信小程序版本，提供各种 AI 教育工具，帮助教师和学生提升教学和学习体验。

## 项目结构

```
mp2-miniprogram/
├── app.js                   // 小程序入口文件
├── app.json                 // 小程序全局配置
├── app.wxss                 // 小程序全局样式
├── components/              // 自定义组件
│   └── tool-card/           // 工具卡片组件
├── images/                  // 图片资源
├── pages/                   // 页面文件
│   ├── index/               // 首页
│   └── tools/               // 工具列表页
├── styles/                  // 样式文件
└── utils/                   // 工具函数
```

## 功能特性

- 无需登录，直接使用 AI 教育工具
- 工具分类展示（智慧课堂、百科大全、创意工坊、心灵成长）
- 推荐工具快速访问
- 基于微信云开发 AI 能力，调用 DeepSeek 等大模型

## 开发步骤

1. 使用微信开发者工具打开本项目
2. 在 `app.js` 中配置云环境 ID
3. 上传云函数并部署云开发环境
4. 根据需要添加更多工具页面

## 后续开发计划

- 实现各工具的详情页和生成功能
- 添加生成结果保存和分享功能
- 优化 UI 和用户体验
- 增加微信特色功能（订阅消息等）

## 注意事项

使用前需要先在微信开发者工具中创建云开发环境，并在小程序管理后台开通云开发服务。
