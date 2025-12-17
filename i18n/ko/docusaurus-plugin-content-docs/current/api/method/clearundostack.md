---
sidebar_label: clearUndoStack
title: clearUndoStack method
description: "저장된 undo 명령어 스택을 초기화합니다."
---

# clearUndoStack

### Description

@short: 저장된 undo 명령어 스택을 초기화합니다.

@signature: clearUndoStack: () =\> void

### Example

~~~jsx
gantt.clearUndoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 이 메서드는 **undo** 확장의 일부이므로, [undo](guides/extensions-list.md#undo) 플러그인이 활성화되어 있어야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하세요. 
:::

### Related API
- [clearRedoStack](api/method/clearredostack.md)
- [undo](api/method/undo.md)
- [getUndoStack](api/method/getundostack.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 5.2 버전에 추가됨

