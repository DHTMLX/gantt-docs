---
sidebar_label: undo_types
title: undo_types 구성
description: "Undo 작업이 적용될 엔터티 유형을 설정합니다"
---

# undo_types

### Description

@short: Undo 작업이 적용될 엔터티 유형을 설정합니다.

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
이 옵션은 **undo** 확장에 정의되어 있으므로 [undo](guides/extensions-list.md#undo) 플러그인을 활성화해야 합니다. [Undo/Redo Functionality](guides/undo-redo.md) 문서에서 자세한 내용을 확인하십시오.
:::

- **link** - (*string*) - "link" 엔티티의 이름
- **task** - (*string*) - "task" 엔티티의 이름

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_steps](api/config/undo_steps.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에서 추가