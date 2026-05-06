---
sidebar_label: getLinkNode
title: метод getLinkNode
description: "возвращает HTML-элемент указанной зависимости-ссылки"
---

# getLinkNode

### Description

@short: Возвращает HTML-элемент указанной зависимости-ссылки

@signature: getLinkNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* - идентификатор ссылки

### Returns
- `node` - (HTMLElement) - HTML-элемент ссылки

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