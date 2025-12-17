---
sidebar_label: onBeforeSplitTaskDisplay
title: onBeforeSplitTaskDisplay event
description: "在拆分任务的某个分段出现在甘特图上之前触发"
---

# onBeforeSplitTaskDisplay

### Description

@short: 在拆分任务的某个分段出现在甘特图上之前触发

@signature: onBeforeSplitTaskDisplay: (id: number | string, task: Task, parent: any) =\> boolean;

### Parameters

- `id` - (required) *number|string* - 子任务的标识符
- `task` - (required) *Task* - 子任务对象
- `parent` - (required) *object* - 父任务对象

### Returns
- ` result` - (boolean) - 指示拆分任务的子任务是否应在页面上显示（<b>true</b>）或隐藏（<b>false</b>）

### Example

~~~jsx
gantt.attachEvent("onBeforeSplitTaskDisplay", function (id, task, parent) {
    if (task.duration < 3) {
        return false;
    }
    return true;
});
~~~

### Details

![split tasks](/img/split_tasks.png)

在渲染拆分任务时，首先会为父任务（带有 *render:"split"* 的任务）触发 [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 事件。紧接着，"onBeforeSplitTaskDisplay" 会为其每个子任务触发。若 "onBeforeSplitTaskDisplay" 返回 *false*，则该特定子任务将不会被显示。

:::note
Sample: [筛选拆分任务](https://snippet.dhtmlx.com/3q1yd7iz) 
:::

### Related Guides
- [拆分任务](guides/split-tasks.md)

### Change log
- v8.0 中新增

