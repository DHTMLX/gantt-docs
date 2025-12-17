---
title: "配置 Lightbox 元素"
sidebar_label: "配置 Lightbox 元素"
---

配置 Lightbox 元素
=============================

Lightbox 作为用于更新任务详情的编辑表单。

 下方展示了默认的 lightbox 布局。

![lightbox](/img/lightbox.png)

Lightbox 可以根据任务类型及其特定特性有所不同。每种任务类型的配置设置位于 [lightbox](api/config/lightbox.md) 对象中，包括:

- **gantt.config.lightbox.sections** - 用于标准任务。
- **gantt.config.lightbox.project_sections** - 用于项目任务。
- **gantt.config.lightbox.milestone_sections** - 用于里程碑任务。

你也可以[添加自定义类型](guides/task-types.md)，并相应地定义 lightbox 结构。
更多详细信息请参见 [작업 유형](guides/task-types.md)

整体的类型结构如下:

- <span class="subproperty">**sections?**</span> - (*LightboxSection[]*) - 可选，常规任务的 lightbox 区块数组
- <span class="subproperty">**project_sections?**</span> - (*LightboxSection[]*) - 可选，项目任务的 lightbox 区块数组
- <span class="subproperty">**milestone_sections?**</span> - (*LightboxSection[]*) - 可选，里程碑任务的 lightbox 区块数组
- <span class="subproperty">**[lightboxType: string]**</span> - (*LightboxSection[] | undefined*) - 自定义类型的 lightbox 区块数组

:::note
自 v7.1.13 起，如果 [gantt.config.csp](api/config/csp.md) 被设置为 *true* 或 Gantt 运行在 Salesforce 环境下，lightbox 将会渲染在 Gantt 容器内部。
:::

Lightbox 结构
------------------------

### Sections

lightbox 的布局由 lightbox 对象中的 **sections** 属性定义:

~~~js
// 默认 lightbox 定义
gantt.config.lightbox.sections="["
    {name:"description", height:70, map_to:"text", type:"textarea", focus:true},
    {name:"time",          height:72, map_to:"auto", type:"duration"}
];
~~~

**sections** 数组中的每一项都代表 lightbox 的一个区块，通过对象及其可用属性进行描述。

### 区块控件 {#lightboxcontrols}

lightbox 中的每个区块都基于特定的控件类型构建。可用的控件如下:

- [Textarea](guides/textarea.md) - 多行文本输入框
- [Time](guides/time.md) - 设置任务开始和结束日期的选择器
- [Duration](guides/duration.md) - 设置任务开始日期和持续天数的选择器
- [Select](guides/select.md) - 下拉选择框
- [Typeselect](guides/typeselect.md) - 用于更改任务类型的下拉框
- [Parent](guides/parent.md) - 用于选择任务父级的下拉框
- [Template](guides/template.md) - 展示自定义 HTML 内容的容器
- [Checkbox](guides/checkbox.md) - 用于切换选项的复选框
- [Radio button](guides/radio.md) - 单选按钮，用于从一组选项中选择一个
- [Resources](guides/resources.md) - 用于为任务分配多个资源的复杂控件
- [Constraint](guides/constraint.md) - 设置任务约束的复杂控件
- [Baselines](guides/baseline.md) - 管理任务基线的复杂控件

~~~js
var opts = [
    { key: 1, label: 'High' },
    { key: 2, label: 'Normal' },
    { key: 3, label: 'Low' }
];

gantt.config.lightbox.sections = [
    {name:"description", height:38, map_to:"text", type:"textarea", focus:true},
    {name:"priority",      height:22, map_to:"priority", type:"select", options:opts},
    {name:"time",          height:72, map_to:"auto", type:"duration"}
];
~~~

