---
sidebar_label: isLinkExists
title: isLinkExists method
description: "验证给定的链接是否存在"
---

# isLinkExists

### Description

@short: 验证给定的链接是否存在

@signature: isLinkExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* -    链接的id

### Returns
- ` link` - (boolean) - <i>true</i> 如果链接存在，否则为 <i>false</i>

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
