---
sidebar_label: changeLightboxType
title: changeLightboxType method
description: "根据任务的类型重新绘制该任务的 lightbox"
---

# changeLightboxType

### Description

@short: 根据任务的类型重新绘制该任务的 lightbox

@signature: changeLightboxType: (type: string) =\> void

### Parameters

- `type` - (required) *string* - 任务类型

### Example

~~~jsx
gantt.changeLightboxType(gantt.config.types.project);
~~~

### Details

该方法会重新绘制该任务的 lightbox，并在可能的情况下保存所有输入。为重新构建结构，该方法使用 [指定类型的配置](guides/default-edit-form.md)。

如果 lightbox 的类型与参数中的类型相同，则该方法不会重新绘制 lightbox。

### Related API
- [onLightboxChange](api/event/onlightboxchange.md)