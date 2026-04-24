---
sidebar_label: isLinkExists
title: isLinkExists Methode
description: "Prüft, ob der angegebene Link existiert"
---

# isLinkExists

### Description

@short: Prüft, ob der angegebene Link existiert

@signature: isLinkExists: (id: string | number) =\> boolean

### Parameters

- `id` - (required) *string | number* - die Link-ID

### Returns
- ` link` - (boolean) - <i>true</i>, falls ein solcher Link existiert. Andernfalls, <i>false</i>

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