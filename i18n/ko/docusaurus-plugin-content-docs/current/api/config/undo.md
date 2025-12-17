---
sidebar_label: undo
title: undo config
description: "간트에서 Undo 기능을 활성화합니다."
---

# undo

### Description

@short: 간트에서 Undo 기능을 활성화합니다.

@signature: undo: boolean

### Example

~~~jsx
gantt.config.undo = true;
~~~

**Default value:** true

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 이 옵션은 **undo** 확장의 일부이므로, 반드시 [undo](guides/extensions-list.md#undo) 플러그인을 활성화해야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하세요. 
:::

### Related API
- [redo](api/config/redo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에서 추가됨

