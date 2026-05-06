---
sidebar_label: onBeforeSplitTaskDisplay
title: onBeforeSplitTaskDisplay 事件
description: "在甘特图上显示拆分任务的一部分之前触发"
---

# onBeforeSplitTaskDisplay

### Description

@short: 在甘特图上显示拆分任务的一部分之前触发

@signature: onBeforeSplitTaskDisplay: (id: number | string, task: Task, parent: any) =\> boolean;

### Parameters

- `id` - (required) *number | string* - 子任务的 ID
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

当拆分任务被渲染时，首先对父项触发 [onBeforeTaskDisplay](api/event/onbeforetaskdisplay.md) 事件（对于一个带有 *render:"split"* 的任务）。随后对它的每个子任务触发 "onBeforeSplitTaskDisplay"。从 "onBeforeSplitTaskDisplay" 返回 *false*，将阻止子任务被显示。

:::note
示例: [Filter split tasks ](https://snippet.dhtmlx.com/3q1yd7iz)
:::

### Related Guides
- [拆分任务](guides/split-tasks.md)

### Change log
- v8.0 中新增

