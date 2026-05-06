---
sidebar_label: mixin
title: mixin method
description: "将 'source' 对象的属性添加到 'target' 对象中"
---

# mixin

### Description

@short: 将 'source' 对象的属性添加到 'target' 对象中

@signature: mixin: (target: CustomObject, source: CustomObject, force?: boolean) =\> void

### Parameters

- `target` - (required) *CustomObject* - 目标对象
- `source` - (required) *CustomObject* - 源对象
- `force` -		(optional)	*boolean*	-	可选，如果为 true，'source' 的属性将覆盖 'target' 中的匹配属性（若存在）。若为 false（默认），将省略已存在于 'target' 的属性	

### Example

~~~jsx
gantt.mixin(target, source, force);
~~~

### Change log
- 已在版本 4.0 中新增