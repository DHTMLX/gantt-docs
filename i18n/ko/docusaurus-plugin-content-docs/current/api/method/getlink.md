---
sidebar_label: getLink
title: getLink method
description: "주어진 id를 사용하여 dependency link 객체를 가져옵니다."
---

# getLink

### Description

@short: 주어진 id를 사용하여 dependency link 객체를 가져옵니다.

@signature: getLink: (id: string | number) =\> Link

### Parameters

- `id` - (required) *string | number* -    링크 id

### Returns
- `link` - (Link) - 링크 객체

### Example

~~~jsx
gantt.addLink({
    id:1,
    source:1,
    target:2,
    type:1
});
gantt.getLink(1);// -> {id:1, source:1, target:2, type:1}
~~~

### Details

특정 작업에 연결된 모든 링크를 가져오는 방법은 [링크 객체/ID 가져오기](guides/link-object-operations.md#gettingthelinksrelatedtoacertaintask) 문서를 참조하세요.
