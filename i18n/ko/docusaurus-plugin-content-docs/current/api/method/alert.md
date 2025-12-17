---
sidebar_label: alert
title: alert method
description: "알림 메시지 박스를 호출합니다."
---

# alert

### Description

@short: 알림 메시지 박스를 호출합니다.

@signature: alert: (config: AlertBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *AlertBoxConfig | string | number* -            알림 박스 설정이 포함된 객체이거나 표시할 텍스트일 수 있습니다.

### Returns
- ` div` - (HTMLElement) - 알림 박스를 포함하는 div 요소입니다.

### Example

~~~jsx
var box = gantt.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});

// 또는
var box = gantt.alert("This is an alert box");
~~~

### Details

구성 객체는 다음 속성을 지원합니다:

- **id?** - (*number | string*) - 선택 사항, 알림 박스의 ID
- **text** - (*number | string*) - 알림 박스 내부의 주요 텍스트
- **title?** - (*number | string*) - 선택 사항, 헤더 텍스트
- **ok?** - (*number | string*) - 선택 사항, "OK" 버튼의 레이블
- **position?** - (*string*) - 선택 사항, 알림 박스의 위치; 현재는 "top"만 지원하며, 다른 값은 기본적으로 "center-align"으로 처리됩니다.
- **width?** - (*string*) - 선택 사항, CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 또는 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 형식으로 지정하는 알림 박스의 너비 예: "100px", "50%"
- **height?** - (*string*) - 선택 사항, CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 또는 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 형식으로 지정하는 알림 박스의 높이 예: "100px", "50%"
- **callback? (result): void** - 선택 사항, 버튼 클릭 시 호출되는 함수입니다. 매개변수 *result*는 항상 *true*입니다 ("OK" 버튼만 있기 때문)
    - **_result_** - (*boolean*) - 클릭된 버튼의 결과를 나타내며 항상 **true**입니다.


알림 박스 구성 옵션에 대한 자세한 내용은 [팝업 메시지 및 모달 박스](guides/message-boxes.md) 문서를 참조하세요.

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [팝업 메시지 및 모달 박스](guides/message-boxes.md)

### Change log
- 버전 4.0에 추가됨

