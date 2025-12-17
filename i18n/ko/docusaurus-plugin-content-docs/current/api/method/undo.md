---
sidebar_label: undo
title: undo method
description: "간트에서 수행된 변경 사항을 되돌립니다."
---

# undo

### Description

@short: 간트에서 수행된 변경 사항을 되돌립니다.

@signature: undo: () =\> void

### Example

~~~jsx
gantt.undo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 이 메서드는 **undo** 확장의 일부이므로, [undo](guides/extensions-list.md#undo) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서에서 확인할 수 있습니다. 
:::

### Related API
- [redo](api/method/redo.md)
- [getUndoStack](api/method/getundostack.md)
- [clearUndoStack](api/method/clearundostack.md)
- [onBeforeUndo](api/event/onbeforeundo.md)
- [onAfterUndo](api/event/onafterundo.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에 추가됨

