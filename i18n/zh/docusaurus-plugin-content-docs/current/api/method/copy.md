---
sidebar_label: 复制
title: 复制方法
description: "创建提供对象的深拷贝"
---

# 复制

### Description

@short: 创建提供对象的深拷贝

@signature: copy: (initialObject: any) =\> any

### Parameters

- `initialObject` - (required) *object* - 需要被拷贝的对象

### Returns
- ` clonedObject` - (object) - 所提供对象的深拷贝

### Example

~~~jsx
var backupTask = gantt.copy(gantt.getTask(id));
~~~

### Change log
- 新增于版本 4.0