---
sidebar_label: alert
title: alert 메서드
description: "알림 메시지 상자를 호출합니다"
---

# alert

### Description

@short: 알림 메시지 상자 호출

@signature: alert: (config: AlertBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *AlertBoxConfig | string | number* - 알림 상자의 구성 객체 또는 표시할 텍스트

### Returns
- ` div` - (HTMLElement) - 알림 상자의 div 컨테이너

### Example

~~~jsx
var box = gantt.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});

// or
var box = gantt.alert("This is an alert box");
~~~

### Details

구성 객체는 다음 속성을 사용합니다:

- **id?** - (*number | string*) - 선택적, 알림 상자의 ID
- **text** - (*number | string*) - 알림 상자 본문의 텍스트
- **title?** - (*number | string*) - 선택적, 헤더의 텍스트
- **ok?** - (*number | string*) - 선택적, "OK" 버튼의 텍스트
- **position?** - (*string*) - 선택적, 현재 알림 상자의 위치. 값은 하나만 지원되며, "top"일 경우 상단 정렬, 그 외 값은 "center-align"으로 간주됩니다
- **width?** - (*string*) - 선택적, 알림 상자의 너비(CSS [&#60;length&#62;] 또는 [&#60;percentage&#62;] 값으로 설정), 예: "100px", "50%"
- **height?** - (*string*) - 선택적, 알림 상자의 높이(CSS [&#60;length&#62;] 또는 [&#60;percentage&#62;] 값으로 설정), 예: "100px", "50%"
- **callback? (result): void** - 선택적, 버튼 클릭 시 호출되는 함수. 매개변수로 true를 받습니다(클릭된 버튼에 따라 결정)
    - **_result_** - (*boolean*) - 클릭된 버튼의 결과, 항상 true를 반환합니다(왜냐하면 "OK" 버튼만 있기 때문입니다)

추가 세부 정보에 대한 안내: 알림 메시지 박스의 지원 구성 옵션에 대한 자세한 내용은 [Popup Messages and Modal Boxes](guides/message-boxes.md) 문서를 참조하십시오.

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [팝업 메시지 및 모달 박스](guides/message-boxes.md)

### Change log
- 버전 4.0에서 추가됨