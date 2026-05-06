---
title: "指南"
sidebar_label: "指南"
---

# 指南

指南信息构成文档的核心部分，帮助您在实际使用 dhtmlxGantt 时。
本章分为面向任务的手册，帮助您完成不同复杂度的任务。
文章围绕关键步骤和问题解决活动展开。 

请查看 dhtmlxGantt 库在 Standard 版本与 PRO 版本中的可用功能（[features available in the Standard and PRO versions](guides/editions-comparison.md)）。

<div className="guidesList">

## 在页面上创建甘特图

说明如何安装并初始化甘特图，并提供可用扩展的列表。

- ### [如何安装 dhtmlxGantt](guides/installation.md)
- ### [初始化甘特图](guides/initializing-gantt-chart.md)
- ### [扩展的完整列表](guides/extensions-list.md)

## 配置甘特图

介绍如何在服务器上创建甘特图、在页面上构建标准的甘特图并让其生效：使用特定设置进行配置，定制默认模板，附加事件等。

- ### [配置](guides/common-configuration.md)
- ### [甘特图布局](guides/layout-config.md)
- ### [资源管理](guides/resource-management.md)
- ### [事件处理](guides/handling-events.md)
- ### [页面上的多个甘特图](guides/multiple-gantts.md)
- ### [在服务器上使用甘特图](guides/using-gantt-on-server.md)


## 加载和保存数据

讨论将数据加载到甘特图中的方式：不同的数据源、格式、技巧。

- ### [数据加载](guides/loading.md)
- ### [服务器端集成](guides/server-side.md)
- ### [性能：提升方法](guides/performance.md)
 
## 配置网格区域

聚焦于如何使用网格：指定所需列并进行配置，定制树列，启用选择等。

- ### [指定列](guides/specifying-columns.md)
- ### [网格中行的调整大小](guides/resizing-rows.md)
- ### [树列的配置](guides/tree-column.md)
- ### [重新排序任务](guides/reordering-tasks.md)
- ### [多任务选择](guides/multiselection.md)
- ### [列排序](guides/sorting.md)
- ### [任务分组](guides/grouping.md)
- ### [任务筛选](guides/filtering.md)
- ### [网格中的内联编辑](guides/inline-editing.md)
  
 
## 配置时间刻度

聚焦于时间线的配置：设置主时间刻度的格式、单位、步长，添加次级刻度及其配置，突出显示特定日期等。

- ### [设置时间刻度](guides/configuring-time-scale.md) 
- ### [缩放](guides/zooming.md)
- ### [高亮时间槽](guides/highlighting-time-slots.md)
- ### [动态更改时间刻度设置](guides/dynamic-scale.md)
- ### [在时间刻度中隐藏时间单位](guides/custom-scale.md)
- ### [添加垂直标记](guides/markers.md)
- ### [RTL（从右到左）模式](guides/rtl-mode.md)
  
## 配置 Lightbox（编辑表单）

聚焦于如何使用 Lightbox：添加/删除控件，获取/设置控件的值，定制灯箱的外观等。

- ### [Lightbox 元素配置](guides/default-edit-form.md)
- ### [与 Lightbox 元素的交互](guides/lightbox-manipulations.md)
- ### [自定义 Lightbox](guides/custom-edit-form.md)
- ### [创建自定义元素](guides/custom-editor.md)
- ### [在 Lightbox 中更改按钮](guides/custom-button.md)
 

## 配置任务

涵盖对任务对象执行常规操作的基础知识，例如添加、删除、设置日期格式、筛选等。

- ### [任务类型](guides/task-types.md) 
- ### [任务对象/ID](guides/task-object-operations.md)
- ### [父任务/子任务](guides/task-tree-operations.md)
- ### [对任务的基本操作](guides/crud-task.md)
- ### [未安排任务](guides/unscheduled-tasks.md)
- ### [拆分任务](guides/split-tasks.md)
- ### [多任务选择](guides/multiselection.md)
- ### [工作时间计算](guides/working-time.md)
- ### [关键路径](guides/critical-path.md)
- ### [时间线中的额外元素](guides/inbuilt-baselines.md)
- ### [时间线区域的自定义元素](guides/baselines.md)
- ### [里程碑](guides/milestones.md)
- ### [甘特图元素的提示信息](guides/tooltips.md)
- ### [显示任务内容](guides/text-block-for-task.md)
- ### [只读模式](guides/readonly-mode.md)
- ### [验证](guides/validation.md)
- ### [在时间线内拖动任务](guides/dnd.md)
- ### [使用 DnD 创建/选择任务](guides/advanced-dnd.md)
- ### [手动排程的汇总任务](guides/custom-projects-dates.md)

  
## 配置依赖链接

涵盖对依赖对象执行通用操作的基础知识，例如添加、删除、获取依赖对象等。

- ### [获取链接对象/ID](guides/link-object-operations.md)
- ### [添加/更新/删除链接](guides/crud-dependency.md)
- ### [自动排程](guides/auto-scheduling.md)


## 导出与导入数据

讨论以各种格式导出和导入甘特图数据的方法，以及将数据序列化为 XML 和 JSON。

- ### [导出服务 - 独立安装的系统要求](guides/export-requirements.md)
- ### [导出为 PDF 和 PNG](guides/export.md)
- ### [Excel 的导出/导入，导出到 iCal](guides/excel.md)
- ### [从 MS Project 导出和导入](guides/export-msproject.md)
- ### [从 Primavera P6 导出和导入](guides/export-primavera.md)
- ### [将数据序列化为 XML 和 JSON](guides/serialization.md)
- ### [在 Node.js 上导出和导入数据](guides/export-nodejs.md)


## 样式

描述可用于美化甘特图的格式和技术。

- ### [CSS 文档](guides/css-overview.md)
- ### [皮肤](guides/skins.md)
- ### [甘特图模板](guides/templates.md)
- ### [任务着色](guides/colouring-tasks.md)
- ### [链接着色与样式](guides/colouring-lines.md)
- ### [使用甘特图样式](guides/styling-guide.md)
 

## 与日期一起工作

讨论在甘特图中处理日期时可能需要的主题：将日期转换为字符串及反向转换、日期格式中的允许字符等。

- ### [日期格式规范](guides/date-format.md)
- ### [日期操作](guides/date-operations.md)

## 常用特性

引导您了解在创建甘特图时可能需要的常见信息。

- ### [本地化](guides/localization.md)
- ### [全屏模式](guides/fullscreen-mode.md)
- ### [撤销/重做功能](guides/undo-redo.md)
- ### [弹出消息和模态框](guides/message-boxes.md)
- ### [可访问性](guides/accessibility.md)
- ### [键盘导航](guides/keyboard-navigation.md)
- ### [内容安全策略遵从](guides/content-security-policy.md)
- ### [与 JQuery 的集成](guides/jquery-integration.md)

  
## 用户界面指南

从最终用户的角度描述甘特图界面的元素。

- ### [甘特图界面概览](guides/overview.md)


</div>