---
sidebar_label: getLinkNode
title: getLinkNode method
description: "returns the HTML element of the specified dependency link"
---

# getLinkNode

### Description

@short: Returns the HTML element of the specified dependency link

@signature: getLinkNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    the link id

### Returns
- `node` - (HTMLElement) - the HTML element of the link

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
