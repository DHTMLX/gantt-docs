---
sidebar_label: onBeforeUndo
title: onBeforeUndo event
description: "undo() 메서드가 실행되기 바로 전에 트리거됩니다."
---

# onBeforeUndo

### Description

@short: Undo() 메서드가 실행되기 바로 전에 트리거됩니다.

@signature: onBeforeUndo: (action: any[]) =\> boolean;

### Parameters

- `action` - (required) *array* - 명령 객체들을 포함하는 배열

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 계속 진행될지(true) 또는 중단될지(false)를 결정합니다.

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


이 이벤트는 차단할 수 있습니다. *false*를 반환하면 이후 처리가 중단됩니다.

**action** 매개변수는 명령 객체들의 배열이며, 각 객체는 다음 속성들을 포함합니다:
 
- **type** - (*string*) 명령 유형: "add", "remove", "update"
- **entity** - (*string*) 변경된 객체 종류: "task" 또는 "link"
- **value** - (*object*) 변경 후의 task 또는 link 객체
- **oldValue** - (*object*) 변경 전의 task 또는 link 객체

### Related API
- [undo](api/method/undo.md)
- [onAfterUndo](api/event/onafterundo.md)
- [onBeforeUndoStack](api/event/onbeforeundostack.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에 추가됨

