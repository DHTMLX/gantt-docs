---
sidebar_label: copy
title: copy method
description: "创建给定对象的深拷贝"
---

# copy

### Description

@short: 创建给定对象的深拷贝

@signature: copy: (initialObject: any) =\> any

### Parameters

- `initialObject` - (required) *object* - 需要被拷贝的对象

### Returns
- ` clonedObject` - (object) - 给定对象的深拷贝副本

### Example

~~~jsx
var backupTask = gantt.copy(gantt.getTask(id));
~~~

### Change log
- 在版本 4.0 中添加
