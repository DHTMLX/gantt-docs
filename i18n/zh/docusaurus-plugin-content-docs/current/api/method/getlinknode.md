---
sidebar_label: getLinkNode
title: getLinkNode method
description: "获取对应指定依赖链接的HTML元素"
---

# getLinkNode

### Description

@short: 获取对应指定依赖链接的HTML元素

@signature: getLinkNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    链接的id

### Returns
- `node` - (HTMLElement) - 表示该链接的HTML元素

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
