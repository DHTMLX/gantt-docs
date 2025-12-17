---
sidebar_label: onBeforeRedoStack
title: onBeforeRedoStack event
description: "redo 스택에 작업이 추가되기 직전에 트리거됩니다."
---

# onBeforeRedoStack

### Description

@short: Redo 스택에 작업이 추가되기 직전에 트리거됩니다.

@signature: onBeforeRedoStack: (action: UndoRedoAction) =\> boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - 사용자 작업을 나타내는 명령 객체 배열

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작을 계속할지(true) 중지할지(false)를 나타냅니다.

### Example

~~~jsx
gantt.attachEvent("onBeforeRedoStack", function(action){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

:::note
 이 이벤트는 **undo** 확장 기능의 일부이므로, [undo](guides/extensions-list.md#undo) 플러그인이 활성화되어 있어야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하세요. 
:::


- false를 반환하여 이벤트를 차단할 수 있으며, 이 경우 추가 처리가 중단됩니다.
- 이벤트 차단 시 redo는 이벤트 인자로 전달된 작업을 기록하지 않습니다.
- 이벤트 내에서 작업 배열을 수정할 수 있습니다.

### Related API
- [onBeforeUndoStack](api/event/onbeforeundostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 5.2 버전에 추가됨

