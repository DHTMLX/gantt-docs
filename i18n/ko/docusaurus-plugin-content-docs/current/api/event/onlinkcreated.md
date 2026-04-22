---
sidebar_label: onLinkCreated
title: onLinkCreated 이벤트
description: "사용자가 작업 간에 새로운 링크를 생성할 때 발생합니다"
---

# onLinkCreated

### Description

@short: 사용자가 작업 간에 새로운 링크를 생성할 때 발생합니다

@signature: onLinkCreated: (link: Link) =\> boolean;

### Parameters

- `link` - (required) *Link* - 새로운 링크의 객체

### Returns
- ` result` - (boolean) - 반환 `false`를 하면 새 링크의 생성이 취소되고, `true`를 반환하면 기본 처리가 계속됩니다

### Example

~~~jsx
gantt.attachEvent("onLinkCreated", function(link){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

이벤트는 새 링크가 표시되기 전에 발생하며, 이를 통해 **링크 생성을 취소**할 수 있습니다.

### Change log
- v6.2.2에서 추가되었습니다