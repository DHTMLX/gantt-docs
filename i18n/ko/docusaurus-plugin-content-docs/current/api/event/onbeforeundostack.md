---
sidebar_label: onBeforeUndoStack
title: onBeforeUndoStack 이벤트
description: "Undo 스택에 작업이 추가되기 전에 발생합니다."
---

# onBeforeUndoStack

### Description

@short: Undo 스택에 작업이 추가되기 전에 발생합니다.

@signature: onBeforeUndoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - 명령 객체 배열 형태로 표현된 사용자의 작업

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 트리거될지(true) 또는 취소될지(false) 정의합니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeUndoStack",function(action){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

:::note
이벤트는 **undo** 확장 기능에 정의되어 있으므로 [undo](guides/extensions-list.md#undo) 플러그인을 활성화해야 합니다. 자세한 내용은 [Undo/Redo Functionality](guides/undo-redo.md) 문서를 참조하십시오.
:::

- 이 이벤트는 차단 가능하며, false를 반환하면 이후 처리가 취소됩니다.
- 이벤트가 차단되면 Undo는 이벤트 인수에서의 작업을 캡처하지 못합니다.
- 이벤트 동작은 수정될 수 있습니다.

### Related API
- [onBeforeRedoStack](api/event/onbeforeredostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- 버전 5.2에 추가됨