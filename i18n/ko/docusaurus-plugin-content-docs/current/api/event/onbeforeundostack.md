---
sidebar_label: onBeforeUndoStack
title: onBeforeUndoStack event
description: "동작이 undo 스택에 추가되기 직전에 트리거됩니다."
---

# onBeforeUndoStack

### Description

@short: 동작이 undo 스택에 추가되기 직전에 트리거됩니다.

@signature: onBeforeUndoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - 사용자 동작을 나타내는 명령 객체 배열

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작을 계속할지(true) 중단할지(false) 결정합니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeUndoStack",function(action){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

:::note
 이 이벤트는 **undo** 확장 기능의 일부이므로 [undo](guides/extensions-list.md#undo) 플러그인이 활성화되어 있어야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하세요. 
:::


- 이 이벤트는 차단할 수 있으며, false를 반환하면 추가 처리가 중단됩니다.
- 이벤트를 차단하면 undo가 이벤트 인수에서 동작을 캡처하는 것을 방지합니다.
- 이벤트 동작을 수정할 수 있습니다.

### Related API
- [onBeforeRedoStack](api/event/onbeforeredostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 5.2에 추가됨

