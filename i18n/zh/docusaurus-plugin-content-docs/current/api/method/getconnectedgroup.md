---
sidebar_label: getConnectedGroup
title: getConnectedGroup method
description: "返回与特定任务连接的所有任务和链接"
---

# getConnectedGroup
:::info
 该功能仅在PRO版本中可用。 
:::
### Description

@short: 返回与特定任务连接的所有任务和链接

@signature: getConnectedGroup: (id?: string | number) =\> any

### Parameters

- `id` - (optional) *string | number* - 可选，指定任务的ID

### Returns
- ` connections` - (object) - 包含与指定任务连接的任务和链接的对象

### Example

~~~jsx
gantt.getConnectedGroup(18);
// => {links:["16", "17", "18"], tasks:[18, 17, 19, 20]}
~~~

### Details

当不传参数调用时，此方法返回所有形成连接的任务组和链接组。

:::note
 该方法需要页面中包含 [auto_scheduling](guides/extensions-list.md) 插件。 
:::

### Related Guides
- [自动调度](guides/auto-scheduling.md)
