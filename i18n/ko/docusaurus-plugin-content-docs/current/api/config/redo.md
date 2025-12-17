---
sidebar_label: redo
title: redo config
description: "간트에서 Redo 기능을 사용할 수 있게 합니다."
---

# redo

### Description

@short: 간트에서 Redo 기능을 사용할 수 있게 합니다.

@signature: redo: boolean

### Example

~~~jsx
gantt.config.redo = true;
~~~

**Default value:** true

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 이 설정은 **undo** 확장의 일부이므로, [undo](guides/extensions-list.md#undo) 플러그인이 활성화되어 있는지 확인하세요. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서에서 확인할 수 있습니다. 
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에 추가됨

