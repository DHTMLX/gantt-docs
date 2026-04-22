---
sidebar_label: assert
title: assert 메서드
description: "지정된 표현식이 거짓인 경우 화면의 오른쪽 상단에 빨간 팝업으로 errorMessage가 표시됩니다"
---

# assert

### Description

@short: 지정된 표현식이 거짓인 경우 화면의 오른쪽 상단 모서리에 빨간 팝업으로 errorMessage가 표시됩니다

@signature: assert: (expression: any, errorMessage: string) =\> void

### Parameters

- `expression` - (required) *any* - 표현식을 참값으로 간주할 수 있는 값이며, 거짓값일 때 단언이 실패합니다
- `errorMessage` - (required) *string* - 빨간 팝업에 표시될 오류 메시지

### Example

~~~jsx
gantt.attachEvent("onLoadEnd", function(){
   gantt.assert(gantt.getTaskCount(), "no data loaded");
});
~~~

### Details

dhtmlxGantt 코드베이스는 컴포넌트의 잘못된 상태를 감지하기 위해 gantt.assert를 사용합니다

오류 표시 설정은 [show_errors](api/config/show_errors.md) 구성(config)을 사용하여 변경할 수 있습니다.

오류는 [onError](api/event/onerror.md) 이벤트를 사용하여 프로그래밍 방식으로 추적할 수 있습니다.