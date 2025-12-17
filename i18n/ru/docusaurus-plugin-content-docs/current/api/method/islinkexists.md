---
sidebar_label: isLinkExists
title: isLinkExists method
description: "проверяет, существует ли указанный линк"
---

# isLinkExists

### Description

@short: Проверяет, существует ли указанный линк

@signature: isLinkExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* -    идентификатор линка

### Returns
- ` link` - (boolean) - <i>true</i>, если линк существует, иначе <i>false</i>

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
