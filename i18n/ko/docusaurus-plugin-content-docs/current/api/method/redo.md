---
sidebar_label: redo
title: redo method
description: "간트에서 이전에 실행 취소된 변경사항을 다시 적용합니다."
---

# redo

### Description

@short: 간트에서 이전에 실행 취소된 변경사항을 다시 적용합니다.

@signature: redo: () =\> void

### Example

~~~jsx
gantt.redo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 이 메서드는 **undo** 확장 기능의 일부이므로, [undo](guides/extensions-list.md#undo) 플러그인이 활성화되어 있어야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하세요. 
:::

### Related API
- [undo](api/method/undo.md)
- [getRedoStack](api/method/getredostack.md)
- [clearRedoStack](api/method/clearredostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)
- [onAfterRedo](api/event/onafterredo.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에 추가됨

