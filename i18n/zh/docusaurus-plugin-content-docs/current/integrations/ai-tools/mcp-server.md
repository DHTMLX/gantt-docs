---
sidebar_label: DHTMLX MCP 服务器
title: DHTMLX MCP 服务器
description: "通过 MCP 服务器将 AI 编码助手连接到 DHTMLX 文档"
---

# DHTMLX MCP 服务器

像 Claude、Cursor 或 ChatGPT 这样的 AI 编码助手在处理面向特定库的 API 时，可能会生成过时或不准确的代码。DHTMLX MCP 服务器通过提供对当前文档和 API 参考的直接访问来解决这一问题。

## MCP 是什么

Model Context Protocol（MCP）是一种为 AI 助手提供关于特定工具和库的外部上下文的标准。

大型语言模型在到达某一日期的数据上进行训练，不能自动反映最近的 API 更改或新特性。DHTMLX MCP 服务器通过一个 RAG（Retrieval-Augmented Generation，检索增强生成）系统公开完整且最新的文档来弥补这一差距。

**Server URL:** `https://docs.dhtmlx.com/mcp`

:::note
DHTMLX MCP 服务器是一个覆盖所有主要 DHTMLX 产品的共享服务，而不仅仅是 Gantt。此节中的配置说明适用于你所使用的任何 DHTMLX 组件。
:::

如果你使用 [React Gantt](integrations/react.md)，请将 MCP 与 [React Gantt agent skill](integrations/ai-tools/agent-skills.md#available-skills) 配对使用。

## 支持的产品

连接后，AI 工具可以检索文档、基于当前 API 生成代码片段，并回答以下产品的配置相关问题：

- Gantt
- Scheduler
- Suite（Grid、Form、TreeGrid 等）
- Kanban
- Pivot
- Spreadsheet
- Diagram
- RichText

## 隐私

MCP 服务器是一个托管服务。它不会在本地运行，也不会访问您的文件。不会存储关于用户的个人信息。查询可能会被记录用于调试和服务改进。如需符合严格无日志策略的商业选项，请联系 `info@dhtmlx.com`。

## 设置

在下方选择您的 AI 工具并按照相应的说明进行操作。

### Claude Code

推荐方式通过 CLI：

```bash
claude mcp add --transport http dhtmlx-mcp https://docs.dhtmlx.com/mcp
```

或者，将以下内容手动添加到你的 `mcp.json`：

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "type": "http",
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

### Cursor

1. 打开设置（在 Mac 上按 Cmd+Shift+J；在 Windows/Linux 上按 Ctrl+Shift+J）
2. 转到 **Tools & MCP**
3. 点击 **Add Custom MCP**
4. 粘贴以下配置：

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

连接后，您可以直接在对话中使用诸如“检查 DHTMLX 文档以了解如何在 Gantt 中添加自定义列”的提示。

### Gemini CLI

打开配置文件 `~/.gemini/settings.json` 并添加：

```json
{
  "mcpServers": {
    "dhtmlx-mcp": {
      "url": "https://docs.dhtmlx.com/mcp"
    }
  }
}
```

重新启动 Gemini CLI 以应用更改。

### Antigravity（Google）

1. 打开命令面板
2. 输入 "mcp add"
3. 选择 "HTTP"
4. 输入 URL: `https://docs.dhtmlx.com/mcp`
5. 输入名称: `dhtmlx-mcp`

### 其他工具

大多数现代 AI 编码工具通过其设置支持 MCP。请查找 "Model Context Protocol"、"Context Sources" 或类似选项，并将 `https://docs.dhtmlx.com/mcp` 作为自定义来源添加。

### ChatGPT

请注意，与 ChatGPT 的 MCP 集成可能会导致响应时间变慢（每次查询大约 20 秒）。如需更快的体验，请考虑使用以上列出的工具之一。

要配置 ChatGPT：

1. 转到 **Settings** → **Apps & Connectors**
2. 点击 **Advanced settings**
3. 启用 **Developer mode**
4. 返回 Connectors 屏幕并点击 **Create** 按钮
5. 填写以下内容：
   - Name: `dhtmlx-mcp`
   - URL: `https://docs.dhtmlx.com/mcp`
   - Authentication: `No authentication`
6. 点击 **Create**

设置完成后，您可以在处理任何 DHTMLX 组件时让 ChatGPT 查询 DHTMLX MCP 服务器。

## 获得最佳效果的提示

在提示时，请明确引用 DHTMLX 文档以获得更准确的结果。例如：

- “使用 DHTMLX 文档，我如何在 Gantt 中修改行高？”
- “检查 DHTMLX MCP 以获取 Gantt 任务编辑配置”

提示越具体，输出就越准确。