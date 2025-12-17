---
sidebar_label: mixin
title: mixin method
description: "将 'source' 对象的属性合并到 'target' 对象中"
---

# mixin

### Description

@short: 将 'source' 对象的属性合并到 'target' 对象中

@signature: mixin: (target: CustomObject, source: CustomObject, force?: boolean) =\> void

### Parameters

- `target` - (required) *CustomObject* - 接收新属性的对象
- `source` - (required) *CustomObject* - 提供要添加属性的对象
- `force` - (optional) *boolean* - 可选，若为 true，当 'source' 中的属性与 'target' 中同名时，将替换 'target' 中的属性。默认为 false，保持 'target' 中已有属性不变

### Example

~~~jsx
gantt.mixin(target, source, force);
~~~

### Change log
- 版本 4.0 新增
