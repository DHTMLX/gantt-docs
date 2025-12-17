---
sidebar_label: confirm
title: confirm method
description: "confirm 메시지 박스를 표시합니다"
---

# confirm

### Description

@short: Confirm 메시지 박스를 표시합니다

@signature: confirm: (config: ConfirmBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (required) *ConfirmBoxConfig | string | number* -            confirm 박스의 구성 객체이거나 표시할 텍스트일 수 있습니다

### Returns
- ` div` - (HTMLElement) - confirm 박스를 포함하는 div 요소를 반환합니다

### Example

~~~jsx
var box = gantt.confirm({
    text: "계속 하시겠습니까?",
    ok:"예", 
    cancel:"아니오",
    callback: function(result){
        if(result){
            gantt.message("예!");
        }else{
            gantt.message("아니오...");
        }
    }
});

// 또는
var box = gantt.confirm("계속 하시겠습니까?");
~~~

### Details

구성 객체는 다음 속성을 포함합니다:

- **id?** - (*number | string*) - confirm 박스의 선택적 식별자
- **text** - (*number | string*) - confirm 박스 내부에 표시될 주요 텍스트
- **title?** - (*number | string*) - 선택적 헤더 텍스트
- **ok?** - (*number | string*) - "OK" 버튼에 대한 선택적 레이블
- **cancel?** - (*number | string*) - "Cancel" 버튼에 대한 선택적 레이블
- **position?** - (*string*) - confirm 박스의 선택적 위치 지정; 현재는 "top"만 지원하며, 그 외에는 기본값으로 "center-align"이 적용됩니다
- **width?** - (*string*) - confirm 박스의 선택적 너비, CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 또는 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 값으로 지정, 예: "100px", "50%"
- **height?** - (*string*) - confirm 박스의 선택적 높이, CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 또는 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 값으로 지정, 예: "100px", "50%"
- **callback? (result): void** - 버튼 클릭 시 호출되는 선택적 함수입니다. 눌린 버튼에 따라 *true* 또는 *false*를 받습니다
    - **_result_** - (*boolean*) - 클릭된 버튼을 나타냅니다: "OK"는 **true**, "Cancel"은 **false**입니다


confirm 메시지 박스에 사용할 수 있는 구성 옵션에 대한 자세한 내용은 [팝업 메시지 및 모달 박스](guides/message-boxes.md) 문서를 참고하세요.

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [팝업 메시지 및 모달 박스](guides/message-boxes.md)

### Change log
- 버전 4.0에서 추가됨

