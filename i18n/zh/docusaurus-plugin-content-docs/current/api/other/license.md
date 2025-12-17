---
sidebar_label: license
title: license config
description: "返回 dhtmlxGantt 的 license 名称"
---

# license

### Description

@short: 返回 dhtmlxGantt 的 license 名称

@signature: license: string

### Returns
- ` license` - (string) - license 的名称

### Example

~~~jsx
console.log(gantt.license);
// -> "enterprise"
~~~

### Details

此方法返回一个简短的 license 名称，适用于诊断用途。

可能的取值包括:

- "gpl"
- "evaluation"
- "individual"
- "commercial"
- "enterprise"
- "ultimate"
- "site"

### Change log
- 于 v6.2.2 版本添加
