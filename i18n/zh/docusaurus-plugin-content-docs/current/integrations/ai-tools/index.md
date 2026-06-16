---
title: "AI 工具"
sidebar_label: "概览"
description: "使用 DHTMLX Gantt 的 AI 工具概览"
---

# AI 工具

本节介绍使用 DHTMLX Gantt 的 AI 辅助开发，以及在基于 Gantt 的应用中添加 AI 功能。

## AI 辅助开发

- [DHTMLX MCP Server](./mcp-server/) - 将 AI 编码工具连接到最新的 DHTMLX 文档和 API 参考。
- [Agent Skills](./agent-skills/) - 教 AI 编码助手（Claude Code、Codex 等）在使用 DHTMLX Gantt 时的正确工作模式。
- [Lovable AI](./lovable-ai/) - 将 DHTMLX [React Gantt](integrations/react.md) 集成到 Lovable 生成的应用中，使用提示、知识库和 MCP。配套的 [Lovable Starter Walkthrough](./lovable-starter-walkthrough/) 展示如何重现一个完整的以 Supabase 为后端的项目计划器。

## AI 构建者展示

- [React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter) - 带有 Supabase 后端的多项目规划器，使用 Lovable 端到端生成。包含用于构建它的提示序列。 [Live demo](https://react-gantt-lovable-starter.lovable.app).

## AI 功能在应用中的实现

如果你在应用中添加 AI 功能（OpenAI 兼容的 API、助手、智能建议），请参阅：

指南：

- [Semantic Search](./semantic-search/) - 使用嵌入向量和余弦相似度，在 Gantt 图中添加基于语义的任务发现。
- [AI Assistant](./ai-assistant/) - 使用工具调用和客户端命令执行，将聊天助手连接到 DHTMLX Gantt。

演示应用：

- [Gantt Semantic Search AI Demo](https://github.com/DHTMLX/gantt-semantic-search-ai-demo)
- [Gantt Maker AI Demo](https://github.com/DHTMLX/gantt-maker-ai-demo)
- [Gantt Theme Builder AI Demo](https://github.com/DHTMLX/gantt-theme-builder-ai-demo)