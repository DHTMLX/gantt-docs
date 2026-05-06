---
sidebar_label: getLinkNode
title: getLinkNode method
description: "返回指定依赖链接的 HTML 元素"
---

# getLinkNode

### Description

@short: 返回指定依赖链接的 HTML 元素

@signature: getLinkNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    该链接的 ID

### Returns
- `node` - (HTMLElement) - 该链接的 HTML 元素

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