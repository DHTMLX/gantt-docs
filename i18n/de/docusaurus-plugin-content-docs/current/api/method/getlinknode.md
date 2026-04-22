---
sidebar_label: getLinkNode
title: getLinkNode Methode
description: "gibt das HTML-Element des angegebenen Dependency-Links zurück"
---

# getLinkNode

### Description

@short: Gibt das HTML-Element des angegebenen Dependency-Links zurück

@signature: getLinkNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (erforderlich) *string | number* - die Link-ID

### Returns
- `node` - (HTMLElement) - das HTML-Element des Links

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