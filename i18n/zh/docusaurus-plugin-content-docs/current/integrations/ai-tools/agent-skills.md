---
sidebar_label: 代理技能
title: 代理技能
description: "为使用 DHTMLX Gantt 的 AI 助手安装代理技能"
---

# 代理技能

像 Claude Code 或 Codex 这样的 AI 编码助手可以生成 DHTMLX Gantt 代码，但它们在专用 API 上往往会出错：属性名错误、缺少 CSS 导入、回调签名不正确，或混合不兼容的数据模式。代理技能通过在编写代码之前教授助手正确的模式和已知的陷阱来解决这些问题。

与提供实时 API 参考的 [MCP 服务器](integrations/ai-tools/mcp-server.md) 不同，技能侧重于集成模式、决策点以及故障预防。

**GitHub：** [DHTMLX/skills](https://github.com/DHTMLX/skills)

## 可用技能

### DHTMLX React Gantt

涵盖将 `@dhtmlx/trial-react-gantt` 和 `@dhx/react-gantt` 集成到 React 应用中的方法。该技能帮助助手将 Gantt 添加到项目并正确设置、连接 CRUD 操作、以及进行主题处理，使 Gantt 能重复使用应用自己的主题而不是出现不同步的情况。它还包括从真实项目中提取的已知陷阱，并引导助手通过 [DHTMLX MCP 服务器](integrations/ai-tools/mcp-server.md) 而不是猜测来验证不熟悉的 API。

技能文件是可读的 Markdown - 你可以在 [GitHub 存储库](https://github.com/DHTMLX/skills/tree/main/dhtmlx-react-gantt) 中准确查看你的助手将遵循的规则。

## 安装

```bash
npx skills add DHTMLX/skills --skill dhtmlx-react-gantt
```

### 手动安装

克隆或下载 [DHTMLX/skills](https://github.com/DHTMLX/skills) 存储库，并将 `dhtmlx-react-gantt` 文件夹复制到你项目的 skills 目录中（例如，对于 Claude Code，是 `.claude/skills/`，对于 Cursor，是 `.cursor/skills/`）。

## 与 MCP 一起使用技能

技能与 MCP 服务器是互补的。MCP 为你的助手提供对实时 API 文档的访问——方法签名、属性值、配置选项。技能教它学习能防止常见错误的集成模式。为了获得最佳效果，建议同时使用两者。有关设置说明，请参阅 [DHTMLX MCP 服务器](integrations/ai-tools/mcp-server.md)。