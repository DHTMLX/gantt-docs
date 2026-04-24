---
sidebar_label: onAfterSort
title: onAfterSort event
description: "fires after tasks are sorted in the grid"
---

# onAfterSort

### Description

@short: 在网格中对任务排序后触发

@signature: onAfterSort: (field: string | GanttCallback, desc?: boolean, parent?: string | number) =\> void;

### Parameters

- `field` - (必填) *string | function* - 网格按排序的列名，或一个自定义排序函数
- `desc`	- (可选)	*boolean*	 	-	可选，排序方向：<i>true</i> - 降序，<i>false</i> - 升序<br/>
- `parent`	- (可选) *string | number*	-	可选，父任务的 ID，如果任务仅在指定父任务的分支中排序

### Example

~~~jsx
gantt.attachEvent("onAfterSort",function(field, direction, parent){
    // 在这里插入您的自定义逻辑
});
~~~

### Related API
- [sort](api/method/sort.md)
- [sort](api/config/sort.md)