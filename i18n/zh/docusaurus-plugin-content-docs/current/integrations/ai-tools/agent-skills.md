---
sidebar_label: 智能助手技能
title: 智能助手技能
description: "为与 DHTMLX Gantt 搭配工作的 AI 助手安装技能"
---

# 智能助手技能

像 Claude Code 或 Codex 这样的 AI 编码助手可以生成 DHTMLX Gantt 代码，但在处理专门的 API 时它们经常会出错：错误的属性名、缺失 CSS 导入、回调签名不正确，或混用不兼容的数据模式。智能助手技能通过在撰写代码之前，教会助手正确的模式和已知的陷阱来解决这些问题。

与提供实时 API 参考的 [MCP server](integrations/ai-tools/mcp-server.md) 不同，技能更加关注集成模式、决策点和故障预防。

**GitHub:** [DHTMLX/skills](https://github.com/DHTMLX/skills)

## 可用技能

### DHTMLX JS Gantt

涵盖将核心 JavaScript Gantt 集成到纯 JavaScript 和 TypeScript 应用程序中。该技能识别所有交付渠道——免费包 `dhtmlx-gantt`（v10 及以上的社区版 MIT 许可，v9.x 及更早版本的 GPL 版）、评估包 `@dhx/trial-gantt`、商业包 `@dhx/gantt`，以及 `<script>` / CDN 加载方式——并将设置、数据和主题指南适配到各自情况。

请查看 [GitHub 仓库](https://github.com/DHTMLX/skills/tree/main/dhtmlx-js-gantt) 中的规则。

### DHTMLX React Gantt

涵盖将 `@dhtmlx/trial-react-gantt` 和 `@dhx/react-gantt` 集成到 React 应用程序中。该技能教授助手封装器特定的设置、数据所有权与持久化模式，以及容易出错的主题方法，并列出从真实项目中提取出的已知陷阱及具体修复方案。

请查看 [GitHub 仓库](https://github.com/DHTMLX/skills/tree/main/dhtmlx-react-gantt) 中的规则。

要查看这些模式在端到端中的工作示例，请参阅 [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter)——一个在 Lovable 中生成的多项目规划器，其完整构建配方位于其 [`lovable/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/lovable) 文件夹。

### DHTMLX Angular Gantt

涵盖将 `@dhtmlx/trial-angular-gantt` 和 `@dhx/angular-gantt` 集成到 Angular 应用程序中。该技能教授助手封装器特定的设置、数据所有权与持久化模式（`data.save` / `data.batchSave`）以及易出错的主题方法，并列出已知的故障模式及具体修复方案。

请查看 [GitHub 仓库](https://github.com/DHTMLX/skills/tree/main/dhtmlx-angular-gantt) 中的规则。

## 安装

```bash
npx skills add DHTMLX/skills --skill dhtmlx-js-gantt
npx skills add DHTMLX/skills --skill dhtmlx-react-gantt
npx skills add DHTMLX/skills --skill dhtmlx-angular-gantt
```

### 手动安装

克隆或下载 [DHTMLX/skills](https://github.com/DHTMLX/skills) 仓库，并将相关技能文件夹（`dhtmlx-js-gantt`、`dhtmlx-react-gantt`，或 `dhtmlx-angular-gantt`）复制到项目的 skills 目录中（例如，对 Claude Code 使用 `.claude/skills/`，对 Cursor 使用 `.cursor/skills/`）。

## 与 MCP 一起使用技能

技能与 MCP 服务器是互补的。MCP 让你的助手能够访问实时 API 文档——方法签名、属性值、配置选项。技能则教会它集成模式，以防止常见错误。为获得最佳效果，请同时使用两者。请参阅 [DHTMLX MCP Server](integrations/ai-tools/mcp-server.md) 以获取设置说明。