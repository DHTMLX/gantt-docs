---
title: "与 Lovable AI 的集成"
sidebar_label: "Lovable AI"
description: "将 DHTMLX React Gantt 集成到 Lovable AI 生成的应用中的指南"
---

# 与 Lovable AI 的集成

本文介绍如何将 DHTMLX React Gantt 添加到 Lovable 项目中，并获得准确的生成代码。

## Lovable 如何处理 DHTMLX Gantt

Lovable 会根据自然语言提示生成 React 应用。它在处理常见的 UI 模式方面表现良好——布局、路由、标准组件——因为模型在训练阶段看到了足够多的示例。DHTMLX Gantt 是一个具有自己配置 API、属性名称和数据格式的专业组件。模型在这里可参考的资料相对较少，所以它会进行猜测。有时猜对，有时猜错。

解决之道在于上下文。共有三种机制可以以不同的规模为 Lovable 提供准确的 API 信息：

| 方法 | 最佳用途 | 范围 |
|---|---|---|
| **Inline prompts** | 你清楚确切属性的一次性调整 | 单次提示 |
| **Knowledge Base** | 跨多个提示可复用的规则 | 项目级别 |
| **MCP** | 无需复制粘贴即可实现完整 API 覆盖 | 外部服务器连接 |

这些并非互斥。Knowledge Base 和 MCP 可以协同工作——对项目特定约定使用 Knowledge Base，对于通用 API 的准确性使用 MCP。

下方各节将讲解完整工作流程：首先搭建应用、再添加 Gantt，然后在每种方法的基础上提升输出质量。

## 先决条件

- 一个 Lovable 账户

本地开发（可选）：

- Node.js 18+
- npm

关于平台相关的具体信息，请参阅 [Lovable 文档](https://docs.lovable.dev/)。

## 生成一个基础应用

从一个标准的管理员布局开始。此提示会生成一个包含导航、KPI 卡和图表区域的仪表板：

> Create an admin application.
> Requirements:
> - Each navigation item opens a separate route
> - The Dashboard includes KPI cards and a main content block with a Sales chart.

![Lovable-generated admin dashboard layout](/img/lovable_admin_dashboard_layout.png)

生成后，继续在 Lovable 中编辑，或克隆 Git 存储库并在本地工作。更改会在两端同步。

将第一个提示保持在结构和导航方面——接下来才是组件特定的配置。

## 添加 DHTMLX React Gantt

在提示中引用 trial 包：

> Replace the Sales chart with a DHTMLX React Gantt chart using @dhtmlx/trial-react-gantt.

![DHTMLX Gantt chart in Lovable dashboard](/img/lovable_gantt_dashboard.png)

Lovable 会生成 React 应用，因此 React 包装器是自然的选择。本指南使用 `@dhtmlx/trial-react-gantt` —— [DHTMLX React Gantt](../../react/overview/) 的评估版本构建。它在 npm 公共可用，这意味着 Lovable 可以在无需额外设置的情况下安装它。

trial 构建是功能齐全的，但包含评估水印。对于生产环境，请切换到 `@dhx/react-gantt`，这需要在 [DHTMLX 私有 npm 注册表](../../react/installation/) 进行身份验证。或者，将包文件本地添加到你的项目中。

Lovable 会安装该包、创建一个导入语句，并呈现一个包含示例任务和时间线的基本 Gantt。输出通常并不完全匹配 API——列配置、刻度设置和数据格式会被猜测。下方各节将展示如何缩小这一差距。

## 使用 inline prompts 改善输出

当你知道确切的 API 调用时，包含属性名称和代码片段，这样 Lovable 就不会再猜：

> Update the DHTMLX React Gantt configuration:
> - Set row height to `40px` using `config.row_height`
> - Pass the config object into the ReactGantt component
>
> Example:
> ```jsx
> const config = {
>   row_height: 40
> };
>
> <ReactGantt config={config} />
> ```

对于独立的改动效果很好。随着配置增多，若干变得难以管理——你最终会把相同的 API 细节粘贴到每一个提示中。

## 将规则存储在 Knowledge Base

Knowledge Base 存储可跨整个项目提示应用的可复用规则。一次定义 API 的具体信息，而不是重复它们：

> Theme:
> - Gantt 支持通过 "theme" 属性进行主题定制。
> - 允许的值：`"terrace"`（浅色）和 `"dark"`（深色）。
> - 当应用具有全局主题时，映射：
>   - light -> `"terrace"`
>   - dark  -> `"dark"`
> - 将映射后的值作为 `theme={ganttTheme}` 传递给 Gantt。
>
> Grid row height:
> - 通过 Gantt 配置对象设置行高。
> - 使用 `config.row_height`（数字，单位为像素）。
> - 将配置传入 ReactGantt 组件：
>
>   ```jsx
>   const config = { row_height: 40 };
>
>   <ReactGantt config={config} />
>   ```

![Lovable Knowledge Base with Gantt configuration rules](/img/lovable_knowledge_base_gantt_rules.png)

有了规则，提示就可以更短：

> Use the project Knowledge Base. Set the Gantt grid row height to 60.

![Gantt after applying Knowledge Base configuration in Lovable](/img/lovable_gantt_after_kb_update.png)

Knowledge Base 的字符上限约为 ~100k，足以作为一个聚焦的配置参考，但无法覆盖完整的 [DHTMLX Gantt API](https://github.com/DHTMLX/gantt-docs)。如需更全面的覆盖，请连接 MCP。

## 连接 MCP 以获得完整 API 访问

MCP（Model Context Protocol）将 Lovable 连接到一个外部文档服务器。它使 Lovable 能在不进行手动复制粘贴的情况下访问完整且最新的 API。

在 Lovable 工程设置中连接 [DHTMLX MCP Server](../mcp-server/)：

![Adding DHTMLX MCP server in Lovable](/img/lovable_mcp_server_setup.png)

然后在提示中引用它，以便 Lovable 在生成代码之前获取相关文档：

> Use the DHTMLX MCP server. Set the Gantt grid row height to 60 pixels.

Lovable 会从实际 API 参考中解析属性名、数据格式和配置模式，而不是盲目猜测。

## 实用提示

- **每次提示一个变更。** 少量提示在输出不正确时更易于定位问题。
- **检查导入。** Lovable 有时会从错误的包路径导入，或混淆命名导出与默认导出。每次修改后请核对导入语句。
- **将 Knowledge Base 与 MCP 结合使用。** Knowledge Base 用于项目特定的约定（主题映射、列布局），MCP 用于通用 API 的准确性。它们相辅相成。
- **检查配置对象。** 当 Gantt 未按预期渲染时，记录传递给 `<ReactGantt />` 的 config 对象，并将其与 [configuration props reference](../../react/configuration-props/) 进行比较。大多数问题都源于缺失或命名错误的属性。

## 接下来要读的内容

- [DHTMLX React Gantt 概览](../../react/overview/) - 组件 API 与特性
- [安装指南](../../react/installation/) - 设置专业包
- [DHTMLX MCP Server](../mcp-server/) - 将 MCP 连接到其他 AI 工具