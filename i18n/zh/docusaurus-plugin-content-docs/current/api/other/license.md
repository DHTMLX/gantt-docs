---
sidebar_label: license
title: license config
description: "返回 dhtmlxGantt 的许可证名称"
---

# license

### Description

@short: 返回 dhtmlxGantt 的许可证名称

@signature: license: string

### Returns
- ` license` - (string) - 许可证的名称

### Example

~~~jsx
console.log(gantt.license);
// -> "enterprise"
~~~

### Details

此方法返回一个简短的 license 名称，适用于诊断用途。

可用的取值有：

- "mit" - 免费的 Community edition (v10 及以上版本)
- "gpl" - 旧版免费版 (v9.x 及更早版本)
- "evaluation"
- "individual"
- "commercial"
- "enterprise"
- "ultimate"
- "site"

### Change log
- 在 v10.0 中新增了 "mit" 值
- 在 v6.2.2 中新增