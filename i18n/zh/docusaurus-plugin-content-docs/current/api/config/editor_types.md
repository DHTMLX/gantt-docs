---
sidebar_label: editor_types
title: editor_types 配置
description: "包含内联编辑器定义的对象"
---

# editor_types

### Description

@short: 一个包含内联编辑器定义的对象

@signature: editor_types: \{ text?: InlineEditor; number?: InlineEditor; duration?: InlineEditor; date?: InlineEditor; select?: InlineEditor; predecessor?: InlineEditor; [customEditorName: string]: InlineEditor | undefined; \}

### Example

~~~jsx
gantt.config.editor_types.custom_editor = {// 自定义编辑器逻辑}
~~~

### Details

此配置用于创建自定义编辑器（如上例所示）。

系统内置了多种内联编辑器:

- **text** - (*InlineEditor*) - 用于编辑文本列，例如任务名称
- **number** - (*InlineEditor*) - 用于编辑数字列，例如任务时长、顺序等
- **duration** - (*InlineEditor*) - 用于编辑持续时间列，即任务持续时间。
  仅当使用 ***map_to:"duration"*** 配置并且 [the editor type](guides/inline-editing.md#types-of-editors) 设置为 **"duration"** 类型 时才工作
- **date** - (*InlineEditor*) - 用于编辑日期列，例如任务的开始日期和结束日期
- **select** - (*InlineEditor*) - 用于从列表中选择一个选项
- **predecessor** - (*InlineEditor*) - 用于为当前正在编辑的任务设置前置任务。该编辑器获取任务的 [WBS 码](guides/specifying-columns.md#wbscode) 以建立与前置任务的连接
- **[customEditorName: string]** - (*InlineEditor | undefined*) - 自定义内联编辑器

在此对象中定义的编辑器可以附加到 gantt 列上：

~~~js
const textEditor = {type: "text", map_to: "text"};
const dateEditor =  {type: "date", map_to: "start_date",
    min: new Date(2018, 0, 1), max: new Date(2019, 0, 1)};

gantt.config.columns = [
    {name: "text", label: "Task name", tree: true, width: "*", editor: textEditor},
    {name: "start_date", label: "Start time", align: "center", editor: dateEditor}
];

~~~

### Related Guides
- [Grid中的内联编辑](guides/inline-editing.md#types-of-editors)