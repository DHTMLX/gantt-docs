---
sidebar_label: isLinkExists
title: isLinkExists method
description: "checks whether the specified link exists"
---

# isLinkExists

### Description

@short: Checks whether the specified link exists

@signature: isLinkExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* -    the link id

### Returns
- ` link` - (boolean) - <i>true</i>, if such a link exists. Otherwise, <i>false</i>

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
