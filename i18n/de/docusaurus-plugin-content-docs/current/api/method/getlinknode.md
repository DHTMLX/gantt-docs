---
sidebar_label: getLinkNode
title: getLinkNode method
description: "holt das HTML-Element, das dem angegebenen Abhängigkeitslink entspricht"
---

# getLinkNode

### Description

@short: Holt das HTML-Element, das dem angegebenen Abhängigkeitslink entspricht

@signature: getLinkNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -     die ID des Links

### Returns
- `node` - (HTMLElement) - das HTML-Element, das den Link repräsentiert

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});

gantt.getLinkNode(1); //-> <div class=​"gantt_task_link" link_id=​"1">​…​</div>​
~~~
