---
sidebar_label: redo
title: redo 구성
description: "간트 차트의 Redo 기능 활성화"
---

# redo

### Description

@short: 간트 차트의 Redo 기능 활성화합니다

@signature: redo: boolean

### Example

~~~jsx
gantt.config.redo = true;
~~~

**기본값:** true

### Related samples
- [Gantt에서 Undo/Redo 변경](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
이 옵션은 **undo** 확장에 정의되어 있으므로 [undo](guides/extensions-list.md#undo) 플러그인을 활성화해야 합니다. 자세한 내용은 [Undo/Redo Functionality](guides/undo-redo.md) 문서를 참조하십시오.
:::

### Related API
- - [undo](api/config/undo.md)
- - [undo_actions](api/config/undo_actions.md)
- - [undo_steps](api/config/undo_steps.md)
- - [undo_types](api/config/undo_types.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에서 추가되었습니다