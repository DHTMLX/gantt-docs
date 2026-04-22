---
sidebar_label: isLinkExists
title: isLinkExists method
description: "지정된 링크가 존재하는지 확인합니다"
---

# isLinkExists

### Description

@short: 지정된 링크가 존재하는지 확인합니다

@signature: isLinkExists: (id: string | number) =\> boolean

### Parameters

- `id` - (필수) *string | number* -    링크 아이디

### Returns
- ` link` - (boolean) - <i>참</i>, 만약 그러한 링크가 존재하면. 그렇지 않으면, <i>거짓</i>

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});
gantt.isLinkExists(1); // ->참
~~~