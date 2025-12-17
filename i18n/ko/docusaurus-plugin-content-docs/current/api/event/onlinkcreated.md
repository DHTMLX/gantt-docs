---
sidebar_label: onLinkCreated
title: onLinkCreated event
description: "사용자가 작업 간에 새로운 연결을 생성할 때 트리거됩니다."
---

# onLinkCreated

### Description

@short: 사용자가 작업 간에 새로운 연결을 생성할 때 트리거됩니다.

@signature: onLinkCreated: (link: Link) =\> boolean;

### Parameters

- `link` - (required) *Link* - 새로 생성된 링크 객체

### Returns
- ` result` - (boolean) - `false`를 반환하면 새로운 링크 생성이 중단되고, `true`를 반환하면 기본 동작이 계속 진행됩니다.

### Example

~~~jsx
gantt.attachEvent("onLinkCreated", function(link){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

이 이벤트는 새 링크가 나타나기 직전에 발생하며, **링크 생성 방지** 옵션을 제공합니다.

### Change log
- v6.2.2에 추가됨
