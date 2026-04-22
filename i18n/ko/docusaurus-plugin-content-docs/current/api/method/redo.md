---
sidebar_label: redo
title: redo method
description: "되돌려진 변경 사항을 간트 차트에 다시 적용합니다"
---

# redo

### Description

@short: 되돌린 변경 사항을 간트 차트에 다시 적용합니다

@signature: redo: () =\> void

### Example

~~~jsx
gantt.redo();
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
이 메서드는 **undo** 확장(extension)에 정의되어 있으므로 [undo](guides/extensions-list.md#undo) 플러그인을 활성화해야 합니다. Undo/Redo Functionality 문서에서 자세한 내용을 확인하세요.
:::

### Related API
- [undo](api/method/undo.md)
- [getRedoStack](api/method/getredostack.md)
- [clearRedoStack](api/method/clearredostack.md)
- [onBeforeRedo](api/event/onbeforeredo.md)
- [onAfterRedo](api/event/onafterredo.md)

### Related Guides
- [Undo/Redo Functionality](guides/undo-redo.md)

### Change log
- 버전 4.0에서 추가