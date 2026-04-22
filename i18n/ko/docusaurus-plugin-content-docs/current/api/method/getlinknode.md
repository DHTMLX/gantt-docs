---
sidebar_label: getLinkNode
title: getLinkNode 메서드
description: "지정된 의존성 링크의 HTML 요소를 반환합니다"
---

# getLinkNode

### Description

@short: 지정된 의존성 링크의 HTML 요소를 반환합니다

@signature: getLinkNode: (id: string | number) =\> HTMLElement

### Parameters

- `id` - (필수) *string | number* - 링크 ID

### Returns
- `node` - (HTMLElement) - 링크의 HTML 요소

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