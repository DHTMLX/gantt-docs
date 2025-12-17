---
sidebar_label: isLinkExists
title: isLinkExists method
description: "Überprüft, ob der angegebene Link vorhanden ist"
---

# isLinkExists

### Description

@short: Überprüft, ob der angegebene Link vorhanden ist

@signature: isLinkExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* -    die Link-ID

### Returns
- ` link` - (boolean) - <i>true</i>, wenn der Link existiert, andernfalls <i>false</i>

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
