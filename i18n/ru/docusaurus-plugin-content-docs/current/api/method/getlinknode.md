---
sidebar_label: getLinkNode
title: getLinkNode method
description: "получает HTML-элемент, соответствующий указанной ссылке зависимости"
---

# getLinkNode

### Description

@short: Получает HTML-элемент, соответствующий указанной ссылке зависимости

@signature: getLinkNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    ID ссылки

### Returns
- `node` - (HTMLElement) - HTML-элемент, представляющий ссылку

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
