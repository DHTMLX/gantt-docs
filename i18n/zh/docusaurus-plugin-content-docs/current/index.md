---
sidebar_label: DHTMLX Gantt 概览
title: DHTMLX Gantt 概览
slug: /
description: "DHTMLX Gantt JavaScript 组件概览。通过快速入门指南、详细文档和 API 参考开始使用，并尝试在线示例。"
---

import Link from '@docusaurus/Link';
import { FrameworkIcon } from '@site/src/components/FrameworkIcon';


**DHTMLX Gantt** 是一个用于在浏览器中展示与编辑项目时间线的 JavaScript 组件。  
它结合了可配置的数据表格、可缩放时间轴以及能理解工作时间、依赖关系与约束条件的调度引擎。

您可以利用它构建用于项目管理工具、建筑与制造计划、现场服务排程，或任何需要可视化时间线的应用程序。

DHTMLX Gantt 提供 Standard 和 PRO 两个版本。PRO 版本包括自动排程、关键路径、资源管理、动态加载等高级功能。

---

## 按框架快速开始

您可以将 DHTMLX Gantt 作为原生 JavaScript 组件使用，也可以集成到现代框架中。 
从适合您技术栈的分步"入门指南"开始:

<div className="framework-grid">

  <a className="framework-card" href="guides/initializing-gantt-chart/">
  <FrameworkIcon name="javascript" className="framework-icon" />
  <div className="framework-title">JavaScript</div>
  <div className="framework-desc">
  通过 script 标签或打包工具进行最小化设置。适用于简单页面或无框架的应用。
  </div>
  </a>

  <a className="framework-card" href="integrations/react/">
  <FrameworkIcon name="react" className="framework-icon" />
  <div className="framework-title">React</div>
  <div className="framework-desc">
  使用现成的 <code>ReactGantt</code> 组件（支持 Props 与事件）。
  </div>
  </a>

  <a className="framework-card" href="integrations/angular/howtostart-angular/">
  <FrameworkIcon name="angular" className="framework-icon" />
  <div className="framework-title">Angular</div>
  <div className="framework-desc">
  通过轻量级封装组件将 Gantt 集成到 Angular 项目中。
  </div>
  </a>

  <a className="framework-card" href="integrations/vue/howtostart-vue/">
  <FrameworkIcon name="vue" className="framework-icon" />
  <div className="framework-title">Vue</div>
  <div className="framework-desc">
  通过简洁封装与响应式 Props 将 Gantt 添加到 Vue 应用。
  </div>
  </a>

  <a className="framework-card" href="integrations/svelte/howtostart-svelte/">
  <FrameworkIcon name="svelte" className="framework-icon" />
  <div className="framework-title">Svelte</div>
  <div className="framework-desc">
  使用简单组件在 Svelte 中绑定 Gantt 的配置与事件。
  </div>
  </a>

  <a className="framework-card" href="integrations/react/quick-start/">
  <FrameworkIcon name="react" className="framework-icon" />
  <div className="framework-title">React（低级集成）</div>
  <div className="framework-desc">
  在自定义组件中直接嵌入 Gantt 核心部件，以完全控制生命周期与数据流。
  </div>
  </a>

  <a className="framework-card" href="integrations/salesforce/howtostart-salesforce/">
  <FrameworkIcon name="salesforce" className="framework-icon" />
  <div className="framework-title">Salesforce</div>
  <div className="framework-desc">
  在 Salesforce 应用中嵌入 Gantt，与组织数据集成，将项目时间线引入 CRM。
  </div>
  </a>

</div>

---

## 在线示例

要查看 DHTMLX Gantt 的实际效果，请访问在线示例:

- [包含任务与链接的基本 Gantt 图表](https://docs.dhtmlx.com/gantt/samples/?sample=%2701_initialization/01_basic_init.html%27&filter=%27%27)
- [自动排程](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/12_auto_scheduling.html%27&filter=%27%27) 和 [关键路径](https://docs.dhtmlx.com/gantt/samples/?sample=%2702_extensions/03_critical_path.html%27&filter=%27%27)
- 资源管理:[资源使用图](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/04_resource_usage_diagram.html%27&filter=%27%27)、[资源直方图](https://docs.dhtmlx.com/gantt/samples/?sample=%2711_resources/09_resource_histogram.html%27&filter=%27%27)
- [查看所有示例](https://docs.dhtmlx.com/gantt/samples/)

---

## 核心能力

DHTMLX Gantt 结合了调度引擎、灵活时间线与资源工具。 
以下部分介绍主要功能领域并指向更深入的文档。

### 项目调度

DHTMLX Gantt 的调度引擎理解项目结构与工作时间:

- [任务类型](guides/task-types.md) 与 [依赖关系](guides/dependencies.md):三类核心任务（普通任务、汇总任务、里程碑）
- 项目/任务/资源级别的 [工作时间日历](guides/working-time/)
- [自动排程](guides/auto-scheduling/) 与 [关键路径](guides/critical-path/)，用于重新计算计划与识别影响项目完工日期的关键任务

调度行为可根据您的规则或例如 MS Project 的逻辑进行调整。

### 时间线与数据表

组件由左侧数据表与右侧可缩放时间轴组成，两部分都可以高度自定义:

- 支持额外表格、右侧面板、自定义区域的灵活 [布局](guides/layout-config/)
- 支持内联编辑、[多选](guides/multiselection/)、拖拽和键盘导航的 [列配置](guides/specifying-columns/)
- 带有 [标记线](guides/markers/) 与 [高亮时间区块](guides/highlighting-time-slots/) 的可自定义 [时间轴](guides/configuring-time-scale/)

### 高级项目控制

实现更深入的项目跟踪:

- [基线](guides/inbuilt-baselines/#baselines) 与 [截止日期](guides/inbuilt-baselines/#deadlines-and-constraints)
- [未排程任务](guides/unscheduled-tasks/) 与 [拆分任务](guides/split-tasks/)
- [撤销/重做](guides/undo-redo) 编辑历史

### 资源与工作量管理（PRO）

PRO 版本增加完整的资源管理层:

- 任务的 [资源分配](guides/resource-management/#assigningresources)
- [资源直方图](guides/resource-management/#resource-histogram) 与 [资源负载图](guides/resource-management/#resourceloaddiagram)
- 按资源对任务进行 [分组](guides/resource-management/#balancingresourceload)

它将 Gantt 图扩展为应用内的轻量级资源管理工具。

### 导出与生态系统

DHTMLX Gantt 可与外部系统集成并支持多种导出/导入格式:

- 可导出为 [PDF/PNG](guides/export/) 与 [Excel](guides/excel/)（含 [Node.js 导出模块](guides/export-requirements/)）
- 可与 [MS Project](guides/export-msproject/) 和 [Primavera](guides/export-primavera/) 互通（通过服务导出）

---

## 前端与后端集成

### 前端集成

DHTMLX Gantt 是框架无关的原生 JavaScript 组件，可在所有现代浏览器中运行，可用方式包括:

- 独立的 JS 组件
- 在 [React](integrations/react)、[Angular](integrations/angular/howtostart-angular)、[Vue](integrations/vue/howtostart-vue)、[Svelte](integrations/svelte/howtostart-svelte) 中封装使用

针对 **React**:

- 使用 [官方 ReactGantt 封装](integrations/react)，以声明式 props 管理 Gantt（推荐方式）
- 使用 [低级 React 集成](integrations/react/quick-start/) 以自主管理初始化、销毁与数据流

针对 **Angular / Vue / Svelte**，可参考各自的 "How to start" 指南构建轻量封装组件。

### 后端集成

在后端，Gantt 通过 REST 风格的 API 通信:

- 数据通常以 [JSON（任务、链接、资源、分配）](guides/loading/) 形式加载与保存
- 内置 [DataProcessor](guides/server-side/) 可辅助处理增删改操作的路由
- 针对 [Node.js](integrations/node/howtostart-nodejs/)、[.NET Core](integrations/dotnet/howtostart-dotnet-core/)、[Laravel](integrations/php/howtostart-php-laravel/) 等后端框架均提供示例教程

因此，Gantt 易于集成进已有系统或新的微服务。

---

## 下一步

若您刚开始使用:

1. 选择并完成适用于您框架的 [入门指南](#quick-start-by-framework)。 
2. 配置 [表格列](guides/specifying-columns/)、[工作时间日历](guides/working-time/)、[时间轴](guides/configuring-time-scale/) 与 [编辑行为](guides/default-edit-form/)。 
3. [连接后端](integrations/howtostart-guides/#how-to-start-with-gantt-on-server-side)，设置 [DataProcessor](guides/server-side/#customrouting) 与任务/链接/资源的 REST 接口。 
4. 在需要深度自定义时，查阅 [Guides](guides/) 与 [API 文档](api/api-overview/)。

若您正在从旧版本升级，请查看 [更新日志](whats-new/)，了解最新功能与迁移指南。
