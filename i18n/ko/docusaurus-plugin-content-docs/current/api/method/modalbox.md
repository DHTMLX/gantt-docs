---
sidebar_label: modalbox
title: modalbox method
description: "모달박스를 엽니다"
---

# modalbox

### Description

@short: 모달박스를 엽니다

@signature: modalbox: (config: ModalBoxConfig) =\> HTMLElement

### Parameters

- `config` - (required) *ModalBoxConfig* - 모달박스의 설정 옵션

### Returns
- ` div` - (HTMLElement) - 모달박스를 포함하는 div 엘리먼트

### Example

~~~jsx
let box = gantt.modalbox({
    title: "Close",
     type: "alert-warning"
});
~~~

### Details

설정 객체는 다음 속성들을 포함합니다:

- **id?** - (*number | string*) - 선택 사항, 모달박스의 고유 식별자
- **text** - (*number | string*) - 모달박스 내에 표시될 내용 텍스트
- **title?** - (*number | string*) - 선택 사항, 모달박스의 헤더 텍스트
- **position?** - (*string*) - 선택 사항, 모달박스 위치 제어; 현재는 "top"만 지원하며, 다른 값은 기본적으로 "center-align"으로 설정됨
- **buttons** - (*string[] | number[] | ModalboxButton[]*) - 표시할 버튼들을 지정하는 배열
- **width?** - (*string*) - 선택 사항, CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 또는 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 단위로 모달박스 너비 설정, 예: "100px" 또는 "50%"
- **height?** - (*string*) - 선택 사항, CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 또는 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 단위로 모달박스 높이 설정, 예: "100px" 또는 "50%"
- **callback? (result): void** - 선택 사항, 버튼 클릭 시 호출되는 함수. 클릭된 버튼에 따라 *true* 또는 *false*를 전달받음
    - **_result_** - (*string | number | boolean*) - 콜백 함수는 버튼 배열 내에서 눌린 버튼의 문자열화된 인덱스("0", "1", "2", ...)를 전달받음


ModalboxButton 타입은 다음 속성들을 포함합니다:

- **label** - (*string | number*) - 버튼에 표시될 텍스트
- **value?** - (*string | number | boolean*) - 선택 사항, *callback* 함수의 *result*로 반환될 값
- **css?** - (*string | number*) - 선택 사항, 버튼에 적용할 커스텀 CSS 클래스. "gantt_" 접두사로 시작해야 함


모달박스 설정 옵션에 대한 자세한 내용은 [팝업 메시지 및 모달 박스](guides/message-boxes.md) 문서를 참고하세요.

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- [팝업 메시지 및 모달 박스](guides/message-boxes.md)

### Change log
- 버전 4.0에 추가됨

