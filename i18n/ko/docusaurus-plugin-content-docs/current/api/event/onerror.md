---
sidebar_label: onError
title: onError event
description: "assert가 'false' 값을 반환할 때마다 트리거되며, 이는 assertion이 실패했음을 의미합니다."
---

# onError

### Description

@short: [assert](api/method/assert.md)가 'false' 값을 반환할 때마다 트리거되며, 이는 assertion이 실패했음을 의미합니다.

@signature: onError: (errorMessage: string) =\> boolean;

### Parameters

- `errorMessage` - (required) *string* - [assert](api/method/assert.md) 메서드에서 전달된 에러 메시지를 포함하는 문자열

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 계속 진행될지(<b>true</b>) 또는 중단될지(<b>false</b>)를 결정합니다.

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

이 이벤트는 차단할 수 있습니다. false를 반환하면 기본 동작인 화면 오른쪽 상단의 빨간 박스에 에러 메시지를 표시하는 동작이 중단됩니다.

### Change log
- 버전 4.0에서 추가됨

