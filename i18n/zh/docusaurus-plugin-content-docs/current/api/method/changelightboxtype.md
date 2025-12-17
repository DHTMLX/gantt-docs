---
sidebar_label: changeLightboxType
title: changeLightboxType method
description: "根据任务类型更新lightbox"
---

# changeLightboxType

### Description

@short: 根据任务类型更新lightbox

@signature: changeLightboxType: (type: string) =\> void

### Parameters

- `type` - (required) *string* - 任务类型

### Example

~~~jsx
gantt.changeLightboxType(gantt.config.types.project);
~~~

### Details

此方法会刷新lightbox，并在可能的情况下尝试保存已输入的数据。它会根据[指定类型的配置](guides/default-edit-form.md)重建结构。

如果当前lightbox类型与传入的参数类型相同，则不会进行更新。

### Related API
- [onLightboxChange](api/event/onlightboxchange.md)

