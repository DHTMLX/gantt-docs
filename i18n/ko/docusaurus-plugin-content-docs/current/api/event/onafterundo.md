---
sidebar_label: onAfterUndo
title: onAfterUndo event
description: "undo() 메서드가 실행된 직후에 트리거됩니다."
---

# onAfterUndo

### Description

@short: Undo() 메서드가 실행된 직후에 트리거됩니다.

@signature: onAfterUndo: (action: any[]) =\> void;

### Parameters

- `action` - (required) *array* - 명령 객체들을 포함하는 배열입니다.

### Example

~~~jsx
gantt.attachEvent("onAfterUndo",function(action){
    // 여기에 코드 작성
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
이 이벤트는 **undo** 확장의 일부이므로, [undo](guides/extensions-list.md#undo) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하시기 바랍니다. 
:::


**action** 파라미터는 명령 객체들의 배열이며, 각 객체는 다음과 같은 속성을 가집니다:
 
- **type** - (*string*) 명령 타입을 설명합니다: "add", "remove", 또는 "update"
- **entity** - (*string*) 수정된 객체 유형을 나타냅니다: "task" 또는 "link"
- **value** - (*object*) 변경 후의 task 또는 link 객체
- **oldValue** - (*object*) 변경 전의 task 또는 link 객체


변경 사항이 없을 경우 **action** 파라미터는 === null 입니다. 이는 [gantt.undo()](api/method/undo.md)가 호출되었지만 [onBeforeUndo](api/event/onbeforeundo.md)에서 작업이 취소되었거나 undo 스택이 비어 있을 때 발생할 수 있습니다.

### Related API
- [undo](api/method/undo.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Change log
- 버전 4.0에 추가됨
- 버전 5.2에서 **action** 파라미터가 도입됨

