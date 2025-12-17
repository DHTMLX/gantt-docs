---
sidebar_label: message
title: message method
description: "주어진 타입의 message 박스를 엽니다."
---

# message

### Description

@short: 주어진 타입의 message 박스를 엽니다.

@signature: message: MessagePopupObject

### Parameters

- `config` - (required) *object | string | number* -            message 박스의 설정 객체이거나 표시할 텍스트일 수 있습니다.

### Returns
- ` id` - (string | number) - message 박스의 식별자입니다.

### Example

~~~jsx
let box = gantt.message({ 
    type:"warning", 
    text:"정말 실행하시겠습니까?"
});

// 또는
box = gantt.message("이것은 message입니다.");
~~~

### Details

설정 객체는 다음 속성들을 지원합니다:

- **id?** - (*number | string*) - 선택 사항, 팝업 message에 할당된 ID
- **text** - (*number | string*) - 팝업에 표시할 message 내용
- **type?** - (*string*) - 선택 사항, 팝업 message에 적용할 CSS 클래스 이름
- **expire?** - (*number*) - 선택 사항, 팝업 message가 자동으로 사라지기까지의 시간. -1 값은 수동으로 닫힐 때까지 계속 표시됨을 의미합니다.


**message** 속성은 함수일 수도 있고, 팝업 message의 설정 객체로도 사용할 수 있으며, 다음 속성들을 포함합니다:

- **position** - (*string*) - 팝업 message가 나타나는 위치. 선택지: "top", "bottom", "left", "right"

~~~js
gantt.message.position = "left";
~~~
- **keyboard** - (*boolean*) - Gantt가 키보드 이벤트를 차단할지 여부. 기본값은 *true*입니다.

~~~js
gantt.message.keyboard = false;
~~~
- **hide (id): any** - 팝업 message를 숨기는 메서드로, **id**를 인자로 받습니다:
    - **_id_** - (*number | string*) - 숨길 팝업 message의 ID
~~~js
gantt.message.hide("popupId");
~~~

message 박스의 설정 옵션에 대한 자세한 내용은 [팝업 메시지 및 모달 박스](guides/message-boxes.md) 문서를 참조하세요.

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [팝업 메시지 및 모달 박스](guides/message-boxes.md)

### Change log
- 버전 4.0에 추가됨

