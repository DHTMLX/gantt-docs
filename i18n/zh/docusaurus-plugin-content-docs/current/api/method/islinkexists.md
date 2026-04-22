---
sidebar_label: isLinkExists
title: isLinkExists 方法
description: "检查指定链接是否存在"
---

# isLinkExists

### Description

@short: 检查指定链接是否存在

@signature: isLinkExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* - 链接的 ID

### Returns
- ` link` - (boolean) - <i>true</i>，如果存在这样的链接。否则，<i>false</i>

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});
gantt.isLinkExists(1); // ->true
~~~