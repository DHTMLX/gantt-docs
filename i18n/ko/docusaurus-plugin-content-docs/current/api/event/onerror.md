---
sidebar_label: onError
title: onError 이벤트
description: "assert가 'false' 값을 받을 때 발생하며, 즉 단정이 실패할 때"
---

# onError

### Description

@short: assert가 'false' 값을 받을 때 발생하며, 즉 단정이 실패할 때

@signature: onError: (errorMessage: string) =\> boolean;

### Parameters

- `errorMessage` - (필수) *string* - [assert] 메서드에서 발생한 오류를 담은 문자열

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다 (<b>true</b>) 또는 취소될지 (<b>false</b>)

### Example

~~~jsx
gantt.attachEvent("onError", function(errorMessage){
    gantt.message({
        text:"Error"
    });
    return true;
});
~~~

### Details

이벤트는 차단할 수 있습니다. false를 반환하면 기본 동작이 방지됩니다(오류 메시지가 오른쪽 상단의 빨간 박스에 표시됩니다).

### Change log
- 버전 4.0에 추가됨