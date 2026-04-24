--- 
sidebar_label: onAfterUndo
title: onAfterUndo 이벤트
description: "undo() 메서드가 호출된 후에 발생합니다"
---

# onAfterUndo

### Description

@short: undo() 메서드가 호출된 직후에 발생합니다

@signature: onAfterUndo: (action: any[]) =\> void;

### Parameters

- `action` - (required) *array* - 명령 객체 배열

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
This event is defined in the **undo** extension, so you need to enable the [undo](guides/extensions-list.md#undo) plugin. Read the details in the [Undo/Redo Functionality](guides/undo-redo.md) article. 
:::

- **action** 매개변수는 명령 객체 배열을 나타냅니다. 각 객체에는 아래의 속성 집합이 포함됩니다:
 
- **type** - (*string*) 명령의 유형: "add/remove/update"
- **entity** - (*string*) 변경된 객체의 유형: "task" 또는 "link"
- **value** - (*object*) 변경된 task/link 객체 
- **oldValue** - (*object*) 변경 전의 task/link 객체


변경이 적용되지 않으면, **action** 인수는 === null이 됩니다. 이는 [gantt.undo()](api/method/undo.md)가 호출되었으나 변경이 [onBeforeUndo](api/event/onbeforeundo.md)에서 취소되었거나 스택이 비어 있을 때 발생할 수 있습니다.

### Related API
- [undo](api/method/undo.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Change log
- 버전 4.0에서 추가됨
- **action** 인수는 버전 5.2에서 추가되었습니다