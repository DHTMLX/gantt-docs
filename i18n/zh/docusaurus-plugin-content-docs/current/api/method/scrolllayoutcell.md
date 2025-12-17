---
sidebar_label: scrollLayoutCell
title: scrollLayoutCell method
description: "将布局视图移动到指定位置"
---

# scrollLayoutCell

### Description

@short: 将布局视图移动到指定位置

@signature: scrollLayoutCell: (name: string, x: number | null, y: number | null) =\> void

### Parameters

- `name` - (required) *string* - 布局视图的名称
- `x` - (required) *number | null* -    可选，水平滚动值，或为 'null'（如果不想更改水平位置）
- `y` - (required) *number | null* -    可选，垂直滚动值，或为 'null'（如果不想更改垂直位置）

### Example

~~~jsx
// 仅水平滚动布局视图
gantt.scrollLayoutCell("resourceTimeline", 50);

// 仅垂直滚动布局视图
gantt.scrollLayoutCell("resourceTimeline", null, 50);

// 同时水平和垂直滚动布局视图
gantt.scrollLayoutCell("resourceTimeline", 100, 100);
~~~

### Details

:::note
Sample: [用于访问布局单元视图并控制其滚动的公共方法](https://snippet.dhtmlx.com/0v4mmoxu)
:::

### Related API
- [scrollTo](api/method/scrollto.md)

