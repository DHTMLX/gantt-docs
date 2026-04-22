---
sidebar_label: onBeforeUndo
title: onBeforeUndo 이벤트
description: "undo() 메서드가 호출되기 전에 발생합니다"
--- 

# onBeforeUndo

### Description

@short: undo() 메서드가 호출되기 전에 발생합니다

@signature: onBeforeUndo: (action: any[]) => boolean;

### Parameters

- `action` - (required) *array* - 명령 객체의 배열

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지 여부를 정의합니다(true) 또는 취소됩니다(false)

### Example

~~~jsx
gantt.attachEvent("onBeforeUndo", function(action){
    // 여기에 코드 작성
    return true;
});
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 이 이벤트는 **undo** 확장의 일부이므로, [undo](guides/extensions-list.md#undo) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서에서 확인할 수 있습니다. 
:::

이벤트는 차단 가능합니다. false를 반환하면 추가 처리가 취소됩니다.

**action** 매개변수는 명령 객체의 배열을 나타냅니다. 각 객체는 다음 속성 세트를 포함합니다:
 
- **type** - (*string*) 명령의 유형: "add/remove/update"
- **entity** - (*string*) 변경된 객체의 유형: "task" 또는 "link"
- **value** - (*object*) 변경된 task/link 객체
- **oldValue** - (*object*) 변경되기 전의 task/link 객체

### Related API
- [undo](api/method/undo.md)
- [onAfterUndo](api/event/onafterundo.md)
- [onBeforeUndoStack](api/event/onbeforeundostack.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- 버전 4.0에서 추가되었습니다