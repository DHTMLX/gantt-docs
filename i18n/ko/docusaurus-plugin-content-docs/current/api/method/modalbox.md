---
sidebar_label: modalbox
title: modalbox 메서드
description: "모달박스를 호출합니다"
---

# modalbox

### Description

@short: 모달박스를 호출합니다

@signature: modalbox: (config: ModalBoxConfig) => HTMLElement

### Parameters

- `config` - (required) *ModalBoxConfig* - 모달 박스의 구성

### Returns
- ` div` - (HTMLElement) - 모달박스의 div 컨테이너

### Example

~~~jsx
let box = gantt.modalbox({
    title: "Close",
     type: "alert-warning"
});
~~~

### Details

구성 객체는 다음 속성을 사용합니다:

- **id?** - (*number | string*) - 선택적, 모달 박스의 ID
- **text** - (*number | string*) - 모달 박스 본문의 텍스트
- **title?** - (*number | string*) - 선택적, 헤더의 텍스트
- **position?** - (*string*) - 선택적, 모달 박스의 위치. 현재 값은 하나만 지원 - "top", 다른 값은 "center-align"로 간주됩니다
- **buttons** - (*string[] | number[] | ModalboxButton[]*) - 버튼 배열
- **width?** - (*string*) - 선택적, 모달 박스의 너비(CSS [\<length\>](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 또는
  [\<percentage\>](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 값, 예: "100px", "50%")
- **height?** - (*string*) - 선택적, 모달 박스의 높이(CSS [\<length\>](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 또는
  [\<percentage\>](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 값, 예: "100px", "50%")
- **callback? (result): void** - 선택적, 버튼 클릭 시 호출되는 함수. 매개변수로 true 또는 false를 받습니다(클릭된 버튼에 따라 달라집니다)
    - **_result_** - (*string | number | boolean*) - 콜백 함수의 결과는 배열에서 눌린 버튼의 인덱스를 문자열로 표현한 값("0", "1", "2", ...)

ModalboxButton의 유형은 다음과 같습니다:

- **label** - (*string | number*) - 버튼의 텍스트
- **value?** - (*string | number | boolean*) - 선택적, *callback* 함수의 *result* 인수에서 반환되는 값
- **css?** - (*string | number*) - 선택적, 버튼에 대한 커스텀 클래스 이름으로, "gantt_" 문자열로 접두사

모달박스에서 지원되는 구성 옵션에 대한 추가 정보는 [Popup Messages and Modal Boxes](guides/message-boxes.md) 문서를 참조하십시오.

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- [팝업 메시지 및 모달 박스](guides/message-boxes.md)

### Change log
- 버전 4.0에 추가되었습니다