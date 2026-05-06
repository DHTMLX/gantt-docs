---
sidebar_label: undo_steps
title: undo_steps 설정
description: "undo 메서드로 되돌려져야 하는 단계의 수를 설정합니다"
---

# undo_steps

### Description

@short: undo 메서드로 되돌려져야 하는 단계의 수를 설정합니다

@signature: undo_steps: number

### Example

~~~jsx
gantt.config.undo_steps = 10;

gantt.init("gantt_here");
~~~

**기본값:** 10

### Related samples
- [Undo/Redo changes in Gantt](https://docs.dhtmlx.com/gantt/samples/02_extensions/14_undo.html)

### Details

:::note
이 옵션은 **undo** 확장에 정의되어 있으므로 [undo](guides/extensions-list.md#undo) 플러그인을 활성화해야 합니다. 자세한 내용은 [Undo/Redo Functionality](guides/undo-redo.md) 문서를 참조하십시오.
:::

### Related API
- [undo](api/config/undo.md)
- [undo_actions](api/config/undo_actions.md)
- [undo_types](api/config/undo_types.md)

### Related Guides
- [Undo/Redo 기능](guides/undo-redo.md)

### Change log
- 버전 4.0에서 추가