---
sidebar_label: undo_actions
title: undo_actions config
description: "Undo 기능이 되돌릴 작업을 정의합니다."
---

# undo_actions

### Description

@short: Undo 기능이 되돌릴 작업을 정의합니다.

@signature: undo_actions: \{ update?: string; remove?: string; add?: string; move?: string; \}

### Example

~~~jsx
gantt.config.undo_actions = {
    update: "update",
    remove: "remove", // 데이터스토어에서 항목을 제거
    add: "add",
    move: "move"
};
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 이 옵션은 **undo** 확장의 일부이므로, [undo](guides/extensions-list.md#undo) 플러그인을 반드시 활성화해야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서에서 확인할 수 있습니다. 
:::

- **update** - (*string*) - "update" 작업의 이름을 지정합니다.
- **remove** - (*string*) - "remove" 작업의 이름을 지정합니다.
- **add** - (*string*) - "add" 작업의 이름을 지정합니다.
- **move** - (*string*) - "move" 작업의 이름을 지정합니다.

### Related API
- [undo](api/config/undo.md)
- [undo_types](api/config/undo_types.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에서 추가됨

