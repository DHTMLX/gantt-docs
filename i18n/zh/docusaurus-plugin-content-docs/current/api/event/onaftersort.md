---
sidebar_label: onAfterSort
title: onAfterSort event
description: "当 grid 中的任务排序完成后触发"
---

# onAfterSort

### Description

@short: 当 grid 中的任务排序完成后触发

@signature: onAfterSort: (field: string | GanttCallback, desc?: boolean, parent?: string | number) =\> void;

### Parameters

- `field` - (required) *string | function* - 用于排序的列名或自定义排序函数
- `desc` - (optional) *boolean* - 可选，表示排序顺序:<i>true</i> 表示降序，<i>false</i> 表示升序<br>
- `parent` - (optional) *string | number* - 可选，如果排序仅限于特定分支，则为该父任务的 ID

### Example

~~~jsx
gantt.attachEvent("onAfterSort",function(field, direction, parent){
    // your code here
});
~~~

### Related API
- [sort](api/method/sort.md)
- [sort](api/config/sort.md)

