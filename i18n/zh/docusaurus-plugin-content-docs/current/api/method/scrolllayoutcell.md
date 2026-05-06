---
sidebar_label: scrollLayoutCell
title: scrollLayoutCell 方法
description: "将布局视图滚动到指定位置"
---

# scrollLayoutCell

### Description

@short: 将布局视图滚动到指定位置

@signature: scrollLayoutCell: (name: string, x: number | null, y: number | null) =\> void

### Parameters

- `name` - (必填) *string* - 布局视图的名称
- `x` - (必填) *number | null* - 可选，水平滚动的值，或 'null'（如果滚动位置不应改变）
- `y` - (必填) *number | null* - 可选，垂直滚动的值，或 'null'（如果滚动位置不应改变）

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
sample: [用于获取布局单元格视图并滚动它们的公开方法](https://snippet.dhtmlx.com/0v4mmoxu)
:::

### Related API
- [scrollTo](api/method/scrollto.md)