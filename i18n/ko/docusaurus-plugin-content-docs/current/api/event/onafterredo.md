---
sidebar_label: onAfterRedo
title: onAfterRedo event
description: "redo() 메서드가 실행된 직후에 발생합니다."
---

# onAfterRedo

### Description

@short: Redo() 메서드가 실행된 직후에 발생합니다.

@signature: onAfterRedo: (action: any[]) =\> void;

### Parameters

- `action` - (required) *array* - 사용자 작업을 나타내는 커맨드 객체들의 배열

### Example

~~~jsx
gantt.attachEvent("onAfterRedo",function(action){
    // 여기에 코드 작성
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
이 이벤트는 **undo** 확장 기능의 일부이므로, 반드시 [undo](guides/extensions-list.md#undo) 플러그인을 활성화해야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하세요. 
:::


**action** 파라미터는 다음 속성을 가진 커맨드 객체들의 배열입니다:
 
- **type** - (*string*) 커맨드 타입: "add", "remove", "update"
- **entity** - (*string*) 변경된 객체 종류: "task" 또는 "link"
- **value** - (*object*) 변경 후의 태스크 또는 링크 객체
- **oldValue** - (*object*) 변경 전의 태스크 또는 링크 객체

적용할 변경 사항이 없으면 **action** 파라미터는 === null이 됩니다. 이는 [gantt.redo()](api/method/redo.md)가 호출되었으나 [onBeforeRedo](api/event/onbeforeredo.md)에 의해 변경이 차단되었거나, redo 스택이 비어있을 때 발생할 수 있습니다.

### Related API
- [redo](api/method/redo.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Change log
- 4.0 버전에서 도입됨
- 5.2 버전에서 **action** 파라미터가 추가됨

