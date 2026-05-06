---
sidebar_label: clearUndoStack
title: clearUndoStack 메서드
description: "저장된 Undo 명령 스택을 지웁니다"
---

# clearUndoStack

### Description

@short: 저장된 Undo 명령의 스택을 지웁니다

@signature: clearUndoStack: () =\> void

### Example

~~~jsx
gantt.clearUndoStack();
~~~

### Related samples
- [Gantt에서 Undo/Redo 변경 사항](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
이 메서드는 **undo** 확장에 정의되어 있으므로 [undo](guides/extensions-list.md#undo) 플러그인을 활성화해야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참조하십시오.
:::

### Related API
- [clearRedoStack](api/method/clearredostack.md)
- [undo](api/method/undo.md)
- [getUndoStack](api/method/getundostack.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 5.2에서 추가됨