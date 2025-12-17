---
sidebar_label: clearRedoStack
title: clearRedoStack method
description: "redo 명령을 저장하는 스택을 초기화합니다."
---

# clearRedoStack

### Description

@short: Redo 명령을 저장하는 스택을 초기화합니다.

@signature: clearRedoStack: () =\> void

### Example

~~~jsx
gantt.clearRedoStack();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 이 메서드는 **undo** 확장의 일부이므로, 먼저 [undo](guides/extensions-list.md#undo) 플러그인을 활성화해야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참조하세요. 
:::

### Related API
- [clearUndoStack](api/method/clearundostack.md)
- [redo](api/method/redo.md)
- [getRedoStack](api/method/getredostack.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 5.2에 추가됨

