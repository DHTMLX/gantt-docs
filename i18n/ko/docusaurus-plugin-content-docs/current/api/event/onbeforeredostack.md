---
sidebar_label: onBeforeRedoStack
title: onBeforeRedoStack event
description: "redo 스택에 액션이 추가되기 전에 발생합니다"
---

# onBeforeRedoStack

### Description

@short: redo 스택에 액션이 추가되기 전에 발생합니다

@signature: onBeforeRedoStack: (action: UndoRedoAction) => boolean;

### Parameters

- `action` - (required) *UndoRedoAction* - 배열 형태의 명령 객체로 표현된 사용자 액션

### Returns
- `result` - (boolean) - 이벤트의 기본 동작이 트리거될지(true) 또는 취소될지(false)를 정의합니다

### Example

~~~jsx
gantt.attachEvent("onBeforeRedoStack", function(action){
    // 여기에 코드 작성
    return true;
});
~~~

### Details

:::note
이벤트는 **undo** 확장 기능에 정의되어 있으므로 [undo](guides/extensions-list.md#undo) 플러그인을 활성화해야 합니다. [Undo/Redo Functionality](guides/undo-redo.md) 문서를 참조하십시오.
:::

- 이 이벤트는 차단 가능하며, false를 반환하면 추가 처리가 취소됩니다.
- 이벤트가 차단되면 redo는 이벤트 인수에서 전달된 액션들을 캡처하지 않습니다.
- 이벤트 액션은 수정될 수 있습니다.

### Related API
- [onBeforeUndoStack](api/event/onbeforeundostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 5.2에서 추가되었습니다