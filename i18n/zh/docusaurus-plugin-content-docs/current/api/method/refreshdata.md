---
sidebar_label: refreshData
title: refreshData method
description: "刷新甘特图中的数据"
---

# refreshData

### Description

@short: 刷新甘特图中的数据

@signature: refreshData: () =\> void

### Example

~~~jsx
gantt.refreshData();
~~~

### Related samples
- [Basic filtering](https://docs.dhtmlx.com/gantt/samples/07_grid/03_filtering.html)

### Details

此方法用于重新绘制甘特图中已存在的数据，而无需重新加载。以下示例说明了其用法:

:::note
Sample: [Gantt. 重新绘制数据](https://snippet.dhtmlx.com/ces4sfdh)
:::

如果需要从服务器获取数据，应使用[parse()](api/method/parse.md)或[load()](api/method/load.md)方法。

:::note
Sample: [Gantt. 从不同数据对象加载数据](https://snippet.dhtmlx.com/h9ob1hxr) 
:::

### Related API
- [refreshLink](api/method/refreshlink.md)
- [refreshTask](api/method/refreshtask.md)

### Related Guides
- [任务的基本操作](guides/crud-task.md)

