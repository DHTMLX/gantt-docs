---
sidebar_label: getConnectedGroup
title: getConnectedGroup method
description: "返回一个任务所连接的所有任务和链接"
---

# getConnectedGroup

:::info
此功能仅在 PRO 版中可用。 
:::


### Description

@short: 返回一个任务所连接的所有任务和链接

@signature: getConnectedGroup: (id?: string | number) =\> any

### Parameters
- `name` - (optional) *string | number* - 任务的 id

### Returns
- ` connections` - (对象) - 一个包含该任务所连接的任务和链接的对象

### Example

~~~jsx
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~

### Details

若不带参数，该方法将返回所有形成连接的任务和链接的分组。

:::note
 该方法需要在页面中包含 [auto_scheduling](guides/extensions-list.md#autoscheduling) 插件。 
:::

### Related Guides
- [Auto Scheduling](guides/auto-scheduling.md)