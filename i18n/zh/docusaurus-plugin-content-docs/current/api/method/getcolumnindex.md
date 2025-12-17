---
sidebar_label: getColumnIndex
title: getColumnIndex method
description: "根据列名返回该列的位置"
---

# getColumnIndex

### Description

@short: 根据列名返回该列的位置

@signature: getColumnIndex: (name: string | number, excludeHidden?: boolean) =\> number

### Parameters

- `name` - (required) *string | number* -           列的名称
- `excludeHidden` - (optional) *boolean* - 在计算索引时忽略隐藏的列

### Returns
- ` index` - (number) - 列的位置索引

### Example

~~~jsx
var index = gantt.getColumnIndex("start_date"); // => 1
~~~

### Details

当参数 `excludeHidden` 设置为 *true* 时，该方法会跳过通过配置中 *hide:true* 设置为[隐藏](guides/specifying-columns.md)的列:

~~~js
gantt.config.columns = [
    {name: "text", label: "Task name", width: "*", tree: true, resize: true },
    {name: "start_date", label: "Start time" },
    {name: "duration", label: "Duration", width: 60, hide:true  }, /*!*/
    {name: "planned_start", label: "Planned start", hide:true  },  /*!*/
    {name: "planned_end", label: "Planned end", width:80, hide:true  }, /*!*/
    {name: "add", label: "", width: 36 }
];
 
gantt.init("gantt_here");

gantt.getColumnIndex("add"); // => 5 /*!*/
gantt.getColumnIndex("add", true); // => 2 /*!*/
~~~
