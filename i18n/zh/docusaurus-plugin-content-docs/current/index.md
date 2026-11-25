---
sidebar_label: DHTMLX Gantt 概览
title: DHTMLX Gantt 概览
slug: /
description: "探索 DHTMLX Gantt 的功能、版本、安装选项、框架集成、API 文档、示例，以及用于构建项目规划应用的 AI 工具。"
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';
 
**DHTMLX Gantt** 是可配置性最高的 JavaScript 甘特图，具备完整的 TypeScript 定义。它旨在构建高级的计划与排程界面。它可与 React、Angular、Vue 以及其他前端框架集成。DHTMLX Gantt 还通过 DHTMLX MCP Server、Agent Skills，以及结构化 API，支持 AI 辅助开发。  

您可以将其用于项目管理、ERP、建筑、制造、现场服务、SaaS 以及其它需要可配置可视时间线的商业应用场景。

## 按框架快速入门

您可以将 DHTMLX Gantt 作为一个原生 JavaScript 小部件使用，或将其集成到现代框架中。请从适合您偏好技术栈的逐步指南开始：

<div className="framework-grid">

  <a className="framework-card" href="guides/initializing-gantt-chart/">
    <FrameworkIcon name="javascript" className="framework-icon" />
    <div className="framework-title">JavaScript</div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
    <FrameworkIcon name="react" className="framework-icon" />
    <div className="framework-title">React</div>
  </a>

  <a className="framework-card" href="integrations/angular/quick-start/">
    <FrameworkIcon name="angular" className="framework-icon" />
    <div className="framework-title">Angular</div>
  </a>

  <a className="framework-card" href="integrations/vue/quick-start/">
    <FrameworkIcon name="vue" className="framework-icon" />
    <div className="framework-title">Vue</div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
    <FrameworkIcon name="svelte" className="framework-icon" />
    <div className="framework-title">Svelte</div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
    <FrameworkIcon name="salesforce" className="framework-icon" />
    <div className="framework-title">Salesforce</div>
  </a>

</div>

React、Angular 和 Vue 支持两种集成方式：

- 官方 [React Gantt](integrations/react/quick-start.md), [Angular Gantt](integrations/angular/quick-start.md), 和 [Vue Gantt](integrations/vue/quick-start.md) 封装（推荐用于 PRO 与评估项目）
- 将核心 JavaScript Gantt 组件直接与 [React](integrations/react/js-gantt-react.md)、[Angular](integrations/angular/js-gantt-angular.md)、[Vue](integrations/vue/js-gantt-vue.md) 集成（社区版）

## 实时演示

- [包含任务与链接的基本 Gantt 图表](https://docs.dhtmlx.com/gantt/demos/enterprise-demo/)
- [自动排程](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/12_auto_scheduling.html%27&filter=%27%27) 和 [关键路径](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/03_critical_path.html%27&filter=%27%27)
- 资源管理:[资源使用图](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/04_resource_usage_diagram.html%27&filter=%27%27)、[资源直方图](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/09_resource_histogram.html%27&filter=%27%27)
- [查看所有示例](https://docs.dhtmlx.com/gantt/demos/)

- [带任务和链接的基本甘特图](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27)
- [自动排程](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/12_auto_scheduling.html%27&filter=%27%27) 与 [关键路径](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/03_critical_path.html%27&filter=%27%27) 示例
- 资源管理：[Diagram](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/04_resource_usage_diagram.html%27&filter=%27%27), [Histogram](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/09_resource_histogram.html%27&filter=%27%27)
  图示：
  
- ![gantt_overview](/img/gantt_sample.png)

查看 [All Samples](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27) 以了解甘特图全部功能的完整范围。

若要获取面向框架的起步点，请参阅 [React](https://github.com/DHTMLX/react-gantt-examples)、[Angular](https://github.com/DHTMLX/angular-gantt-examples) 和 [Vue](https://github.com/DHTMLX/vue-gantt-examples) 的示例仓库。

:::note
一些示例展示了 PRO 功能，因此在将它们用于 Community 版项目之前，请查看 [Community vs PRO 比较](guides/editions-comparison.md)。
:::

## 开发者资源

- [安装指南](guides/installation.md)，涵盖 Community、试用和 PRO 设置流程
- [社区版 vs PRO 比较](guides/editions-comparison.md)，了解各版本之间的功能差异
- 社区版 JavaScript Gantt 的公开 [npm 包](https://www.npmjs.com/package/dhtmlx-gantt)
- [GitHub 仓库](https://github.com/DHTMLX/gantt)， Community 版源代码和问题跟踪
- [API 参考](api/api-overview.md) 以及 [示例](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27) 的实现细节
- [更新内容](whats-new.md) 及版本发布与迁移说明

## Gantt 功能亮点

DHTMLX Gantt 包含一个调度引擎、一个灵活的时间线，以及资源工具。

### 项目排程

其核心的调度引擎处理项目结构和工作时间。它涵盖：

- [任务类型与依赖关系](guides/task-types.md)。
- [工作时间配置](guides/working-time.md)，包括任务日历、项目日历，以及资源特定日历（PRO 版本）。
- [自动排程](guides/auto-scheduling.md) 用于重新计算计划（PRO 版本）。
- [关键路径](guides/critical-path.md) 用于突出显示决定项目完成日期的任务（PRO 版本）。

### 网格和时间线

该组件左侧为数据网格，右侧为可缩放的时间线。两部分都可被广泛配置：

- [灵活布局](guides/layout-config.md)，可添加额外网格、右侧列和自定义面板。
- [可配置列](guides/specifying-columns.md)，支持内联编辑、拖放以及键盘导航，外加 [多选](guides/multiselection.md)（PRO 版本）。
- [可定制的时间尺度](guides/configuring-time-scale.md)，具标记和高亮时间段。

### 高级项目控制（PRO）

对于需要超越简单时间线的团队，DHTMLX Gantt 的 PRO 版本提供用于详细项目跟踪的工具：

- [基线](guides/inbuilt-baselines.md#baselines) 与 [截止日期](guides/inbuilt-baselines.md#deadlines-and-constraints) 用于比较计划日期与当前日期。
- [未排程任务](guides/unscheduled-tasks.md) 与 [拆分任务](guides/split-tasks.md) 用于处理未完成、被中断或分阶段的工作。

### 资源与工作负载管理（PRO）

PRO 版还新增了专门的资源层，将甘特图变成一个覆盖任务排程和工作负载可视性的规划界面。它包括：

- [资源分配](guides/resource-management.md#assigningresources) 将资源与任务关联以实现精确排程。
- [资源直方图](guides/resource-management.md#resource-histogram) 和 [资源负载图](guides/resource-management.md#resourceloaddiagram) 用于可视化团队工作量。
- [按资源分组任务](guides/resource-management.md#balancingresourceload) 以跟踪工作量、发现冲突并平衡团队。

### 导出和生态系统

团队通常需要在平台之间迁移、保留本地备份，或在其他地方进行分析。DHTMLX Gantt 通过支持以下输出格式与外部工具集成：

- 导出为 [PDF/PNG](guides/export.md) 和 [Excel](guides/excel.md)，包括一个 [Node.js 导出模块](guides/export-requirements.md)。
- 通过受支持的导出服务导出/导入到 [MS Project](guides/export-msproject.md) 和 [Primavera](guides/export-primavera.md)。

### 交互与编辑

用户可以直接在图表中编辑数据，而不仅仅是查看。通过以下方式支持：

- 可配置的 [Lightbox 编辑器](guides/default-edit-form.md)，用于查看和编辑任务详细信息，支持自定义字段和按钮。
- [快速信息](guides/quick-info.md) 弹出框和 [工具提示](guides/tooltips.md)，在不打开完整表单的情况下展示任务详情。
- [拖放任务创建与选择](guides/advanced-dnd.md)，以及 [鼠标拖动滚动时间线](api/config/drag_timeline.md)。
- [键盘导航](guides/keyboard-navigation.md) 与 [无障碍支持](guides/accessibility.md)。
- [撤销/重做历史](guides/undo-redo.md)，用于安全编辑。

### 自定义与样式

图表的外观可以在各个层级上进行调整，从完整主题到单个任务条，通过：

- 基于 CSS 变量的一组内置 [皮肤](guides/skins.md)，支持 [深度自定义](guides/custom-skins.md) 和创建新主题。
- [模板](guides/common-configuration.md#gantttemplatesobject) 用于覆盖任务、链接和网格单元的呈现。
- 细粒度的 [任务着色](guides/colouring-tasks.md) 和 [链接样式](guides/colouring-lines.md)，以在视觉上突出显示特定项。
- [本地化](guides/localization.md) 支持界面语言和日期/时间格式。

## 版本与许可

DHTMLX Gantt 提供两种版本：**Community（社区版）** 和 **PRO**。您可以从免费的 Community 版开始，如后续需要更多功能、官方支持以及一个全面维护的甘特图基础，可以升级到 PRO 版。也可以直接通过 **官方试用** 或购买许可来开启 PRO 版。选择以下选项之一开始使用 DHTMLX Gantt：

- **[Community edition](https://dhtmlx.com/docs/products/dhtmlxGantt/open-source/)。** 免费并基于 MIT 许可，涵盖 DHTMLX Gantt v10+ 的核心交互式甘特图特色。
- **[Official trial](https://dhtmlx.com/docs/products/dhtmlxGantt/download.shtml)。** 你可以评估完整的 PRO 功能集，并在试用期内获得技术支持。
- **[PRO edition](https://dhtmlx.com/docs/products/dhtmlxGantt/#licensing)。** 适用于生产环境，包含高级规划功能、官方支持和商业许可。

要查看各版本之间的具体功能差异，请查阅 [社区版 vs PRO 比较](guides/editions-comparison.md)。要了解各选项的安装流程，请参阅 [安装指南](guides/installation.md)。 

:::note
如果您正在从早期的 GPL 版本迁移，请使用 [迁移指南](migration.md)。DHTMLX Gantt v10 及更高版本不再基于 GPL 发布；GPL v2 仅适用于更早的版本。
:::

## AI 编码工具

对于 AI 辅助开发，请从专为编码助手创建的 DHTMLX Gantt 指南开始：

- [AI Tools guide](integrations/ai-tools.md)
- [DHTMLX MCP Server guide](integrations/ai-tools/mcp-server.md)
- [Agent Skills guide](integrations/ai-tools/agent-skills.md)
- [Lovable AI integration guide](integrations/ai-tools/lovable-ai.md)

## 后端集成

DHTMLX Gantt 允许通过在服务器上实现 RESTful API 来连接任意后端：

- 数据通常以 JSON 形式加载和保存，用于 [任务](guides/loading.md)、[链接](guides/loading.md)、[资源](guides/resource-management.md) 与 [分配](guides/resource-management.md#connecting-resources-to-tasks)。
- 内置的 [DataProcessor](guides/server-side.md) 有助于将创建、更新和删除操作路由到您的服务器。
- 针对流行的后端平台和框架有教程（[Node.js](integrations/node/howtostart-nodejs.md)、[.NET Core](integrations/dotnet/howtostart-dotnet-core.md)、[Laravel](integrations/php/howtostart-php-laravel.md) 等），涵盖 CRUD 操作以及将 Gantt 与数据库同步的最佳实践。

## 下一步

如果您刚刚入门，请按以下步骤进行：

1. 参阅 [如何入门指南](integrations/howtostart-guides.md)，了解您首选的前端框架或纯 JavaScript。
2. 配置 [网格列](guides/specifying-columns.md)、[工作时间日历](guides/working-time.md)、[时间尺度](guides/configuring-time-scale.md) 以及 [编辑行为](guides/default-edit-form.md)。
3. 连接后端，设置 [DataProcessor](guides/server-side.md) 以及任务、链接和资源的应用端点。
4. 探索 [Guides](guides.md) 和 [API 参考](api/api-overview.md)，以实现更深层的自定义，例如模板、事件和扩展。

如果您已经在使用 DHTMLX Gantt 并且正在从早期版本升级，请查看 [What's New](whats-new.md) 以获取发行说明和最新功能的摘要，以及迁移指南。