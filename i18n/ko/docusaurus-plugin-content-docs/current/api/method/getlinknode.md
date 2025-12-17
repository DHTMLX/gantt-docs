---
sidebar_label: getLinkNode
title: getLinkNode method
description: "지정된 의존성 링크에 해당하는 HTML 요소를 가져옵니다."
---

# getLinkNode

### Description

@short: 지정된 의존성 링크에 해당하는 HTML 요소를 가져옵니다.

@signature: getLinkNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (required) *string | number* -    링크의 id

### Returns
- `node` - (HTMLElement) - 링크를 나타내는 HTML 요소

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
