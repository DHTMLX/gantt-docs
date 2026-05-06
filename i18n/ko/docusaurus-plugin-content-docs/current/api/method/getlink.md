---
sidebar_label: getLink
title: getLink method
description: "지정된 id로 의존성 링크 객체를 반환합니다"
---

# getLink

### Description

@short: 지정된 id로 의존성 링크 객체를 반환합니다

@signature: getLink: (id: string | number) => Link

### Parameters

- `id` - (required) *string | number* -    링크 ID

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

특정 작업에 연결된 모든 링크를 얻는 방법에 대한 정보는 [Getting the Link Object/Id](guides/link-object-operations.md#getting-the-links-related-to-a-certain-task) 문서를 참조하십시오.