---
sidebar_label: baseline_text
title: baseline_text template
description: "定义显示在 baseline 元素内部的文本内容"
---

# baseline_text

### Description

@short: 定义显示在 baseline 元素内部的文本内容

@signature: baseline_text: (task: Task, baseline: Baseline, index: number) =\> string | number | void;

### Parameters

- `task` - (required) *Task* - 与 baseline 关联的任务对象
- `baseline` - (required) *Baseline* - baseline 对象本身
- `index` - (required) *number* - baseline 在任务的 baselines 数组中的位置索引

### Returns
- ` text` - (string | number | void) - 将作为 baseline 元素 innerHTML 设置的 HTML 内容。默认返回空字符串。

### Example

~~~jsx
gantt.templates.baseline_text = function(task, baseline, index) {
    return "Baseline #" + (index + 1);
};
~~~

### Related samples
- [Display baselines](https://docs.dhtmlx.com/gantt/samples/04_customization/15_baselines.html)

### Related API
- [baselines](api/config/baselines.md)

### Related Guides
- [时间线中的额外元素](guides/inbuilt-baselines.md)

### Change log
- 在 v9.0 中添加

