--- 
sidebar_label: isLinkExists
title: метод isLinkExists
description: "проверяет, существует ли заданная ссылка"
---

# isLinkExists

### Description

@short: Проверяет, существует ли указанная ссылка

@signature: isLinkExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* - идентификатор ссылки

### Returns
- ` link` - (boolean) - <i>true</i>, если такая ссылка существует. В противном случае, <i>false</i>

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