---
sidebar_label: undo_types
title: undo_types config
description: "Undo 동작이 영향을 미칠 엔티티 유형을 설정합니다."
---

# undo_types

### Description

@short: Undo 동작이 영향을 미칠 엔티티 유형을 설정합니다.

@signature: undo_types: \{ link?: string; task?: string; \}

### Example

~~~jsx
gantt.config.undo_types = {
    link:"link",
    task:"task"
};
~~~

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
 이 옵션은 **undo** 확장의 일부이므로, [undo](guides/extensions-list.md#undo) 플러그인을 반드시 활성화해야 합니다. 자세한 내용은 [Undo/Redo 기능](guides/undo-redo.md) 문서를 참고하십시오. 
:::

- **link** - (*string*) - "link" 엔티티의 식별자
- **task** - (*string*) - "task" 엔티티의 식별자

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에 추가됨

