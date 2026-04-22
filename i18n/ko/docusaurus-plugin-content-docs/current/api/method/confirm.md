---
sidebar_label: confirm
title: confirm method
description: "confirm 메시지 박스를 표시합니다"
---

# confirm

### Description

@short: 확인 메시지 박스를 호출합니다

@signature: confirm: (config: ConfirmBoxConfig | string | number) =\> HTMLElement

### Parameters

- `config` - (필수) *ConfirmBoxConfig | string | number* - 확인 상자의 구성 객체 또는 표시할 텍스트

- `div` - (HTMLElement) - 확인 상자의 div 컨테이너

### Returns
- ` div` - (HTMLElement) - 확인 상자의 div 컨테이너

### Example

~~~jsx
var box = gantt.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        if(result){
            gantt.message("Yes!");
        }else{
            gantt.message("No...");
        }
    }
});

// 또는
var box = gantt.confirm("계속 하시겠습니까?");
~~~

### Details

구성 객체는 다음 속성들을 사용합니다:

- **id?** - (*number | string*) - 선택적, 확인 상자의 ID
- **text** - (*number | string*) - 확인 상자 본문의 텍스트
- **title?** - (*number | string*) - 선택적, 헤더의 텍스트
- **ok?** - (*number | string*) - 선택적, "OK" 버튼의 텍스트
- **cancel?** - (*number | string*) - 선택적, "Cancel" 버튼의 텍스트
- **position?** - (*string*) - 선택적, 확인 상자의 위치. 현재는 값이 하나만 지원되며, 값이 "top"일 때만 적용되고, 그 외의 값은 모두 "center-align"으로 처리됩니다.
- **width?** - (*string*) - 선택적, 확인 상자의 너비(CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 또는 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 값으로 설정되며 예: "100px", "50%")
- **height?** - (*string*) - 선택적, 확인 상자의 높이(CSS [&#60;length&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/length) 또는 [&#60;percentage&#62;](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) 값으로 설정되며 예: "100px", "50%")
- **callback? (result): void** - 선택적, 버튼 클릭 시 호출되는 함수. 매개변수로 true 또는 false를 받으며, 클릭된 버튼에 따라 다릅니다
    - **_result_** - (*boolean*) - 클릭된 버튼의 결과: **true** 는 "OK", **false** 는 "Cancel".

추가 정보: 확인 메시지 상자에 대한 지원 구성 옵션에 대한 자세한 내용은 [Popup Messages and Modal Boxes](guides/message-boxes.md) 문서를 참조하십시오.

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/message-boxes.md)

### Change log
- 버전 4.0에 추가됨