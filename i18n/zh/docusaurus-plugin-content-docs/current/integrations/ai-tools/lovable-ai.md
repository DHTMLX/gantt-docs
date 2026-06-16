---
title: "与 Lovable AI 的集成"
sidebar_label: "Lovable AI"
description: "将 DHTMLX React Gantt 集成到 Lovable AI 生成的应用程序中的指南"
---

# 与 Lovable AI 的集成

本文介绍如何将 DHTMLX React Gantt 添加到 Lovable 项目中，并获得准确生成的代码。

## Lovable 如何处理 DHTMLX Gantt

Lovable 能够基于自然语言提示生成 React 应用。它对常见的 UI 模式处理得很好——布局、路由、标准组件——因为模型在训练过程中已经看到足够多的示例。DHTMLX Gantt 是一个具有自己配置 API、属性名和数据格式的专用组件。模型在这里可用的参考较少，因此需要进行猜测。猜对时常见，未必总是如此。

修正在于上下文。三种机制让你提供 Lovable 精确的 API 信息，每种机制覆盖不同的范围：

| 方法 | 最佳用途 | 范围 |
|---|---|---|
| **Inline prompts** | 当你确切知道某个属性时的一次性调整 | 单次提示 |
| **知识库（Knowledge Base）** | 在多个提示中可重复使用的规则 | 项目级别 |
| **MCP** | 在不需拷贝粘贴的情况下实现完整 API 覆盖 | 外部服务器连接 |

这些方法并不互斥。知识库和 MCP 可以协同工作——在项目级别使用知识库来定义特定约定，在通用 API 的准确性方面使用 MCP。

下面的各节将带你完成完整工作流：搭建应用、添加 Gantt，然后用每种方法提升输出质量。

## 特色起始示例：React Gantt + Supabase 项目规划器

如果你想要一个完整、功能丰富的参考示例，而不是从零开始构建，[React Gantt Lovable Starter](https://github.com/DHTMLX/react-gantt-lovable-starter) 是一个在 Lovable 中端到端生成的多项目规划器，带有 Supabase 后端、任务和链接的增删改查、撤销/重做、可工作的日历、资源工作量，以及一个演示角色模型。

- **实时演示**： [https://react-gantt-lovable-starter.lovable.app](https://react-gantt-lovable-starter.lovable.app)
- **源代码**： [github.com/DHTMLX/react-gantt-lovable-starter](https://github.com/DHTMLX/react-gantt-lovable-starter)
- **可复现的配方**：位于 [`lovable/`](https://github.com/DHTMLX/react-gantt-lovable-starter/tree/main/lovable) 文件夹中，包含确切的提示序列（11 步）、构建过程中使用的知识库内容，以及对生成输出逐条手动修复的日志。

如需对配方进行 guided 概览并了解如何在你自己的工作区中复现，请参见 [Lovable Starter Walkthrough](integrations/ai-tools/lovable-starter-walkthrough.md)。

如果你只需要在一个通用的管理应用中渲染一个 Gantt，请继续下面的步骤。

## 前提条件

- 一个 Lovable 账户

本地开发（可选）：

- Node.js 18+
- npm

有关平台特定的细节，请参阅 [Lovable 文档](https://docs.lovable.dev/)。

## 生成一个基础应用

从标准的管理员布局开始。本示例提示会生成一个带有导航、KPI 卡片和图表区域的仪表板：

> Create an admin application.
> Requirements:
> - Each navigation item opens a separate route
> - The Dashboard includes KPI cards and a main content block with a Sales chart.

![Lovable 生成的管理员仪表板布局](/img/lovable_admin_dashboard_layout.png)

生成后，可以继续在 Lovable 中编辑，或克隆 Git 仓库在本地工作。改动会双向同步。

把首个提示聚焦在结构和导航上——后续再进行组件级的配置。

## 添加 DHTMLX React Gantt

在提示中引用 trial 包：

> Replace the Sales chart with a DHTMLX React Gantt chart using @dhtmlx/trial-react-gantt.

![Lovable 仪表板中的 DHTMLX Gantt 图表](/img/lovable_gantt_dashboard.png)

Lovable 会生成 React 应用，因此 React 包装器是自然的选择。本指南使用 `@dhtmlx/trial-react-gantt`——这是 [DHTMLX React Gantt](../../react/overview/) 的评估版本。它在 npm 上公开可用，这意味着 Lovable 可以无需额外设置即可安装它。

试用构建是完全可用的，但包含评估水印。生产环境请切换到 `@dhx/react-gantt`，该版本需要通过 [DHTMLX private npm registry](../../react/installation/) 进行身份验证。或者，也可以将包文件本地添加到你的项目中。

Lovable 会安装该包，创建一个 import，并渲染一个带有示例任务和时间线的基本 Gantt。输出常常与 API 不完全匹配——列配置、刻度设置和数据格式会被猜测。下方各节展示如何缩小差距。

## 通过 Inline Prompts 提升输出

当你知道确切的 API 调用时，请包含属性名以及代码片段，避免 Lovable 的猜测：

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

对于孤立的修改效果很好。随着配置增多，随着你把相同的 API 细节粘贴到每个提示中而变得繁琐。

## 将规则存储在 Knowledge Base（知识库）

知识库存储在一个项目中适用的可复用规则。一次定义 API 细节，而不是在每个提示中重复：

> Theme:
> - Gantt supports theming via the "theme" prop.
> - Allowed values: `"terrace"` (light) and `"dark"` (dark).
> - When the app has a global theme, map:
>   - light -> `"terrace"`
>   - dark  -> `"dark"`
> - Pass the mapped value to the Gantt as `theme={ganttTheme}`.
>
> Grid row height:
> - Set row height via the Gantt config object.
> - Use `config.row_height` (number, in pixels).
> - Pass the config into the ReactGantt component:
>
>   ```jsx
>   const config = { row_height: 40 };
>
>   <ReactGantt config={config} />
>   ```

![Lovable Knowledge Base with Gantt configuration rules](/img/lovable_knowledge_base_gantt_rules.png)

有了规则后，提示可以更短：

> Use the project Knowledge Base. Set the Gantt grid row height to 60.

![Gantt after applying Knowledge Base configuration in Lovable](/img/lovable_gantt_after_kb_update.png)

知识库的容量上限约为 ~100k 字符——足以作为一个集中的配置参考，但并不覆盖完整的 [DHTMLX Gantt API](https://github.com/DHTMLX/gantt-docs)。如需更广泛的覆盖，请连接 MCP。

## 连接 MCP 以获得完整 API 访问

MCP（Model Context Protocol，模型上下文协议）将 Lovable 连接到外部文档服务器。它让 Lovable 可以在不需要手动拷贝粘贴的情况下获取完整且最新的 API。

在 Lovable 项目设置中连接 [DHTMLX MCP Server](../mcp-server/)：

![在 Lovable 中添加 DHTMLX MCP 服务器](/img/lovable_mcp_server_setup.png)

然后在提示中引用它，以便 Lovable 在生成代码前获取相关文档：

> Use the DHTMLX MCP server. Set the Gantt grid row height to 60 pixels.

Lovable 从实际的 API 参考中解析属性名、数据格式以及配置模式，而不是进行猜测。

## 实用技巧

- **每个提示只改一个点。** 较小的提示更容易在输出不正确时定位问题。
- **检查 imports。** Lovable 有时会从错误的包路径导入，或混淆具名导出和默认导出。每次修改后请验证 import 行。
- **将 Knowledge Base 与 MCP 结合使用。** Knowledge Base 用于项目级别的约定（主题映射、列布局），MCP 用于通用 API 的准确性。二者相辅相成。
- **检查 config 对象。** 当 Gantt 未按预期渲染时，记录传递给 `<ReactGantt />` 的 config 对象，并与 [configuration props reference](../../react/configuration-props/) 对比。大多数问题都源自缺失或命名错误的属性。

## 下一步要读的内容

- [DHTMLX React Gantt overview](../../react/overview/) - 组件 API 与特性
- [Installation guide](../../react/installation/) - 安装专业包
- [DHTMLX MCP Server](../mcp-server/) - 将 MCP 连接到其他 AI 工具
- [Lovable Starter Walkthrough](integrations/ai-tools/lovable-starter-walkthrough.md) - 复现完整的项目规划参考应用
- [Installing React Gantt](../../react/installation/) - 包含从 trial 版本切换到商业版的步骤