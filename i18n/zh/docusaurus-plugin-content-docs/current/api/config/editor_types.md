---
sidebar_label: editor_types
title: editor_types config
description: "一个包含内联编辑器定义的对象"
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

- **text** - (*InlineEditor*) - 用于编辑文本字段，如任务名称
- **number** - (*InlineEditor*) - 用于编辑数字字段，如任务持续时间或顺序
- **duration** - (*InlineEditor*) - 用于编辑持续时间字段，即任务持续时间。
仅当应用了 ***map_to:"duration"*** 配置且[editor type](guides/inline-editing.md)设置为 **"duration"** 时有效
- **date** - (*InlineEditor*) - 用于编辑日期字段，如任务开始和结束日期
- **select** - (*InlineEditor*) - 用于从下拉列表中选择选项
- **predecessor** - (*InlineEditor*) - 用于为当前任务分配前置任务。此编辑器使用[WBS代码](guides/specifying-columns.md)来关联前置任务
- **[customEditorName: string]** - (*InlineEditor | undefined*) - 用于定义自定义内联编辑器

此处定义的编辑器可以分配给 gantt 的列:

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
- [在网格中进行内联编辑](guides/inline-editing.md)
