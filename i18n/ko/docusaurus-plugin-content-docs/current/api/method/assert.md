---
sidebar_label: assert
title: assert method
description: "주어진 표현식이 false일 경우, 화면 오른쪽 상단에 빨간색 팝업으로 errorMessage가 표시됩니다."
---

# assert

### Description

@short: 주어진 표현식이 false일 경우, 화면 오른쪽 상단에 빨간색 팝업으로 errorMessage가 표시됩니다.

@signature: assert: (expression: any, errorMessage: string) =\> void

### Parameters

- `expression` - (required) *any* - 표현식이 참인지 확인하는 값, assertion이 실패하면 거짓입니다.
- `errorMessage` - (required) *string* - 빨간색 팝업에 표시될 메시지입니다.

### Example

~~~jsx
gantt.attachEvent("onLoadEnd", function(){
   gantt.assert(gantt.getTaskCount(), "no data loaded");
});
~~~

### Details

dhtmlxGantt 코드베이스는 gantt.assert를 사용하여 컴포넌트가 유효하지 않은 상태인지 확인합니다.

오류 표시 방식은 [show_errors](api/config/show_errors.md) 설정을 통해 조정할 수 있습니다.

오류는 [onError](api/event/onerror.md) 이벤트를 통해 프로그래밍적으로도 처리할 수 있습니다.

