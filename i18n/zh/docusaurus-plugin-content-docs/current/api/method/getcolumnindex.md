---
sidebar_label: getColumnIndex
title: getColumnIndex method
description: "通过名称返回列的索引"
---

# getColumnIndex

### Description

@short: 返回通过名称获取列的索引

@signature: getColumnIndex: (name: string | number, excludeHidden?: boolean) =\> number

### Parameters

- `name` - (required) *string | number* - 列的名称
- `excludeHidden` - (optional) *boolean* - 跳过隐藏列的索引

### Returns
- ` index` - (number) - 列的索引

### Example

~~~jsx
var index = gantt.getColumnIndex("start_date"); // => 1
~~~

### Details

如果将 `excludeHidden` 参数设置为 *true*，该方法将不统计通过配置中的 *hide:true* 选项隐藏的列的索引：

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