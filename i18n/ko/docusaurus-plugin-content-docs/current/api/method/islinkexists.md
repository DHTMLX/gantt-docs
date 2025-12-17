---
sidebar_label: isLinkExists
title: isLinkExists method
description: "주어진 링크가 존재하는지 확인합니다"
---

# isLinkExists

### Description

@short: 주어진 링크가 존재하는지 확인합니다

@signature: isLinkExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* -    링크 ID

### Returns
- ` link` - (boolean) - <i>true</i> 링크가 존재하면, 그렇지 않으면 <i>false</i>

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
